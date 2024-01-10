// paymentActions.js

import axios from '../service/apiService';

// Action Types
export const CREATE_PAYMENT = 'CREATE_PAYMENT';
export const GET_PAYMENTS = 'GET_PAYMENTS';

// Async action creator to create a payment
export const createPayment = (paymentData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/payments', paymentData);
    const newPayment = response.data;

    dispatch({
      type: CREATE_PAYMENT,
      payload: [newPayment],
    });
  } catch (error) {
    console.error(error);
    // Handle the error and dispatch an error action if needed
  }
};

// Async action creator to get payments
export const getPayments = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/payments`);
    const payments = response.data;

    dispatch({
      type: GET_PAYMENTS,
      payload: payments,
    });
  } catch (error) {
    console.error(error);
    // Handle the error and dispatch an error action if needed
  }
};
