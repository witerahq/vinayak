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

import "./specialist.scss";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchDoctors } from "../../actions/searchActions";
import Autosuggest from "react-autosuggest";
import algoliasearch from "algoliasearch/lite";
import dayjs from "dayjs";
import commonSymptoms1 from '../../assets/consult-1.png';
import commonSymptoms2 from '../../assets/consult-2.png';
import commonSymptoms3 from '../../assets/consult-3.png';
import commonSymptoms4 from '../../assets/consult-4.png';
import commonSymptoms5 from '../../assets/consult-20.png';
import commonSymptoms6 from '../../assets/consult-6.png';
import commonSymptoms7 from '../../assets/consult-7.png';
import commonSymptoms8 from '../../assets/consult-8.png';
import commonSymptoms9 from '../../assets/consult-9.png';
import commonSymptoms10 from '../../assets/consult-10.png';
import commonSymptoms11 from '../../assets/consult-11.jpeg';
import commonSymptoms12 from '../../assets/consult-12.jpeg';
import commonSymptoms13 from '../../assets/consult-13.png';
import commonSymptoms14 from '../../assets/consult-14.png';
import commonSymptoms15 from '../../assets/consult-15.png';
import commonSymptoms16 from '../../assets/consult-16.jpeg';
import commonSymptoms17 from '../../assets/consult-17.png';
import commonSymptoms18 from '../../assets/consult-18.jpeg';
import commonSymptoms19 from '../../assets/consult-19.png';
import specialistImage1 from '../../assets/sym-1.jpeg';
import specialistImage2 from '../../assets/sym-2.jpeg';
import specialistImage3 from '../../assets/sym-3.jpeg';
import specialistImage4 from '../../assets/sym-4.jpeg';
import specialistImage5 from '../../assets/sym-5.jpeg';
import specialistImage6 from '../../assets/sym-6.jpeg';
import specialistImage7 from '../../assets/sym-7.jpeg';
import specialistImage8 from '../../assets/sym-8.jpeg';
import specialistImage9 from '../../assets/sym-9.jpeg';
import specialistImage10 from '../../assets/sym-10.jpeg';
import specialistImage11 from '../../assets/sym-11.jpeg';
import specialistImage12 from '../../assets/sym-12.jpeg';
import specialistImage13 from '../../assets/sym-13.jpeg';
import specialistImage14 from '../../assets/sym-14.png';
import specialistImage15 from '../../assets/sym-15.jpeg';


// Algolia setup
const searchClient = algoliasearch(
  "LGS1V09J5I",
  "c7520fea6b34aed0d7451b5377b61583"
);
const index = searchClient.initIndex("dev_vinayakm");

const SpecialistDoctorsModal = ({ isOpen, onClose }) => {
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

  const search = (value, key) => {
    dispatch(searchDoctors(new Date(), value));
    navigate({
      pathname: "/search",
      search: createSearchParams({
        [key]: value,
      }).toString(),
    });
  };


  const handleSearch = () => {
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

    <Modal open={isOpen} onClose={onClose} className="specialist-modal">
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
            className={'autocomplete-wrapper'}
          />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <div className="modal-content">
          <div className="common-symptoms-header">
            <p>All specialist</p>
          </div>
          <div className="common-symptoms">
            <div className="common-symptom" onClick={e=>search('Psychiatrist','speciality')}>
              <div className="image">
                <img src={commonSymptoms1} alt="" />
              </div>
              <p>Psychiatrist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Homeopath','speciality')}>
              <div className="image">
                <img src={commonSymptoms2} alt="" />
              </div>
              <p>Homeopath</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Ophthalmologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms3} alt="" />
              </div>
              <p>Ophthalmologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('ENT','speciality')}>
              <div className="image">
                <img src={commonSymptoms4} alt="" />
              </div>
              <p>ENT</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Dermatologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms5} alt="" />
              </div>
              <p>Dermatologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Ayurveda','speciality')}>
              <div className="image">
                <img src={commonSymptoms6} alt="" />
              </div>
              <p>Ayurveda</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Paediatrician','speciality')}>
              <div className="image">
                <img src={commonSymptoms7} alt="" />
              </div>
              <p>Paediatrician</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Gynaecologist & Obstetrician','speciality')}>
              <div className="image">
                <img src={commonSymptoms8} alt="" />
              </div>
              <p>Gynaecologist & Obstetrician</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Dentist','speciality')}>
              <div className="image">
                <img src={commonSymptoms9} alt="" />
              </div>
              <p>Dentist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('General Physician','speciality')}>
              <div className="image">
                <img src={commonSymptoms10} alt="" />
              </div>
              <p>General Physician</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Endocrinologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms11} alt="" />
              </div>
              <p>Endocrinologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Dietitian','speciality')}>
              <div className="image">
                <img src={commonSymptoms12} alt="" />
              </div>
              <p>Dietitian</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Diabetologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms13} alt="" />
              </div>
              <p>Diabetologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Urologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms14} alt="" />
              </div>
              <p>Urologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Pulmonologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms15} alt="" />
              </div>
              <p>Pulmonologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Gastroenterologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms16} alt="" />
              </div>
              <p>Gastroenterologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Neurologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms17} alt="" />
              </div>
              <p>Neurologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Cardiologist','speciality')}>
              <div className="image">
                <img src={commonSymptoms18} alt="" />
              </div>
              <p>Cardiologist</p>
            </div>
            <div className="common-symptom" onClick={e=>search('Orthopaedic','speciality')}>
              <div className="image">
                <img src={commonSymptoms19} alt="" />
              </div>
              <p>Orthopaedic</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>General Physician</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Cold & Cough','symptoms')}}>
              <div className="image">
                <img src={specialistImage15} alt="" />
              </div>
              <p>Cold & Cough</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Fever','symptoms')}}>
              <div className="image">
                <img src={specialistImage14} alt="" />
              </div>
              <p>Fever</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Diarrhoea','symptoms')}}>
              <div className="image">
                <img src={specialistImage13} alt="" />
              </div>
              <p>Diarrhoea</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Headache','symptoms')}}>
              <div className="image">
                <img src={specialistImage12} alt="" />
              </div>
              <p>Headache</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>Dentist</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Toothache','symptoms')}}>
              <div className="image">
                <img src={specialistImage11} alt="" />
              </div>
              <p>Toothache</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Dental Caries','symptoms')}}>
              <div className="image">
                <img src={specialistImage11} alt="" />
              </div>
              <p>Dental Caries</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>Dermatologist</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Hair Fall','symptoms')}}>
              <div className="image">
                <img src={specialistImage10} alt="" />
              </div>
              <p>Hair Fall</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Skin Infection','symptoms')}}>
              <div className="image">
                <img src={specialistImage9} alt="" />
              </div>
              <p>Skin Infection</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>Gynaecologist & Obstetrician</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Menstrual Problems','symptoms')}}>
              <div className="image">
                <img src={specialistImage8} alt="" />
              </div>
              <p>Menstrual Problems</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Pregnancy','symptoms')}}>
              <div className="image">
                <img src={specialistImage7} alt="" />
              </div>
              <p>Pregnancy</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Periods','symptoms')}}>
              <div className="image">
                <img src={specialistImage6} alt="" />
              </div>
              <p>Periods</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>ENT</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Ear Pain','symptoms')}}>
              <div className="image">
                <img src={specialistImage5} alt="" />
              </div>
              <p>Ear Pain</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Throat Infection','symptoms')}}>
              <div className="image">
                <img src={specialistImage4} alt="" />
              </div>
              <p>Throat Infection</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>Orthopaedic</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Body Ache','symptoms')}}>
              <div className="image">
                <img src={specialistImage3} alt="" />
              </div>
              <p>Body Ache</p>
            </div>
            <div className="common-specialist" onClick={e=>{search('Joint Pain','symptoms')}}>
              <div className="image">
                <img src={specialistImage2} alt="" />
              </div>
              <p>Joint Pain</p>
            </div>
          </div>
          <div className="common-symptoms-header">
            <p>Psychiatrist</p>
          </div>
          <div className="common-specialists">
            <div className="common-specialist" onClick={e=>{search('Anxiety','symptoms')}}>
              <div className="image">
                <img src={specialistImage1} alt="" />
              </div>
              <p>Anxiety</p>
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

export default SpecialistDoctorsModal;
