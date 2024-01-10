import './appointments.scss';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentsPatient } from '../../../actions/bookingActions';

function Appointments() {
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
    const bookingFromStore = useSelector((state) => {

        if(state.booking.appointments){
            let newBooking = state.booking.appointments.map((item) => {
                console.log()
                if(item?.time?.length)
                return {
                    title:'Appointment with Dr.'+item.doctorId?.fullName,
                    start: addHoursToDate(item.date, item.time.split('-')[0]),
                    end: addHoursToDate(item.date, item.time.split('-')[0])
                }
            })
            return newBooking
        }
    })
    const [booking, setBooking] = useState(bookingFromStore || [])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!bookingFromStore)
            dispatch(fetchAppointmentsPatient())
    }, [bookingFromStore])





    return (
        <div className="Appointment">
            <div className="container">
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    slotMinTime="08:00:00"
                    slotMaxTime="20:00:00"
                    initialView="timeGridDay"
                    weekends={true}
                    events={booking}
                    
                />
            </div>
        </div>
    )

}

export default Appointments;