import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import './profile.scss';
import UploadIcon from '@mui/icons-material/Upload';
import { useEffect, useState } from 'react';
import instance from '../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, removeUserDetails } from '../../actions/userActions';
import Map from '../google-map/google-map';
import { logout } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const userFromStore = useSelector((state) => {
        console.log(state,'state from profile')
        return state?.user?.user});

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
        console.log('hello 123',userFromStore)
        if (!userFromStore) {
            console.log('hello',userFromStore)
            dispatch(getCurrentUser());
        }
    }, [userFromStore]);

    const logoutUser = () => {
        dispatch(logout())
        dispatch(removeUserDetails())
        localStorage.removeItem('user')
        navigate('/')
    }

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
                        <TextField fullWidth id="profile-name" label="Full name" variant="outlined" value={user?.fullName} name="fullName" />
                        <TextField fullWidth id="profile-username" label="Username" variant="outlined" value={user?.username} name="fullName" />
                        {
                            user && userFromStore?.role === 'doctor' ?
                                <>
                                    <TextField fullWidth id="profile-experience" label="Experience" variant="outlined" value={user?.experience} name="experience" onChange={handleInputChange} />
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

                                        </Select>
                                    </FormControl>
                                </> : null
                        }
                        <TextField fullWidth id="profile-phone" label="Phone no." variant="outlined" value={user?.phoneNumber} name="phoneNumber" onChange={e => handleInputChange(e)} />
                        <TextField fullWidth id="profile-email" label="Email" variant="outlined" value={user?.email} name="email" />
                        <div className="user-location">
                            <Map lat={user?.latitude} lng={user?.longitude}></Map>
                        </div>
                        <Button variant="contained" disabled={!isDirty}>Save</Button>
                        <Button variant="contained" onClick={e => logoutUser()}>Logout</Button>


                    </Box>
                </div>
                <div className="profile-image">
                    <div className="image">
                        <img src={user?.image} alt="profile" />
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className="edit">
                        <Button startIcon={<UploadIcon />}>
                            Edit Profile
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;