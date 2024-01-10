import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import { checkUserSession } from './actions/authActions';
import { checkUserAppointment } from './actions/appointmentActions';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(checkUserSession());
store.dispatch(checkUserAppointment());


root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>
);