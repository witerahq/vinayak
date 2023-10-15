import React, { useEffect, useState } from "react";

import './verify.scss';
import '../../../service/apiService';
import authImage from '../../../assets/authImage.svg'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { register } from "../../../actions/authActions";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { verifyEmail, verifyEmailError, verifyEmailSuccess } from "../../../actions/emailVerificationActions";

function Verify() {

  const [formData, setFormData] = useState({
    otp: '',
  });
  const [formErrors, setFormErrors] = useState({
    otp: false,
  });

  const [searchParams, setSearchParams] = useSearchParams()
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = () => {
    if (window.innerWidth > 992) {
      navigate({
        pathname: '/',
        search: createSearchParams({
          auth: 'login',
        }).toString()
      })
    }
    // setSearchParams(`?${new URLSearchParams({ auth: 'login' })}`)
    else
      navigate('/login')
  }
  const close = () => setSearchParams(``)

  const successMessage = useSelector((state) => {
    return state.emailVerification.successMessage
  });

  const registeredUser = useSelector((state) => {
    return state.auth.registeredUser
  });

  const errorMessage = useSelector((state) => {
    return state.emailVerification.errorMessage
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verifyClicked, setverifyClicked] = useState(false);

  const handleClick = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 30000);
  };

  useEffect(() => {

    if (searchParams.get('verify')?.length) {
      axios.post('/api/email/send', { userId: searchParams.get('verify') })
        .then(response => {
          if (response.data) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
        })
        .catch(error => {
          console.error('Error verifying token:', error);
        });
    }
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 30000);
  }, []);


  const handleVerify = async (value) => {
    let response = await dispatch(verifyEmail(value));
    setverifyClicked(!verifyClicked);
  };

  useEffect(() => {
    if (errorMessage && errorMessage != 'null')
      enqueueSnackbar(errorMessage, { variant: 'error' });

    if (successMessage && successMessage != 'null') {
      enqueueSnackbar(successMessage, { variant: 'success' });
      login()
    }
  }, [verifyClicked || (successMessage || errorMessage)])

  useEffect(() => {
    return () => {
      // setRegisterResponse(!registerResponse)
      setTimeout(() => { dispatch(verifyEmailSuccess(null)); }, 1000)
      setTimeout(() => { dispatch(verifyEmailError(null)); }, 1000)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.otp) {
      errors.otp = true;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {

      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }

    setIsButtonDisabled(true);
    handleVerify({
      code: formData.otp,

      userId: searchParams.get('verify')
    })


  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="Verify">
      <div className="container">
        <div className="auth-content">
          <div className="image">
            <img src={authImage} alt=" auth image" />
          </div>
          <div className="auth-form">
            <p>Verify your email</p>
            <div className="close" onClick={close}>
              <CloseIcon></CloseIcon>
            </div>
            <div className="form">
              <span className="subhead">OTP sent : {registeredUser?.email}</span>
              <TextField
                required
                className='form-field'
                fullWidth
                inputProps={{ maxLength: 6 }}
                type="number"
                name="otp"
                label="One time password (OTP)"
                value={formData.password}
                onChange={handleFieldChange}
              />
              <button onClick={e => handleSubmit(e)}>Verify</button>
              <button className='resend' onClick={handleClick} disabled={isButtonDisabled}>Resend code<span></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify;