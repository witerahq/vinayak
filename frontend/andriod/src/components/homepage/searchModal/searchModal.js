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
import commonSymptoms1 from "../../../assets/search-symptom-1.png";
import commonSymptoms2 from "../../../assets/search-symptom-2.png";
import commonSymptoms3 from "../../../assets/search-symptom-3.png";
import commonSymptoms4 from "../../../assets/search-symptom-4.png";
import commonSymptoms5 from "../../../assets/search-symptom-5.png";
import commonSymptoms6 from "../../../assets/search-symptom-6.png";
import commonSymptoms7 from "../../../assets/search-symptom-7.png";
import commonSymptoms8 from "../../../assets/search-symptom-8.png";

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

  const [selectedSuggestion, setSelectedSuggestion] = useState({});
  const onSuggestionSelected = (_, { suggestion }) => {
    console.log(suggestion);
    setSelectedSuggestion(suggestion);
  };

  const search = (value, key) => {
    dispatch(searchDoctors(new Date(), value));
    navigate({
      pathname: "/search",
      search: createSearchParams({
        [key]: value,
      }).toString(),
    });
  };

  const getSuggestions = async (value) => {
    try {
      const result = await index.search(value);
      console.log(
        result.hits.map((hit) => {
          return hit;
        })
      );
      setSuggestions(result.hits.map((hit) => hit));
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

  const renderSuggestion = (suggestions, e, v) => {
    console.log(suggestions, e, v);
    return (
      <div
        className="autocomplete title-case"
        dangerouslySetInnerHTML={{
          __html: suggestions._highlightResult.Symptom.value,
        }}
      ></div>
    );
  };

  const onChange = (event, { newValue }) => {
    setSymptoms(newValue);
  };

  const handleSearch = () => {
    console.log("Symptoms:", symptoms);
    console.log("Selected Date:", selectedDate);
    console.log("Speciality:", speciality);

    dispatch(searchDoctors(selectedDate, selectedSuggestion, symptoms));

    navigate({
      pathname: "/search",
      search: createSearchParams({
        speciality: JSON.stringify(selectedSuggestion),
        symptoms: symptoms,
      }).toString(),
    });
    onClose();
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.Symptom;
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="search-modal">
      <div className="modal-container">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          className="search-wrapper"
        >
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Search Symptoms, Doctors, Specialists...",
              value: symptoms,
              onChange: (e, { newValue }) => setSymptoms(newValue),
            }}
            onSuggestionSelected={onSuggestionSelected}
            className={"autocomplete-wrapper"}
          />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <div className="modal-content">
          <div className="common-symptoms-header">
            <p>Common Symptoms</p>
          </div>
          <div className="common-symptoms">
            <div className="common-symptom" onClick={e=>{search('Stomach Ache','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms1} alt="" />
              </div>
              <p>Stomach Ache</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Tooth Pain','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms2} alt="" />
              </div>
              <p>Tooth Pain</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Joint Pain','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms3} alt="" />
              </div>
              <p>Joint Pain</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Diabetes','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms4} alt="" />
              </div>
              <p>Diabetes</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Hairfall','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms5} alt="" />
              </div>
              <p>Hairfall</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Anxiety','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms6} alt="" />
              </div>
              <p>Anxiety</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Acne','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms7} alt="" />
              </div>
              <p>Acne</p>
            </div>
            <div className="common-symptom" onClick={e=>{search('Fever','symptoms')}}>
              <div className="image">
                <img src={commonSymptoms8} alt="" />
              </div>
              <p>Fever</p>
            </div>
          </div>
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
