import { useState, type JSX } from "react";
import type { TransferData } from "../../context/types/DataContextTypes";

interface Props {
    itemHeight: number;
    windowHeight: number;
    overscan: number;
    data: any[];
    transactions: Record<string, TransferData>;
    component: React.ElementType;
}

const VirtualizedList: React.FC<Props> = ({
    itemHeight,
    windowHeight,
    overscan,
    data,
    transactions,
    component: ListComponent,
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.max(0, Math.floor((scrollTop / itemHeight) - overscan))
    let renderedNodes = Math.floor(windowHeight / itemHeight) + 2 * overscan;
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

    return (
        <>
            <p>{scrollTop}</p>
            <p>{startIndex} </p>
            <div style={{
                overflowY: 'scroll',
                width: '100%',
                border: '1px solid green',
                height: `${windowHeight}px`,

                // position: "relative",
            }}
                onScroll={(e) => {
                    setScrollTop(e.currentTarget.scrollTop);
                }}
            >
                <div style={{ height: `${renderedNodes * itemHeight}px` }}>
                    <div style={{
                        transform: `translateY(${startIndex * itemHeight}px)`,
                        padding: '5px 3px'
                    }}>
                        {generateListItem()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VirtualizedList;