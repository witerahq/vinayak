import React, { useState } from 'react';
import { Modal, Card, CardHeader, CardContent, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './prescription.scss';

const PrescriptionModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        medicines: [''],
        tests: [''],
        frequency: '1',
        duration: '1',
    });

    const handleAddField = (fieldType) => {
        setFormData(prev => ({
            ...prev,
            [fieldType]: [...prev[fieldType], '']
        }));
    };

    const handleRemoveField = (fieldType, index) => {
        const updatedFields = [...formData[fieldType]];
        updatedFields.splice(index, 1);
        setFormData(prev => ({ ...prev, [fieldType]: updatedFields }));
    };

    const handleInputChange = (e, fieldType, index) => {
        const updatedFields = [...formData[fieldType]];
        updatedFields[index] = e.target.value;
        setFormData(prev => ({ ...prev, [fieldType]: updatedFields }));
    };

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
                            onChange={(e) => handleInputChange(e, 'name')}
                            fullWidth
                        />
                        {/* Medicines */}
                        {formData.medicines.map((medicine, idx) => (
                            <div className="input-group" key={idx}>
                                <TextField
                                    label="Medicine Name"
                                    value={medicine}
                                    onChange={(e) => handleInputChange(e, 'medicines', idx)}
                                    fullWidth
                                />
                                <IconButton onClick={() => handleRemoveField('medicines', idx)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}
                        <Button className='add-button' startIcon={<AddIcon />} onClick={() => handleAddField('medicines')}>
                            Add More Medicine
                        </Button>

                        {/* Lab Tests */}
                        {formData.tests.map((test, idx) => (
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

                        {/* Frequency */}
                        <TextField
                            className='select'
                            select
                            label="Frequency (times/day)"
                            value={formData.frequency}
                            onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
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

                        {/* Duration */}
                        <TextField
                            select
                            className='select'
                            label="Duration (days)"
                            value={formData.duration}
                            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
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

                        <Button variant="contained" color="primary">
                            Add
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    );
};

export default PrescriptionModal;
