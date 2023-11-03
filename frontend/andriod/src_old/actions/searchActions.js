// actions/searchActions.js

import axios from '../service/apiService';

// Action types
export const SEARCH_DOCTORS_REQUEST = 'SEARCH_DOCTORS_REQUEST';
export const SEARCH_DOCTORS_SUCCESS = 'SEARCH_DOCTORS_SUCCESS';
export const SEARCH_DOCTORS_FAILURE = 'SEARCH_DOCTORS_FAILURE';

// Action creators
export const searchDoctors = (selectedDate, speciality) => (dispatch) => {
//   dispatch({ type: SEARCH_DOCTORS_REQUEST });

  axios
    .post('/api/search/doctors', { selectedDate, speciality })
    .then((response) => {
      dispatch({ type: SEARCH_DOCTORS_SUCCESS, doctors: response.data });
    })
    .catch((error) => {
      dispatch({ type: SEARCH_DOCTORS_FAILURE, error: error.message });
    });
};
