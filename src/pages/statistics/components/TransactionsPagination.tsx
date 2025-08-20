import useTransactionsPagination from "../hooks/useTransactionsPagination";
import TransactionListItem from "./TransactionListItem";



const TransactionsPagination: React.FC = () => {
    const {transactionsCount, pageCount, currentPage, currentPageTransactions, transactions, setCurrentPage} = useTransactionsPagination();
    return (<div>
        <h2>PAGINATION LIST</h2>
        <p>Transactions Count: {transactionsCount}</p>
        <p>Current Page {currentPage}</p>
        <p>PAGE COUNT: {pageCount} </p>
        { currentPageTransactions.map((transaction, _) => {
            return (
                <TransactionListItem key={transaction.id} transaction={transactions[transaction.id]} />
            )
        })}
        <div>
            { currentPage > 1 && <button onClick={() => setCurrentPage(prev => prev - 1)}> { currentPage - 1 } </button>}
            <button style={{
                color: 'purple'
            }}>{currentPage}</button>
            { currentPage < pageCount && <button onClick={() => setCurrentPage(prev => prev + 1)}>{currentPage + 1}</button>}
        </div>
    </div>)
}

export default TransactionsPagination;