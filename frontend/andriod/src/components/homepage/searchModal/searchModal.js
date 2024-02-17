import React, { useState } from "react";
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
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";

import "./searchModal.scss";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchDoctors } from "../../../actions/searchActions";
import Autosuggest from "react-autosuggest";
import algoliasearch from "algoliasearch/lite";
import dayjs from "dayjs";

// Algolia setup
const searchClient = algoliasearch(
  "LGS1V09J5I",
  "c7520fea6b34aed0d7451b5377b61583"
);
const index = searchClient.initIndex("dev_vinayakm");

const SearchDoctorsModal = ({ isOpen, onClose }) => {
  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [speciality, setSpeciality] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSuggestion,setSelectedSuggestion] = useState({})
  const onSuggestionSelected = (_, { suggestion }) => {
    // Store the entire selected object in the symptoms state
    // setSymptoms(suggestion);
    console.log(suggestion)
    setSelectedSuggestion(suggestion)
  };

  const getSuggestions = async (value) => {
    try {
      const result = await index.search(value);
      console.log(result.hits.map((hit) =>{
       return hit
    }))
      setSuggestions(result.hits.map((hit) => hit)); // Replace 'name' with the field you want to display
    } catch (error) {
      console.error("Algolia search error:", error);
      setSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value?.toLowerCase()?.trim());
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestions,e,v) => {
    console.log(suggestions,e,v)
    return (<div className="autocomplete title-case" dangerouslySetInnerHTML={{ __html: suggestions._highlightResult.Symptom.value }}></div>);
  };

  const onChange = (event, { newValue }) => {
    setSymptoms(newValue);
  };


  const handleSearch = () => {
    // You can process the values here, e.g., log them to the console
    console.log("Symptoms:", symptoms);
    console.log("Selected Date:", selectedDate);
    console.log("Speciality:", speciality);

    dispatch(searchDoctors(selectedDate, selectedSuggestion,symptoms));

    navigate({
      pathname: "/search",
      search: createSearchParams({
        date: selectedDate,
        speciality: JSON.stringify(selectedSuggestion),
        symptoms: symptoms,
      }).toString(),
    });
    // Close the modal
    onClose();
  };

  const getSuggestionValue = suggestion => {
    return suggestion.Symptom
   };

 


  return (
    <Modal open={isOpen} onClose={onClose} className="search-modal">
      <div className="modal-container">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6">Search Doctors</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <div className="modal-content">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Search symptoms...",
              value: symptoms,
              onChange: (e, { newValue }) => setSymptoms(newValue),
            }}
            onSuggestionSelected={onSuggestionSelected}
            className={'autocomplete-wrapper'}
          />

          <LocalizationProvider
            className="date-time"
            dateAdapter={AdapterDayjs}
          >
            <DemoContainer components={["DatePicker"]}>
              <DemoItem >
                {/* <DateTimePicker
                className="date-picker"
                  disablePast
                  views={["year", "month", "day"]}
                  label="Set Date"
                  defaultValue={dayjs(selectedDate)}
                  onChange={(newValue) => handleDateChange(newValue)}
                /> */}
            <DateField  className="date-picker"
                  disablePast
                  views={["year", "month", "day"]}
                  label="Set Date"
                  defaultValue={dayjs(selectedDate)}
                  onChange={(newValue) => handleDateChange(newValue)}/>

              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <FormControl
            variant="outlined"
            fullWidth
            className="speciality"
            style={{ display: "none" }}
          >
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
              <MenuItem value={"heart"}>Heart</MenuItem>
              <MenuItem value={"brain"}>Brain</MenuItem>
              <MenuItem value={"sanity"}>Sanity</MenuItem>
              <MenuItem value={"ent"}>ENT</MenuItem>
              <MenuItem value={"skin"}>Skin</MenuItem>
              <MenuItem value={"stomach"}>Stomach</MenuItem>
              <MenuItem value={"gyno"}>Gyno</MenuItem>
              <MenuItem value={"dentist"}>Dentist</MenuItem>
              <MenuItem value={"ortho"}>Ortho</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="search-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className="search"
            disabled={!symptoms}
          >
            Search
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchDoctorsModal;
