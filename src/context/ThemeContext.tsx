import { createContext, useContext, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

type Theme = 'dark' | 'light';

const themeJSONData = localStorage.getItem('theme');
const initialTheme: Theme = themeJSONData ? JSON.parse(themeJSONData) : 'light';
const setBodyThemeClass = (theme: Theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
};

setBodyThemeClass(initialTheme);

const ThemeContext = createContext({
    theme: initialTheme,
    handleThemeChange: () => {},
});

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw Error('ThemeContext must be used within a ThemeProvider');
    }
    return context;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState(initialTheme);
    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', JSON.stringify(newTheme));
        setTheme(newTheme);
    };

    useEffect(() => {
        setBodyThemeClass(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: theme, handleThemeChange: handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
