import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import './styles/index.scss';
import DataProvider from './context/DataContext';
import ThemeProvider from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DataProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </DataProvider>
    </StrictMode>,
);
