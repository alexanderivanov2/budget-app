import VirtualizedList from '../../../components/virtualizedList/VirtualizedList';
import { useDataContext } from '../../../context/DataContext';
import { getYearMonthDay } from '../../../utils/dateUtils';
import useExtractAllTransactions from '../hooks/useExtractAllTransactions';
import TransactionListItem from '../../../features/transactionLists/components/TransactionListItem';

type Props = {
    transactionType: 'all' | 'income' | 'expense';
};

const TransactionList: React.FC<Props> = ({ transactionType }) => {
    const { transactions, transactionsCount, expenseCount, incomeCount } = useDataContext();
    const initialDate = getYearMonthDay(new Date());
    const { extractedData, dateCursor, collectNewExtractData, hasMore } = useExtractAllTransactions(
        initialDate,
        20,
        true,
        transactionType,
    );

    return (
        <div className="statistics-transactions-list">
            <h3>TRANSACTIONS LIST</h3>
            {extractedData.length ? (
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
                {Object.keys(transactions).length} === {extractedData.length}
            </p>
            {Object.keys(transactions).length === extractedData.length ? (
                <p>'NO MORE'</p>
            ) : (
                <button onClick={collectNewExtractData}>NEW LIST</button>
            )}
        </div>
    );
};

export default TransactionList;
