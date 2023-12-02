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
    console.log(date, specialityParam, symptomsParam);
    if (!searchFromStore) {
      dispatch(
        searchDoctors(
          date,
          specialityParam.includes("{")
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
        <div className="banner">
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
                    <button onClick={(e) => searchSubmit()} disabled={!symptoms}>Search</button>
                  </div>
                </div>
              </div>
            ) : null}
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
                {/* <hr />
                                <label className='head'>Experience</label>
                                <Box >
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={20}
                                        step={10}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>
                                <hr />
                                <label className='head'>Availability</label>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Morning" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Noon" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Evening" />
                                </FormGroup>
                                <hr />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Today" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Tomorrow" />
                                </FormGroup>
                                <hr />
                                <label className='head'>Rating</label>
                                <Box >
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={20}
                                        step={10}
                                        valueLabelDisplay="auto"
                                    />
                                </Box> */}
              </div>
            </aside>
            <section id="search-result">
              <div className="heading">
                <p>
                  Results found for {searchParams.get("symptoms")} on{" "}
                  {moment(searchParams.get("date")).format("MMM Do YY")}
                </p>
                <p>{searchFromStore?.length} Results Found</p>
              </div>
              <div className="appointment-cards">
                {searchFromStore?.length ? (
                  searchFromStore?.map((item, index) => {
                    return (
                      <div className="appointment-card">
                        <div className="expand">
                          <ExpandCircleDownIcon
                            fontSize="medium"
                            htmlColor="black"
                          ></ExpandCircleDownIcon>
                        </div>
                        <div className="doc-image">
                          <img src={item?.image} alt="docIMage" />
                          <img src={item?.image} alt="docIMage1" />
                        </div>
                        <div className="booking-doc-details">
                          <div className="doc-detail">
                            <div className="profile">
                              <p>Dr. {item?.fullName}</p>
                              {item?.education ? <p>BDS, MDS</p> : null}
                            </div>
                            <div className="info">
                              {item?.experience ? (
                                <p>{item?.experience}+ Years of Experience</p>
                              ) : null}
                              <div className="tags">
                                <div className="langs">
                                  {item?.gender ? (
                                    <div className="lang">
                                      <p style={{ margin: 0 }}>
                                        {item?.gender=='male'?'Male':'Female'}
                                      </p>
                                    </div>
                                  ) : null}
                                  <div className="lang">
                                    <p style={{ margin: 0 }}>ENG</p>
                                  </div>
                                  <div className="lang">
                                    <p style={{ margin: 0 }}>हिंदी</p>
                                  </div>
                                </div>
                                <div className="rating">
                                
                                  <p style={{ margin: 0 }}>
                                    4.5{" "}
                                    <span>
                                      <StarIcon fontSize="small"></StarIcon>
                                    </span>
                                  </p>

                                </div>
                              </div>
                              <div className="more-details">
                                {item.hospital ? (
                                  <p className="hospital">{item.hospital}</p>
                                ) : null}
                                <p className="subhead">Available from:</p>
                                {/* <p className="days">Monday - Saturday</p> */}
                                <p
                                  style={{
                                    fontSize: "11px",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                  }}
                                  className="timing"
                                >
                                  Morning:{" "}
                                  {
                                    item.availability.timeSlots["morning"][0]
                                      .startTime
                                  }{" "}
                                  to{" "}
                                  {
                                    item.availability.timeSlots["morning"][
                                      item.availability.timeSlots["morning"]
                                        .length - 1
                                    ].endTime
                                  }
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                  }}
                                  className="timing"
                                >
                                  Afternoon:{" "}
                                  {
                                    item.availability.timeSlots["afternoon"][0]
                                      .startTime
                                  }{" "}
                                  to{" "}
                                  {
                                    item.availability.timeSlots["afternoon"][
                                      item.availability.timeSlots["morning"]
                                        .length - 1
                                    ].endTime
                                  }
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                  }}
                                  className="timing"
                                >
                                  Evening:{" "}
                                  {
                                    item.availability.timeSlots["evening"][0]
                                      .startTime
                                  }{" "}
                                  to{" "}
                                  {
                                    item.availability.timeSlots["evening"][
                                      item.availability.timeSlots["morning"]
                                        .length - 1
                                    ].endTime
                                  }
                                </p>
                                {/* <p className="timing">2:00 PM to 7:00 PM</p> */}
                                <p style={{ fontSize: "12px", opacity: 0.7 }}>
                                  If the preferred time slots are not available,
                                  please feel free to contact us:{" "}
                                  {item.phoneNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="booking-detail">
                            <div className="heading">
                              <p style={{ fontWeight: 500 }}>
                                Book Your Slot:{" "}
                              </p>
                            </div>
                            <div className="timings">
                              {checkTotalSlots(item) ? (
                                Object.keys(item.availability.timeSlots).map(
                                  (slot, i) => {
                                    return item.availability.timeSlots[
                                      slot
                                    ].map((el, idx) => {
                                      if (
                                        new Date(
                                          addHoursToDate(
                                            item.availability.day,
                                            el.startTime.split("-")[0]
                                          )
                                        ) >= new Date()
                                      )
                                        return (
                                          <Chip
                                            className={"timing " + el.status}
                                            label={
                                              el.startTime + " - " + el.endTime
                                            }
                                            onClick={(e) =>
                                              bookAppointment(e, item, el)
                                            }
                                          ></Chip>
                                        );
                                    });
                                  }
                                )
                              ) : (
                                <p
                                  style={{
                                    marginTop: 0,
                                    marginBottom: "12px",
                                    fontSize: "12px",
                                  }}
                                >
                                  No slot available.
                                </p>
                              )}
                            </div>
                            <div className="book-button">
                              <button
                                onClick={(e) => {
                                  book();
                                }}
                                disabled={
                                  !checkTotalSlots(item) || !appointment.timing
                                }
                              >
                                Book Appointment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-result">
                    There is no result found please try some alternate
                    preference
                  </p>
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
