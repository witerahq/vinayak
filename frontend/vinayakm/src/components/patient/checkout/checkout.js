
import React from "react";
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import doc1Image from '../../../assets/doc1.svg'
import './checkout.scss'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function Checkout() {

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
                        >
                            <FormControlLabel value="online" control={<Radio />} label="E-Consultation" />
                            <FormControlLabel value="visit" control={<Radio />} label="Visit to Hospital" />
                            <FormControlLabel value="call" control={<Radio />} label="Call Doctor" />
                        </RadioGroup>
                        <div className="appointment-card">
                            <div className="doc-image">
                                <img src={doc1Image} alt="doc Image" />
                            </div>
                            <div className="booking-doc-details">
                                <div className="doc-detail">
                                    <div className="profile">
                                        <p>Dr. Abhishek Mathur</p>
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
                                        <p>Friday</p>
                                        <p>8:00 AM 9:00 AM</p>
                                        <div className="edit">
                                            <CalendarMonthIcon></CalendarMonthIcon>
                                            <p>Edit</p>
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
                        <button className="checkout">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;