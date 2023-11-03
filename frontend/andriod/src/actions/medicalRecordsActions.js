// medicalRecordActions.js
import axios from '../service/apiService';

export const ADD_MEDICAL_RECORD = 'ADD_MEDICAL_RECORD';
export const EDIT_MEDICAL_RECORD = 'EDIT_MEDICAL_RECORD';
export const GET_PRESCRIPTIONS = 'GET_PRESCRIPTIONS';
export const GET_PRESCRIPTION_DETAILS = 'GET_PRESCRIPTION_DETAILS';

// Action to add a medical record with a prescription
export const addMedicalRecord = (medicalRecordData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/medicalrecord/add', medicalRecordData);
    dispatch({
      type: ADD_MEDICAL_RECORD,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

// Action to edit a medical record
export const editMedicalRecord = (medicalRecordData) => async (dispatch) => {
  try {
    const response = await axios.put('/api/medicalrecord/edit', medicalRecordData);
    dispatch({
      type: EDIT_MEDICAL_RECORD,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

// Action to get prescriptions by userId and doctorId
export const getPrescriptions = (userId, doctorId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/medicalrecord/user`);
    dispatch({
      type: GET_PRESCRIPTIONS,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

// Action to get prescription details by prescription ID
export const getPrescriptionDetails = (prescriptionId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/medicalrecord/${prescriptionId}`);
    dispatch({
      type: GET_PRESCRIPTION_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    // Handle error, e.g., dispatch an error action
  }
};


// Action to get prescription details by prescription ID
export const emptyPrescriptionDetails = () => async (dispatch) => {
  try {
    // const response = await axios.get(`/api/medicalrecord/${prescriptionId}`);
    dispatch({
      type: GET_PRESCRIPTION_DETAILS,
      payload: null,
    });
  } catch (error) {
    // Handle error, e.g., dispatch an error action
  }
};
