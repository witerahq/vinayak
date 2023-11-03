// src/components/PatientCard.js
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, IconButton, Typography, Grid, Chip, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './index.scss'
import PrescriptionModal from './modal/prescription';
import { deletePrescription, fetchPrescriptions } from '../../../actions/prescriptionActions';
import { useDispatch, useSelector } from 'react-redux';

const PatientCard = () => {

    const dispatch = useDispatch();
    const prescriptionFromStore = useSelector((state)=>{
        console.log(state,'state')
        return state.prescription.prescriptions
    })
    const [prescription, setPrescription] = useState(prescriptionFromStore || {}); // Local state for prescriptions
   
    // Fetch prescriptions when the component mounts
    useEffect(() => {
        console.log('hi')
        console.log(prescription,'prescription')
        if(!prescriptionFromStore){

            dispatch(fetchPrescriptions());
        }
    }, [prescriptionFromStore]);

    // Dummy data for the medicines and tests
    const medicines = [];
    const tests = [];

  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prescriptionData,setPrescriptionData] = useState('');

    const handleDeleteClick = (item) => {
        console.log('Delete clicked!');
        dispatch(deletePrescription(item._id))
    }

    const handleEditClick = (item) => {
        console.log('Edit clicked!');
        setPrescriptionData(item)
        setIsModalOpen(true)
    }

    const openPopup =()=>{
        setPrescriptionData('')
        setIsModalOpen(true)
    }

    const closePopup = ()=>{
        setIsModalOpen(false)
    }

    

    return (
        <div className="Prescription">
            <div className="container">
                <div className="header">
                    <p>Prescriptions List</p>
                    <Button variant="text" onClick={() => {openPopup()}}>+ Add Prescrition</Button>
                </div>

                <PrescriptionModal isOpen={isModalOpen} onClose={() => {closePopup()}} prescriptionData={prescriptionData} />

                <div className="prescription-cards">
                    {
                        prescription.length?prescription?.map((item, index) => {
                            return (
                                <Card className='prescription-card' key={'index-'+index}>
                                    <CardHeader
                                        title={<Typography variant="h3">{item.name}</Typography>}
                                        action={
                                            <>
                                                <IconButton onClick={e=>handleEditClick(item)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={e=>handleDeleteClick(item)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    />
                                    <Divider></Divider>

                                    <Grid container spacing={3} style={{ padding: '1em' }}>
                                        <Grid item xs={6}>
                                            <Typography variant="h5">Medicines</Typography>
                                            <Grid container spacing={1}>
                                                {item.medicines.map((medicine, index) => (
                                                    <Grid item xs={6} key={index}>
                                                        <Chip label={medicine.name} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                        {/* Column 2 - Tests */}
                                        <Grid item xs={6}>
                                            <Typography variant="h5">Tests</Typography>
                                            <Grid container spacing={1}>
                                                {item.tests.map((test, index) => (
                                                    <Grid item xs={6} key={index}>
                                                        <Chip label={test} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        }):
                        <p>There is no prescription</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default PatientCard;
