import React, { useEffect, useState } from "react";
import './search.scss';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Checkbox, Chip, FormControlLabel, FormGroup } from '@mui/material';
import docImage from '../../../assets/doc.svg'
import doc1Image from '../../../assets/doc1.svg'
import StarIcon from '@mui/icons-material/Star';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchDoctors } from "../../../actions/searchActions";
import moment from "moment";
import { setAppointmentCart } from "../../../actions/appointmentActions";
import SearchIcon from '@mui/icons-material/Search';
import SearchDoctorsModal from "../../homepage/searchModal/searchModal";

function Search() {

    const searchFromStore = useSelector(state => {
        console.log(state)
        return state.search.doctors
    })
    const [search, setSearch] = useState(searchFromStore || [])
    const [searchParams, setSearchParams] = useSearchParams()

    const [symptoms, setSymptoms] = useState('');
    const [selectedDate, setSelectedDate] = useState(''); // Initialize with the current date
    const [speciality, setSpeciality] = useState('');
    const dispatch = useDispatch()
    const searchSubmit = () => {
        console.log(symptoms, selectedDate, speciality)
        dispatch(searchDoctors(selectedDate, speciality))
        navigate({
            pathname: '/search',
            search: createSearchParams({
                date: selectedDate, speciality, symptoms
            }).toString()
        })
    }
    const date = searchParams.get('date')
    const specialityParam = searchParams.get('speciality')
    useEffect(() => {
        if (!searchFromStore) {
            dispatch(searchDoctors(date, specialityParam))
        }
    }, [searchFromStore])

    const navigate = useNavigate()

    const [appointment, setAppointment] = useState({
        docDetail: null,
        timing: null,
        type: 'online'
    })

    const bookAppointment = (event, docDetail, timing) => {
        setAppointment({
            docDetail, timing, type: 'online'
        })
    }

    const book = () => {
        dispatch(setAppointmentCart({
            ...appointment
        }))
        navigate({
            pathname: '/checkout',
            search: createSearchParams({
                date: searchParams.get('date'), speciality: searchParams.get('speciality'), symptoms: searchParams.get('symptoms')
            }).toString()
        })
    }
    const [isSearch, setIsSearch] = useState(false)

    const addHoursToDate = (date, time) => {
        // Parse the time string into hours and minutes


        var [hours, minutes] = time?.split(':')?.map((part) => parseInt(part, 10));

        // Check if the time is in the afternoon (PM) and adjust hours accordingly
        if (time.toLowerCase().includes('pm') && hours !== 12) {
            hours += 12;
        }

        // Create a new Date object and add the hours and minutes
        const newDate = new Date(date);
        newDate.setHours(hours, minutes);

        return newDate;
    }

    return (
        <>
            {
                window.innerWidth < 992 ?
                    <SearchDoctorsModal isOpen={isSearch} onClose={e => setIsSearch(false)}></SearchDoctorsModal> : null
            }
            <div className="Search">

                <div className="banner">
                    <div className="container">
                        <p>Book Your Appointment <br /> in few easy steps</p>

                        <div className="appointment-button" onClick={e => setIsSearch(true)}>
                            <div className="icon">
                                <SearchIcon></SearchIcon>
                            </div>
                            <div className="text">
                                <p>Query?</p>
                                <p>Symptoms • Doctors • Location • Anything</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section id="appointment">
                    <div className="container">
                        <aside id='filters'>
                            <p className='head'>Filter By:</p>
                            <div className="filters">
                                <label className='head'>Distance: (kms)</label>
                                <Box >
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
                        <section id='search-result'>
                            <div className="heading">
                                <p>Results found for {searchParams.get('speciality')} on {moment(searchParams.get('date')).format("MMM Do YY")}</p>
                                <p>{search?.length} Results Found</p>
                            </div>
                            <div className="appointment-cards">
                                {
                                    search?.length?
                                    search?.map((item, index) => {
                                        return (
                                            <div className="appointment-card">
                                                <div className="expand"><ExpandCircleDownIcon fontSize='medium' htmlColor='black'></ExpandCircleDownIcon></div>
                                                <div className="doc-image">
                                                    <img src={item._doc.image} alt="docIMage" />
                                                    <img src={item._doc.image} alt="docIMage1" />
                                                </div>
                                                <div className="booking-doc-details">
                                                    <div className="doc-detail">
                                                        <div className="profile">
                                                            <p>Dr. {item._doc?.fullName}</p>
                                                            <p>BDS, MDS</p>
                                                        </div>
                                                        <div className="info">
                                                            <p>{item._doc.experience}+ Years of Experience</p>
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
                                                            <p>Book Your Slot: </p>
                                                        </div>
                                                        <div className="timings">
                                                            {
                                                                Object.keys(item.availability.timeSlots).map((slot, i) => {
                                                                    return item.availability.timeSlots[slot].map((el, idx) => {
                                                                        if(new Date(addHoursToDate(item.availability.day, el.startTime.split('-')[0]))>=new Date())
                                                                        return (
                                                                            <Chip className={"timing " + el.status} label={el.startTime + ' - ' + el.endTime} onClick={e => bookAppointment(e, item, el)}>

                                                                            </Chip>
                                                                        )
                                                                    })
                                                                })
                                                            }
                                                        </div>
                                                        <div className="book-button">
                                                            <button onClick={e => { book() }}>Book Appointment</button>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }):
                                    <p className="no-result">There is no result found please try some alternate preference</p>
                                }
                            </div>
                        </section>
                    </div>
                </section>



            </div>
        </>
    )
}

export default Search;