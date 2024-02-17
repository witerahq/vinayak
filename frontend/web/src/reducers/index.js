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
import medicalRecordReducer from './medicalRecordsReducer';
import fileUploadReducer from './fileUploadReducer';
import medicalFileRecordReducers from './medicalRecordFIleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  emailVerification: emailVerificationReducer, 
  user:userReducer,
  prescription: prescriptionReducer,
  availability: doctorAvailabilityReducer,
  search: searchReducer,
  appointment: appointmentReducer,
  booking:bookingReducer,
  payment:paymentReducer,
  medicalRecord: medicalRecordReducer,
  file:fileUploadReducer,
  medicalRecordFile:medicalFileRecordReducers
  // Add other reducers here if needed
});

export default rootReducer;
