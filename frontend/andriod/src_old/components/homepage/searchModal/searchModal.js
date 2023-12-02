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
import { LocalizationProvider } from "@mui/x-date-pickers";

import "./searchModal.scss";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchDoctors } from "../../../actions/searchActions";
import Autocomplete from "react-autosuggest";
import algoliasearch from "algoliasearch/lite";

// Algolia setup
const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");
const index = searchClient.initIndex("YourIndexName");

const SearchDoctorsModal = ({ isOpen, onClose }) => {
  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, handleDateChange] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSuggestions = async (value) => {
    try {
      const result = await index.search(value);
      setSuggestions(result.hits.map((hit) => hit.name)); // Replace 'name' with the field you want to display
    } catch (error) {
      console.error("Algolia search error:", error);
      setSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const onChange = (event, { newValue }) => {
    setSymptoms(newValue);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setSymptoms(suggestion);
  };

  const handleSearch = () => {
    // You can process the values here, e.g., log them to the console
    console.log("Symptoms:", symptoms);
    console.log("Selected Date:", selectedDate);
    console.log("Speciality:", speciality);

    dispatch(searchDoctors(selectedDate, speciality));

    navigate({
      pathname: "/search",
      search: createSearchParams({
        date: selectedDate,
        speciality: speciality,
        symptoms: speciality,
      }).toString(),
    });
    // Close the modal
    onClose();
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
          <Autocomplete
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Search symptoms...",
              value: symptoms,
              onChange: (e, { newValue }) => setSymptoms(newValue),
            }}
          />

          <LocalizationProvider
            className="date-time"
            dateAdapter={AdapterDayjs}
          >
            <DemoContainer components={["DatePicker"]}>
              <DemoItem>
                <DateTimePicker
                  disablePast
                  views={["year", "month", "day"]}
                  label="Set Date"
                  value={selectedDate}
                  onChange={(newValue) => handleDateChange(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <FormControl variant="outlined" fullWidth className="speciality">
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
          >
            Search
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchDoctorsModal;
