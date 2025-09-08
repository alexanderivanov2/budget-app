import { Outlet } from 'react-router-dom';

const TransactionsPage = () => {
    return (
        <div className="transactions">
            <Outlet />
        </div>
    );
};

export default TransactionsPage;
