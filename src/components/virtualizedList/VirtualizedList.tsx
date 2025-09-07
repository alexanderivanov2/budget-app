import { useEffect, useRef, useState, type JSX, type UIEvent } from "react";
import type { TransferData } from "../../context/types/DataContextTypes";

interface Props {
    itemHeight: number;
    windowHeight: number;
    overscan: number;
    data: any[];
    transactions: Record<string, TransferData>;
    component: React.ElementType;
    children?: React.ReactNode;
    ref?: React.RefObject<HTMLDivElement | null>;
}

const VirtualizedList: React.FC<Props> = ({
    itemHeight,
    windowHeight,
    overscan,
    data,
    transactions,
    component: ListComponent,
    children,
    ref,
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const rafIdRef = useRef<number>(null);
    const startIndex = Math.max(0, Math.floor((scrollTop / itemHeight) - overscan))
    let renderedNodes = Math.floor(Number(windowHeight) / itemHeight) + 2 * overscan;
    renderedNodes = Math.min(data.length - startIndex, renderedNodes)

    const generateListItem = () => {
        let items: JSX.Element[] = [];

        for (let index = 0; index < renderedNodes; index++) {
            const i = index + startIndex;
            if (transactions[data[i]?.id]) {
                items.push(<ListComponent key={(data[i]?.id) ?? i} data={transactions[data[i].id]} />)
            }
        }

        return items
    }

    useEffect(() => {
        if (ref) {
            ref.current = scrollContainerRef.current;
        };
    }, [])

    const onScroll = (e: UIEvent) => {
        const eventScrollTop = e.currentTarget?.scrollTop;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => setScrollTop(eventScrollTop));
    }

    return (
        <>
            <p>{scrollTop}</p>
            <p>Start Index: {startIndex} </p>
            <div style={{
                overflowY: 'scroll',
                width: '100%',
                border: '1px solid green',
                height: `${windowHeight}px`,
            }}
                onScroll={onScroll}
                ref={scrollContainerRef}
            >
                <div style={{ height: `${(data.length - overscan) * itemHeight}px` }}>
                    <div style={{
                        transform: `translateY(${startIndex * itemHeight}px)`,
                        willChange: 'transform',
                        padding: '5px 3px',
                    }}>
                        {generateListItem()}
                        {children && children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VirtualizedList;