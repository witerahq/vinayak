import { ADD_MEDICAL_RECORD, EDIT_MEDICAL_RECORD, GET_PRESCRIPTIONS, GET_PRESCRIPTION_DETAILS } from "../actions/medicalRecordsActions";

const initialState = {
  medicalRecords: null,
  prescriptionDetails: null, // New state for prescription details
};

const medicalRecordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEDICAL_RECORD:
      // Handle adding a medical record here
      return state;
    case EDIT_MEDICAL_RECORD:
      // Handle editing a medical record here
      return state;
    case GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };
    case GET_PRESCRIPTION_DETAILS:
      return {
        ...state,
        prescriptionDetails: action.payload,
      };
    default:
      return state;
  }
};

export default medicalRecordReducer;
