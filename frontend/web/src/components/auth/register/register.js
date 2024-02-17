import React, { useEffect, useState } from "react";

import './register.scss';
import authImage from '../../../assets/authImage.svg'
import { CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { register, setError, setSuccess } from "../../../actions/authActions";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useSelector, shallowEqual } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import FlagIcon from '@mui/icons-material/Flag';

const countries = [
  { code: '+91', name: 'India', icon: <FlagIcon /> },
  // Add more countries as needed
];

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
    // phoneNumber: false,
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


    try{

    } catch (error){

    }

    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    
    //       const updatedFormData = {
    //         ...formData,
    //         latitude,
    //         longitude,
    //       };
    
    //       // Call handleRegister with updatedFormData
    //       handleRegister(updatedFormData);
    //     },
    //     (error) => {
    //       console.error('Error getting location');
    
    //       // If there's an error, still call handleRegister (you might want to handle the error in handleRegister)
    //       handleRegister(formData);
    //     }
    //   );
    // } else {
    //   console.error('Geolocation not available');
    
      // If geolocation is not available, still call handleRegister
      handleRegister(formData);
    // }
    

  };


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const anatomicalRegions = [
    "scalp",
    "forehead",
    "eye",
    "nose",
    "ear",
    "face",
    "mouth",
    "jaw",
    "neck",
    "Upper chest",
    "Sternum",
    "Breast",
    "Chest",
    "shoulder",
    "armpit",
    "upper arm",
    "elbow",
    "forearm",
    "wrist",
    "hand",
    "fingers",
    "epigastric",
    "upper abdomen",
    "suprapubic",
    "pelvic",
    "hip",
    "groin",
    "thigh",
    "knee",
    "shin",
    "ankle",
    "foot",
    "toes",
    "head",
    "upper back",
    "back",
    "flank",
    "lower back",
    "tailbone",
    "buttock",
    "rectum",
    "calf",
    "skin",
    "general",
    "leg",
  ];

  const specialist = [
    "paediatric",
    "dermatologist",
    "surgery",
    "medicine",
    "psychiatrist",
    "ophthalmologist",
    "ENT",
    "pulmonologist",
    "orthopaedic",
    "gyanecologist",
    "neurologist",
    "dentist",
    "endocrinologist",
    "oncologist",
    "gastroentrologist",
    "urologist",
    "sexologist",
    "psychiatry",
    "cardiologist",
  ];

  // Function to convert a string to Title Case
  const toTitleCase = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

    const [country, setCountry] = React.useState('+91');

    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    };

  
    const [loading, setLoading] = useState(false);

    const handleRegister = async (value) => {

      setLoading(true);
      let response = await dispatch(register(value));
      setregisterClicked(!registerClicked)
      setLoading(false);
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
                className='form-field'
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleFieldChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><></>🇮🇳 +91</InputAdornment>
                  ),
                }}
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
                    <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="speciality-label">
                    Anatomical Region
                  </InputLabel>
                  <Select
                    labelId="speciality-label"
                    id="speciality"
                    value={formData?.speciality}
                    onChange={handleFieldChange}
                    name="speciality"
                    fullWidth
                    label="Anatomical Region"
                  >
                    <MenuItem value="" disabled>
                      <em>None</em>
                    </MenuItem>
                    {anatomicalRegions.map((item) => {
                      return (
                        <MenuItem value={item}>{toTitleCase(item)}</MenuItem>
                      );
                    })}
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
              <button disabled={loading} onClick={e => handleSubmit(e)}>{loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}</button>
              <a onClick={login}>Already have an account? <span>Login</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;