import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Box, Button, Divider, Avatar, Chip, TextareaAutosize } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './index.scss';
import MultipleSelectPlaceholder from './select-prescriptions';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { addMedicalRecord, emptyPrescriptionDetails, getPrescriptionDetails } from '../../actions/medicalRecordsActions';

const Records = () => {

    const { id } = useParams();
    const medicalRecordFromStore = useSelector((state) => {
        if (id)
            return state.medicalRecord.prescriptionDetails
    })
    const [prescription, setPrescription] = useState(medicalRecordFromStore?.prescriptions || [])
    const changePrescription = (value) => {
        console.log(value)
        setPrescription(value)
    }

    const user = useSelector((state) => {
        if (state?.auth?.user?.token) {
            const decoded = jwt_decode(state?.auth?.user?.token);
            return decoded
        }
    })


    const selectedValue = medicalRecordFromStore?.prescriptions.map((item) => item.name)




    const [searchParams, setSearchParams] = useSearchParams()


    const [inputValue, setInputValue] = useState('');
    const [noteValue, setNoteValue] = useState(medicalRecordFromStore?.note || '');
    const [chipData, setChipData] = useState(medicalRecordFromStore?.symptoms || []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setChipData([...chipData, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleNoteChange = (event) => {
        setNoteValue(event.target.value)
    }

    const dispatch = useDispatch()

    const prescribe = () => {
        let data = {
            patientId: searchParams.get('patientId'),
            symptoms: chipData,
            note: noteValue,
            image: '',
            appointmentId: searchParams.get('id'),
            prescriptions: prescription.map((item) => item._id)
        }
        console.log(data)

        dispatch(addMedicalRecord(data))
    }

    useEffect(() => {
        if (id && !medicalRecordFromStore) {
            dispatch(getPrescriptionDetails(id))
        }
    }, [id]);



    const handleChipDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };


    return (
        <div className="Records">
            <div className="container">
                <div className={"medicine-component " + user.role}>
                    <div className="col-8 column-one">
                        {
                            user.role != 'patient' ?
                                <MultipleSelectPlaceholder selectedValue={selectedValue} changePrescription={e => changePrescription(e)}></MultipleSelectPlaceholder>
                                : ''
                        }

                        <p className='heading'>Prescription</p>
                        <Box className="med-list" mt={4}>
                            {
                                prescription.length ?
                                    prescription.map((item, index) => {
                                        return (
                                            <>
                                                {
                                                    item.medicines.map((med, idx) => {
                                                        return (
                                                            <>
                                                                <div className="list-item" key={item._id}>
                                                                    <h3 className="med-name">{med.name}
                                                                        {/* <IconButton className="delete-icon">
                                                                        <DeleteIcon />
                                                                    </IconButton> */}
                                                                    </h3>
                                                                    <div className='occurance-text'>
                                                                        <p>{med.frequency} times</p>
                                                                        <p>{med.duration} days</p>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    ((item.medicines.length - 1) != idx) || prescription.length - 1 != index ?
                                                                        <Divider /> : null
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                            </>
                                        )
                                    }) :
                                    <>
                                        <p>There is no selected prescription</p>
                                    </>


                            }
                            {/* Repeat .list-item for more medicines */}
                        </Box>

                        {
                            user.role != 'patient' ?
                                <Box className="action-buttons" mt={2}>
                                    <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} onClick={e => prescribe()}>Prescribe</Button>
                                </Box> :
                                <Box className="action-buttons" mt={2}>
                                    <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} >Download</Button>
                                </Box>
                        }
                    </div>

                    <div className="col-4 column-two">
                        <div className="patient-details">
                            <Avatar className="user-avatar" alt="User" src={searchParams.get('image')} />
                            <h2 className="user-name">{searchParams.get('name')}</h2>
                            <p className="user-age">{searchParams.get('age')} years | {searchParams.get('gender') == 'male' ? 'Male' : 'Female'}</p>
                            <Divider className="divider" />
                        </div>

                        <h3 className="symptoms-heading">Symptoms</h3>

                        {
                            user.role != 'patient' ?
                                <TextField
                                    label="Add a symptom"
                                    value={inputValue}
                                    fullWidth
                                    className='add-symptoms'
                                    onChange={handleInputChange}
                                    onKeyPress={handleInputKeyPress}
                                /> : null
                        }
                        <Box className="symptoms-chips">
                            {user.role != 'patient' ?
                                chipData.map((chip, index) => (
                                    <Chip
                                        key={index}
                                        label={chip}
                                        onDelete={handleChipDelete(chip)}
                                    />
                                )) : chipData.map((chip, index) => (
                                    <Chip
                                        key={index}
                                        label={chip}
                                    />
                                ))
                            }
                            {/* Add more chips as needed */}
                        </Box>


                        <Divider className="divider" />
                        <h3 className="symptoms-heading">Note</h3>
                        <TextareaAutosize
                            minRows={3}
                            value={noteValue}
                            readOnly={user.role == 'patient'}
                            onChange={handleNoteChange}
                            aria-label="maximum height"
                            placeholder='Add a note for patient...'
                            style={{ padding: '8px', width: "100%", background: 'transparent', border: '1px solid gray', borderRadius: '4px' }}
                        />


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Records;
