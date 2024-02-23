import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './sass/style.scss';
import './index.scss';
import App from './App';

const themeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4b5bc2',
            light: '#6ecbf6',
            dark: '#bb51e2',
        },
        secondary: {
            main: '#f50057',
        },
        text: {
            primary: '#dad5fd',
            secondary: '#dad5fd',
        },
        background: {
            default: '#1a1635',
            paper: '#33295D',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={themeOptions}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
