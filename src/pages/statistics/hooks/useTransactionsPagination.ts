import { useEffect, useState } from "react";
import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "./useExtractAllTransactions";

const TRANSACTIONS_PER_PAGE = 10;

const useTransactionsPagination = () => {
    const { transactions, transactionsCount, initialDate } = useDataContext();

    const [currentPage, setCurrentPage] = useState(1);

    const startDate = getYearMonthDay(initialDate);
    const extractionCountStep = TRANSACTIONS_PER_PAGE * 2;
    const { extractedData, collectNewExtractData } = useExtractAllTransactions(startDate, extractionCountStep);
    
    const startIndexPageTransactions = currentPage === 1 ? 0 : ((currentPage - 1) * TRANSACTIONS_PER_PAGE);
    const currentPageTransactions = extractedData.slice(startIndexPageTransactions, startIndexPageTransactions + TRANSACTIONS_PER_PAGE);
    
    const pageCount = Math.ceil(transactionsCount / TRANSACTIONS_PER_PAGE);

    useEffect(() => {
        const currentPageCount = currentPage * TRANSACTIONS_PER_PAGE;
        if (extractedData.length - currentPageCount <= TRANSACTIONS_PER_PAGE) {
            collectNewExtractData();
        }
    }, [currentPage, extractedData.length, collectNewExtractData]);

    return {
        transactionsCount,
        currentPage,
        pageCount,
        currentPageTransactions,
        transactions,
        setCurrentPage
    }
}

export default useTransactionsPagination;