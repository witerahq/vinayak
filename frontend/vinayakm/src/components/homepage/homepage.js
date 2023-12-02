import React, { useEffect, useState } from "react";
import "./homepage.scss";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import whyImage from "../../assets/why.svg";
import clinicImage from "../../assets/clinic.svg";
import testimonial1 from "../../assets/t1.svg";
import testimonial2 from "../../assets/t2.svg";
import testimonial3 from "../../assets/t3.svg";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import Verify from "../auth/verify/verify";
import { useDispatch } from "react-redux";
import { searchDoctors } from "../../actions/searchActions";

import SearchIcon from "@mui/icons-material/Search";
import SearchDoctorsModal from "./searchModal/searchModal";
import dayjs from "dayjs";
import Autosuggest from "react-autosuggest";
import algoliasearch from "algoliasearch/lite";

// Algolia setup
const searchClient = algoliasearch(
  "LGS1V09J5I",
  "c7520fea6b34aed0d7451b5377b61583"
);
const index = searchClient.initIndex("dev_vinayakm");

function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("auth"));
  }, [searchParams]);

  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [speciality, setSpeciality] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch(); 
   const [selectedSuggestion,setSelectedSuggestion] = useState({})
  const onSuggestionSelected = (_, { suggestion }) => {
    // Store the entire selected object in the symptoms state
    // setSymptoms(suggestion);
    console.log(suggestion)
    setSelectedSuggestion(suggestion)
  };
  const searchSubmit = () => {
    dispatch(searchDoctors(selectedDate, selectedSuggestion,symptoms));
    navigate({
      pathname: "/search",
      search: createSearchParams({
        date: selectedDate,
        speciality:JSON.stringify(selectedSuggestion),
        symptoms,
      }).toString(),
    });
  };



  const search = (value) => {
    dispatch(searchDoctors(new Date(), value));
    navigate({
      pathname: "/search",
      search: createSearchParams({
        date: new Date(),
        speciality: value,
        symptoms:value,
      }).toString(),
    });
  };

  const [isSearch, setIsSearch] = useState(false);


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

  const getSuggestionValue = suggestion => {
    return suggestion.Symptom
   };

  return (
    <>
      {window.innerWidth >= 992 ? (
        searchParams.get("auth") === "register" ? (
          <Register></Register>
        ) : searchParams.get("auth") === "login" ? (
          <Login></Login>
        ) : searchParams.get("verify")?.length ? (
          <Verify></Verify>
        ) : null
      ) : null}
      {window.innerWidth < 992 ? (
        <SearchDoctorsModal
          isOpen={isSearch}
          onClose={(e) => setIsSearch(false)}
        ></SearchDoctorsModal>
      ) : null}
      <div className="Homepage">
        <div className="banner">
          <div className="container">
            <p className="heading">
              Book Your Appointment <br /> in few easy steps
            </p>

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
            ) : (
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
            )}
          </div>
        </div>

        <section id="why">
          <div className="container">
            <p className="heading">Why Us?</p>
            <div className="why-content">
              <div className="why-text">
                <ul>
                  <li>
                    We offer a user-friendly platform that allows you to
                    effortlessly book appointments with your preferred doctors.
                    Say goodbye to long waiting times and endless phone calls.
                    Our app streamlines the entire process, ensuring that you
                    can secure a consultation in just a few clicks.
                  </li>
                  <li>
                    We have a vast network of trusted healthcare professionals,
                    covering a wide range of specialties. Whether you need a
                    general check-up or require a specialist's expertise, our
                    app connects you with a diverse pool of doctors, making it
                    easy to find the right healthcare provider for your specific
                    needs.
                  </li>
                  <li>
                    Managing your healthcare has never been easier. Our app not
                    only helps you book appointments but also sends timely
                    reminders, so you never miss a scheduled visit. You can
                    access your appointment details, medical records, and more,
                    all in one place. We're here to simplify your healthcare
                    journey and put your well-being first.
                  </li>
                </ul>
              </div>
              <div className="why-image">
                <img src={whyImage} alt="why us image" />
              </div>
            </div>
          </div>
        </section>

        <section id="consult">
          <div className="container">
            <div className="heading">
              <p>Consult top doctors online for any health concern</p>
              <button
                onClick={(e) => {
                  search("heart");
                }}
              >
                View More
              </button>
            </div>
            <div className="consult-types">
              <div
                className="consult-type stomach"
                onClick={(e) => {
                  search("stomach");
                }}
              >
                <p>Stomach</p>
              </div>
              <div
                className="consult-type heart"
                onClick={(e) => {
                  search("heart");
                }}
              >
                <p>Heart</p>
              </div>
              <div
                className="consult-type skin"
                onClick={(e) => {
                  search("skin");
                }}
              >
                <p>Skin</p>
              </div>
              <div
                className="consult-type children"
                onClick={(e) => {
                  search("children");
                }}
              >
                <p>Children</p>
              </div>
              <div
                className="consult-type ent"
                onClick={(e) => {
                  search("ent");
                }}
              >
                <p>ENT</p>
              </div>
              <div
                className="consult-type sanity"
                onClick={(e) => {
                  search("sanity");
                }}
              >
                <p>Sanity</p>
              </div>
              <div
                className="consult-type ortho"
                onClick={(e) => {
                  search("ortho");
                }}
              >
                <p>Ortho</p>
              </div>
              <div
                className="consult-type gyno"
                onClick={(e) => {
                  search("gyno");
                }}
              >
                <p>Gyno</p>
              </div>
              <div
                className="consult-type dentist"
                onClick={(e) => {
                  search("dentist");
                }}
              >
                <p>Dentist</p>
              </div>
              <div
                className="consult-type physcian"
                onClick={(e) => {
                  search("dentist");
                }}
              >
                <p>Physician</p>
              </div>
            </div>
          </div>
        </section>

        <section id="clinic">
          <div className="container">
            <div className="heading">
              <p>Book an appointment for an in-clinic consultation</p>
              <button
                onClick={(e) => {
                  search("heart");
                }}
              >
                View More
              </button>
            </div>
            <div className="clinic-types">
              {new Array(1).fill(0).map(() => {
                return (
                  <div
                    className="clinic-type"
                    onClick={(e) => {
                      search("all");
                    }}
                  >
                    <div className="clinic-text">
                      <p>Meerut</p>

                      <p>VinayakM</p>
                    </div>
                    <div className="clinic-image">
                      <img src={clinicImage} alt="clinic image" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonial">
          <div className="container">
            <div className="heading">
              <p>Listen from our users</p>
            </div>
            <div className="testimonial-users">
              <div className="testimonial-user">
                <div className="image">
                  <img src={testimonial1} alt="testimonial user 1" />
                </div>
                <div className="text">
                  <p>
                    {" "}
                    "VinayakM has truly changed the way I approach healthcare.
                    The convenience of booking appointments and receiving timely
                    reminders is a game-changer. I no longer stress about
                    managing my healthcare needs. The app's extensive doctor
                    network ensures I can always find the right specialist.
                    Thank you, VinayakM, for making healthcare hassle-free!"
                  </p>
                </div>
              </div>
              <div className="testimonial-user">
                <div className="image">
                  <img src={testimonial2} alt="testimonial user 2" />
                </div>
                <div className="text">
                  <p>
                    "I can't recommend VinayakM enough! As someone with a hectic
                    schedule, the app's user-friendly interface and quick
                    appointment booking feature have been a lifesaver. Plus,
                    their diverse range of doctors allowed me to find the
                    perfect match for my needs. VinayakM is my go-to for all my
                    medical appointments."
                  </p>
                </div>
              </div>
              <div className="testimonial-user">
                <div className="image">
                  <img src={testimonial3} alt="testimonial user 3" />
                </div>
                <div className="text">
                  <p>
                    "VinayakM has made a significant difference in my healthcare
                    journey. Not only can I book appointments with ease, but the
                    app also keeps me organized with all my medical records and
                    appointment history in one place. The reminders are
                    invaluable, ensuring I never forget a check-up or
                    consultation. It's a must-have app for anyone who values
                    their health and time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="know">
          <div className="container">
            <div className="heading">
              <p>Know more about us</p>
            </div>
            <div className="know-text">
              <p>
                At VinayakM, our mission is to transform the way you access
                healthcare. We believe that everyone deserves convenient,
                reliable, and stress-free healthcare solutions. Our doctor
                appointment booking app is designed to put your well-being
                first, offering a seamless experience from start to finish.
              </p>
              <p className="subhead">Our Commitment to You</p>
              <p>
                We understand that your time is precious, and your health is a
                top priority. With VinayakM, you can easily book appointments
                with just a few taps on your smartphone. Say goodbye to long
                waiting times and the frustration of navigating complex
                healthcare systems.
              </p>
              <button onClick={(e) => navigate("/about")}>Read More</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Homepage;
