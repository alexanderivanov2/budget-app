import useTransactionsPagination from '../hooks/useTransactionsPagination';
import TransactionListItem from './TransactionListItem';

type Props = {
    transactionType: 'all' | 'income' | 'expense';
};

const TransactionsPagination: React.FC<Props> = ({ transactionType }) => {
    const { pageCount, currentPage, currentPageTransactions, transactions, setCurrentPage } =
        useTransactionsPagination(transactionType);
    return (
        <div>
            <h2>PAGINATION LIST</h2>
            {currentPageTransactions.map((transaction) => {
                return (
                    <TransactionListItem key={transaction.id} data={transactions[transaction.id]} />
                );
            })}
            <div>
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage((prev) => prev - 1)}>
                        {' '}
                        {currentPage - 1}{' '}
                    </button>
                )}
                <button
                    style={{
                        color: 'purple',
                    }}
                >
                    {currentPage}
                </button>
                {currentPage < pageCount && (
                    <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                        {currentPage + 1}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransactionsPagination;
