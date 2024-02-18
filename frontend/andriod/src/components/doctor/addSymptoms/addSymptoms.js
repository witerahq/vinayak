import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Snackbar,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

// import MuiAlert from '@material-ui/lab/Alert';
import algoliasearch from "algoliasearch";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from 'react-redux';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, Chip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';

const searchClient = algoliasearch(
  "LGS1V09J5I",
  "7ada72ac4aced8301591fd628d806047"
);
const index = searchClient.initIndex("dev_vinayakm");

const AddSymptoms = () => {
  const specialists = [
    "Dermatologist",
    "Cardiologist",
    "Neurologist",
    "Orthopedic",
    "Ophthalmologist",
  ];

  const [formData, setFormData] = useState({
    symptoms: "",
    age: "",
    gender: "",
    anatomicalRegion: "",
    primarySpecialist: "",
    secondarySpecialist: "",
    tertiarySpecialist: "",
  });

  const userFromStore = useSelector((state)=>{
    console.log(state)
    return state.user.user
  })

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
      const objectToSave = {
        Symptom: formData.symptoms,
        Age: formData.age,
        Sex: formData.gender,
        "Primary Specialist": userFromStore["Primary Specialist"],
        "Secondary Specialist": userFromStore["Secondary Specialist"],
        "Tertiary Specialist": userFromStore["Tertiary Specialist"],
        "Anatomical Region": userFromStore.speciality,
        objectID:uuidv4()
      };

      console.log(index)

      const result = await index.saveObject(objectToSave);

      console.log("Object saved to Algolia:", result);

      // Reset the form data
      setFormData({
        symptoms: "",
        age: "",
        gender: "",
        anatomicalRegion: "",
        primarySpecialist: "",
        secondarySpecialist: "",
        tertiarySpecialist: "",
      });

      enqueueSnackbar("Data added to the search...", { variant: "success" });

      // Open the success snackbar
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving object to Algolia:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className="Patients">
      <div className="container">
        <div className="header">
          <p>Add search data</p>
        </div>
        <div>

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

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "24px" }}
              disabled={!formData.age || !formData.gender || !formData.symptoms}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSymptoms;
