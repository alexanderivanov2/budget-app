export const getYearMonthDay = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return { year, month, day };
};

export const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

export const getDaysInMonthArrayReverse = (daysCount: number) =>
    Array.from({ length: daysCount }, (_, i: number) => daysCount - i);

export const getPrevMonthLastDay = (date: Date) => {
    const currentMonth = date.getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const year = prevMonth !== 11 ? date.getFullYear() : date.getFullYear() - 1;

    return getDaysInMonth(year, prevMonth);
};
