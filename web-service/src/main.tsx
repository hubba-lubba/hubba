import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    ChakraProvider,
    extendTheme,
    type ThemeConfig,
} from '@chakra-ui/react';
import { initializeApp } from "firebase/app";

import './main.css';
import App from './App';

// Custom colors
const THEME: ThemeConfig = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'hubba.900',
                color: 'hubba.100',
            },
        },
    },
    colors: {
        hubba: {
            '100': '#E9E4FC',
            '500': '#B59BFF',
            '800': '#30313F',
            '900': '#100E22',
        },
    },
});

const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
initializeApp(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={THEME}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
);
