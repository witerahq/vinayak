import React, { useEffect, useState } from "react";

import './login.scss';
import authImage from '../../../assets/authImage.svg'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { login, setError, setSuccess } from "../../../actions/authActions";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'patient'
    });
    const [formErrors, setFormErrors] = useState({
        fullName: false,
        password: false,

    });


    const [searchParams, setSearchParams] = useSearchParams()
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const successMessage = useSelector((state) => {
        return state.auth.success
    });
    const errorMessage = useSelector((state) => {
        return state.auth.error
    });
    const user = useSelector((state) => {
        return state.auth.user
    });
    const [loginClicked, setLoginClicked] = useState(false);

    const register = () => {
        if(window.innerWidth>992)
        setSearchParams(`?${new URLSearchParams({ auth: 'register' })}`)
        else 
        navigate('/register')
    }
    const close = () => setSearchParams(``)

    const handleLogin = async (value) => {
        let response = await dispatch(login(value));
        setLoginClicked(!loginClicked)
        if(window.innerWidth<992)
        navigate('/')
    };

    useEffect(() => {
        if (errorMessage?.length && errorMessage != 'null'){
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }

        if (successMessage?.length && successMessage != 'null') {
            enqueueSnackbar(successMessage, { variant: 'success' });
            if(user?.token)
            close();
        }
    }, [loginClicked||(successMessage||errorMessage)])

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};


        if (!formData.email) {
            errors.email = true;
        }
        if (!formData.password) {
            errors.password = true;
        }
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {

            enqueueSnackbar('All fields are required', { variant: 'error' });
            return;
        }

        handleLogin(formData);
    };

    useEffect(()=>{
        return ()=>{
          // setRegisterResponse(!registerResponse)
          setTimeout(()=>{dispatch(setError(null));},1000)
          setTimeout(()=>{dispatch(setSuccess(null));},1000)
        }
      },[])


    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <div className="Login">
            <div className="container">
                <div className="auth-content">
                    <div className="image">
                        <img src={authImage} alt=" auth image" />
                    </div>
                    <div className="auth-form">
                        <p>Login test</p>
                        <div className="close" onClick={close}>
                            <CloseIcon></CloseIcon>
                        </div>

                        <div className="form">
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="role"
                                className='form-field'
                                value={formData.role}
                                onChange={handleFieldChange}
                            >
                                <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                                <FormControlLabel value="doctor" sele control={<Radio />} label="Doctor" />
                                {/* <FormControlLabel value="admin" sele control={<Radio />} label="Admin" /> */}


                            </RadioGroup>

                            <TextField
                                required
                                className='form-field'
                                fullWidth
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleFieldChange}
                            />
                            <TextField
                                required
                                className='form-field'
                                fullWidth
                                type="password"
                                name="password"
                                label="Password"
                                value={formData.password}
                                onChange={handleFieldChange}
                            />
                            <button onClick={handleSubmit}>Login</button>
                            <a onClick={register}>Don’t have an account? <span>Register</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;