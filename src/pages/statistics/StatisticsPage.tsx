import { useState } from 'react';
import TransactionList from './components/TransactionsList';
import TransactionsPagination from './components/TransactionsPagination';
import TransactionsInifiniteScroll from './components/TransactionsInfiniteScroll';

export const StatisticsPage = () => {
  const [transactionsVariant, setTransactionsVariant] = useState('list');

  const changeTransactionsVariant = (variant: string) => {
    setTransactionsVariant(variant);
  }

  return (
    <div className='statistics'>
      <h2>
        StatisticsPage
      </h2>
      <div style={{ display: 'flex' }}> <button onClick={() => changeTransactionsVariant('list')}>List</button> <button onClick={() => changeTransactionsVariant('pagination')}>Pagination</button>  <button onClick={() => changeTransactionsVariant('infinite')}>Infinite</button></div>
      {transactionsVariant === 'list' ? <TransactionList /> : transactionsVariant === 'pagination' ? <TransactionsPagination /> : <TransactionsInifiniteScroll />}
    </div>
  )
}
