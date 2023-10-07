// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducers';
import emailVerificationReducer from './emailVerificationReducer'; 
import userReducer from './userReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  emailVerification: emailVerificationReducer, 
  user:userReducer
  // Add other reducers here if needed
});

export default rootReducer;
