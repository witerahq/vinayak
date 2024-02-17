import React, { useEffect, useState } from 'react';
import { Modal, Card, CardHeader, CardContent, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './prescription.scss';
import { useDispatch } from 'react-redux';
import { createPrescription, editPrescription } from '../../../../actions/prescriptionActions';

const PrescriptionModal = ({ isOpen, onClose, prescriptionData }) => {
    const [formData, setFormData] = useState({
        name: '',
        medicines: [
            {
                name: '',
                frequency: '1',
                duration: '1',
            }
        ],
        tests: [''],
    });

    const handleAddField = (fieldType) => {
        setFormData((prev) => ({
            ...prev,
            [fieldType]: [...prev[fieldType],fieldType=='tests'? '':{
                name: '',
                frequency: '1',
                duration: '1',
            }]
        }));
    };

    const handleRemoveField = (fieldType, index) => {
        const updatedFields = [...formData[fieldType]];
        updatedFields.splice(index, 1);
        setFormData((prev) => ({ ...prev, [fieldType]: updatedFields }));
    };

    const handleInputChange = (e, fieldType, index, subfield) => {
        const updatedFields = [...formData[fieldType]];
        console.log(updatedFields)
        if(subfield)
        updatedFields[index][subfield] = e.target.value;
        else
        updatedFields[index] = e.target.value;
        setFormData((prev) => ({ ...prev, [fieldType]: updatedFields }));
    };

    const dispatch = useDispatch()

    const updatePrescription = ()=>{
        if(prescriptionData&&Object.keys(prescriptionData)?.length){
            console.log('edit')
            console.log(formData)
            dispatch(editPrescription(formData._id,formData))
        } else {
            console.log('add')
            console.log(formData)
            dispatch(createPrescription(formData))
        }
    }

    useEffect(()=>{
        if(prescriptionData){
            setFormData(prescriptionData)
        }
    },[prescriptionData])

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Card className="prescription-modal">
                <CardHeader
                    className="modal-header"
                    title="Prescription"
                    action={
                        <IconButton onClick={onClose}>
                            <CloseIcon htmlColor='white'/>
                        </IconButton>
                    }
                />
                <CardContent>
                    <form className="prescription-form">
                        <TextField
                            label="Name"
                            className="input-group"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            fullWidth
                        />

                        {/* Medicines */}
                        {formData.medicines.map((medicine, idx) => (
                            <div key={idx}>
                                <TextField
                                    label="Medicine Name"
                                    value={medicine.name}
                                    onChange={(e) => handleInputChange(e, 'medicines', idx, 'name')}
                                    fullWidth
                                    className='input-group'
                                />
                                <TextField
                                    className='select'
                                    select
                                    label="Frequency (times/day)"
                                    value={medicine.frequency}
                                    onChange={(e) => handleInputChange(e, 'medicines', idx, 'frequency')}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                >
                                    {[1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    className='select'
                                    label="Duration (days)"
                                    value={medicine.duration}
                                    onChange={(e) => handleInputChange(e, 'medicines', idx, 'duration')}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <IconButton onClick={() => handleRemoveField('medicines', idx)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}
                        <Button className='add-button' startIcon={<AddIcon />} onClick={() => handleAddField('medicines')}>
                            Add More Medicine
                        </Button>

                        {/* Lab Tests */}
                        { formData.tests.map((test, idx) => (
                            <div className="input-group" key={idx}>
                                <TextField
                                    label="Lab Test"
                                    value={test}
                                    onChange={(e) => handleInputChange(e, 'tests', idx)}
                                    fullWidth
                                />
                                <IconButton onClick={() => handleRemoveField('tests', idx)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}
                        <Button className='add-button' startIcon={<AddIcon />} onClick={() => handleAddField('tests')}>
                            Add More Test
                        </Button>

                        <Button variant="contained" color="primary" onClick={updatePrescription}>
                            {prescriptionData?'Edit':'Add'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    );
};

export default PrescriptionModal;
