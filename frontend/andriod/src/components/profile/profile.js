import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import './profile.scss';
import UploadIcon from '@mui/icons-material/Upload';
import { useEffect, useState } from 'react';
import instance from '../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, removeUserDetails, updateUserDetails } from '../../actions/userActions';
import Map from '../google-map/google-map';
import { logout } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { emptyImage, uploadFile } from '../../actions/fileUploadActions';

function Profile() {
    const userFromStore = useSelector((state) => {
        console.log(state, 'state from profile')
        return state?.user?.user
    });

    const [user, setUser] = useState(userFromStore || {});

    const navigate = useNavigate();
    const [isDirty, setIsDirty] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setIsDirty(true);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (!userFromStore) {
            dispatch(getCurrentUser());
        }
    }, [userFromStore]);

    const logoutUser = () => {
        dispatch(logout())
        dispatch(removeUserDetails())
        localStorage.removeItem('user')
        navigate('/')
    }

    const updateUser = () => {
        dispatch(updateUserDetails(user))
        setIsDirty(false)
    }

    const handleEditProfileClick = () => {
        const imageInput = document.getElementById('imageInput');
        imageInput.click();
    };

    const image = useSelector((state) => state.file.url)

    useEffect(() => {
        if (image) {
            console.log(image,'img')
            setIsDirty(true)
            setUser((prevUser) => ({

                ...prevUser,
                image
            }))
        }

    }, [image])

    useEffect(() => {
        return () => {
            if (image != null)
                dispatch(emptyImage('profile'))
        }
    }, [])


    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // You can use FileReader to read the selected image as a data URL
            const reader = new FileReader();
            reader.onload = (e) => {

                dispatch(uploadFile(selectedFile,'profile'));
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="Profile">
            <div className="container">
                <div className="profile-details">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField fullWidth id="profile-name" label="Full name" variant="outlined" value={user?.fullName} name="fullName" onChange={handleInputChange} />
                        <TextField fullWidth id="profile-username" label="Username" variant="outlined" value={user?.username} name="fullName" />
                        <TextField fullWidth id="profile-age" label="Age" variant="outlined" value={user?.age} name="age" onChange={handleInputChange} />
                        <FormLabel id="gender-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="gender-label"
                            name="gender"
                            className='form-field'
                            value={user?.gender}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" sele control={<Radio />} label="Female" />
                        </RadioGroup>
                        {
                            user && userFromStore?.role === 'doctor' ?
                                <>
                                    <TextField fullWidth id="profile-experience" label="Experience" variant="outlined" value={user?.experience} name="experience" onChange={handleInputChange} />
                                    <TextField fullWidth id="profile-address" label="City" variant="outlined" value={user?.address} name="address" onChange={handleInputChange} />
                                    <TextField fullWidth id="profile-language" label="Language" variant="outlined" value={user?.language} name="language" onChange={handleInputChange} />
                                    <TextField fullWidth id="profile-hospital" label="Hospital" variant="outlined" value={user?.hospital} name="hospital" onChange={handleInputChange} />

                                    <FormControl sx={{ m: 1, width: '100%' }}>
                                        <InputLabel id="speciality-label">Speciality</InputLabel>
                                        <Select
                                            labelId="speciality-label"
                                            id="speciality"
                                            value={user?.speciality}
                                            onChange={handleInputChange}
                                            name="speciality"
                                            fullWidth
                                            label="Speciality"
                                        >
                                            <MenuItem value="" disabled>
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
                                </> : null
                        }
                        <TextField fullWidth id="profile-phone" label="Phone no." variant="outlined" value={user?.phoneNumber} name="phoneNumber" onChange={e => handleInputChange(e)} />
                        <TextField fullWidth id="profile-email" label="Email" variant="outlined" value={user?.email} name="email" />
                        <div className="user-location">
                            <Map lat={user?.latitude} lng={user?.longitude}></Map>
                        </div>
                        <Button variant="contained" disabled={!isDirty} onClick={e => updateUser()}>Save</Button>
                        <Button variant="contained" onClick={e => logoutUser()}>Logout</Button>


                    </Box>
                </div>
                <div className="profile-image">
                    <div className="image">
                        <img src={user?.image} alt="profile" />
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className="edit">
                        <Button startIcon={<UploadIcon />} onClick={handleEditProfileClick}>
                            Edit Profile
                        </Button>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;