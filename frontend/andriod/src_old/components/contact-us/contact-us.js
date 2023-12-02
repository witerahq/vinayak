import './contact-us.scss';
import React from 'react'

function Contact() {
    return (
        <div className="Contact">
            <div class="contact container">
                <form>
                    <div class="form">
                        <div class="form-txt">
                            <h1>Contact Us</h1>
                            <span>At VinayakM, we value your feedback and inquiries. Our dedicated support team is here to assist you with any questions or concerns you may have. Whether you need help with using our app, want to inquire about our services, or have suggestions to share, we're all ears!</span>
                            <p>
                                If you have any questions, concerns, or requests related to this Privacy Policy, or if you wish to delete your account, please contact us at:
                            </p>
                            {/* <h3>USA</h3> */}
                            <div class="business-hours">
                                <br />
                                <p><strong>Business Hours:</strong></p>
                                <ul>
                                    <li><strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM</li>
                                    <li><strong>Saturday:</strong> 10:00 AM - 2:00 PM</li>
                                    <li><strong>Sunday:</strong> Evening closed</li>
                                    <li><strong>Phone:</strong>  +91-8439006178</li>
                                </ul>
                            </div>
                            <br />
                            <h4>India</h4>
                            <p>Maa Annapurna Charitable Hospital Westend Road, Meerut, Uttar Pradesh<br />250001</p>
                        </div>
                        <div class="form-details">
                            <input type="text" name="name" id="name" placeholder="Name" required />
                            <input type="email" name="email" id="email" placeholder="Email" required />
                            <textarea name="message" id="message" cols="52" rows="7" placeholder="Message" required></textarea>
                            <button>SEND MESSAGE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;