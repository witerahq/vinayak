// src/components/PatientCard.js
import React, { useState } from 'react';
import { Card, CardHeader, IconButton, Typography, Grid, Chip, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './index.scss'
import PrescriptionModal from './modal/prescription';

const PatientCard = () => {

    // Dummy data for the medicines and tests
    const medicines = ['Medicine 1', 'Medicine 2', 'Medicine 3', 'Medicine 4'];
    const tests = ['Lab Test 1', 'Lab Test 2', 'Lab Test 3', 'Lab Test 4'];

    const handleDeleteClick = () => {
        console.log('Delete clicked!');
    }

    const handleEditClick = () => {
        console.log('Edit clicked!');
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="Prescription">
            <div className="container">
                <div className="header">
                    <p>Prescriptions List</p>
                    <Button variant="text" onClick={() => setIsModalOpen(true)}>+ Add Prescrition</Button>

                </div>
                <PrescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <div className="prescription-cards">
                    {
                        new Array(10).fill(0).map((item, index) => {
                            return (
                                <Card className='prescription-card'>
                                    <CardHeader
                                        title={<Typography variant="h3">prescription Name</Typography>}
                                        action={
                                            <>
                                                <IconButton onClick={handleEditClick}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={handleDeleteClick}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    />
                                    <Divider></Divider>

                                    <Grid container spacing={3} style={{ padding: '1em' }}>
                                        {/* Column 1 - Medicines */}
                                        <Grid item xs={6}>
                                            <Typography variant="h5">Medicines</Typography>
                                            <Grid container spacing={1}>
                                                {medicines.map((medicine, index) => (
                                                    <Grid item xs={6} key={index}>
                                                        <Chip label={medicine} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                        {/* Column 2 - Tests */}
                                        <Grid item xs={6}>
                                            <Typography variant="h5">Tests</Typography>
                                            <Grid container spacing={1}>
                                                {tests.map((test, index) => (
                                                    <Grid item xs={6} key={index}>
                                                        <Chip label={test} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default PatientCard;
