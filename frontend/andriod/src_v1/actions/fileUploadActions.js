import axios from '../service/apiService';

// Action Type
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_PRESCRIPTION = 'UPLOAD_PRESCRIPTION';

// Action Creator
export const uploadFile = (file,value) => {
    return (dispatch) => {
        console.log('file', file)
        const formData = new FormData();
        formData.append('file', file)
        formData.append('form', 'sxdfsdfv')
        axios
            .post('/api/file/upload', formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }) // Replace with the appropriate API endpoint
            .then((response) => {
                dispatch({
                    type: value=='prescription'?UPLOAD_PRESCRIPTION: UPLOAD_FILE,
                    payload: response.data.url,
                });
            })
            .catch((error) => {
                // You can handle errors here if needed
                console.error('File upload failed:', error);
            });
    };
};


export const uploadFilePrescription = (file) => {
    return (dispatch) => {
        console.log('file', file)
        const formData = new FormData();
        formData.append('file', file)
        formData.append('form', 'sxdfsdfv')
        axios
            .post('/api/file/upload', formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }) // Replace with the appropriate API endpoint
            .then((response) => {
                dispatch({
                    type: UPLOAD_PRESCRIPTION,
                    payload: response.data.url,
                });
            })
            .catch((error) => {
                // You can handle errors here if needed
                console.error('File upload failed:', error);
            });
    };
};

export const emptyImage = (value) =>{
    return (dispatch) =>{
        dispatch({
            type:value=='prescription'?UPLOAD_PRESCRIPTION: UPLOAD_FILE,
            payload:null,
        });
    }
}
