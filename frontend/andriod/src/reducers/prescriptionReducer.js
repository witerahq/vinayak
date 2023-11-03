import {
    FETCH_PRESCRIPTIONS_SUCCESS,
    CREATE_PRESCRIPTION_SUCCESS,
    EDIT_PRESCRIPTION_SUCCESS,
    DELETE_PRESCRIPTION_SUCCESS,
  } from '../actions/prescriptionActions';
  
  const initialState = {
    prescriptions: null,
  };
  
  const prescriptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRESCRIPTIONS_SUCCESS:
        return {
          ...state,
          prescriptions: action.prescriptions,
        };
      case CREATE_PRESCRIPTION_SUCCESS:
        return {
          ...state,
          prescriptions: [...state.prescriptions, action.prescription],
        };
      case EDIT_PRESCRIPTION_SUCCESS:
        return {
          ...state,
          prescriptions: state.prescriptions.map((prescription) =>
            prescription._id === action.prescription._id ? action.prescription : prescription
          ),
        };
      case DELETE_PRESCRIPTION_SUCCESS:
        return {
          ...state,
          prescriptions: state.prescriptions.filter(
            (prescription) => prescription._id !== action.prescription._id
          ),
        };
      default:
        return state;
    }
  };
  
  export default prescriptionReducer;  