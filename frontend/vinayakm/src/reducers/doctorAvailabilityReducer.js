// DoctorAvailabilityReducer.js

import {
  FETCH_DOCTOR_AVAILABILITY_SUCCESS,
  UPDATE_AVAILABILITY_STATUS_SUCCESS,
  UPDATE_TIMESLOT_STATUS,
} from '../actions/doctorAvailabilityActions';

const initialState = {
  availability: null,
};

const doctorAvailabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCTOR_AVAILABILITY_SUCCESS:
      return {
        ...state,
        availability: action.payload,
      };
    case UPDATE_AVAILABILITY_STATUS_SUCCESS:
      return state; // You can handle this based on your needs

    case UPDATE_TIMESLOT_STATUS:
      // Update your state based on the action payload
      return {
        ...state,
        // Update your state properties here
      };
    default:
      return state;
  }
};

export default doctorAvailabilityReducer;
