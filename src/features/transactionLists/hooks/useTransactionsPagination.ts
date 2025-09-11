import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { getYearMonthDay } from '../../../utils/dateUtils';
import useExtractAllTransactions from './useExtractAllTransactions';

const TRANSACTIONS_PER_PAGE = 10;

const useTransactionsPagination = (transactionType: 'all' | 'income' | 'expense' = 'all') => {
    const { transactions, transactionsCount, expenseCount, incomeCount, initialDate } =
        useDataContext();

    const [currentPage, setCurrentPage] = useState(1);

    const startDate = getYearMonthDay(initialDate);
    const extractionCountStep = TRANSACTIONS_PER_PAGE * 2;
    const { extractedData, hasMore, extractedCount, collectNewExtractData, hasInitialExtraction } =
        useExtractAllTransactions(startDate, extractionCountStep, false, transactionType);

    const startIndexPageTransactions =
        currentPage === 1 ? 0 : (currentPage - 1) * TRANSACTIONS_PER_PAGE;
    const currentPageTransactions = extractedData.slice(
        startIndexPageTransactions,
        startIndexPageTransactions + TRANSACTIONS_PER_PAGE,
    );

    const itemsCount =
        transactionType === 'all'
            ? transactionsCount
            : transactionType === 'income'
              ? incomeCount
              : expenseCount;

    const pageCount = Math.ceil(itemsCount / TRANSACTIONS_PER_PAGE);

    useEffect(() => {
        if (hasInitialExtraction.current) return;

        const dataCount = extractedCount - (currentPage + 1) * TRANSACTIONS_PER_PAGE;
        if (hasMore && dataCount < 0) {
            collectNewExtractData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return {
        count: itemsCount,
        currentPage,
        pageCount,
        currentPageTransactions,
        transactions,
        extractedData,
        setCurrentPage,
    };
};

export default useTransactionsPagination;
