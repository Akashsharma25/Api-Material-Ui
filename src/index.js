import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Update to use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
