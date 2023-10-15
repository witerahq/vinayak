// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducers';
import emailVerificationReducer from './emailVerificationReducer'; 
import userReducer from './userReducers';
import prescriptionReducer from './prescriptionReducer';
import doctorAvailabilityReducer from './doctorAvailabilityReducer';
import searchReducer from './searchReducer';
import appointmentReducer from './appointmentReducer';
import bookingReducer from './bookingReducer';
import { paymentReducer } from './paymentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  emailVerification: emailVerificationReducer, 
  user:userReducer,
  prescription: prescriptionReducer,
  availability: doctorAvailabilityReducer,
  search: searchReducer,
  appointment: appointmentReducer,
  booking:bookingReducer,
  payment:paymentReducer
  // Add other reducers here if needed
});

export default rootReducer;
