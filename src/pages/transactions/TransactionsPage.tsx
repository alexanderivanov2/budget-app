import { Link, Outlet, useLocation } from 'react-router-dom'
import s from './TransactionPage.module.scss';
import useDeviceMediaQuery from '../../hooks/useDeviceMediaQuery';

const TransactionsPage = () => {
  const { pathname } = useLocation();
  const { isMobile } = useDeviceMediaQuery();
  return (
    <div className={s.transactions}>
      {isMobile &&
        <div className={s['transactions-navigation']}>
          <Link to="income" className={`${pathname.includes('income') ? s.active : ''}`}>Income</Link>
          <Link to="expenses" className={`${pathname.includes('expenses') ? s.active : ''}`}>Expense</Link>
        </div>
      }
      <Outlet />
    </div>
  )
}

export default TransactionsPage;