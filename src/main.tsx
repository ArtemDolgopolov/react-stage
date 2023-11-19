import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import NotFoundPage from './components/404Page';
import Modal from 'react-modal';
import './index.css';
import { AppStateProvider } from './components/AppStateContext';
import { Provider } from 'react-redux';
import store from './redux/store';

if (!window.location.search) {
  window.history.replaceState({}, '', '?page=1');
}

Modal.setAppElement('#root');

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
