// actions/emailVerificationActions.js

import axios from 'axios';

export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';

export const verifyEmailSuccess = () => ({ type: VERIFY_EMAIL_SUCCESS });
export const verifyEmailError = (message) => ({ type: VERIFY_EMAIL_ERROR, payload: message });

export const verifyEmail = (verificationData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/email/verify', verificationData);
    dispatch(verifyEmailSuccess());
    // Handle success actions as needed
    return response;
  } catch (error) {
    dispatch(verifyEmailError(error.message));
  }
};
