import React, { useEffect, useState } from "react";

import './register.scss';
import authImage from '../../../assets/authImage.svg'
import { FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { register, setError, setSuccess } from "../../../actions/authActions";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useSelector, shallowEqual } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Geolocation } from '@capacitor/geolocation';

function Register() {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    licenseNumber: '',
    password: '',
    role: 'patient',
    licenseNumber: '',
    location: '', speciality: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    password: false,
    licenseNumber: false,
    speciality: false
  });

  const [searchParams, setSearchParams] = useSearchParams()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const dispatch = useDispatch();
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
  const [registerClicked, setregisterClicked] = useState(false);

  const successMessage = useSelector((state) => {
    return state.auth.success
  });

  const errorMessage = useSelector((state) => {
    return state.auth.error
  });

  const registeredUser = useSelector((state) => {
    return state.auth.registeredUser
  });

  const handleRegister = async (value) => {
    let response = await dispatch(register(value));
    setregisterClicked(!registerClicked)
  };

  useEffect(() => {

    if (errorMessage?.length && errorMessage != 'null') {

      enqueueSnackbar(errorMessage, { variant: 'error' });
    }

    if (successMessage?.length && successMessage != 'null') {
      enqueueSnackbar(successMessage, { variant: 'success' });

      if (registeredUser?._id) {
        if (window.innerWidth > 992){
          // setSearchParams(`?${new URLSearchParams({ verify: registeredUser?._id })}`)
          navigate({
            pathname: '/',
            search: createSearchParams({
              verify: registeredUser?._id,
            }).toString()
          })
        }
        else
          navigate('/verify?verify=' + registeredUser?._id)

      }
    }

  }, [registerClicked || registeredUser])

  useEffect(() => {
    return () => {
      // setRegisterResponse(!registerResponse)
      setTimeout(() => { dispatch(setError(null)); }, 1000)
      setTimeout(() => { dispatch(setSuccess(null)); }, 1000)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.fullName) {
      errors.fullName = true;
    }
    if (!formData.email) {
      errors.email = true;
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = true;
    }
    if (!formData.licenseNumber && formData.role === 'doctor') {
      errors.licenseNumber = true;
    }
    if (!formData.speciality && formData.role === 'doctor') {
      errors.speciality = true;
    }
    if (!formData.password) {
      errors.password = true;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {

      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }

    const getLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const updatedFormData = {
          ...formData,
          latitude,
          longitude,
        };

        console.log(updatedFormData)

        handleRegister(updatedFormData);
      } catch (error) {
        console.log(error.message)

        handleRegister(formData);
      }
    };

    getLocation()

  };


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  return (
    <div className="Register">
      <div className="container">
        <div className="auth-content">
          <div className="image">
            <img src={authImage} alt=" auth image" />
          </div>
          <div className="auth-form">
            <p>Register</p>
            <div className="close" onClick={close}>
              <CloseIcon></CloseIcon>
            </div>
            <div className="form">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                className='form-field'
                defaultValue="patient"
                value={formData.role}
                onChange={handleFieldChange}

              >
                <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />

              </RadioGroup>

              <TextField
                required
                className='form-field'
                fullWidth
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleFieldChange}

              />
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
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleFieldChange}
              />
              {
                formData.role === 'doctor' ? (
                  <>

                    <TextField
                      required
                      className='form-field'
                      fullWidth
                      label="License Number"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleFieldChange}
                    />
                    {/* <InputLabel id="speciality-label">Speciality</InputLabel> */}
                    {/* <Select
                      labelId="speciality-label"
                      id="demo-simple-select-autowidth"
                      value={formData.speciality}
                      onChange={handleFieldChange}
                      name="speciality"
                      fullWidth
                      className='form-field'
                      label="Speciality"
                    >
                      <MenuItem value="" disabled selected>
                        <em>Speciality</em>
                      </MenuItem>
                      <MenuItem value={'heart'}>Heart</MenuItem>
                      <MenuItem value={'brain'}>Brain</MenuItem>
                      <MenuItem value={'sanity'}>Sanity</MenuItem>
                      <MenuItem value={'ent'}>ENT</MenuItem>
                      <MenuItem value={'skin'}>Skin</MenuItem>
                      <MenuItem value={'stomach'}>Stomach</MenuItem>

                    </Select> */}
                    <FormControl sx={{ m: 1, width: '100%' }}>
                      <InputLabel id="speciality-label">Speciality</InputLabel>
                      <Select
                        labelId="speciality-label"
                        id="speciality"
                        value={formData.speciality}
                        onChange={handleFieldChange}
                        name="speciality"
                        fullWidth
                        // input={<OutlinedInput label="Speciality" />}
                        label="Speciality"
                      >
                        <MenuItem disabled value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'heart'}>Heart</MenuItem>
                        <MenuItem value={'brain'}>Brain</MenuItem>
                        <MenuItem value={'sanity'}>Sanity</MenuItem>
                        <MenuItem value={'ent'}>ENT</MenuItem>
                        <MenuItem value={'skin'}>Skin</MenuItem>
                        <MenuItem value={'stomach'}>Stomach</MenuItem>
                        <MenuItem value={'gyno'}>Gyno</MenuItem>
                        <MenuItem value={'dentist'}>Dentist</MenuItem>
                        <MenuItem value={'ortho'}>Ortho</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )
                  : ''
              }
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
              <button onClick={e => handleSubmit(e)}>Register</button>
              <a onClick={login}>Already have an account? <span>Login</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;