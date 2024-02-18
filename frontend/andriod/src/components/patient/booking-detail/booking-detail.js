import React, { useEffect } from "react";
import { Avatar, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Subheader from "../../sub-header/subheader";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "./booking-detail.scss";
import map from "../../../assets/map.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentDetail } from "../../../actions/bookingActions";
import { useParams } from "react-router-dom";
import moment from 'moment';
import doctorIcon from '../../../assets/doctor-icon.svg';


const BookingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const appointmentDetail = useSelector(
    (state) => {
      console.log(state)
      return state?.booking?.appointmentDetail
    }
  );

  useEffect(() => {

    if (!appointmentDetail) dispatch(fetchAppointmentDetail(id));
  }, [dispatch, id, appointmentDetail]);

  return (
    <>
      <Subheader  route={"/appointments"} text={"Appointment details"}></Subheader>
      <div className="BookingDetail">
        <div className="doctor-details-container">
          <div className="doctor-details">
            <div className="doctor-avatar">
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt="Doctor Avatar"
                src={appointmentDetail?.doctorId?.image}
              />
            </div>
            <div className="doctor-info">
              <div className="info-name">Dr. {appointmentDetail?.doctorId?.fullName}</div>
              <div className="info-type">{appointmentDetail?.doctorId?.specilist}</div>
              <div className="info-id">
                Appointment ID: <span>{appointmentDetail?._id}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <Divider className="divider" />

          {/* Appointment Details */}
          <div className="appointment-details">
            <div className="title">
              <p>Appointment Details</p>
            </div>
            <div className="info-row">
              <PersonOutlineIcon className="info-icon" />
              <div className="info-text">
                <div className="info-title">{appointmentDetail?.patientId?.fullName}</div>
                <div className="info-value">{appointmentDetail?.patientId?.gender}, {appointmentDetail?.patientId?.age} Yrs</div>
              </div>
            </div>
            <div className="info-row">
              <AccessTimeIcon className="info-icon" />
              <div className="info-text">
                <div className="info-title">{appointmentDetail?.time}</div>
                <div className="info-value">{moment().format('Do MMM YYYY')}</div>
              </div>
            </div>
            <div className="info-row">
              <ApartmentIcon className="info-icon" />
              <div className="info-text">
                <div className="info-title">{appointmentDetail?.mode} consulattion</div>
                <div className="info-value">{appointmentDetail?.doctorId?.address}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="map">
            <img src={map} alt="Appointment" className="full-width-image" />
          </div>

          {/* Total Paid */}
          <div className="total-paid">
            <div className="info-title">Total Paid</div>
            <div className="info-value">₹{appointmentDetail?.doctorId?.priceAppointment}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
