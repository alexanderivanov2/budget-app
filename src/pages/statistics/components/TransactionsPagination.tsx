import { useEffect, useState } from "react";
import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "../hooks/useExtractAllTransactions";

const TRANSACTIONS_PER_PAGE = 10;

const TransactionsPagination: React.FC = () => {
    const { transactions, transactionsCount } = useDataContext();
    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(transactionsCount / TRANSACTIONS_PER_PAGE);
    const initialDate = getYearMonthDay(new Date());
    const extractionCountStep = TRANSACTIONS_PER_PAGE * 2;
    const { extractedData, collectNewExtractData } = useExtractAllTransactions(initialDate, extractionCountStep);
    const startIndexPageTransactions = currentPage  === 1 ? 0  : ((currentPage - 1 ) * 10);
    const currentPageTransactions = [...extractedData.slice(startIndexPageTransactions, startIndexPageTransactions + 10)];

    useEffect(() => {
        const currentPageCount = currentPage * 10;
        if (extractedData.length - currentPageCount <= 10) {
            collectNewExtractData();
        }
    }, [currentPage])
    return (<div>
        <h2>PAGINATION LIST</h2>
        <p>Transactions Count: {transactionsCount}</p>
        <p>Current Page {currentPage}</p>
        <p>PAGE COUNT: {pageCount} </p>
        { currentPageTransactions.map((transaction, i) => {
            return (
                <div key={transaction.id}>
                    <p>{i + 1 + ((currentPage - 1) * 10)}: {transactions[transaction.id].id}</p>
                </div>
            )
        })}
        <div>
            { currentPage > 1 && <button onClick={() => setCurrentPage(prev => prev - 1)}> { currentPage - 1 } </button>}
            <button >{currentPage}</button>
            { currentPage < pageCount && <button onClick={() => setCurrentPage(prev => prev + 1)}>{currentPage + 1}</button>}
        </div>
    </div>)
}

export default TransactionsPagination;