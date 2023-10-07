import React from "react";

import './footer.scss'
import logo from '../../assets/active-logo.svg'
import appIcon from '../../assets/app.svg'
import playIcon from '../../assets/play.svg'
import downloadImage from '../../assets/download.svg'
function Footer() {
    return (
        <div className="Footer">
            <div className="sub-footer">
                <div className="container">
                    <div className="content">
                        <div className="text">
                            <p>Download Our App Now!</p>
                            <p>Sit exercitationem mollitia sed et distinctio excepturi unde quisquam perspiciatis. Odit dignissimos. Facilis molestias enim.</p>
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
                            <div className="link">About</div>
                            <div className="link">Blogs</div>
                            <div className="link">Careers</div>
                            <div className="link">Press</div>
                            <div className="link">Contact Us</div>

                        </div>
                        <div className="links">
                            <div className="link">For Patients</div>
                            <div className="link">Blogs</div>
                            <div className="link">Careers</div>
                            <div className="link">Press</div>
                            <div className="link">Contact Us</div>
                        </div>
                        <div className="links">
                            <div className="link">For Doctors</div>
                            <div className="link">Blogs</div>
                            <div className="link">Careers</div>
                            <div className="link">Press</div>
                            <div className="link">Contact Us</div>
                        </div>
                        <div className="links">
                            <div className="link">For Social Media</div>
                            <div className="link">Blogs</div>
                            <div className="link">Careers</div>
                            <div className="link">Press</div>
                            <div className="link">Contact Us</div>
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