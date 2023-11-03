// actions/authActions.js
import axios from '../service/apiService';

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_ERROR = 'SET_ERROR';


// Action Creators
export const registerSuccess = (user) => ({ type: REGISTER_SUCCESS,payload: user });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const logout = () => ({ type: LOGOUT });


export const setSuccess = (message) => ({ type: 'SET_SUCCESS', payload: message });
export const setError = (message) => ({ type: 'SET_ERROR', payload: message });


// Thunk Actions
export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    const user = response.data.data;
    dispatch(registerSuccess(user));
    dispatch(setSuccess('Registration successful!'));
    return response
  } catch (error) {
    dispatch(setError(error?.response?.statusText));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(loginSuccess(user));
    dispatch(setSuccess('Login successful!'));
    
    return response
  } catch (error) {
    dispatch(setError(error.message));

  }
};

export const checkUserSession = () => {
  return (dispatch) => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Dispatch an action to set the user in the Redux state
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    }
  };
};
