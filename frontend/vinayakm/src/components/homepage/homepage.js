import React, { useEffect } from "react";
import './homepage.scss';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import whyImage from '../../assets/why.svg';
import clinicImage from '../../assets/clinic.svg';
import testimonial1 from '../../assets/t1.svg';
import testimonial2 from '../../assets/t2.svg';
import testimonial3 from '../../assets/t3.svg';
import { useSearchParams } from "react-router-dom";
import Login from '../auth/login/login'
import Register from '../auth/register/register'
import Verify from "../auth/verify/verify";



function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        console.log(searchParams.get('auth'))
    },[searchParams])

    return (
        <>
            {
                window.innerWidth>=992?
                searchParams.get('auth')==='register'?
                <Register></Register>:
                searchParams.get('auth')==='login'?
                <Login></Login>:searchParams.get('verify')?.length?
                <Verify></Verify>:null:null
            }
        <div className="Homepage">

            <div className="banner">
                <div className="container">
                    <p>Book Your Appointment <br /> in few easy steps</p>

                    {
                        window.innerWidth>992?
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
                    </div>:
                    <div className="appointment-button">
                        <p></p>
                        <p></p>
                    </div>
                    
                    }
                </div>
            </div>

            <section id="why">
                <div className="container">

                    <p className="heading">Why Us?</p>
                    <div className="why-content">
                        <div className="why-text">
                            <ul>
                                <li>Perferendis ipsum non quis ad et est expedita sit. Iste tempora delectus animi natus libero unde pariatur.</li>
                                <li>Perferendis ipsum non quis ad et est expedita sit. Iste tempora delectus animi natus libero unde pariatur.</li>
                                <li>Perferendis ipsum non quis ad et est expedita sit. Iste tempora delectus animi natus libero unde pariatur.</li>
                            </ul>
                        </div>
                        <div className="why-image">
                            <img src={whyImage} alt="why us image" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="consult">
                <div className="container">
                    <div className="heading">
                        <p>Consult top doctors online for any health concern</p>
                        <button>View More</button>
                    </div>
                    <div className="consult-types">
                        <div className="consult-type stomach">
                            <p>Stomach</p>
                        </div>
                        <div className="consult-type heart">
                            <p>Heart</p>
                        </div>
                        <div className="consult-type skin">
                            <p>Skin</p>
                        </div>
                        <div className="consult-type children">
                            <p>Children</p>
                        </div>
                        <div className="consult-type ent">
                            <p>ENT</p>
                        </div>
                        <div className="consult-type sanity">
                            <p>Sanity</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="clinic">
                <div className="container">
                    <div className="heading">
                        <p>Book an appointment for an in-clinic consultation</p>
                        <button>View More</button>
                    </div>
                    <div className="clinic-types">
                        {
                            new Array(12).fill(0).map(() => {
                                return (
                                    <div className="clinic-type">
                                        <div className="clinic-text">
                                            <p>LOREM IPSUM</p>

                                            <p>Subhead</p>
                                        </div>
                                        <div className="clinic-image">
                                            <img src={clinicImage} alt="clinic image" />
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>

            <section id="testimonial">
                <div className="container">
                    <div className="heading">
                        <p>Listen from our users</p>
                    </div>
                    <div className="testimonial-users">
                        <div className="testimonial-user">
                            <div className="image">
                                <img src={testimonial1} alt="testimonial user 1" />
                            </div>
                            <div className="text">
                                <p>Perferendis ipsum non quis ad et est expedita sit. Iste tempora delectus animi natus libero unde pariatur.</p>
                            </div>
                        </div>
                        <div className="testimonial-user">
                            <div className="image">
                                <img src={testimonial2} alt="testimonial user 2" />
                            </div>
                            <div className="text">
                                <p>Perferendis ipsum non quis ad et est expedita sit. Iste tempora delectus animi natus libero unde pariatur.</p>
                            </div>
                        </div>
                        <div className="testimonial-user">
                            <div className="image">
                                <img src={testimonial3} alt="testimonial user 3" />
                            </div>
                            <div className="text">
                                <p>Perferendis ipsum non quis ad et est expedita sit. Iste tempora delectus animi natus libero unde pariatur.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="know">
                <div className="container">
                    <div className="heading">
                        <p>Know more about us</p>
                    </div>
                    <div className="know-text">
                        <p>Consequuntur consequuntur minus aliquam ut ipsam hic ut fuga at. Est fugit quam asperiores voluptatem repudiandae magni laborum omnis. Id veniam quasi molestiae maiores consectetur. Deleniti dicta hic eos ducimus qui dolores rerum et. Magni et enim possimus aut modi voluptates animi. Necessitatibus nihil sed et sit similique officiis et impedit voluptatem.</p>
                        <p className='subhead'>Aut similique</p>
                        <p>Quo mollitia molestiae. Officia blanditiis ut laborum exercitationem praesentium qui. Corporis perspiciatis ut possimus sint. Modi nobis dolores molestias reiciendis quaerat aut similique doloribus totam. Nam molestiae expedita. Velit et consequuntur mollitia sequi aut et dignissimos commodi.</p>
                        <button>Read More</button>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default Homepage;