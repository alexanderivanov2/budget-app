import { createBrowserRouter } from 'react-router-dom';
import NotExist from './NotExist';
import { UserPage } from '../pages/user/UserPage';
import { Dashboard } from '../components/layouts/dashboard/Dashboard';
import TransactionsPage from '../pages/transactions/TransactionsPage';
import IncomePage from '../pages/transactions//IncomePage';
import ExpensePage from '../pages/transactions/ExpensePage';
import { StatisticsPage } from '../pages/statistics/StatisticsPage';
import TimeFrameProvider from '../features/timeframe/components/TimeFrameContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserPage />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: '/transactions',
                element: <TransactionsPage />,
                children: [
                    {
                        path: 'income',
                        element: <IncomePage />,
                    },
                    {
                        path: 'expenses',
                        element: <ExpensePage />,
                    },
                ],
            },
            {
                path: '/statistics',
                // element: <StatisticsPage />,
                element: (
                    <TimeFrameProvider>
                        <StatisticsPage />
                    </TimeFrameProvider>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <NotExist />,
    },
]);

export default router;
