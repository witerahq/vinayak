
import React from "react";
import Homepage from "./components/homepage/homepage";
import Appointments from "./components/patient/appointments/appointments";
import Checkout from "./components/patient/checkout/checkout";
import Search from "./components/patient/search/search";
import Bookings from "./components/patient/bookings/bookings";
import Profile from "./components/profile/profile";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Dashboard from "./components/doctor/dashboard/dashboard";
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import Records from "./components/records";
import Verify from "./components/auth/verify/verify";
import Login from "./components/auth/login/login";
import Register from "./components/auth/register/register";

function App() {
  const user = useSelector((state) => {
    if (state?.auth?.user?.token) {
      const decoded = jwt_decode(state?.auth?.user?.token);
      return decoded
    }
  })

  const ProtectedRoute = ({
    user,
    redirectPath = '/',
    children,
  }) => {
    return children
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  return (
    <div className="App">
      <Router>
        
        {
        !(user?.role === 'doctor' && window.location.pathname.includes('dashboard'))?
       
        <Header></Header>
        :null

      }
        <Routes>

          

          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/record" element={<Records />} />
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
