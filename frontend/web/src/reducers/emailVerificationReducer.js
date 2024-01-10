// reducers/emailVerificationReducer.js

import { VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_ERROR } from '../actions/emailVerificationActions';

const initialState = {
  emailVerified: false,
  successMessage: '',
  errorMessage: '',
};

const emailVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true,
        successMessage: 'Email verification successful!',
        errorMessage: '',
      };
    case VERIFY_EMAIL_ERROR:
      return {
        ...state,
        emailVerified: false,
        successMessage: '',
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default emailVerificationReducer;