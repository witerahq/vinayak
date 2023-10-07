import React from "react";
import './search.scss';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import docImage from '../../../assets/doc.svg'
import doc1Image from '../../../assets/doc1.svg'
import StarIcon from '@mui/icons-material/Star';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function Search() {
    return (
        <div className="Search">

            <div className="banner">
                <div className="container">
                    <p>Book Your Appointment <br /> in few easy steps</p>

                    <div className="appointment-form">
                        <div className="container">
                            <div className="appointment">
                                <input type="text" placeholder='Type your Symptoms here' className="symptoms" />                        <LocalizationProvider className="date-time" dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'DatePicker',
                                            'TimePicker',
                                            'DateTimePicker',
                                            'DateRangePicker',
                                        ]}
                                    >
                                        <DemoItem
                                        >
                                            <DateTimePicker
                                                label="Set Date & Time" />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <select name="stream" className='stream-select' id="stream">
                                    <option value="" disabled selected>Select Stream</option>
                                    <option value="1">Heart</option>
                                    <option value="2">Mouth</option>
                                    <option value="3">Brain</option>
                                </select>
                            </div>
                            <div className="search">
                                <button>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="appointment">
                <div className="container">
                    <aside id='filters'>
                        <p className='head'>Filter By:</p>
                        <div className="filters">
                            <label className='head'>Distance</label>
                            <Box >
                                <Slider
                                    aria-label="Custom marks"
                                    defaultValue={20}
                                    step={10}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                            <hr />
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
                            </Box>
                        </div>
                    </aside>
                    <section id='search-result'>
                        <div className="heading">
                            <p>Results found for Dentists on 12 November, 12:00pm - 1:00pm </p>
                            <p>123 Results Found</p>
                        </div>
                        <div className="appointment-cards">
                            {
                                new Array(16).fill(0).map((item, index) => {
                                    return (
                                        <div className="appointment-card">
                                            <div className="expand"><ExpandCircleDownIcon fontSize='medium' htmlColor='white'></ExpandCircleDownIcon></div>
                                            <div className="doc-image">
                                                <img src={ docImage} alt="docIMage" />
                                                <img src={ doc1Image} alt="docIMage1" />
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
                                                            <div className="rating">
                                                                <p>4.5 <span><StarIcon fontSize='small'></StarIcon></span></p>
                                                            </div>
                                                        </div>
                                                        <div className="more-details">
                                                            <p className='hospital'>AIIMS, New Delhi.</p>
                                                            <p className='subhead'>Available from:</p>
                                                            <p className="days">Monday - Saturday</p>
                                                            <p className='timing'>7:00 AM 12:00 PM</p>
                                                            <p className='timing'>2:00 PM to 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="booking-detail">
                                                    <div className="heading">
                                                        <p>Book Your Slot:</p>
                                                    </div>
                                                    <div className="timings">
                                                        {
                                                            new Array(8).fill(0).map((item, index) => {
                                                                return (
                                                                    <div className="timing">
                                                                        <p>7:00AM - 8:00AM</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="book-button">
                                                        <button>Book Appointment</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                </div>
            </section>



        </div>
    )
}

export default Search;