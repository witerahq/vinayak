import React from "react";

import './footer.scss'
import logo from '../../assets/active-logo.svg'
import appIcon from '../../assets/app.svg'
import playIcon from '../../assets/play.svg'
import downloadImage from '../../assets/download.svg'
import { useNavigate } from "react-router-dom";
function Footer() {
    const navigate = useNavigate()
    return (
        <div className="Footer">
            <div className="sub-footer">
                <div className="container">
                    <div className="content">
                        <div className="text">
                            <p>Download Our App Now!</p>
                            <p>Your journey to convenient and stress-free healthcare management begins here. Download the VinayakM app today and take control of your health with ease. Whether you're in need of a routine check-up, a specialist consultation, or simply want to stay on top of your healthcare appointments, our app has you covered.</p>
                            <div className="downloads">
                                <div className="android">
                                    
                                        <img src={playIcon} alt="logo" />
                                </div>
                                <div className="iOS">
                                    <img src={appIcon} alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="image">
                            <img src={downloadImage} alt="download" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-content">
                <div className="container">
                    <div className="heading">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="grid-links">
                        <div className="links">
                            <div className="link" onClick={e => { navigate('/about') }}>About</div>
                            <div className="link" onClick={e => { navigate('/contact') }}>Contact Us</div>
                            <div className="link" onClick={e => { navigate('/privacy') }}>Privacy Policy</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <p>All Rights Reserved 2023 . Copyright &#169;</p>
                </div>
            </div>

        </div>
    )
}


export default Footer;