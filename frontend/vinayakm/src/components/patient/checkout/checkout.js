
import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import doc1Image from '../../../assets/doc1.svg'
import './checkout.scss'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { createAppointment } from "../../../actions/bookingActions";
import { v4 as uuidv4 } from 'uuid';
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

    const cartFromStore = useSelector((state)=>{
        console.log(state)
        return state.appointment.appointment
    })

    const [consultType,setConsultType] = useState('online')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const editAppointment = () =>{
        navigate({
            pathname:'/search',
            search: createSearchParams({
                date:searchParams.get('date'),speciality:searchParams.get('speciality'),symptoms:searchParams.get('symptoms')
            }).toString()
        })
    }

    const checkout = ()=>{
        let data ={
            doctorId:cartFromStore.docDetail._doc._id,
            mode:consultType,
            status:'scheduled',
            date:searchParams.get('date'),
            time:cartFromStore.timing.startTime+' - '+cartFromStore.timing.endTime
        }

        let paymentData = {
            doctorId:cartFromStore.docDetail._doc._id,
            time:new Date(),
            transactionID:uuidv4(),
            amount:550,
            mode:'UPI'
        }

        let {key:timeSlotType,index:timeSlotIndex} =findKeyAndIndex(cartFromStore.docDetail.availability.timeSlots,cartFromStore.timing._id)

        console.log(cartFromStore.docDetail.availability._id, timeSlotType, timeSlotIndex, 'booked')


        dispatch(updateTimeslotStatus(cartFromStore.docDetail.availability._id, timeSlotType, timeSlotIndex, 'booked'));
        dispatch(createAppointment(data))
        dispatch(createPayment(paymentData))

        navigate('/bookings')

    }

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
                            onChange={e=>setConsultType(e.target.value)}
                        >
                            <FormControlLabel name="consult" value={'online'}  control={<Radio />} label="E-Consultation" />
                            <FormControlLabel name="consult" value={'in-person'}  control={<Radio />} label="Visit to Hospital" />
                            <FormControlLabel name="consult" value={'call'}  control={<Radio />} label="Call Doctor" />
                        </RadioGroup>
                        <div className="appointment-card">
                            <div className="doc-image">
                                <img src={doc1Image} alt="doc Image" />
                            </div>
                            <div className="booking-doc-details">
                                <div className="doc-detail">
                                    <div className="profile">
                                        <p>Dr. {cartFromStore.docDetail._doc.fullName}</p>
                                        <p>BDS, MDS</p>
                                    </div>
                                    <div className="info">
                                        <p>8+ Years of Experience</p>
                                        <div className="tags">
                                            <div className="langs">
                                                <div className="lang"><p>ENG</p></div>
                                                <div className="lang"><p>हिंदी</p></div>
                                            </div>
                                        </div>
                                        <p className='hospital'>AIIMS, New Delhi.</p>
                                    </div>
                                </div>
                                <div className="booking-detail">
                                    <div className="heading">
                                        <p> Slot:</p></div>
                                    <div className="dates">
                                        <p>{moment(searchParams.get('date')).format("MMMM, Do YYYY")}</p>
                                        <p>{cartFromStore.timing.startTime+' - '+cartFromStore.timing.endTime}</p>
                                        <div className="edit">
                                            <CalendarMonthIcon></CalendarMonthIcon>
                                            <p onClick={e=>editAppointment()}>Edit</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment-card">
                    <div className="head">
                        <p>Your Payment Summary</p>
                    </div>
                    <div className="checkout-card">
                        <p>Consultation Fees: <span>₹500.00</span></p>
                        <p className="tax">CGST: (9%) <span>₹45.00</span></p>
                        <p className="tax">CGST: (9%) <span>₹45.00</span></p>
                        <div className="apply">

                        </div>
                        <p className="total">Total <span>₹590.00</span></p>
                        <button className="checkout" onClick={e=>checkout()}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;