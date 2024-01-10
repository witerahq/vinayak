// reducers/appointmentReducer.js

import { SET_APPOINTMENT } from '../actions/appointmentActions';

// Initial state
const initialState = {
  appointment: null, // A single appointment object with type, timing, and docDetail
};

// Appointment reducer
const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload, // Update the appointment object
      };

    default:
      return state;
  }
};

export default appointmentReducer;
