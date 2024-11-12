// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Auth from './Auth';
// import Vehicles from './Vehicles';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <Auth /> */}
//     {/* <Sidebar /> */}
//     {/* <Header /> */}
//     {/* <Vehicles /> */}
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);