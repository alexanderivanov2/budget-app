import { useEffect, useRef } from "react";
import { useDataContext } from "../../../context/DataContext";
import { getYearMonthDay } from "../../../utils/dateUtils";
import useExtractAllTransactions from "../hooks/useExtractAllTransactions";
import TransactionListItem from "./TransactionListItem";

const ROOT_MARGIN = 200;

const TransactionsInifiniteScroll: React.FC = () => {
    const infiniteScrollContainer = useRef<HTMLDivElement>(null);
    const sentielRef = useRef<HTMLDivElement>(null);
    const { transactions, initialDate } = useDataContext();
    const yearMonthDayDate = getYearMonthDay(initialDate);
    const { extractedData, collectNewExtractData, hasMore } = useExtractAllTransactions(yearMonthDayDate, 10);
    const extractedLength = extractedData.length;

    useEffect(() => {
        const root = infiniteScrollContainer.current;
        const target = sentielRef.current;

        if (!root || !target) return;

        const io = new IntersectionObserver(([entry]) => {
            console.log('Target Intersection');
            if (infiniteScrollContainer.current && entry.isIntersecting && hasMore) {
                collectNewExtractData();
            }
        }, { root, rootMargin: `${ROOT_MARGIN}px` }
        );

        console.log('Observer Connect')
        io.observe(target);
        return () =>  { 
            console.log('Observer Disconnect')
            io.unobserve(target); 
        }
    }, [])

    useEffect(() => {
        const container = infiniteScrollContainer.current;
        if (!container) return;

        let cancelled = false;

        if (container.scrollHeight > container.clientHeight  + 200 || !hasMore) return;

        const fillPooling = () => {
            if (cancelled) return;

            if (container.scrollHeight > container.clientHeight + 200 || !hasMore) return;
            console.log('fill pooling')
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
        <div className="infinite-scroll-container"
            ref={infiniteScrollContainer}
            style={{
                height: 'calc(100vh - 200px)',
                overflowY: 'scroll',
                border: '1px solid purple',
            }}
        >
            <div className="infinite-scroll-wrapper" ref={null}>
                {extractedData.map((data) => {
                    return <TransactionListItem data={transactions[data.id]} key={data.id} />
                })}
                {hasMore ? <div ref={sentielRef}></div> : <div>NO MORE DATA </div>}

            </div>
        </div>
    </div>)
}

export default TransactionsInifiniteScroll;