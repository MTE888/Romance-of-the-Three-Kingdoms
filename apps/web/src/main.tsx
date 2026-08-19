/**
 * Application Entry Point
 *
 * Initializes i18n before rendering the React application.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import i18n configuration - must be imported before App
import './lib/i18n';

import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
