import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "../hooks/useExtractAllTransactions";
import TransactionListItem from "./TransactionListItem";

const TransactionList: React.FC = () => {
    const { transactions } = useDataContext();
    const initialDate = getYearMonthDay(new Date());
    const { extractedData, dateCursor, collectNewExtractData } = useExtractAllTransactions(initialDate);

    return (
        <div className="statistics-transactions-list">
            <h3>TRANSACTIONS LIST</h3>

            <div>
                {extractedData.map(({ id }) => {
                    const transaction = transactions[id]
                    return <TransactionListItem transaction={transaction} key={id} />
                })}
            </div>
            <div>
                <p>{dateCursor.current.year}-{dateCursor.current.month}-{dateCursor.current.day}</p>
            </div>
            <p>{Object.keys(transactions).length} === {extractedData.length}</p>
            {Object.keys(transactions).length === extractedData.length ? <p>'NO MORE'</p> :
                <button onClick={collectNewExtractData}>NEW LIST</button>
            }
        </div>
    )
}

export default TransactionList;