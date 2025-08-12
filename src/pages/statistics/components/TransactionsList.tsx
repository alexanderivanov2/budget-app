import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "../hooks/useExtractAllTransactions";

const TransactionList: React.FC = () => {
    const { transactions } = useDataContext();
    const initialDate = getYearMonthDay(new Date());
    const { extractedData, dateCursor, collectNewExtractData } = useExtractAllTransactions(initialDate);


    return (
        <div className="statistics-transactions-list">
            <h3>TRANSACTIONS LIST</h3>
            <div>
                <p>{dateCursor.current.year}-{dateCursor.current.month}-{dateCursor.current.day}</p>
            </div>
            <div>
                {extractedData.map((data, i) => <div key={data.id}>#{i} = {data.id}: {new Date(data.date).toLocaleDateString()}</div>)}
            </div>
            <p>{Object.keys(transactions).length} === {extractedData.length}</p>
            {Object.keys(transactions).length === extractedData.length ? <p>'NO MORE'</p> :
                <button onClick={collectNewExtractData}>NEW LIST</button>
            }
        </div>
    )
}

export default TransactionList;