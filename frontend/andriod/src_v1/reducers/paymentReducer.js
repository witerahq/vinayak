// paymentReducer.js

import { CREATE_PAYMENT, GET_PAYMENTS } from '../actions/paymentActions';

// Initial state
const initialState = {
  payments: null,
};

// Reducer function
export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT:
      return {
        ...state,
        payments: [...state?.payments, action.payload],
      };

    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      };

    default:
      return state;
  }
};
