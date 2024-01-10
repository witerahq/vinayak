import React, { useEffect, useState } from "react";
import "./fullCalendar.scss";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { formatDate } from '@fullcalendar/core';

import events from "./events";

export default function Calendar({event}) {
    const [currentEvents, setCurrentEvents] = useState(event);


    const handleDateClick = (selected) => {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
    
        if (title) {
          calendarApi.addEvent({
            id: `${selected.dateStr}-${title}`,
            title,
            start: selected.startStr,
            end: selected.endStr,
            allDay: selected.allDay,
          });
        }
      };
    const handleEventClick = (selected) => {
        if (
          window.confirm(
            `Are you sure you want to delete the event '${selected.event.title}'`
          )
        ) {
          selected.event.remove();
        }
      };

      useEffect(()=>{
        console.log(event,'event')
      },[])
  return (
    <div className="Calendar">
      <FullCalendar
            initialView="timeGridDay"
            slotMinTime= "08:00:00"
            slotMaxTime="20:00:00"
            headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          // editable={true}
          // selectable={true}
          // selectMirror={true}
          dayMaxEvents={true}
          // select={handleDateClick}
          // eventClick={handleEventClick}
          events={currentEvents}
          initialEvents={[
            {
              id: '12315',
              title: 'All-day event',
              date: '2022-09-14',
            },
            {
              id: '5123',
              title: 'Timed event',
              date: '2022-09-28',
            },
          ]}
          // eventsSet={(events) => setCurrentEvents(events)}
      />
    </div>
  );
}
