import axios from '../service/apiService';

// Action types
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';

// Action creators
export const fetchAppointmentsSuccess = (appointments) => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  appointments,
});

export const createAppointmentSuccess = (appointment) => ({
  type: CREATE_APPOINTMENT_SUCCESS,
  appointment,
});

export const updateAppointmentSuccess = (appointment) => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  appointment,
});

// Thunk action to fetch appointments
export const fetchAppointmentsDoctor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/appointments/doctor'); // Replace with your API endpoint
      const appointments = response.data;
      dispatch(fetchAppointmentsSuccess(appointments));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Handle the error or dispatch an error action
    }
  };
};

export const fetchAppointmentsPatient = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/appointments/patient'); // Replace with your API endpoint
      const appointments = response.data;
      dispatch(fetchAppointmentsSuccess(appointments));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Handle the error or dispatch an error action
    }
  };
};

// Thunk action to create a new appointment
export const createAppointment = (appointmentData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/appointments', appointmentData); // Replace with your API endpoint
      const appointment = response.data;
      dispatch(createAppointmentSuccess(appointment));
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle the error or dispatch an error action
    }
  };
};

// Thunk action to update an existing appointment
export const updateAppointment = (appointmentId, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/appointments/${appointmentId}`, updatedData); // Replace with your API endpoint
      const updatedAppointment = response.data;
      dispatch(updateAppointmentSuccess(updatedAppointment));
    } catch (error) {
      console.error('Error updating appointment:', error);
      // Handle the error or dispatch an error action
    }
  };
};
