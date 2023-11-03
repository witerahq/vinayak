import React, { useEffect } from "react";

import './header.scss';
import Logo from '../../assets/logo.svg';
import { useState } from 'react';
import { NavLink, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { getCurrentUser } from "../../actions/userActions";
import { Avatar } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';

function Header() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState(null);

    const auth = useSelector((state) => {
        if (state?.auth?.user?.token) {
            const decoded = jwt_decode(state?.auth?.user?.token);
        }
        return state.auth
    })

    const decodeUser = useSelector((state) => {
        if (state?.auth?.user?.token) {
            const decoded = jwt_decode(state?.auth?.user?.token);
            return decoded
        }
    })

    const user = useSelector((state) => {
        return state?.user?.user
    })

    const dispatch = useDispatch()

    const register = () => {
        // setSearchParams(`?${new URLSearchParams({ auth: 'register' })}`)
        navigate({
            pathname: '/',
            search: createSearchParams({
                auth: 'register',
            }).toString()
        })
    }
    const login = () => {
        // setSearchParams(`?${new URLSearchParams({ auth: 'login' })}`)
        navigate({
            pathname: '/',
            search: createSearchParams({
                auth: 'login',
            }).toString()
        })
    }

    useEffect(() => {
        if (auth.isAuthenticated&&!user) {
            dispatch(getCurrentUser());
        }
    }, [user]);

    return (
        <div className="Header">
            <div className="container">
                <div className="logo" onClick={e => { navigate('/') }}>
                    <img src={Logo} alt="logo" />
                </div>
                {(auth.isAuthenticated) ? null :
                    <div className="buttons">
                        <button className="register" onClick={register}>Register</button>
                        <button className="login" onClick={login}>Login</button>
                    </div>
                }
                {
                    ((auth.isAuthenticated) && decodeUser?.role == 'patient') ?

                        <div className="links">
                            <NavLink to="/bookings" className="link" activeClassName="active-link">
                                Bookings
                            </NavLink>
                            <NavLink to="/appointments" className="link" activeClassName="active-link">
                                Appointments
                            </NavLink>
                            {/* <NavLink to="/reports" className="link" activeClassName="active-link">
                                Reports
                            </NavLink> */}
                            <NavLink to="/profile" style={{marginLeft:'12px'}} activeClassName="active-link">
                                <Avatar
                                    alt={user?.fullName}
                                    src={user?.image}
                                    sx={{ width: 48, height: 48 }}
                                />
                            </NavLink>
                        </div> : null
                }
                {
                    (auth.isAuthenticated && decodeUser?.role == 'doctor') ?

                        <div className="links">
                            <NavLink to="/chat" className="link" activeClassName="active-link">
                                Chat
                            </NavLink>
                            <NavLink to="/dashboard" className="link" activeClassName="active-link">
                                Dashboard
                            </NavLink>
                        </div> : null
                }
                {
                    (auth.isAuthenticated) ?
                    <div className="mobile-tabs">
                        <NavLink className="tab" activeClassName="active-link" to='/'><HomeIcon fontSize="large" /></NavLink>
                        {
                            decodeUser?.role != 'doctor'?<>
                            <NavLink className="tab" activeClassName="active-link" to='/bookings'><InsertInvitationIcon fontSize="large" /></NavLink>
                            <NavLink className="tab" activeClassName="active-link" to='/appointments'><AssignmentIcon fontSize="large" /></NavLink>
                            </>:<>
                            <NavLink className="tab" activeClassName="active-link" to='/dashboard'><DashboardIcon fontSize="large" /></NavLink>
                            <NavLink className="tab" activeClassName="active-link" to='/chat'><ChatIcon fontSize="large" /></NavLink>
                            </>
                        }
                        <NavLink className="tab" activeClassName="active-link" to='/profile'><PersonIcon fontSize="large" /></NavLink>
                    </div>:null
                }
            </div>
        </div>
    )
}

export default Header;