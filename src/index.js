import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './App';
import FerryPage from './SecondPage';
import App from './components/test';
import HeaderNonLogin from './components/headernonlogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Home />
    // <FerryPage />
    // <App />
    <HeaderNonLogin />
);

