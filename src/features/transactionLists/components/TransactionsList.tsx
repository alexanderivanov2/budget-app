import VirtualizedList from '../../../components/virtualizedList/VirtualizedList';
import { useDataContext } from '../../../context/DataContext';
import { getYearMonthDay } from '../../../utils/dateUtils';
import useExtractAllTransactions from '../hooks/useExtractAllTransactions';
import TransactionListItem from '../../../features/transactionLists/components/TransactionListItem';

type Props = {
    transactionType: 'all' | 'income' | 'expense';
};

const TransactionList: React.FC<Props> = ({ transactionType }) => {
    const { transactions } = useDataContext();
    const initialDate = getYearMonthDay(new Date());
    const {
        extractedData,
        dateCursor,
        collectNewExtractData,
        hasMore,
        extractedTypeCount,
        extractedCount,
    } = useExtractAllTransactions(initialDate, 20, true, transactionType);

    return (
        <div className="statistics-transactions-list">
            <h3>TRANSACTIONS LIST</h3>
            {extractedCount ? (
                <VirtualizedList
                    itemHeight={80}
                    windowHeight={500}
                    component={TransactionListItem}
                    transactions={transactions}
                    data={extractedData}
                    overscan={8}
                />
            ) : (
                'No Data'
            )}
            <div>
                <p>
                    {dateCursor.current.year}-{dateCursor.current.month}-{dateCursor.current.day}
                </p>
            </div>
            <p>
                {extractedTypeCount} === {extractedCount}
            </p>
            {hasMore ? <button onClick={collectNewExtractData}>NEW LIST</button> : <p>'NO MORE'</p>}
        </div>
    );
};

export default TransactionList;
