
import React, { useEffect } from "react";
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
    if(window.inner<992&&!isAuthenticated){
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
    if(window.innerWidth<992&&!isAuthenticated){
      return <Navigate to={'/login'} replace />;
    }
   

    return children;
  };

  return (
    <div className="App">
      <Router>
      <ScrollToTop />
        
        {
        !(user?.role === 'doctor' && window.location.pathname.includes('dashboard'))  && (window.innerWidth<992?isAuthenticated:true)?
        <Header></Header>
        :null

      }
        <Routes>

          

          <Route path="/" element={<MobileRoute><Homepage /></MobileRoute>} />
          <Route path="/search" element={<MobileRoute><Search /></MobileRoute>} />
          <Route path="/about" element={<MobileRoute><About /></MobileRoute>} />
          <Route path="/contact" element={<MobileRoute><Contact /></MobileRoute>} />
          <Route path="/privacy" element={<MobileRoute><PrivacyPolicy /></MobileRoute>} />
          <Route path="/record/:id" element={<MobileRoute><Records /></MobileRoute>} />
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
          <Route path="/checkout" element={<ProtectedRoute user={user?.role === 'patient'}><Checkout /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute user={user?.role === 'doctor'||user?.role === 'patient'}><ChatRoom /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user?.role === 'doctor'||user?.role === 'patient'}><Profile /></ProtectedRoute>} />

          <Route path="/dashboard/*" element={<ProtectedRoute user={user?.role === 'doctor'}><Dashboard /></ProtectedRoute>} />

        </Routes>
      
      {
        !(user?.role === 'doctor' && window.location.pathname.includes('dashboard'))?
        <Footer></Footer>:null

      }
      </Router>
    </div>
  );
}

export default App;
