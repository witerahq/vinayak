
import React, { useEffect, useState } from "react";
import Homepage from "./components/homepage/homepage";
import Appointments from "./components/patient/appointments/appointments";
import Checkout from "./components/patient/checkout/checkout";
import Search from "./components/patient/search/search";
import Bookings from "./components/patient/bookings/bookings";
import Profile from "./components/profile/profile";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Dashboard from "./components/doctor/dashboard/dashboard";
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import Records from "./components/records";
import Verify from "./components/auth/verify/verify";
import Login from "./components/auth/login/login";
import Register from "./components/auth/register/register";
import ChatRoom from "./components/chatroom";
import About from "./components/about/about";
import Contact from "./components/contact-us/contact-us";
import PrivacyPolicy from "./components/privacy/privacy";
import DoctorProfile from "./components/patient/doctor-profile/doctor-profile";
import BookingDetail from "./components/patient/booking-detail/booking-detail";
import MedicalRecords from "./components/medical-records/medical-records";
import AddMedicalRecord from "./components/medical-records/add-medical-record/add-medical-record";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const user = useSelector((state) => {
    if (state?.auth?.user?.token) {
      const decoded = jwt_decode(state?.auth?.user?.token);
      return decoded
    }
  })

  const isAuthenticated = useSelector((state) => {
      return state?.auth?.isAuthenticated

  })

  const ProtectedRoute = ({
    user,
    redirectPath = '/',
    children,
  }) => {
    if(window.innerWidth<992&&!isAuthenticated){
      return <Navigate to={'/login'} replace />;
    }
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  const MobileRoute = ({
    user,
    redirectPath = '/',
    children,
  }) => {
    // if(window.innerWidth<992&&!isAuthenticated){
    //   return <Navigate to={'/login'} replace />;
    // }
   

    return children;
  };


  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    // You can update the class here based on location.pathname
  }, [location.pathname]);

  return (
    <div className={isAuthenticated?'authenticated '+"App "+user?.role+' '+location.pathname.split('/')[1]:"App "+location.pathname.split('/')[1]}>
      {/* <Router> */}
      <ScrollToTop />
        
        {
      
        <Header></Header>
     

      }
        <Routes>

          

          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/doctor/:id" element={<DoctorProfile/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/record/:id" element={<Records />} />
          {
            window.innerWidth<992?
            <> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            </>:null
          }

          <Route path="/appointments" element={<ProtectedRoute user={user?.role === 'patient'}><Appointments /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute user={user?.role === 'patient'}><Bookings /></ProtectedRoute>} />
          <Route path="/medical-records" element={<ProtectedRoute user={user?.role === 'patient'}><MedicalRecords /></ProtectedRoute>} />
          <Route path="/add-medical-record" element={<ProtectedRoute user={user?.role === 'patient'}><AddMedicalRecord /></ProtectedRoute>} />
          <Route path="/booking/:id" element={<ProtectedRoute user={user?.role === 'patient'}><BookingDetail /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute user={user?.role === 'patient'}><Checkout /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute user={user?.role === 'doctor'||user?.role === 'patient'}><ChatRoom /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user?.role === 'doctor'||user?.role === 'patient'}><Profile /></ProtectedRoute>} />

          <Route path="/dashboard/*" element={<ProtectedRoute user={user?.role === 'doctor'}><Dashboard /></ProtectedRoute>} />

        </Routes>
      
      {
        // !(user?.role === 'doctor' && window.location.pathname.includes('dashboard'))?
        <Footer></Footer>
      }
      {/* </Router> */}
    </div>
  );
}

export default App;
