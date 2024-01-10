import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import doc1Image from "../../../assets/doc1.svg";
import "./checkout.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import moment from "moment";
import { createAppointment, fetchAppointmentsPatient } from "../../../actions/bookingActions";
import { v4 as uuidv4 } from "uuid";
import { createPayment } from "../../../actions/paymentActions";
import { updateTimeslotStatus } from "../../../actions/doctorAvailabilityActions";

function findKeyAndIndex(arr, paramId) {
  for (const key in arr) {
    if (Array.isArray(arr[key])) {
      const index = arr[key].findIndex((item) => item._id === paramId);
      if (index !== -1) {
        return { key, index };
      }
    }
  }
  return null; // Return null if not found
}

function Checkout() {
  const cartFromStore = useSelector((state) => {
    console.log(state);
    return state.appointment.appointment;
  });

  const [consultType, setConsultType] = useState("online");
  const [patientInfo, setPatientInfo] = useState({ name: "", phoneNumber: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const editAppointment = () => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        date: searchParams.get("date"),
        speciality: searchParams.get("speciality"),
        symptoms: searchParams.get("symptoms"),
      }).toString(),
    });
  };

  const handleAccordionChange = (event, expanded) => {
    // You can perform additional actions when the accordion is expanded or collapsed
  };

  const handlePatientInfoChange = (field) => (event) => {
    setPatientInfo((prevInfo) => ({
      ...prevInfo,
      [field]: event.target.value,
    }));
  };

  const checkout = () => {
    let data = {
      doctorId: cartFromStore.docDetail._id,
      mode: consultType,
      status: "scheduled",
      date: searchParams.get("date"),
      time:
        cartFromStore.timing.startTime + " - " + cartFromStore.timing.endTime,
      patientName: patientInfo.name,
      patientPhoneNumber: patientInfo.phoneNumber,
    };

    let paymentData = {
      doctorId: cartFromStore.docDetail._id,
      time: new Date(),
      transactionID: uuidv4(),
      amount: cartFromStore.docDetail.priceAppointment,
      mode: "UPI",
    };

    let { key: timeSlotType, index: timeSlotIndex } = findKeyAndIndex(
      cartFromStore.docDetail.availability.timeSlots,
      cartFromStore.timing._id
    );

    console.log(
      cartFromStore.docDetail.availability._id,
      timeSlotType,
      timeSlotIndex,
      "booked"
    );

    dispatch(
      updateTimeslotStatus(
        cartFromStore.docDetail.availability._id,
        timeSlotType,
        timeSlotIndex,
        "booked"
      )
    );
    dispatch(createAppointment(data));
    dispatch(createPayment(paymentData));
    dispatch(fetchAppointmentsPatient());

    navigate("/bookings");
  };

  return (
    <div className="Checkout">
      <div className="container">
        <div className="summary">
          <div className="head">
            <p>Summary</p>
          </div>
          <div className="appointment">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={consultType}
              onChange={(e) => setConsultType(e.target.value)}
            >
              <FormControlLabel
                name="consult"
                value={"online"}
                control={<Radio />}
                label="E-Consultation"
              />
              <FormControlLabel
                name="consult"
                value={"in-person"}
                control={<Radio />}
                label="Visit to Hospital"
              />
              <FormControlLabel
                name="consult"
                value={"call"}
                control={<Radio />}
                label="Call Doctor"
              />
            </RadioGroup>
            <div className="appointment-card">
              <div className="doc-image">
                <img src={doc1Image} alt="doc Image" />
              </div>
              <div className="booking-doc-details">
                <div className="doc-detail">
                  <div className="profile">
                    <p>Dr. {cartFromStore.docDetail?.fullName}</p>
                    {cartFromStore.docDetail?.education ? <p>BDS, MDS</p> : null}
                  </div>
                  <div className="info">
                    {}
                    {cartFromStore.docDetail?.experience ? (
                      <p>{cartFromStore.docDetail?.experience}+ Years of Experience</p>
                    ) : null}
                    <div className="tags">
                      <div className="langs">
                        {cartFromStore.docDetail?.gender ? (
                          <div className="lang">
                            <p style={{ margin: 0 }}>
                              {cartFromStore.docDetail?.gender == "male" ? "Male" : "Female"}
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
                     
                    </div>
                    {cartFromStore.docDetail?.hospital ? (
                      <p className="hospital">{cartFromStore.docDetail?.hospital}</p>
                    ) : null}{" "}
                  </div>
                </div>
                <div className="booking-detail">
                  <div className="heading">
                    <p> Slot:</p>
                  </div>
                  <div className="dates">
                    <p>
                      {moment(searchParams.get("date")).format("MMMM, Do YYYY")}
                    </p>
                    <p>
                      {cartFromStore.timing.startTime +
                        " - " +
                        cartFromStore.timing.endTime}
                    </p>
                    <div className="edit">
                      <CalendarMonthIcon></CalendarMonthIcon>
                      <p onClick={(e) => editAppointment()}>Edit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Accordion for booking appointment for someone else */}
            <Accordion
              onChange={handleAccordionChange}
              style={{
                backgroundColor: "transparent",
                marginTop: "20px",
                border: "0px",
                boxShadow: "none",
              }} // Set the background color to transparent
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon htmlColor="#206BAC" />}
                aria-controls="book-appointment-panel-content"
                id="book-appointment-panel-header"
                style={{ color: "#206BAC", fontSize: "16px" }}
              >
                Schedule an appointment on behalf of another person.
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Patient Name"
                  placeholder="Enter patient's name"
                  fullWidth
                  value={patientInfo.name}
                  onChange={handlePatientInfoChange("name")}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Patient Phone Number"
                  placeholder="Enter patient's phone number"
                  fullWidth
                  value={patientInfo.phoneNumber}
                  onChange={handlePatientInfoChange("phoneNumber")}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="payment-card">
          <div className="head">
            <p>Your Payment Summary</p>
          </div>
          <div className="checkout-card">
            <p>
              Consultation Fees:{" "}
              <span>₹{cartFromStore.docDetail?.priceAppointment}</span>
            </p>
            <p className="tax">
              CGST: (9%){" "}
              <span>
                ₹{(cartFromStore.docDetail?.priceAppointment * 0.09).toFixed(2)}
              </span>
            </p>
            <p className="tax">
              CGST: (9%){" "}
              <span>
                ₹{(cartFromStore.docDetail?.priceAppointment * 0.09).toFixed(2)}
              </span>
            </p>
            <div className="apply"></div>
            <p className="total">
              Total{" "}
              <span>
                ₹
                {Math.round(
                  Number(cartFromStore.docDetail?.priceAppointment) +
                    Number(cartFromStore.docDetail?.priceAppointment * 0.09) +
                    Number(cartFromStore.docDetail?.priceAppointment * 0.09)
                )}
              </span>
            </p>
            <button className="checkout" onClick={(e) => checkout()}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
