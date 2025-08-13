import type { TransferData } from "../../../context/types/DataContextTypes";
interface Props {
    transaction: TransferData
}
const TransactionListItem: React.FC<Props> = ({ transaction }) => {
    return (<div className={`statistic-transaction-item ${transaction.type}`} key={transaction.id}>
        <div style={{display: 'flex', gap: '15px'}}>
            <p>Transaction Type: {transaction.type}</p>
            <p>Transaction Amount: {transaction.amount}</p>
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
            <p>Transaction Budget: { transaction.budget}</p>
            <p>Transaction Category: { transaction.category}</p>
        </div>
        <p>Transaction Date: {new Date(transaction?.date).toLocaleDateString()}</p>
    </div >)
}

export default TransactionListItem;