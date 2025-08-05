import { useDataContext } from "../../../context/DataContext";
import type { Data } from "../../../context/types/DataContextTypes";
import { getYearMonthDay } from "../../../utils/dateUtils";
import TransactionListMonths from "./TransactionListMonths";

const getAvailableYears = (year: number, data: Data) => {
    let yearCheck = year;
    const availableYears = [];
    while (yearCheck >= 2000) {
        data[yearCheck] ? availableYears.push(yearCheck) : ''
        yearCheck--;
    }

    return availableYears;
}

const getMergeDates = (firstDates: number[], secondDate: number[]) => {
    return Array.from(new Set([...firstDates, ...secondDate])).sort((a, b) => b - a);
};

const TransactionList: React.FC = () => {
    const { incomeData, expenseData } = useDataContext();
    const { year, month } = getYearMonthDay(new Date());
    const startYear = year;
    const startMonth = month;
    const income = getAvailableYears(year, incomeData)
    const expense = getAvailableYears(year, expenseData)
    const mergedYears = getMergeDates(income, expense);

    return (
        <div className="statistics-transactions-list">
            <h3>TRANSACTIONS LIST</h3>
            {mergedYears.map((year) => {
                return (<div key={year}>
                    <h4>{year} </h4>
                    <TransactionListMonths year={year} startMonth={year === startYear ? startMonth : 12} />
                </div>)
            })}
        </div>
    )
}

export default TransactionList;