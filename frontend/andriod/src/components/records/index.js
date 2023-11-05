import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Box, Button, Divider, Avatar, Chip, TextareaAutosize } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './index.scss';
import MultipleSelectPlaceholder from './select-prescriptions';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { addMedicalRecord, editMedicalRecord, emptyPrescriptionDetails, getPrescriptionDetails } from '../../actions/medicalRecordsActions';
import { emptyImage, uploadFilePrescription } from '../../actions/fileUploadActions';

const Records = () => {

    const { id } = useParams();
    const medicalRecordFromStore = useSelector((state) => {
        if (id)
            return state.medicalRecord.prescriptionDetails
    })
    const initialPrescription = medicalRecordFromStore?.prescriptions || [];
    const [prescription, setPrescription] = useState([...initialPrescription])
    const [prescriptionCopy, setPrescriptionCopy] = useState([...initialPrescription])


    const [imageUrl, setImageUrl] = useState('')

    const changePrescription = (value) => {
        console.log(value,'changed value',prescription)
        setPrescriptionCopy(value)
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

    const navigate = useNavigate()

    const prescribe = () => {
        let data = {
            patientId: searchParams.get('patientId'),
            symptoms: chipData,
            note: noteValue,
            image: imageUrl,
            appointmentId: searchParams.get('id'),
            prescriptions: prescriptionCopy,
        }
        console.log(data)

        if (id) {
            data['medicalRecordId'] = id
            dispatch(editMedicalRecord(data))
            navigate('/dashboard/patients')
            dispatch(emptyPrescriptionDetails())
        } else {
            dispatch(addMedicalRecord(data))
            navigate('/dashboard/patients')
            dispatch(emptyPrescriptionDetails())
        }
    }

    useEffect(() => {
        if (id && !medicalRecordFromStore) {
            dispatch(getPrescriptionDetails(id))
        }
    }, [id]);



    const handleChipDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const image = useSelector((state) => state.file.prescriptionUrl)

    useEffect(() => {
        if (image) {
            setImageUrl(image)
        }
    }, [image])

    useEffect(() => {
        return () => {
            if (image != null)
                dispatch(emptyImage('prescription'))
        }
    }, [])

    const handleEditProfileClick = () => {
        const imageInput = document.getElementById('imageInput');
        imageInput.click();
    };

    const [prescriptionImage, setPrescriptionImage] = useState('')

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setPrescriptionImage(selectedFile.name)
        if (selectedFile) {
            dispatch(uploadFilePrescription(selectedFile));
        }
    };

    const handleRemoveMedicine = (indexToRemove, itemIndex) => {

        const updatedPrescription = [...prescriptionCopy];
        const itemToUpdate = updatedPrescription[itemIndex];
        itemToUpdate.medicines = itemToUpdate.medicines.filter((_, idx) => idx !== indexToRemove);

        setPrescriptionCopy(updatedPrescription);
    }

    const handleUpdateMedicine = (updatedMed, itemIndex, medIndex) => {
        const updatedPrescription = [...prescriptionCopy];
        updatedPrescription[itemIndex].medicines[medIndex] = updatedMed;
        setPrescriptionCopy(updatedPrescription);
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
                                prescriptionCopy.length ?
                                    prescriptionCopy.map((item, index) => {
                                        return (
                                            <>
                                                {
                                                    item.medicines.map((med, idx) => {
                                                        return (
                                                            <>
                                                                <div className="list-item" key={item._id}>
                                                                    <h3 className="med-name">{med.name}
                                                                        {
                                                                            // user.role != 'patient' ?
                                                                            //     <IconButton className="delete-icon" onClick={() => handleRemoveMedicine(idx, index)}>
                                                                            //         {/* <DeleteIcon /> */}
                                                                            //     </IconButton> : ''
                                                                        }
                                                                    </h3>
                                                                    <div className='occurance-text'>
                                                                        {
                                                                            user.role != 'patient' ?
                                                                                <>
                                                                                    <div>
                                                                                        <input type="text" value={med.frequency}
                                                                                            onChange={(e) => {
                                                                                                const updatedMed = { ...med, frequency: e.target.value };
                                                                                                handleUpdateMedicine(updatedMed, index, idx);
                                                                                            }}
                                                                                        />
                                                                                        <span> time</span>
                                                                                    </div>
                                                                                    <div>
                                                                                        <input type="text" value={med.duration}
                                                                                            onChange={(e) => {
                                                                                                const updatedMed = { ...med, duration: e.target.value };
                                                                                                handleUpdateMedicine(updatedMed, index, idx);
                                                                                            }}
                                                                                        />
                                                                                        <span> duration</span>
                                                                                    </div>
                                                                                </> :
                                                                                <>
                                                                                    <p>{med.frequency}</p>
                                                                                    <p>{med.duration}</p>
                                                                                </>
                                                                        }
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
                                <div className='d-flex'>
                                    <input
                                        type="file"
                                        id="imageInputPrescription"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                    {
                                        prescriptionImage.length ? <p>{prescriptionImage}</p> : null
                                    }
                                    <Box className="action-buttons" mt={2}>
                                        {/* <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} onClick={handleEditProfileClick}>Upload</Button> */}
                                    </Box>
                                    <Box className="action-buttons" mt={2}>
                                        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} onClick={e => prescribe()}>Prescribe</Button>
                                    </Box>
                                </div>
                                :
                                <Box className="action-buttons" mt={2}>
                                    {/* <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} >Download</Button> */}
                                </Box>
                        }
                    </div>

                    <div className="col-4 column-two">
                        <div className="patient-details">
                            <Avatar className="user-avatar" alt="User" src={searchParams.get('image')} />
                            <h2 className="user-name">{searchParams.get('name')}</h2>
                            <p className="user-age">{searchParams.get('age') ? searchParams.get('age') + ' years |' : ''}  {searchParams.get('gender') ? searchParams.get('gender') : ''}</p>
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
