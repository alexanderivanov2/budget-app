import { useState } from 'react';
import s from './Sidebar.module.scss';
import ThemeToggle from '../../ui/ThemeToggle';
import SidebarDesktopNavigation from './SidebarDesktopNavigation';
import { ChevronsLeft, ChevronsRight, DollarSign } from 'react-feather';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${s.sidebar} ${isOpen ? s['sidebar-open'] : s['sidebar-close']}`}>
            <h1 className={s['sidebar-title']}> {isOpen ? 'Finance' : <DollarSign size={30} />}</h1>
            <SidebarDesktopNavigation open={isOpen} />
            <div className={s['sidebar-bottom']}>
                <div className={`s['theme-switch'] sidebar-theme-switch`}>
                    <ThemeToggle text="Switch" />
                </div>
                <button
                    className={`${s['sidebar-menu-size-btn']} ${isOpen ? '' : s['close']}`}
                    onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
                >
                    {isOpen ? <ChevronsLeft size={26} /> : <ChevronsRight size={30} />}
                    <p className={s['open-text']}>Minimize</p>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
