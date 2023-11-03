import axios from '../service/apiService';

// Action Types
export const FETCH_PRESCRIPTIONS_SUCCESS = 'FETCH_PRESCRIPTIONS_SUCCESS';
export const CREATE_PRESCRIPTION_SUCCESS = 'CREATE_PRESCRIPTION_SUCCESS';
export const EDIT_PRESCRIPTION_SUCCESS = 'EDIT_PRESCRIPTION_SUCCESS';
export const DELETE_PRESCRIPTION_SUCCESS = 'DELETE_PRESCRIPTION_SUCCESS';

// Action Creators
export const fetchPrescriptionsSuccess = (prescriptions) => ({
  type: FETCH_PRESCRIPTIONS_SUCCESS,
  prescriptions,
});

export const createPrescriptionSuccess = (prescription) => ({
  type: CREATE_PRESCRIPTION_SUCCESS,
  prescription,
});

export const editPrescriptionSuccess = (prescription) => ({
  type: EDIT_PRESCRIPTION_SUCCESS,
  prescription,
});

export const deletePrescriptionSuccess = (prescription) => ({
  type: DELETE_PRESCRIPTION_SUCCESS,
  prescription,
});

// Thunk Actions
export const fetchPrescriptions = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/prescriptions/doctor`);
    dispatch(fetchPrescriptionsSuccess(response.data));
    console.log('response',response)
    
    return response
  } catch (error) {
    console.error(error);
  }
};

export const createPrescription = (prescriptionData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/prescriptions/add', prescriptionData);
    dispatch(createPrescriptionSuccess(response.data));
    
    return response
  } catch (error) {
    console.error(error);
  }
};

export const editPrescription = (prescriptionID, prescriptionData) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/prescriptions/edit/${prescriptionID}`, prescriptionData);
    dispatch(editPrescriptionSuccess(response.data));
    
    return response
  } catch (error) {
    console.error(error);
  }
};

export const deletePrescription = (prescriptionID) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/prescriptions/delete/${prescriptionID}`);
    dispatch(deletePrescriptionSuccess(response.data));
    
    return response
  } catch (error) {
    console.error(error);
  }
};
