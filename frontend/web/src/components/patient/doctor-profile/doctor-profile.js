import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@material-ui/core";
import "./doctor-profile.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchDoctorById } from "../../../actions/userActions";
import Subheader from "../../sub-header/subheader";
import moment from "moment";
import LanguageIcon from "@mui/icons-material/Language";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import map from "../../../assets/map.png";
import { setAppointmentCart } from "../../../actions/appointmentActions";

const getTimeSlots = (period) => {
  // Replace this with your actual logic to get time slots
  // For simplicity, using hardcoded values here
  switch (period) {
    case "morning":
      return ["9:00 AM", "10:00 AM", "11:00 AM"];
    case "afternoon":
      return ["1:00 PM", "2:00 PM", "3:00 PM"];
    case "evening":
      return ["6:00 PM", "7:00 PM", "8:00 PM"];
    default:
      return [];
  }
};

const DoctorProfile = () => {
  const [value, setValue] = useState(0);
  const { id } = useParams();



  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dispatch the searchDoctorById action when the component mounts
  useEffect(() => {
    dispatch(searchDoctorById(id));
  }, [dispatch, id]);

  const { doctor, availability } = useSelector((state) => {
    return state.user;
  });

  const [appointment, setAppointment] = useState({
    docDetail: null,
    timing: null,
    type: "online",
    day:null,
    availability:null
  });

  const handleChange = (event, newValue) => {
    setAppointment({
      docDetail: null,
      timing: null,
      type: "online",
      day:null,
      availability:null
    });
    setValue(newValue);
  };

  const bookAppointment = (event, docDetail, timing,day,book) => {
    event.preventDefault();
    if(book){
      setAppointment({
        docDetail:docDetail,
        timing:timing,
        type: "online",
        day:day,
        availability:availability[value]
      });
      console.log(appointment)
    }
  };

  const book = () => {
    if(appointment.docDetail && appointment.timing && appointment.type){
      dispatch(
        setAppointmentCart({
          ...appointment,
        })
      );
      navigate({
        pathname: "/checkout",
        search: createSearchParams({
          // date: searchParams.get("date"),
          // speciality: searchParams.get("speciality"),
          // symptoms: searchParams.get("symptoms"),
        }).toString()
      });
    }
  };

 

  

  return (
    <div className="doctor-profile">
      <Subheader  route={"/"} text={"Doctors search"}></Subheader>
      <div className="container">
        <div className="profile">
          <div className="image">
            <img src={doctor?.image} alt="doctor image" />
          </div>
          <div className="details">
            <p className="name">{doctor?.fullName}</p>
            <p className="specialist">
              {doctor?.specialist} | {doctor?.experience} years exp
            </p>
            <div className="location">
              <p>{doctor?.city}</p>
            </div>
          </div>
        </div>
        <div className="slots">
          <Accordion expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Consult timings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                  {availability?.map((item, index) => {
                    return (
                      <Tab label={moment(item.day).format("DD MMM")}></Tab>
                    );
                  })}
                </Tabs>

                {availability?.map((item, index) => {
                  let keys = Object.keys(item.timeSlots);
                  return keys?.map((key) => {
                    return (
                      <TabPanel
                        value={value}
                        index={index}
                        className="slots-category"
                      >
                        <h2 className="slots-timing-header">{key} slots</h2>
                        <TimeSlotChips
                          period="morning"
                          availableSlots={item.timeSlots[key]}
                          availableSlotDay={item.day}
                          doctor={doctor}
                          bookAppointment={(event,docDetail,timing,day,rightTime)=>bookAppointment(event,docDetail,timing,day,rightTime)}
                        />
                        <TimeSlotChips period="afternoon" />
                        <TimeSlotChips period="evening" />
                      </TabPanel>
                    );
                  });
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="more-details">
          <h4>More about Dr. {doctor?.fullName}</h4>
          <div className="lang">
            <LanguageIcon></LanguageIcon>
            <p>English, हिन्दी</p>
          </div>
          <div className="mrn">
            <BadgeIcon></BadgeIcon>
            <p>1234890000</p>
          </div>
          <div className="education">
            <SchoolIcon></SchoolIcon>
            <p>{doctor?.education}</p>
          </div>
        </div>
        <div className="about-clinic">
          <h4>
            About Clinic{" "}
            <span>
              <PhoneIcon></PhoneIcon> Call clinic
            </span>
          </h4>
          <div className="address">
            <LocationOnIcon></LocationOnIcon>
            <p>2, Purva Apartment, 24/10 , Shivaji Nagar, Pune, 411005</p>
          </div>
          <div className="map">
            <img src={map} alt="" />
          </div>
        </div>
        <div className="proceed"><button className={(appointment.docDetail && appointment.timing && appointment.type)?"":'disabled'} onClick={e=>book()}>Proceed</button></div>

      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

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

const TimeSlotChips = ({ period, availableSlots, availableSlotDay,doctor,bookAppointment }) => {
  const timeSlots = getTimeSlots(period);
  let newDoctor = doctor
  return (
    <div className="chips">
      {availableSlots?.map((timeSlot, index) => {
      let rightTime = new Date(addHoursToDate(availableSlotDay,timeSlot["startTime"])) >= new Date() && timeSlot.status != 'blocked' && timeSlot.status != 'booked'
        return (
          <Chip
            label={timeSlot["startTime"]}
            onClick={(e) => {bookAppointment(e,newDoctor,timeSlot,availableSlotDay,rightTime)}}
            className={"chip "+ (rightTime?'':'disabled') }
          />
        );
      })}
    </div>
  );
};

export default DoctorProfile;
