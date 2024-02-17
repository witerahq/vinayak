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
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import {
  fetchAppointmentsDoctor,
  fetchAppointmentsPatient,
} from "../../actions/bookingActions";
import MenuIcon from "@mui/icons-material/Menu";
import defaultUser from "../../assets/default-user.webp";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import locationImage from "../../assets/location-pin.png";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [menuState, setMenuState] = useState(false);

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

  const toggleMenu = (value) => {
    setMenuState(value);
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

  const [city, setCity] = React.useState("meerut");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const takeToProfile = (value) => {
    if (value) navigate("/profile");
    else navigate("/login");
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(e) => toggleMenu(false)}
      onKeyDown={(e) => toggleMenu(false)}
    >
      <div
        className="user"
        onClick={(e) => takeToProfile(auth?.isAuthenticated)}
      >
        <div className="user-icon">
          <Avatar
            src={auth?.isAuthenticated ? user?.image : defaultUser}
            sx={{ width: 50, height: 50 }}
          ></Avatar>
          {/* <Ava src={defaultUser} alt="default user" /> */}
        </div>
        <div className="user-info">
          {auth?.isAuthenticated ? (
            <div className="name">
              <p>{user?.fullName}</p>
            </div>
          ) : (
            <button>Log In / Sign Up</button>
          )}
          <p>For Personalized Healthcare</p>
        </div>
      </div>

      <Divider />

      <div className="menu-items">
        <div className="menu-item" onClick={(e) => navigate("/bookings")}>
          <div className="icon">
            {" "}
            <ListAltIcon></ListAltIcon>
          </div>
          <div className="text">
            <p>Bookings</p>
          </div>
        </div>
        <div
          className="menu-item"
          onClick={(e) => navigate("/medical-records")}
        >
          <div className="icon">
            {" "}
            <PlaylistAddCircleIcon></PlaylistAddCircleIcon>
          </div>
          <div className="text">
            <p>Medical Records</p>
          </div>
        </div>
        <div className="menu-item" onClick={(e) => navigate("/appointments")}>
          <div className="icon">
            {" "}
            <CalendarTodayIcon></CalendarTodayIcon>
          </div>
          <div className="text">
            <p>Calendar</p>
          </div>
        </div>
        <div
          className="menu-item"
          onClick={(e) => navigate("/search?speciality=all")}
        >
          <div className="icon">
            {" "}
            <LocalHospitalIcon></LocalHospitalIcon>
          </div>
          <div className="text">
            <p>Specialities</p>
          </div>
        </div>
        <div
          className="menu-item"
          onClick={(e) => navigate("/search?city=meerut")}
        >
          <div className="icon">
            <ApartmentIcon></ApartmentIcon>
          </div>
          <div className="text">
            <p>Clinics</p>
          </div>
        </div>
        <div className="get-health-app">
          <button>
            <PhoneIphoneIcon></PhoneIphoneIcon>
            <span>GET HEALTH APP</span>
          </button>
        </div>
      </div>
    </Box>
  );

  return (
    <div className="Header">
      <div className="container">
        <div
          className="logo"
          onClick={(e) => {
            navigate("/");
          }}
        >
          <MenuIcon
            onClick={(e) => {
              toggleMenu(true);
            }}
          ></MenuIcon>
          <img src={Logo} alt="logo" />
        </div>
        <Drawer
          anchor={"left"}
          open={menuState}
          onClose={(e) => toggleMenu(false)}
        >
          {list()}
        </Drawer>
        <div className="search"></div>
        {auth.isAuthenticated ? null : (
          <div className="buttons">
            <button className="login" onClick={login}>
              Login
            </button>
          </div>
        )}

        {auth.isAuthenticated && window.innerWidth < 992 ? (
          <>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">City</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={city}
                label="City"
                onChange={handleChange}
              >
                <MenuItem value={"meerut"}>Meerut</MenuItem>
              </Select>
            </FormControl> */}
            <div className="city">
              <img src={locationImage} alt="" />
              <p>Meerut</p>
            </div>
          </>
        ) : null}
        {}
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
