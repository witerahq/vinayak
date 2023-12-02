import {
    FETCH_APPOINTMENTS_SUCCESS,
    CREATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_SUCCESS,
  } from '../actions/bookingActions';
  
  const initialState = {
    appointments: null,
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          appointments: action.appointments,
        };
      case CREATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          appointments: [...state.appointments, action.appointment],
        };
      case UPDATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          appointments: state.appointments.map((appointment) =>
            appointment._id === action.appointment._id ? action.appointment : appointment
          ),
        };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  