import { useThemeContext } from '../../context/ThemeContext';
import { Moon, Sun } from 'react-feather';

interface Props {
    text?: string;
}

const ThemeToggle: React.FC<Props> = ({ text }) => {
    const { theme, handleThemeChange } = useThemeContext();
    return (
        <button className="theme-switch" onClick={handleThemeChange}>
            {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
            {text ? <p className="theme-switch-text">{text}</p> : ''}
        </button>
    );
};

export default ThemeToggle;
