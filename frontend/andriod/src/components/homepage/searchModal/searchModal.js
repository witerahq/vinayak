import React, { useState } from 'react';
import {
    Modal,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import './searchModal.scss'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchDoctors } from '../../../actions/searchActions';

const SearchDoctorsModal = ({ isOpen, onClose }) => {
    const [symptoms, setSymptoms] = useState('');
    const [selectedDate, handleDateChange] = useState(null);
    const [speciality, setSpeciality] = useState('');
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSearch = () => {
        // You can process the values here, e.g., log them to the console
        console.log('Symptoms:', symptoms);
        console.log('Selected Date:', selectedDate);
        console.log('Speciality:', speciality);


        dispatch(searchDoctors(selectedDate, speciality))

        navigate({
            pathname: '/search',
            search: createSearchParams({
                date: selectedDate,
                speciality: speciality,
                symptoms: speciality
            }).toString()
        })
        // Close the modal
        onClose();

    };

    return (
        <Modal open={isOpen} onClose={onClose} className='search-modal'>
            <div className="modal-container">
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Typography variant="h6">Search Doctors</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <div className="modal-content">
                    <TextField
                        label="Symptoms"
                        variant="outlined"
                        fullWidth
                        value={symptoms}
                        className='symptoms'
                        onChange={(e) => setSymptoms(e.target.value)}
                    />

                    <LocalizationProvider className="date-time" dateAdapter={AdapterDayjs} >
                        <DemoContainer
                            components={[
                                'DatePicker'
                            ]}

                        >
                            <DemoItem
                            >
                                <DateTimePicker

                                    disablePast
                                    views={['year', 'month', 'day']}
                                    label="Set Date"
                                    value={selectedDate}
                                    onChange={(newValue) => handleDateChange(newValue)}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>

                    <FormControl variant="outlined" fullWidth className='speciality'>
                        <InputLabel id="speciality-label">Speciality</InputLabel>
                        <Select
                            labelId="speciality-label"
                            id="speciality"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            label="Speciality"
                        >
                            <MenuItem value="">
                                <em>Choose Speciality</em>
                            </MenuItem>
                            <MenuItem value={'heart'}>Heart</MenuItem>
                            <MenuItem value={'brain'}>Brain</MenuItem>
                            <MenuItem value={'sanity'}>Sanity</MenuItem>
                            <MenuItem value={'ent'}>ENT</MenuItem>
                            <MenuItem value={'skin'}>Skin</MenuItem>
                            <MenuItem value={'stomach'}>Stomach</MenuItem>
                            <MenuItem value={'gyno'}>Gyno</MenuItem>
                            <MenuItem value={'dentist'}>Dentist</MenuItem>
                            <MenuItem value={'ortho'}>Ortho</MenuItem>
                        </Select>
                    </FormControl>
                </div>



                <div className="search-button">
                    <Button variant="contained" color="primary" onClick={handleSearch} className='search'>
                        Search
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SearchDoctorsModal;
