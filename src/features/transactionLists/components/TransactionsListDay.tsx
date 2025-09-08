import { useDataContext } from '../../../context/DataContext';
import type { typeData } from '../../../context/types/DataContextTypes';

interface Props {
    dayTransactions: typeData[];
}

const TransactionListDay: React.FC<Props> = ({ dayTransactions }) => {
    const { transactions } = useDataContext();
    const descDayTransactions = [
        ...dayTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    ];
    return (
        <div className="day-wrapper">
            {descDayTransactions.map((dayTransact) => {
                const transaction = transactions[dayTransact.id];
                return (
                    <div
                        className={`statistic-transaction-item ${transaction.type}`}
                        key={dayTransact.id}
                    >
                        <p>Transaction Type: {transaction.type}</p>
                        <p>Transaction Amount: {transaction.amount}</p>
                        <p>Transaction Date: {new Date(transaction?.date).toLocaleDateString()}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TransactionListDay;
