import './appointments.scss';
import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Appointments() {

    return (
        <div className="Appointment">
            <div className="container">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={false}
                    events={[
                        { title: 'event 1', date: '2023-08-08' },
                        { title: 'event 2', date: '2023-08-09' }
                    ]}
                />
            </div>
        </div>
    )

}

export default Appointments;