import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Divider, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import algoliasearch from 'algoliasearch/lite';

const AddSymptoms = () => {
  const specialists = ['Dermatologist', 'Cardiologist', 'Neurologist', 'Orthopedic', 'Ophthalmologist'];

  const [formData, setFormData] = useState({
    symptoms: '',
    age: '',
    gender: '',
    anatomicalRegion: '',
    primarySpecialist: '',
    secondarySpecialist: '',
    tertiarySpecialist: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const client = algoliasearch('YourApplicationID', 'YourSearchOnlyAPIKey');
      const index = client.initIndex('YourIndexName');

      const objectToSave = {
        symptoms: formData.symptoms,
        age: formData.age,
        gender: formData.gender,
        anatomicalRegion: formData.anatomicalRegion,
        primarySpecialist: formData.primarySpecialist,
        secondarySpecialist: formData.secondarySpecialist,
        tertiarySpecialist: formData.tertiarySpecialist,
      };

      const result = await index.saveObject(objectToSave);

      console.log('Object saved to Algolia:', result);

      // Reset the form data
      setFormData({
        symptoms: '',
        age: '',
        gender: '',
        anatomicalRegion: '',
        primarySpecialist: '',
        secondarySpecialist: '',
        tertiarySpecialist: '',
      });

      // Open the success snackbar
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving object to Algolia:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add Search Data to Algolia
      </Typography>
      <Divider />

      <div>
        <TextField
          label="Symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="any">Any</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Data saved successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddSymptoms;
