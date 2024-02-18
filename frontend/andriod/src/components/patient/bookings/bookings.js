import "./booking.scss";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookingTable from "./booking-table/booking-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsPatient } from "../../../actions/bookingActions";
import Subheader from "../../sub-header/subheader";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventIcon from "@mui/icons-material/Event";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import BookingImage from '../../../assets/no-file.png';
function Bookings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const bookingFromStore = useSelector((state) => {
    console.log(state);
    return state.booking.appointments;
  });
  const [booking, setBooking] = React.useState(bookingFromStore || []);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!bookingFromStore) dispatch(fetchAppointmentsPatient());
  }, [bookingFromStore]);

  return (
    <>
      <Subheader route={"/"} text={"Your bookings"}></Subheader>
      <div className="Booking">
        <div className="container">
          <Box sx={{ width: "100%" }}>
            {bookingFromStore?.length ? (
              bookingFromStore?.map((item, index) => {
                console.log(item, "item");
                return (
                  <Card className="booking-card">
                    <CardHeader
                      className="header"
                      subheader={
                        <>
                          <div className="date">
                            <IconButton color="primary">
                              <CalendarTodayIcon fontSize="small" />
                            </IconButton>
                            <p>{moment(item?.date).format("Do MMM YY")}</p>
                          </div>
                          <div className="time">
                            <IconButton color="primary">
                              <AccessTimeIcon fontSize="small" />
                            </IconButton>
                            <p>{item?.time}</p>
                          </div>
                        </>
                      }
                    />
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="doctor-detail"
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{ width: 50, height: 50 }}
                          src={item.doctorId.image}
                        >
                          {item.doctorId.fullName}
                        </Avatar>
                        <div style={{ marginLeft: "10px" }}>
                          <Typography variant="body1" color="textPrimary">
                            {item.doctorId.fullName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {item.doctorId.speciality}
                          </Typography>
                        </div>
                      </div>
                      <Chip label={item.status} color="primary" />
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="patient-detail"
                    >
                      <Avatar
                        sx={{ width: 25, height: 25, fontSize: 14 }}
                        src={item.patientId.image}
                      >
                        {item.patientId.fullName}
                      </Avatar>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        style={{ marginLeft: "10px", fontSize: 12 }}
                      >
                        {item.patientId.fullName}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                      className="checkout-type"
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="primary">
                          <EventIcon />
                        </IconButton>
                        <Typography
                          variant="body1"
                          fontSize={14}
                          color="textPrimary"
                          className="type"
                        >
                          {item.mode}
                        </Typography>
                      </div>
                      <Button
                        variant="text"
                        color="primary"
                        sx={{ fontSize: 14, textTransform: "unset" }}
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={(e) => navigate("/booking/" + item?._id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="no-booking">
                <img src={BookingImage} alt="no record image" />
                <p className="head">No booking Found</p>
              </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Bookings;
