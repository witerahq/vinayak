import Calendar from '../../fullCalendar/fullCalendar';
import './insight.scss';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentsDoctor } from '../../../actions/bookingActions';
import { getCurrentUser } from '../../../actions/userActions';
import moment from 'moment';

function Insights() {
    const [greeting, setGreeting] = useState('');

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

    const userFromStore = useSelector((state) => {
        return state.user.user
    })
    const appointmentFromStore = useSelector((state) => {
        return state.booking.appointments
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (!appointmentFromStore)
            dispatch(fetchAppointmentsDoctor())
    }, [appointmentFromStore])

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
                        title: 'Appointment with ' + item?.patientId?.fullName,
                        start: addHoursToDate(item.date, item.time.split('-')[0]),
                        end: addHoursToDate(item.date, item.time.split('-')[0])
                    }
            })
            console.log(newBooking)

            return newBooking
        }
    })

    useEffect(() => {
        const currentTime = new Date().getHours();

        if (currentTime >= 5 && currentTime < 12) {
            setGreeting('Good morning');
        } else if (currentTime >= 12 && currentTime < 17) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }
    }, []);


    


    return (
        <div className="Insights">
            <div className="container">
                <div className="doctor-detail">
                    <p>{greeting}, <span>{userFromStore?.fullName}!</span></p>
                    {/* <button><AddCircleIcon></AddCircleIcon> New Prescription</button> */}
                </div>
                <div className="insight-boxs">
                    <div className="stats">
                        <div className="insight-box">
                            <p>Appointments</p>
                            <h6>{appointmentFromStore?.length}</h6>
                        </div>
                        <div className="insight-box">
                            <p>Patients</p>
                            <h6>{appointmentFromStore?.length}</h6>
                        </div>
                    </div>
                    <div className="insight-box income">
                        <p>Income</p>
                        <h6>₹ {appointmentFromStore?.length * 550}</h6>
                    </div>

                </div>
                <div className="schedule-calendar">
                    <p className='heading'>Schedule</p>
                    <Calendar event={eventFromStore}></Calendar>
                </div>
                <div className="patient-lists">
                    <p className='heading'>Patient List</p>
                    {
                        appointmentFromStore&&appointmentFromStore?.filter((item)=>{
                            return new Date(addHoursToDate(item.date, item.time.split('-')[0]))>=new Date()
                        }).length?appointmentFromStore?.filter((item)=>new Date(addHoursToDate(item.date, item.time.split('-')[0]))>=new Date())?.map((item) => {
                            return (
                                <div className="patient-list" key={item._id}>
                                    <div className="profile">
                                        <div className="image">
                                            <img src={item.patientId.image} alt={item?.patientId?.fullName} />
                                        </div>
                                        <div className="text">
                                            <p>{item?.patientId?.fullName}</p>
                                            <h6>{moment(item.date).format('MMMM, Do YYYY')}</h6>
                                        </div>

                                    </div>
                                    <div className="time">
                                        <p>{item.time.split('-')[0]}</p>
                                    </div>
                                </div>
                            )
                        })
                        : <>
                        <p>There is a patient with an upcoming appointment.</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Insights