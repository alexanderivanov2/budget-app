import { useEffect, useRef } from 'react';
import { useDataContext } from '../../../context/DataContext';
import useExtractAllTransactions from '../hooks/useExtractAllTransactions';
import TransactionListItem from './TransactionListItem';
import VirtualizedList from '../../../components/virtualizedList/VirtualizedList';

const ROOT_MARGIN = 200;
const EXTRACT_PER_PAGE = 10;

type Props = {
    transactionType: 'all' | 'income' | 'expense';
};

const TransactionsInifiniteScroll: React.FC<Props> = ({ transactionType }) => {
    const infiniteScrollContainer = useRef<HTMLDivElement>(null);
    const sentielRef = useRef<HTMLDivElement>(null);
    const { transactions } = useDataContext();
    const { extractedData, collectNewExtractData, hasMore } = useExtractAllTransactions(
        EXTRACT_PER_PAGE,
        false,
        transactionType,
    );

    useEffect(() => {
        const target = sentielRef.current;
        const root = infiniteScrollContainer.current;

        if (!root || !target) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (infiniteScrollContainer.current && entry.isIntersecting && hasMore) {
                    collectNewExtractData();
                }
            },
            { root, rootMargin: `${ROOT_MARGIN}px` },
        );

        io.observe(target);
        return () => {
            io.unobserve(target);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="transactions-infinite-scroll">
            <h2>Infinite Scroll</h2>
            <VirtualizedList
                data={extractedData}
                component={TransactionListItem}
                transactions={transactions}
                overscan={8}
                windowHeight={500}
                itemHeight={66}
                ref={infiniteScrollContainer}
            >
                {hasMore ? <div ref={sentielRef} /> : <div>NO MORE DATA </div>}
            </VirtualizedList>
        </div>
    );
};

export default TransactionsInifiniteScroll;
