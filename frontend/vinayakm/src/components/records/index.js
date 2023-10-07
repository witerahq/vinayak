import React from 'react';
import { TextField, IconButton, Box, Button, Divider, Avatar, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './index.scss';

const Records = () => {
    return (
        <div className="Records">
            <div className="container">
                <div className="medicine-component">
                    <div className="col-8 column-one">
                        <TextField
                            fullWidth
                            placeholder="Search..."
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />

                        <Box className="med-list" mt={4}>
                            <div className="list-item">
                                <h3 className="med-name">1. Paracetamol
                                    <IconButton className="delete-icon">
                                        <DeleteIcon />
                                    </IconButton>
                                </h3>
                                <p>Morning | Evening</p>
                                <p>3 Days</p>
                            </div>
                            <Divider />
                            {/* Repeat .list-item for more medicines */}
                        </Box>

                        <Box className="action-buttons" mt={2}>
                            <Button variant="contained" color="primary">Button 1</Button>
                            <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>Button 2</Button>
                        </Box>
                    </div>

                    <div className="col-4 column-two">
                        <Avatar className="user-avatar" alt="User" src="/path/to/image.jpg" />
                        <h2 className="user-name">John Doe</h2>
                        <p className="user-age">25 years</p>
                        <Box className="past-records" mt={2}>
                            <p>Past Records <ArrowForwardIcon /></p>
                        </Box>
                        <Divider className="divider" />
                        <h3 className="symptoms-heading">Symptoms</h3>
                        <Box className="symptoms-chips">
                            <Chip label="Fever" className="symptom-chip" />
                            {/* Add more chips as needed */}
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Records;
