import VirtualizedList from '../../../components/virtualizedList/VirtualizedList';
import { useDataContext } from '../../../context/DataContext';
import useExtractAllTransactions from '../hooks/useExtractAllTransactions';
import TransactionListItem from '../../../features/transactionLists/components/TransactionListItem';

type Props = {
    transactionType: 'all' | 'income' | 'expense';
};

const TransactionList: React.FC<Props> = ({ transactionType }) => {
    const { transactions } = useDataContext();
    const { extractedData, collectNewExtractData, hasMore } = useExtractAllTransactions(
        20,
        true,
        transactionType,
    );

    const extractedCount = extractedData.length;

    const handleCollectMore = () => {
        collectNewExtractData();
    };
    return (
        <div className="statistics-transactions-list">
            <h3>TRANSACTIONS LIST</h3>
            {extractedCount || hasMore ? (
                <VirtualizedList
                    itemHeight={80}
                    windowHeight={500}
                    component={TransactionListItem}
                    transactions={transactions}
                    data={extractedData}
                    overscan={8}
                >
                    {hasMore ? (
                        <button onClick={handleCollectMore}>NEW LIST</button>
                    ) : (
                        <p>'NO MORE'</p>
                    )}
                </VirtualizedList>
            ) : (
                'No Data'
            )}
        </div>
    );
};

export default TransactionList;
