import React, { useEffect } from "react";

import "./header.scss";
import Logo from "../../assets/logo.svg";
import { useState } from "react";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getCurrentUser } from "../../actions/userActions";
import { Avatar, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import {
  fetchAppointmentsDoctor,
  fetchAppointmentsPatient,
} from "../../actions/bookingActions";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);

  const auth = useSelector((state) => {
    if (state?.auth?.user?.token) {
      const decoded = jwt_decode(state?.auth?.user?.token);
    }
    return state.auth;
  });

  const decodeUser = useSelector((state) => {
    if (state?.auth?.user?.token) {
      const decoded = jwt_decode(state?.auth?.user?.token);
      return decoded;
    }
  });

  const user = useSelector((state) => {
    return state?.user?.user;
  });

  const dispatch = useDispatch();

  const register = () => {
    // setSearchParams(`?${new URLSearchParams({ auth: 'register' })}`)
    if (window.innerWidth > 992)
      navigate({
        pathname: "/",
        search: createSearchParams({
          auth: "register",
        }).toString(),
      });
    else {
      navigate("/register");
    }
  };
  const login = () => {
    // setSearchParams(`?${new URLSearchParams({ auth: 'login' })}`)
    if (window.innerWidth > 992)
      navigate({
        pathname: "/",
        search: createSearchParams({
          auth: "login",
        }).toString(),
      });
    else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [user]);

  const booking = () => {
    dispatch(fetchAppointmentsPatient());
  };

  const appointment = () => {
    dispatch(fetchAppointmentsPatient());
  };

  const profile = () => {
    dispatch(getCurrentUser());
  };

  const insights = () => {
    dispatch(fetchAppointmentsDoctor());
  };

  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="Header">
      <div className="container">
        <div
          className="logo"
          onClick={(e) => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="logo" />
        </div>
        {auth.isAuthenticated ? null : (
          <div className="buttons">
            <button className="register" onClick={register}>
              Register
            </button>
            <button className="login" onClick={login}>
              Login
            </button>
          </div>
        )}

        {auth.isAuthenticated && window.innerWidth < 992 ? (
          <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">City</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={city}
                label="City"
                onChange={handleChange}
              >
                <MenuItem value={'meerut'}>Meerut</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : null}
        {auth.isAuthenticated && decodeUser?.role == "patient" ? (
          <div className="links">
            <NavLink
              to="/bookings"
              onClick={(e) => {
                booking();
              }}
              className="link"
              activeClassName="active-link"
            >
              Bookings
            </NavLink>
            <NavLink
              to="/appointments"
              onClick={(e) => {
                appointment();
              }}
              className="link"
              activeClassName="active-link"
            >
              Appointments
            </NavLink>
            {/* <NavLink to="/reports" className="link" activeClassName="active-link">
                                Reports
                            </NavLink> */}
            <NavLink
              to="/profile"
              style={{ marginLeft: "12px" }}
              activeClassName="active-link"
            >
              <Avatar
                alt={user?.fullName}
                src={user?.image}
                sx={{ width: 48, height: 48 }}
              />
            </NavLink>
          </div>
        ) : null}
        {auth.isAuthenticated && decodeUser?.role == "doctor" ? (
          <div className="links">
            {/* <NavLink to="/chat" className="link" activeClassName="active-link">
                                Chat
                            </NavLink> */}
            <NavLink
              to="/dashboard"
              onClick={(e) => {
                insights();
              }}
              className="link"
              activeClassName="active-link"
            >
              Dashboard
            </NavLink>
          </div>
        ) : null}
        {auth.isAuthenticated ? (
          <div className="mobile-tabs">
            <NavLink className="tab" activeClassName="active-link" to="/">
              <HomeIcon fontSize="large" />
            </NavLink>
            {decodeUser?.role != "doctor" ? (
              <>
                <NavLink
                  className="tab"
                  onClick={(e) => {
                    booking();
                  }}
                  activeClassName="active-link"
                  to="/bookings"
                >
                  <InsertInvitationIcon fontSize="large" />
                </NavLink>
                <NavLink
                  className="tab"
                  onClick={(e) => {
                    appointment();
                  }}
                  activeClassName="active-link"
                  to="/appointments"
                >
                  <AssignmentIcon fontSize="large" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className="tab"
                  onClick={(e) => {
                    insights();
                  }}
                  activeClassName="active-link"
                  to="/dashboard"
                >
                  <DashboardIcon fontSize="large" />
                </NavLink>
                {/* <NavLink className="tab" activeClassName="active-link" to='/chat'><ChatIcon fontSize="large" /></NavLink> */}
              </>
            )}
            <NavLink
              className="tab"
              onClick={(e) => {
                profile();
              }}
              activeClassName="active-link"
              to="/profile"
            >
              <PersonIcon fontSize="large" />
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
