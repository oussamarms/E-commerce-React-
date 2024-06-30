import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './Css/components/loading.css';
import './Css/components/botton.css';
import './Css/components/alerts.css';
import "./Pages/Auth/AuthOperations/Auth.css";
import './Css/components/google.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuContext from './Components/Context/MenuContext';
import WindowContext from './Components/Context/WindowContext';
import './custom.css';
import 'react-loading-skeleton/dist/skeleton.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
    <MenuContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MenuContext>
    </WindowContext>
  </React.StrictMode>
);


