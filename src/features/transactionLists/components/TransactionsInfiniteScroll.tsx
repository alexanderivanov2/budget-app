import { useEffect, useRef } from "react";
import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "../hooks/useExtractAllTransactions";
import TransactionListItem from "./TransactionListItem";
import VirtualizedList from "../../../components/virtualizedList/VirtualizedList";

const ROOT_MARGIN = 200;

const TransactionsInifiniteScroll: React.FC = () => {
    const infiniteScrollContainer = useRef<HTMLDivElement>(null);
    const sentielRef = useRef<HTMLDivElement>(null);
    const { transactions, initialDate } = useDataContext();
    const yearMonthDayDate = getYearMonthDay(initialDate);
    const { extractedData, collectNewExtractData, hasMore } = useExtractAllTransactions(yearMonthDayDate, 10);
    const extractedLength = extractedData.length;

    useEffect(() => {
        const target = sentielRef.current;
        const root = infiniteScrollContainer.current;

        if (!root || !target) return;

        const io = new IntersectionObserver(([entry]) => {
            if (infiniteScrollContainer.current && entry.isIntersecting && hasMore) {
                collectNewExtractData();
            }
        }, { root, rootMargin: `${ROOT_MARGIN}px` }
        );

        io.observe(target);
        return () => {
            io.unobserve(target);
        }
    }, [])

    useEffect(() => {
        const container = sentielRef.current?.parentElement;
        if (!container) return;

        let cancelled = false;

        if (container.scrollHeight >= container.clientHeight || !hasMore) return;
        const fillPooling = () => {
            if (cancelled) return;
            if (container.scrollHeight >= container.clientHeight || !hasMore) return;
            collectNewExtractData();

            setTimeout(fillPooling, 0);
        }

        fillPooling();

        return () => {
            cancelled = true;
        }
    },
        [hasMore, extractedData, infiniteScrollContainer.current?.scrollHeight, infiniteScrollContainer.current?.clientHeight]);


    return (<div className="transactions-infinite-scroll">
        <h2>Infinite Scroll</h2>
        <p>LOADED LENGTH: {extractedLength}</p>
        <VirtualizedList data={extractedData} component={TransactionListItem} transactions={transactions} overscan={8} windowHeight={500} itemHeight={66} ref={infiniteScrollContainer}>
            {hasMore ? <div ref={sentielRef}></div> : <div>NO MORE DATA </div>}
        </VirtualizedList>
    </div>)
}

export default TransactionsInifiniteScroll;