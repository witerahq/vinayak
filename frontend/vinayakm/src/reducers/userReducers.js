// reducers/userReducer.js

import {
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAILURE,
    REMOVE_CURRENT_USER
  } from '../actions/userActions';
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CURRENT_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_CURRENT_USER_SUCCESS:
        return { ...state, user: action.payload, loading: false };
      case GET_CURRENT_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_USER_DETAILS_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_USER_DETAILS_SUCCESS:
        return { ...state, user: action.payload, loading: false };
      case UPDATE_USER_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case REMOVE_CURRENT_USER:
        return { user: null, loading: false, error: null};
      default:
        return state;
    }
  };
  
  export default userReducer;
  