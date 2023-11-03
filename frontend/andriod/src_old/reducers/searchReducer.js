// reducers/searchReducer.js

import {
    SEARCH_DOCTORS_REQUEST,
    SEARCH_DOCTORS_SUCCESS,
    SEARCH_DOCTORS_FAILURE,
  } from '../actions/searchActions';
  
  const initialState = {
    doctors: null,
    loading: false,
    error: null,
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_DOCTORS_REQUEST:
        return { ...state, loading: true, error: null };
      case SEARCH_DOCTORS_SUCCESS:
        return { ...state, loading: false, doctors: action.doctors, error: null };
      case SEARCH_DOCTORS_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default searchReducer;  