// reducers/userReducer.js

import {
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  REMOVE_CURRENT_USER,
  SEARCH_DOCTOR_REQUEST,
  SEARCH_DOCTOR_SUCCESS,
  SEARCH_DOCTOR_FAILURE
} from "../actions/userActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
  doctor: null,
  availability: null
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
      return { user: null, loading: false, error: null };
    case SEARCH_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEARCH_DOCTOR_SUCCESS:
      return {
        ...state,
        doctor: action.payload.doctor,
        availability: action.payload.availability,
        loading: false,
        error: null,
      };

    case SEARCH_DOCTOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
