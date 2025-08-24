import { useEffect, useRef, useState, type UIEvent } from "react";
import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "../hooks/useExtractAllTransactions";
import TransactionListItem from "./TransactionListItem";

const TransactionsInifiniteScroll: React.FC = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const infiniteScrollContainer = useRef<HTMLDivElement>(null);
    const sentielRef = useRef<HTMLDivElement>(null);
    const { transactions, initialDate, transactionsCount } = useDataContext();
    const yearMonthDayDate = getYearMonthDay(initialDate);
    const { extractedData, collectNewExtractData } = useExtractAllTransactions(yearMonthDayDate, 10);
    const hasMore = transactionsCount > extractedData.length;

    const onScroll = (e: UIEvent) => {
        const eventScrollTop = e?.currentTarget?.scrollTop;
        setScrollTop(eventScrollTop);
    }

    useEffect(() => {
        const root = infiniteScrollContainer.current;
        const target = sentielRef.current;

        if (!root || !target) return;

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore) {
                collectNewExtractData();
            }
        }, { root, rootMargin: '200px' }
        );

        io.observe(target);
        return () => io.disconnect();
    }, [hasMore])

    useEffect(() => {
        if (hasMore && infiniteScrollContainer?.current) {
            const scrollHeight = infiniteScrollContainer.current.scrollHeight;
            const containerHeight = infiniteScrollContainer.current?.clientHeight || 0;
            if ((scrollTop + containerHeight) >= scrollHeight) {
                collectNewExtractData();
            }
        }
    }, [scrollTop, hasMore])

    return (<div className="transactions-infinite-scroll">
        <h2>Infinite Scroll</h2>
        <div className="infinite-scroll-container"
            ref={infiniteScrollContainer}
            style={{
                height: '600px',
                overflowY: 'scroll',
                border: '1px solid purple',
            }}
            onScroll={onScroll}
        >
            <div className="infinite-scroll-wrapper">
                {extractedData.map((data) => {
                    return <TransactionListItem data={transactions[data.id]} key={data.id} />
                })}
                {hasMore && <div ref={sentielRef}></div>}
            </div>
        </div>
    </div>)
}

export default TransactionsInifiniteScroll;