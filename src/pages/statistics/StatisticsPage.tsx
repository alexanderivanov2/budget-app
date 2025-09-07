import { useState } from 'react';
import TransactionList from '../../features/transactionLists/components/TransactionsList';
import TransactionsPagination from '../../features/transactionLists/components/TransactionsPagination';
import TransactionsInifiniteScroll from '../../features/transactionLists/components/TransactionsInfiniteScroll';

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
