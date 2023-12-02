// reducers/authReducer.js
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, SET_SUCCESS, SET_ERROR } from '../actions/authActions';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null, 
  success: null, 
  registeredUser:null,
  emailVerified:null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeredUser: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        registeredUser:null,
        emailVerified:null,
        user: null,
        isAuthenticated: false,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: null, // Clear any previous errors
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        success: null, // Clear any previous success messages
      };
    default:
      return state;
  }
};

export default authReducer;
