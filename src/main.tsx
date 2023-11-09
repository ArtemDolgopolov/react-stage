import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { AppStateProvider } from './components/AppStateContext';

if (!window.location.search) {
  window.history.replaceState({}, '', '?page=1');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </Router>
  </React.StrictMode>
);
