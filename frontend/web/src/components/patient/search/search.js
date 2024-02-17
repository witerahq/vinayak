import React, { useEffect, useState } from "react";
import "./search.scss";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Checkbox, Chip, FormControlLabel, FormGroup } from "@mui/material";
import docImage from "../../../assets/doc.svg";
import doc1Image from "../../../assets/doc1.svg";
import StarIcon from "@mui/icons-material/Star";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchDoctors } from "../../../actions/searchActions";
import moment from "moment";
import { setAppointmentCart } from "../../../actions/appointmentActions";
import SearchIcon from "@mui/icons-material/Search";
import SearchDoctorsModal from "../../homepage/searchModal/searchModal";

import dayjs from "dayjs";
import Autosuggest from "react-autosuggest";
import algoliasearch from "algoliasearch/lite";
import Subheader from "../../sub-header/subheader";
import noDoctor from "../../../assets/no-doc.webp";
import LanguageIcon from "@mui/icons-material/Language";
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';

const searchClient = algoliasearch(
  "LGS1V09J5I",
  "c7520fea6b34aed0d7451b5377b61583"
);
const index = searchClient.initIndex("dev_vinayakm");

function Search() {
  const searchFromStore = useSelector((state) => {
    console.log(state);
    return state.search.doctors;
  });
  const [search, setSearch] = useState(searchFromStore || []);
  const [searchParams, setSearchParams] = useSearchParams();

  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [speciality, setSpeciality] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const [selectedSuggestion, setSelectedSuggestion] = useState({});
  const onSuggestionSelected = (_, { suggestion }) => {
    // Store the entire selected object in the symptoms state
    // setSymptoms(suggestion);
    console.log(suggestion);
    setSelectedSuggestion(suggestion);
  };
  const searchSubmit = () => {
    console.log(symptoms, selectedDate, speciality);
    dispatch(searchDoctors(selectedDate, selectedSuggestion, symptoms));
    navigate({
      pathname: "/search",
      search: createSearchParams({
        date: selectedDate,
        speciality: JSON.stringify(selectedSuggestion),
        symptoms,
      }).toString(),
    });
  };
  const date = searchParams.get("date");
  const specialityParam = searchParams.get("speciality");
  const symptomsParam = searchParams.get("symptoms");
  useEffect(() => {
    if (!searchFromStore) {
      dispatch(
        searchDoctors(
          date,
          specialityParam?.includes("{")
            ? JSON.parse(specialityParam)
            : specialityParam,
          symptomsParam
        )
      );
    }
  }, [searchFromStore]);

  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    docDetail: null,
    timing: null,
    type: "online",
  });

  const bookAppointment = (event, docDetail, timing) => {
    setAppointment({
      docDetail,
      timing,
      type: "online",
    });
  };

  const book = () => {
    dispatch(
      setAppointmentCart({
        ...appointment,
      })
    );
    navigate({
      pathname: "/checkout",
      search: createSearchParams({
        date: searchParams.get("date"),
        speciality: searchParams.get("speciality"),
        symptoms: searchParams.get("symptoms"),
      }).toString(),
    });
  };
  const [isSearch, setIsSearch] = useState(false);

  const addHoursToDate = (date, time) => {
    // Parse the time string into hours and minutes

    var [hours, minutes] = time?.split(":")?.map((part) => parseInt(part, 10));

    // Check if the time is in the afternoon (PM) and adjust hours accordingly
    if (time.toLowerCase().includes("pm") && hours !== 12) {
      hours += 12;
    }

    // Create a new Date object and add the hours and minutes
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);

    return newDate;
  };

  const getSuggestions = async (value) => {
    try {
      const result = await index.search(value);
      console.log(
        result.hits.map((hit) => {
          return hit;
        })
      );
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
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.Symptom;
  };

  const checkTotalSlots = (value) => {
    var count = 0;
    Object.keys(value.availability.timeSlots).map((slot, i) => {
      return value.availability.timeSlots[slot].map((el, idx) => {
        if (
          new Date(
            addHoursToDate(value.availability.day, el.startTime.split("-")[0])
          ) >= new Date()
        ) {
          count++;
        }
      });
    });
    console.log(value, "value", count);
    return count;
  };

  return (
    <>
      {window.innerWidth < 992 ? (
        <SearchDoctorsModal
          isOpen={isSearch}
          onClose={(e) => setIsSearch(false)}
        ></SearchDoctorsModal>
      ) : null}
      <div className="Search">
        <div className="banner" style={{ display: "none" }}>
          <div className="container">
            <p className="heading">
              Book Your Appointment <br /> in few easy steps
            </p>

            <div
              className="appointment-button"
              onClick={(e) => setIsSearch(true)}
            >
              <div className="icon">
                <SearchIcon></SearchIcon>
              </div>
              <div className="text">
                <p>Query?</p>
                <p>Symptoms • Doctors • Location • Anything</p>
              </div>
            </div>
            {window.innerWidth > 992 ? (
              <div className="appointment-form">
                <div className="container">
                  <div className="appointment">
                    {/* <input
                      type="text"
                      placeholder="Search by symptoms, doctor's name"
                      className="symptoms"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    /> */}
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
                      className={"autocomplete-wrapper"}
                    />

                    <LocalizationProvider
                      className="date-time"
                      dateAdapter={AdapterDayjs}
                    >
                      <DemoContainer components={["DatePicker"]}>
                        <DemoItem>
                          <DateField
                            disablePast
                            views={["year", "month", "day"]}
                            label="Set Date"
                            defaultValue={dayjs(selectedDate)}
                            onChange={(newValue) => handleDateChange(newValue)}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="search">
                    <button
                      onClick={(e) => searchSubmit()}
                      disabled={!symptoms}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Subheader  route={"/"} text={"Doctors"}></Subheader>

        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search Symptoms, Doctors, Specialist..."
            onClick={(e) => {
              setIsSearch(true);
            }}
          />
          <div className="icon">
            <SearchIcon></SearchIcon>
          </div>
        </div>

        <section id="appointment">
          <div className="container">
            <aside id="filters">
              <p className="head">Filter By:</p>
              <div className="filters">
                <label className="head">Distance: (kms)</label>
                <Box>
                  <Slider
                    aria-label="Custom marks"
                    step={5}
                    max={25}
                    defaultValue={20}
                    valueLabelDisplay="auto"
                  />
                </Box>
              
              </div>
            </aside>
            <section id="search-result">
              <div className="heading">
                <p>
                  Results found for {searchParams.get("symptoms")} on{" "}
                  {moment(new Date()).format("Do MMM YY")}
                </p>
                <p>{searchFromStore?.length} Results Found</p>
              </div>
              <div className="appointment-cards">
                {searchFromStore?.length ? (
                  searchFromStore?.map((item, index) => {
                    return (
                      <div className="appointment-card" onClick={e=>{navigate('/doctor/'+item?._id)}}>
                        <div className="doc-image">
                          <img src={item?.image} alt="docIMage" />
                          <img src={item?.image} alt="docIMage1" />
                        </div>
                        <div className="booking-doc-details">
                          <div className="doc-detail">
                            <div className="profile">
                              <p>{item?.fullName}</p>
                              <p>{'General Physician'}</p>
                              <div className="work">
                              <WorkIcon fontSize="extrasmall"></WorkIcon>
                              <p>8 years</p>
                              </div>
                              <div className="location">
                              <ApartmentIcon fontSize="extrasmall"></ApartmentIcon>
                              <p>VinayakM, Meerut</p>
                              </div>
                            </div>
                          </div>
                          <div className="book-appointment">
                            <div className="lang">
                              <LanguageIcon fontSize="extrasmall"></LanguageIcon>
                              <p>{item?.lang?item?.lang:'English, हिन्दी'}</p>
                            </div>
                            <div className="price">
                              <p>₹ {item?.priceAppointment}</p>
                            </div>

                          </div>
                          <div className="book-appointment-btn">
                            <button>Book Appointment</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-result">
                    <img src={noDoctor} alt="no doctor" />
                    <p>
                      There is no result found please try some alternate
                      preference
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

export default Search;