import React from 'react';
import { Container, Grid, Typography, Paper, Button, Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import Zoom from '@mui/material/Zoom';
import './about.scss'

function About() {
    return (
        <div className="About">
            <div class="responsive-container-block bigContainer">
                <div class="responsive-container-block Container">
                    <p class="text-blk heading">
                        About Us
                    </p>
                    <p class="text-blk subHeading">
                        <p>Know More About Us</p>

                        <p>At <strong>VinayakM</strong>, our mission is to transform the way you access healthcare. We believe that everyone deserves convenient, reliable, and stress-free healthcare solutions. Our doctor appointment booking app is designed to put your well-being first, offering a seamless experience from start to finish.</p>

                        <p>Our Commitment to You</p>

                        <p>We understand that your time is precious, and your health is a top priority. With <strong>VinayakM</strong>, you can easily book appointments with just a few taps on your smartphone. Say goodbye to long waiting times and the frustration of navigating complex healthcare systems.</p>

                        <p>Why Choose VinayakM?</p>

                        <ul>
                            <li>User-Friendly: Our app is designed with simplicity in mind. We want to make your healthcare journey as effortless as possible. Whether you're tech-savvy or new to digital healthcare, VinayakM is your companion.</li>
                            <li>Access to Top Doctors: We've partnered with some of the best healthcare professionals in the industry. With VinayakM, you can connect with experienced doctors from various specialties, ensuring you receive the highest quality care.</li>
                            <li>Convenience at Your Fingertips: VinayakM puts the power of healthcare in your hands. Book appointments, receive expert medical advice, and monitor your health all in one place. No need to travel or wait endlessly in crowded waiting rooms.</li>
                            <li>Appointment Reminders: We understand that life can get busy. VinayakM sends you appointment reminders, ensuring you never miss an important healthcare checkup or consultation.</li>
                            <li>Security and Privacy: Your health data is sensitive, and we take its security seriously. VinayakM employs top-notch security measures to protect your information and ensure your privacy.</li>
                            <li>Affordable Healthcare: We believe that quality healthcare should be accessible to everyone. With VinayakM, you get access to affordable healthcare solutions, making your well-being our top priority.</li>
                            <li>Feedback and Reviews: Your feedback matters. VinayakM encourages you to leave reviews and share your experiences with the community. Your insights help us continually improve our services.</li>
                        </ul>

                        <p>Join VinayakM Today!</p>

                        <p>Take control of your health with VinayakM. Download our app and embark on a journey towards stress-free, accessible healthcare. Your well-being is our priority, and we're here to make healthcare convenient for you.</p>

                        <p>Discover the future of healthcare with VinayakM.</p>

                    </p>
                    <div class="social-icons-container">
                        <a class="social-icon">
                            <img class="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png" />
                        </a>
                        <a class="social-icon">
                            <img class="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png" />
                        </a>
                        <a class="social-icon">
                            <img class="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png" />
                        </a>
                        <a class="social-icon">
                            <img class="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
