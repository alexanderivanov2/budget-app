import { useEffect, useState, useRef, type RefObject } from "react";
import { useDataContext } from "../../../context/DataContext";
import { getDaysInMonth } from "../../../utils/dateUtils";
import type { Data, typeData } from "../../../context/types/DataContextTypes";

const EXTRACT_LIMIT_STEP = 20;

type InitialDate = {
    year: number;
    month: number;
    day: number;
}

const useExtractAllTransactions = (initialDate: InitialDate, extractLimitStep = EXTRACT_LIMIT_STEP, initialExtraction: boolean = false) => {
    const [extractedData, setExtractedData] = useState<typeData[]>([]);
    const { incomeData, expenseData, transactionsCount } = useDataContext();
    const hasInitialExtraction = useRef(initialExtraction)
    const dateCursor = useRef({ ...initialDate });

    const extractedCount = extractedData.length;
    const hasMore = transactionsCount > extractedCount;

    useEffect(() => {
        if (hasInitialExtraction.current) {
            hasInitialExtraction.current = false;
            collectNewExtractData();
        }
    }, []);

    const checkDateRecordExist = (dataArr: Data[], year: number, month?: number, day?: number) => {
        const typePattern = !!day ? 'dayExist' : !!month ? 'monthExist' : 'yearExist';

        switch (typePattern) {
            case ('yearExist'): {
                return dataArr.some((data) => data?.[year]);
            }
            case ('monthExist'): {
                return dataArr.some((data) => month && data?.[year]?.[month]);
            }
            case ('dayExist'): {
                return dataArr.some((data) => day && month && data?.[year]?.[month]?.[day]);
            }
        }
    }

    const extractDataPerLimit = (dataArr: Data[], dateCursorData: RefObject<{ year: number, month: number, day: number }>, year: number, startMonth: number) => {
        let extractDataArr: typeData[] = [];
        let day = 1;
        let month = 1;
        for (let m = startMonth; m > 0; m--) {
            month = m;
            if (!checkDateRecordExist(dataArr, year, m)) {
                continue;
            }
            const startDay = year === dateCursorData.current.year && m === dateCursorData.current.month ? dateCursorData.current.day : getDaysInMonth(year, m);

            for (let d = startDay; d > 0; d--) {
                day = d;
                if (checkDateRecordExist(dataArr, year, m, d)) {
                    const dayTransactions = [
                        ...(incomeData[year]?.[m]?.[d] || []),
                        ...(expenseData[year]?.[m]?.[d] || []),
                    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                    extractDataArr = [...extractDataArr, ...dayTransactions];
                    if (extractDataArr.length >= extractLimitStep) {
                        return {
                            data: extractDataArr, date: {
                                year,
                                month: m,
                                day: d,
                            }
                        }
                    }
                }
            }
        }

        return {
            data: extractDataArr, date: {
                year,
                month,
                day,
            }
        }
    }

    const extractDataRecordsPerLimit = (dataArr: Data[], dateCursorData: RefObject<{ year: number, month: number, day: number }>) => {
        let extractDataRecord: typeData[] = [];
        let cursorUpdate = { ...dateCursorData.current }
        let { year } = cursorUpdate;

        while (year >= 2000) {
            if (!checkDateRecordExist(dataArr, year)) {
                year--;
                continue;
            }

            let month = year === cursorUpdate.year ? cursorUpdate.month : 12;
            let day = getDaysInMonth(year, month);

            const { data, date } = extractDataPerLimit(dataArr, dateCursorData, year, month)

            extractDataRecord = [...extractDataRecord, ...data];
            year = (date.day == 1 && date.month) == 1 ? year - 1 : year;
            month = date.day != 1 ? date.month : date.month == 1 ? 12 : month - 1;
            day = date.day == 1 ? getDaysInMonth(year, month) : date.day - 1;

            cursorUpdate = {
                year,
                month,
                day,
            }

            if (extractDataRecord.length >= extractLimitStep) {
                return {
                    extractData: extractDataRecord,
                    cursorUpdate,
                }
            }
            year--;
        }

        return {
            extractData: extractDataRecord,
            cursorUpdate
        }
    }

    const inFlightRef = useRef(false);

    function collectNewExtractData() {
        if (inFlightRef.current) return;
        inFlightRef.current = true;
        const dataArr = [expenseData, incomeData];
        
        const { extractData, cursorUpdate } = extractDataRecordsPerLimit(dataArr, dateCursor)
        setExtractedData(prevExtractedData => {
            return [...prevExtractedData, ...extractData]
        });
        
        dateCursor.current = {...cursorUpdate};
    }

    useEffect(() => {
        if (!inFlightRef.current) return;
        inFlightRef.current = false;
    }, [extractedCount])

    return {
        extractedData,
        collectNewExtractData,
        dateCursor,
        hasMore,
        extractedCount,
        hasInitialExtraction,
    };
};

export default useExtractAllTransactions;
