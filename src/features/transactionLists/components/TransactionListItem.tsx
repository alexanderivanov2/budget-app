import { useNavigate } from 'react-router-dom';
import type { TransferData } from '../../../context/types/DataContextTypes';
interface Props {
    data: TransferData;
    style?: React.CSSProperties;
}
const TransactionListItem: React.FC<Props> = ({ data: transaction, style }) => {
    const navigate = useNavigate();

    const handleNavigate = () => navigate(`/transactions/${transaction.id}`);
    return (
        <div
            className={`statistic-transaction-item ${transaction.type}`}
            key={transaction.id}
            style={style ? { ...style } : {}}
            onClick={handleNavigate}
        >
            <div style={{ display: 'flex', gap: '15px' }}>
                <p>Transaction Type: {transaction.type}</p>
                <p>Transaction Amount: {transaction.amount}</p>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <p>Transaction Budget: {transaction.budget}</p>
                <p>Transaction Category: {transaction.category}</p>
            </div>
            <p>Transaction Date: {new Date(transaction?.date).toLocaleDateString()}</p>
        </div>
    );
};

export default TransactionListItem;
