import { useEffect, useState, useRef, type RefObject } from 'react';
import { useDataContext } from '../../../context/DataContext';
import type { Data, typeData } from '../../../context/types/DataContextTypes';
import { useTimeFrameContext } from '../../timeframe/components/TimeFrameContext';

const cloneDate = (date: Date) => {
    const cloneDateObj = new Date(date);
    cloneDateObj.setHours(0, 0, 0, 0);
    return cloneDateObj;
};

const EXTRACT_MIN_STEP_COUNT = 20;

type ExtractType = 'all' | 'income' | 'expense';

const useExtractAllTransactions = (
    extractMinLimitStep = EXTRACT_MIN_STEP_COUNT,
    initialExtraction: boolean = false,
    extractType: ExtractType = 'all',
) => {
    const [extractedData, setExtractedData] = useState<typeData[]>([]);
    const { incomeData, expenseData, metaMinDateData, initialDate } = useDataContext();
    const { startDate, endDate } = useTimeFrameContext();

    const dateCursor = useRef(startDate || initialDate);

    const hasInitialExtraction = useRef(initialExtraction);

    const extractedTypeEndDate =
        endDate ||
        (metaMinDateData?.[extractType] ? cloneDate(metaMinDateData?.[extractType]) : null);
    const hasMore = extractedTypeEndDate
        ? dateCursor?.current?.getTime() >= extractedTypeEndDate?.getTime()
        : false;

    const checkDateRecordExist = (dataArr: Data[], year: number, month?: number, day?: number) => {
        const typePattern = day ? 'dayExist' : month ? 'monthExist' : 'yearExist';

        switch (typePattern) {
            case 'yearExist': {
                return dataArr.some((data) => data?.[year]);
            }
            case 'monthExist': {
                return dataArr.some((data) => month && data?.[year]?.[month]);
            }
            case 'dayExist': {
                return dataArr.some((data) => day && month && data?.[year]?.[month]?.[day]);
            }
        }
    };

    const getDayTransactions = (y: number, m: number, d: number) => {
        let dayTransactionsList: typeData[] = [];

        if (extractType !== 'expense') {
            dayTransactionsList = [...(incomeData[y]?.[m]?.[d] || [])];
        }

        if (extractType !== 'income') {
            dayTransactionsList = [...dayTransactionsList, ...(expenseData[y]?.[m]?.[d] || [])];
        }

        return dayTransactionsList;
    };

    const collectDayTransactions = (dataArr: Data[], year: number, month: number, day: number) => {
        let extractDataArr: typeData[] = [];
        if (!checkDateRecordExist(dataArr, year, month, day)) return;

        const dayTransactions = getDayTransactions(year, month, day).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        extractDataArr = [...extractDataArr, ...dayTransactions];

        return extractDataArr;
    };

    const collectDayTransactionsRecords = (dataArr: Data[], dateCursorData: RefObject<Date>) => {
        let extractDataRecord: typeData[] = [];
        const cursorUpdate = cloneDate(dateCursorData.current);

        while (
            extractDataRecord.length < extractMinLimitStep &&
            cursorUpdate.getTime() >= (extractedTypeEndDate?.getTime() || new Date().getTime())
        ) {
            const year = cursorUpdate.getFullYear();
            const month = cursorUpdate.getMonth() + 1;
            const day = cursorUpdate.getDate();

            if (!checkDateRecordExist(dataArr, year, month, day)) {
                cursorUpdate.setDate(cursorUpdate.getDate() - 1);
                continue;
            }

            const data = collectDayTransactions(dataArr, year, month, day);

            if (data) {
                extractDataRecord = [...extractDataRecord, ...data];
            }

            cursorUpdate.setDate(cursorUpdate.getDate() - 1);
        }

        return {
            extractData: extractDataRecord,
            cursorUpdate,
        };
    };

    const getDataArr = () => {
        if (extractType === 'all') {
            return [expenseData, incomeData];
        } else {
            return extractType === 'income' ? [incomeData] : [expenseData];
        }
    };

    const inFlightRef = useRef(false);

    function collectNewExtractData() {
        if (inFlightRef.current) return;
        inFlightRef.current = true;

        try {
            const dataArr = getDataArr();

            const { extractData, cursorUpdate } = collectDayTransactionsRecords(
                dataArr,
                dateCursor,
            );
            setExtractedData((prevExtractedData) => {
                return [...prevExtractedData, ...extractData];
            });

            dateCursor.current = new Date(cursorUpdate);
        } finally {
            inFlightRef.current = false;
        }
    }

    useEffect(() => {
        if (hasInitialExtraction.current) {
            hasInitialExtraction.current = false;
            collectNewExtractData();
        }
    }, []);

    return {
        extractedData,
        collectNewExtractData,
        dateCursor,
        hasMore,
        hasInitialExtraction,
        extractedMinLastDate: extractedTypeEndDate,
    };
};

export default useExtractAllTransactions;
