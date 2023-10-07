import React from "react";

import './header.scss';
import Logo from '../../assets/logo.svg';
import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';

function Header() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState(null);

    const auth = useSelector((state)=>{
        if(state?.auth?.user?.token){
            const decoded = jwt_decode(state?.auth?.user?.token);
        }
        return state.auth
    })

    const decodeUser = useSelector((state)=>{
        if(state?.auth?.user?.token){
            const decoded = jwt_decode(state?.auth?.user?.token);
            return decoded
        }
    })

    const user = useSelector((state)=>{
        return state?.user?.user
    })

    const register = () => setSearchParams(`?${new URLSearchParams({ auth:'register' })}`)
    const login = () => setSearchParams(`?${new URLSearchParams({ auth:'login' })}`)


    return (
        <div className="Header">
            <div className="container">
                <div className="logo" onClick={e=>{navigate('/')}}>
                    <img src={Logo} alt="logo" />
                </div>
                {
                    !auth.isAuthenticated && decodeUser?.role!='patient' ?
                        <div className="buttons">
                            <button className="register" onClick={register}>Register</button>
                            <button className="login"  onClick={login}>Login</button>
                        </div> :
                        <div className="links">
                        <NavLink to="/bookings" className="link" activeClassName="active-link">
                          Bookings
                        </NavLink>
                        <NavLink to="/appointments" className="link" activeClassName="active-link">
                          Appointments
                        </NavLink>
                        <NavLink to="/reports" className="link" activeClassName="active-link">
                          Reports
                        </NavLink>
                        <NavLink to="/profile" className="user" activeClassName="active-link"></NavLink>
                      </div>
                }
            </div>
        </div>
    )
}

export default Header;