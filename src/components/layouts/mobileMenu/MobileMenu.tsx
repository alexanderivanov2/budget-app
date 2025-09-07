import { Layout, PieChart, TrendingUp } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../../ui/ThemeToggle";
import s from './MobileMenu.module.scss';

const ICON_SIZE = 24;

const MOBILE_NAV = [
  {
    to: '/',
    title: 'Dashboard',
    icon: <Layout size={ICON_SIZE} />
  },
  {
    to: '/transactions',
    title: 'Transactions',
    icon: <TrendingUp size={ICON_SIZE} />
  },
  {
    to: '/statistics',
    title: 'Statistics',
    icon: <PieChart size={ICON_SIZE} />
  },
]

export const MobileMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className={s['mobile-menu']}>
      <nav className={s['mobile-nav']}>
        {MOBILE_NAV.map(({ to, title, icon }) => {
          return (
            <Link to={to} key={title} className={`${s['mobile-nav-item']} ${to === pathname ? s['active'] : ''}`}>
              {icon}
              <p className={s['mobile-nav-item-title']}>
                {title}
              </p>
            </Link>)
        })}
      </nav>
      <div className="mobile-menu-theme-switch">
        <ThemeToggle text="Switch"/>
      </div>
    </div>
  )
}
