// documentFileRecordReducers.js
import {
    FETCH_DOCUMENT_FILE_RECORDS_SUCCESS,
    CREATE_DOCUMENT_FILE_RECORD_SUCCESS,
    DELETE_DOCUMENT_FILE_RECORD_SUCCESS,
  } from '../actions/medicalRecordFileActions';
  
  const initialState = {
    medicalFileRecords: null,
  };
  
  const medicalFileRecordReducers = (state = initialState, action) => {
    console.log('action',action.documentFileRecords)
    switch (action.type) {
      case FETCH_DOCUMENT_FILE_RECORDS_SUCCESS:
        return {
          ...state,
          medicalFileRecords: action.documentFileRecords,
        };
      case CREATE_DOCUMENT_FILE_RECORD_SUCCESS:
        return {
          ...state,
          medicalFileRecords: [...state.medicalFileRecords, action.documentFileRecord],
        };
      case DELETE_DOCUMENT_FILE_RECORD_SUCCESS:
        return {
          ...state,
          medicalFileRecords: state.medicalFileRecords.filter(
            (record) => record.id !== action.documentFileRecord.id
          ),
        };
      default:
        return state;
    }
  };
  
  export default medicalFileRecordReducers;  