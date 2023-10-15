// DoctorAvailabilityActions.js

import axios from '../service/apiService';

// Action Types
export const FETCH_DOCTOR_AVAILABILITY_SUCCESS = 'FETCH_DOCTOR_AVAILABILITY_SUCCESS';
export const UPDATE_AVAILABILITY_STATUS_SUCCESS = 'UPDATE_AVAILABILITY_STATUS_SUCCESS';
export const UPDATE_TIMESLOT_STATUS = 'UPDATE_TIMESLOT_STATUS';

// Action Creators
export const fetchDoctorAvailabilitySuccess = (availability) => ({
  type: FETCH_DOCTOR_AVAILABILITY_SUCCESS,
  payload: availability,
});

export const updateAvailabilityStatusSuccess = () => ({
  type: UPDATE_AVAILABILITY_STATUS_SUCCESS,
});

// Thunk Action to Fetch Doctor Availability
export const fetchDoctorAvailability = () => async (dispatch) => {
  try {
    // Make an API request to fetch the doctor's availability
    const response = await axios.get('/api/doctor/availability');

    // Dispatch the success action with the availability data
    dispatch(fetchDoctorAvailabilitySuccess(response.data));
  } catch (error) {
    // Handle error or dispatch an error action if needed
    console.error('Error fetching doctor availability:', error);
  }
};

// Thunk Action to Update Availability Status
export const updateAvailabilityStatus = (updates) => async (dispatch) => {
  try {
    // Make an API request to update the availability status
    await axios.post('/api/doctor/availability',{ updates });

    // Dispatch the success action
    dispatch(updateAvailabilityStatusSuccess());
  } catch (error) {
    // Handle error or dispatch an error action if needed
    console.error('Error updating availability status:', error);
  }
};


export const updateTimeslotStatus = (availabilityId, timeSlotType, timeSlotIndex, newStatus) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/doctor/update-timeslot-status`, {
      timeSlotType,
      timeSlotIndex,
      newStatus,
      availabilityId
    });
    dispatch({
      type: UPDATE_TIMESLOT_STATUS,
      payload: response.data, // Update your payload as needed
    });
  } catch (error) {
    // Handle errors
  }
};
