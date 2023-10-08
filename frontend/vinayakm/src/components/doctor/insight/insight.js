import Calendar from '../../fullCalendar/fullCalendar';
import './insight.scss';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
function Insights() {
    return (
        <div className="Insights">
            <div className="container">
                <div className="doctor-detail">
                    <p>Good morning, <span>Yash!</span></p>
                    {/* <button><AddCircleIcon></AddCircleIcon> New Prescription</button> */}
                </div>
                <div className="insight-boxs">
                    <div className="stats">
                        <div className="insight-box">
                            <p>Appointments</p>
                            <h6>126</h6>
                        </div>
                        <div className="insight-box">
                            <p>Patients</p>
                            <h6>567</h6>
                        </div>
                    </div>
                    <div className="insight-box income">
                        <p>Income</p>
                        <h6>₹ 1,23,456.78</h6>
                    </div>

                </div>
                <div className="schedule-calendar">
                    <p className='heading'>Schedule</p>
                    <Calendar></Calendar>
                </div>
                <div className="patient-lists">
                    <p className='heading'>Patient List</p>
                    {
                        new Array(5).fill(0).map(() => {
                            return (
                                <div className="patient-list">
                                    <div className="profile">
                                        <div className="image">

                                        </div>
                                        <div className="text">
                                            <p>Pratham Mishra</p>
                                            <h6>Weekly Visit</h6>
                                        </div>

                                    </div>
                                    <div className="time">
                                        <p>9 : 15 AM</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Insights