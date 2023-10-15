// Action types
export const SET_APPOINTMENT = 'SET_APPOINTMENT';

// Action creator
export const setAppointmentCart = (appointment) => {
    localStorage.setItem('appointment',JSON.stringify(appointment))
  return {
    type: SET_APPOINTMENT,
    payload: appointment, // An object containing appointment properties (type, timing, docDetail)
  };
};

export const checkUserAppointment= () => {
  return (dispatch) => {
    const appointmentData = localStorage.getItem('appointment');
    if (appointmentData) {
      const payload = JSON.parse(appointmentData);
      // Dispatch an action to set the payload in the Redux state
      dispatch({ type: SET_APPOINTMENT, payload: payload });
    }
  };
};


