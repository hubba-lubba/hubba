import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';

import './main.css';
import App from './App';

const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
initializeApp(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
