import { UPLOAD_FILE,UPLOAD_PRESCRIPTION } from '../actions/fileUploadActions';

const initialState = {
    url: null,
    prescriptionUrl: null
};

const fileUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_FILE:
            return {
                ...state,
                url: action.payload,
            };
        case UPLOAD_PRESCRIPTION:
            return {
                ...state,
                prescriptionUrl: action.payload,
            };
        default:
            return state;
    }
};

export default fileUploadReducer;
