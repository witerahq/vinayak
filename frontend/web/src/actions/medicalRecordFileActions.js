// documentFileRecordActions.js
import axios from '../service/apiService';

export const FETCH_DOCUMENT_FILE_RECORDS_SUCCESS = 'FETCH_DOCUMENT_FILE_RECORDS_SUCCESS';
export const CREATE_DOCUMENT_FILE_RECORD_SUCCESS = 'CREATE_DOCUMENT_FILE_RECORD_SUCCESS';
export const DELETE_DOCUMENT_FILE_RECORD_SUCCESS = 'DELETE_DOCUMENT_FILE_RECORD_SUCCESS';

export const fetchDocumentFileRecordsSuccess = (documentFileRecords) => ({
  type: FETCH_DOCUMENT_FILE_RECORDS_SUCCESS,
  documentFileRecords,
});

export const createDocumentFileRecordSuccess = (documentFileRecord) => ({
  type: CREATE_DOCUMENT_FILE_RECORD_SUCCESS,
  documentFileRecord,
});

export const deleteDocumentFileRecordSuccess = (documentFileRecord) => ({
  type: DELETE_DOCUMENT_FILE_RECORD_SUCCESS,
  documentFileRecord,
});

// Thunk Actions
export const fetchDocumentFileRecords = (patientId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/medicalRecordFiles/${patientId}`);
    console.log(response)
    dispatch(fetchDocumentFileRecordsSuccess(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createDocumentFileRecord = (documentFileRecordData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/medicalRecordFiles', documentFileRecordData);
    dispatch(createDocumentFileRecordSuccess(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocumentFileRecord = (documentFileRecordId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/medicalRecordFiles/${documentFileRecordId}`);
    dispatch(deleteDocumentFileRecordSuccess(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
};