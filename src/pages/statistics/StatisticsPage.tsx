import { useState } from 'react';
import TransactionList from '../../features/transactionLists/components/TransactionsList';
import TransactionsPagination from '../../features/transactionLists/components/TransactionsPagination';
import TransactionsInifiniteScroll from '../../features/transactionLists/components/TransactionsInfiniteScroll';
import TimeFrameDropdown from '../../features/timeframe/components/TimeFrameDropdown';
import TimeFrameProvider, {
    useTimeFrameContext,
} from '../../features/timeframe/components/TimeFrameContext';

export const StatisticsPage = () => {
    const [transactionsVariant, setTransactionsVariant] = useState('list');
    const [transactionsType, setTransactionsType] = useState<'all' | 'income' | 'expense'>('all');

    const { timeFrameType, timeFrameDispatch } = useTimeFrameContext();
    const changeTransactionsVariant = (variant: string) => {
        setTransactionsVariant(variant);
    };

    const changeTransactionsType = (type: 'all' | 'income' | 'expense') => {
        setTransactionsType(type);
    };

    return (
        <div className="statistics">
            <h2>StatisticsPage</h2>
            <div style={{ display: 'flex', gap: '5px' }}>
                <span>Variant: </span>
                <button onClick={() => changeTransactionsVariant('list')}>List</button>
                <button onClick={() => changeTransactionsVariant('pagination')}>Pagination</button>
                <button onClick={() => changeTransactionsVariant('infinite')}>Infinite</button>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
                <span>Type: </span>
                <button onClick={() => changeTransactionsType('all')}>All</button>
                <button onClick={() => changeTransactionsType('income')}>Income</button>
                <button onClick={() => changeTransactionsType('expense')}>Expense</button>
            </div>
            <TimeFrameDropdown />:{timeFrameType}
            <button
                onClick={() => timeFrameDispatch({ type: 'setTimeFrameType', payload: 'month' })}
            >
                change to month
            </button>
            {transactionsVariant === 'list' ? (
                <TransactionList transactionType={transactionsType} key={transactionsType} />
            ) : transactionsVariant === 'pagination' ? (
                <TransactionsPagination transactionType={transactionsType} key={transactionsType} />
            ) : (
                <TransactionsInifiniteScroll
                    transactionType={transactionsType}
                    key={transactionsType}
                />
            )}
        </div>
    );
};
