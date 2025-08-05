import { useDataContext } from "../../../context/DataContext";
import { getDaysInMonth } from "../../../utils/dateUtils";
import TransactionListDays from "./TransactionsListDays";

interface Props {
    year: number;
    startMonth: number;
}

const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const TransactionListMonths: React.FC<Props> = ({ year, startMonth }) => {
    const { incomeData, expenseData } = useDataContext();
    const monthsList = startMonth === 12 ? months : months.slice(12 - startMonth);
    const availableMonths = monthsList.filter((month) => incomeData[year]?.[month] || expenseData[year]?.[month])

    return (
        <div className="statistics-transaction-list-months">
            {availableMonths.map((month) => {
                const daysInMonth = getDaysInMonth(year, month);
                return (
                    <div className="days-wrapper" key={month}>
                        <h5>Month: {month}</h5>
                        <TransactionListDays year={year} month={month} startDay={daysInMonth} />
                    </div>
                )
            })}
        </div>
    )
}

export default TransactionListMonths;