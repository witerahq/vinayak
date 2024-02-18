import Calendar from "../../fullCalendar/fullCalendar";
import "./insight.scss";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsDoctor } from "../../../actions/bookingActions";
import { getCurrentUser } from "../../../actions/userActions";
import moment from "moment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentsIcon from "@mui/icons-material/Payments";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Avatar } from "@mui/material";
import doctorIcon from "../../../assets/doctor-icon.svg";
import { useNavigate } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import OfferImage from '../../../assets/offer.png';
function Insights() {
  const [greeting, setGreeting] = useState("");

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

  const userFromStore = useSelector((state) => {
    return state.user.user;
  });
  const appointmentFromStore = useSelector((state) => {
    return state.booking.appointments;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!appointmentFromStore) dispatch(fetchAppointmentsDoctor());
  }, [appointmentFromStore]);

  useEffect(() => {
    if (!userFromStore) {
      dispatch(getCurrentUser());
    }
  }, [userFromStore]);

  const eventFromStore = useSelector((state) => {
    if (state.booking.appointments) {
      let newBooking = state.booking.appointments.map((item) => {
        if (item?.time?.length)
          return {
            title: "Appointment with " + item?.patientId?.fullName,
            start: addHoursToDate(item.date, item?.time?.split("-")[0]),
            end: addHoursToDate(item.date, item?.time?.split("-")[0]),
          };
      });
      console.log(newBooking);

      return newBooking;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  return (
    <div className="Insights">
      <div className="container">
        <div className="doctor-detail">
          <Avatar src={doctorIcon} sx={{ width: 50, height: 50 }}></Avatar>
          <p>
            {greeting}, <span>{userFromStore?.fullName}!</span>
          </p>
        </div>

        <div className="quick-actions">
          <div className="header">
            <p>Quick Actions</p>
          </div>
          <div className="cards">
            <div
              className="quick-action"
              onClick={(e) => navigate("/dashboard/patients/")}
            >
              <div className="icon">
                <PersonAddAltIcon></PersonAddAltIcon>
              </div>
              <div className="text">
                <p>Patients</p>
              </div>
            </div>
            <div
              className="quick-action"
              onClick={(e) => navigate("/dashboard/appointments/")}
            >
              <div className="icon">
                <CalendarMonthIcon></CalendarMonthIcon>
              </div>
              <div className="text">
                <p>Appointments</p>
              </div>
            </div>
            <div
              className="quick-action"
              onClick={(e) => navigate("/dashboard/payments/")}
            >
              <div className="icon">
                <PaymentsIcon></PaymentsIcon>
              </div>
              <div className="text">
                <p>View Payments</p>
              </div>
            </div>
            <div
              className="quick-action"
              onClick={(e) => navigate("/dashboard/prescriptions/")}
            >
              <div className="icon">
                <VaccinesIcon></VaccinesIcon>
              </div>
              <div className="text">
                <p>Prescriptions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="your-stats">
          <div className="header">
            <div className="icon">
              <BarChartIcon></BarChartIcon>
              <p>Your Stats</p>
            </div>
          </div>
          <div className="stat-cards">
            <div className="stat-card">
              <p className="head">Total Appt.</p>
              <p>{appointmentFromStore?.length}</p>
            </div>
            <div className="stat-card">
              <p className="head">Total Earning</p>
              <p>
                ₹{" "}
                {appointmentFromStore?.length * userFromStore?.priceAppointment}
              </p>
            </div>
            <div className="stat-card">
              <p className="head">Total Prescriptions</p>
              <p>{appointmentFromStore?.length}</p>
            </div>
          </div>
        </div>

        <div className="schedule-calendar">
          {/* <p className="heading">Schedule</p> */}
          <Calendar event={eventFromStore}></Calendar>
        </div>

        <div className="easy-access">
          <div className="heading">
            <p>Manage Your Clinic</p>
          </div>
          <div className="cards">
            <div className="card">
              <div className="icon">
                <SettingsOutlinedIcon></SettingsOutlinedIcon>
              </div>
              <div className="text">
                <p>Clinic Settings</p>
              </div>
            </div>
            <div className="card" onClick={e=>{navigate('/profile')}}>
              <div className="icon">
                <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
              </div>
              <div className="text">
                <p>My Profile</p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <QueryStatsOutlinedIcon></QueryStatsOutlinedIcon>
              </div>
              <div className="text">
                <p>Clinic Reports</p>
              </div>
            </div>
          </div>
        </div>

        <div className="offering">
          <div className="heading"><p>Explore our Offerings</p></div>
          <div className="content">
            <img src={OfferImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
