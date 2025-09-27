import { useEffect, useRef, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import useExtractAllTransactions from './useExtractAllTransactions';

const TRANSACTIONS_PER_PAGE = 10;

const useTransactionsPagination = (transactionType: 'all' | 'income' | 'expense' = 'all') => {
    const { transactions } = useDataContext();

    const [currentPage, setCurrentPage] = useState(1);

    const extractionCountStep = TRANSACTIONS_PER_PAGE * 2;
    const { extractedData, hasMore, collectNewExtractData, hasInitialExtraction } =
        useExtractAllTransactions(extractionCountStep, true, transactionType);

    const extractedCount = extractedData.length;

    const startIndexPageTransactions =
        currentPage === 1 ? 0 : (currentPage - 1) * TRANSACTIONS_PER_PAGE;
    const currentPageTransactions = extractedData.slice(
        startIndexPageTransactions,
        startIndexPageTransactions + TRANSACTIONS_PER_PAGE,
    );

    const pageCount = Math.ceil(extractedCount / TRANSACTIONS_PER_PAGE);

    const lockMount = useRef(true);
    useEffect(() => {
        if (hasInitialExtraction.current) return;
        if (lockMount.current) {
            lockMount.current = false;
            return;
        }

        const dataCount = currentPage * TRANSACTIONS_PER_PAGE + TRANSACTIONS_PER_PAGE;
        console.log(extractedData.length);

        if (hasMore && extractedCount < dataCount) {
            console.log('extraction');
            collectNewExtractData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, extractedCount, hasMore]);

    useEffect(() => {
        setCurrentPage(1);
    }, [transactionType]);

    return {
        count: extractedCount,
        currentPage,
        pageCount,
        currentPageTransactions,
        transactions,
        extractedData,
        setCurrentPage,
    };
};

export default useTransactionsPagination;
