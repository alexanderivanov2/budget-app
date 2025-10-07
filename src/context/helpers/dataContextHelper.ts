import { getYearMonthDay } from '../../utils/dateUtils';
import type { Data, MetaMinDateData, TransactionsTypes } from '../types/DataContextTypes';

export const getDayTransactionsCount = (data: Data, date: Date) => {
    const { year, month, day } = getYearMonthDay(date);
    return data?.[year]?.[month]?.[day]?.length || 0;
};

export const getNextNewMinData = ({ data, oldDate }: { data: Data; oldDate: Date }) => {
    const { year } = getYearMonthDay(new Date(oldDate));
    const currentYear = new Date().getFullYear();
    let checkedYear = year;
    let newOldDate = null;

    while (checkedYear <= currentYear && !newOldDate) {
        const recordMonthsInCheckedYear = Object.keys(data?.[checkedYear]);

        if (!recordMonthsInCheckedYear.length) {
            checkedYear++;
            continue;
        }

        let checkedMonth = null;
        let checkedDay = null;

        recordMonthsInCheckedYear.forEach((m) => {
            const month = Number(m);
            const daysInMonth = Object.keys(data?.[checkedYear]?.[month] || {});

            const dayWithRecords = daysInMonth.find((d) => {
                const day = Number(d);
                return data?.[checkedYear]?.[month]?.[day].length;
            });

            if (dayWithRecords) {
                checkedMonth = month;
                checkedDay = Number(dayWithRecords);
                return;
            }
        });

        if (checkedMonth && checkedDay) {
            newOldDate = new Date(checkedYear, checkedMonth - 1, checkedDay);
        }

        checkedYear++;
    }

    return newOldDate;
};
