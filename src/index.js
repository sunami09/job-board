// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { ToastProvider } from "./ToastContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
