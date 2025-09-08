import s from './Sidebar.module.scss';
import { PieChart, PlusSquare, MinusSquare, Layout, TrendingUp } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';

const ICON_SIZE = 26;
const SIDEBAR_LINKS = [
    {
        to: '/',
        title: 'Dashboard',
        Icon: <Layout size={ICON_SIZE} />,
    },
    {
        to: '/transactions',
        title: 'Transactions',
        Icon: <TrendingUp size={ICON_SIZE} />,
    },
    {
        to: '/transactions/income',
        title: 'Income',
        Icon: <PlusSquare size={ICON_SIZE} />,
    },
    {
        to: '/transactions/expenses',
        title: 'Expenses',
        Icon: <MinusSquare size={ICON_SIZE} />,
    },
    {
        to: '/statistics',
        title: 'Statistics',
        Icon: <PieChart size={ICON_SIZE} />,
    },
];

interface Props {
    open: boolean;
}

const SidebarDesktopNavigation: React.FC<Props> = ({ open }) => {
    const { pathname } = useLocation();
    return (
        <nav className={s['sidebar-navigation']}>
            <ul className={`${s['sidebar-nav-list']} ${open ? '' : s['close']}`}>
                {SIDEBAR_LINKS.map(({ to, title, Icon }) => {
                    return (
                        <li
                            key={title}
                            className={`${s['sidebar-nav-item']} sidebar-nav-item-${title} ${to === pathname ? s['active'] : ''} `}
                        >
                            <Link to={to}>
                                <div className={s['sidebar-nav-item-icon-wrapper']}>{Icon}</div>
                                <p className={open ? s['open'] : s['close']}>{title}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default SidebarDesktopNavigation;
