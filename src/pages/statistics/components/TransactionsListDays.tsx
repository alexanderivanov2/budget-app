import { useDataContext } from "../../../context/DataContext";
import { getDaysInMonthArrayReverse } from "../../../utils/dateUtils";
import TransactionListDay from "./TransactionsListDay";

interface Props {
    year: number,
    month: number;
    startDay: number;
}

const TransactionListDays: React.FC<Props> = ({ year, month, startDay }) => {
    const { incomeData, expenseData } = useDataContext();
    const daysCount = startDay
    const daysForMonths = getDaysInMonthArrayReverse(daysCount);

    const availableDays = daysForMonths.filter((day) => incomeData[year]?.[month]?.[day] || expenseData[year]?.[month]?.[day])

    return (
        <div className="Days">
            {availableDays.map((day) => {
                const dayTransactions = [...(incomeData[year]?.[month]?.[day] || []), ...(expenseData[year]?.[month]?.[day] || [])];
                return (
                    <div className="transaction-day-wrapper" key={day}>
                        <h6>Day: {day}</h6>
                        <TransactionListDay dayTransactions={dayTransactions} />
                    </div>
                )
            })}
        </div>
    )
}

export default TransactionListDays;