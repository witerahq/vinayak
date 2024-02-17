// actions/userActions.js
import instance from '../service/apiService';

// Action Types for fetching current user
export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

// Action Types for updating user details
export const UPDATE_USER_DETAILS_REQUEST = 'UPDATE_USER_DETAILS_REQUEST';
export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS_FAILURE = 'UPDATE_USER_DETAILS_FAILURE';

export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

// Action Creators for fetching current user
export const getCurrentUserRequest = () => ({ type: GET_CURRENT_USER_REQUEST });
export const getCurrentUserSuccess = (user) => ({ type: GET_CURRENT_USER_SUCCESS, payload: user });
export const getCurrentUserFailure = (error) => ({ type: GET_CURRENT_USER_FAILURE, payload: error });

// Action Creators for updating user details
export const updateUserDetailsRequest = () => ({ type: UPDATE_USER_DETAILS_REQUEST });
export const updateUserDetailsSuccess = (user) => ({ type: UPDATE_USER_DETAILS_SUCCESS, payload: user });
export const updateUserDetailsFailure = (error) => ({ type: UPDATE_USER_DETAILS_FAILURE, payload: error });

// Action Types for fetching user by _id
export const SEARCH_DOCTOR_REQUEST = 'SEARCH_DOCTOR_REQUEST';
export const SEARCH_DOCTOR_SUCCESS = 'SEARCH_DOCTOR_SUCCESS';
export const SEARCH_DOCTOR_FAILURE = 'SEARCH_DOCTOR_FAILURE';

// Action Creators for searching user by _id
export const searchDoctorRequest = () => ({ type: SEARCH_DOCTOR_REQUEST });
export const searchDoctorSuccess = (doctor) => ({ type: SEARCH_DOCTOR_SUCCESS, payload: doctor });
export const searchDoctorFailure = (error) => ({ type: SEARCH_DOCTOR_FAILURE, payload: error });

// Action Creators for remoce user by _id
export const removeUser = () => ({ type: REMOVE_CURRENT_USER })

// Thunk Action
export const getCurrentUser = () => async (dispatch) => {
    // dispatch(getCurrentUserRequest());
    try {
        const response = await instance.get('/api/user/current');
        const user = response.data;
        dispatch(getCurrentUserSuccess(user));
    } catch (error) {
        dispatch(getCurrentUserFailure(error));
    }
};

// Thunk Action for updating user details
export const updateUserDetails = (updatedUserData) => async (dispatch) => {
    // dispatch(updateUserDetailsRequest());
    try {
        const response = await instance.post('/api/user/update', updatedUserData);
        const user = response.data;
        dispatch(updateUserDetailsSuccess(user));
    } catch (error) {
        dispatch(updateUserDetailsFailure(error));
    }
};

export const searchDoctorById = (doctorId) => async (dispatch) => {
    dispatch(searchDoctorRequest());
    try {
      const response = await instance.post('/api/user/search-doctor', { doctor_id: doctorId });
      const doctor = response.data.doctor;
      const availability = response.data.availability;
      dispatch(searchDoctorSuccess({ doctor, availability }));
    } catch (error) {
      dispatch(searchDoctorFailure(error));
    }
  };

export const removeUserDetails = ()  => async (dispatch) =>  {
    dispatch(removeUser())
}