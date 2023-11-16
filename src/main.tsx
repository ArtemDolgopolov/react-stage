import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import NotFoundPage from './components/404Page';
import './index.css';
import { AppStateProvider } from './components/AppStateContext';
import { Provider } from 'react-redux'; // Add this import
import store from './redux/store'; // Adjust the import path as needed

if (!window.location.search) {
  window.history.replaceState({}, '', '?page=1');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppStateProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppStateProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
