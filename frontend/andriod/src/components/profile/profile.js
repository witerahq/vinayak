import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import "./profile.scss";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useMemo, useState } from "react";
import instance from "../../service/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  removeUserDetails,
  updateUserDetails,
} from "../../actions/userActions";
import Map from "../google-map/google-map";
import { logout } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { emptyImage, uploadFile } from "../../actions/fileUploadActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));
function Profile() {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

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

  console.log("hey");

  const userFromStore = useSelector((state) => {
    console.log(state, "state from profile");
    return state?.user?.user;
  });

  // const [loading,setLoading] = useState(true)

  const [user, setUser] = useState(userFromStore || {});
  const memoizedUser = useMemo(() => userFromStore, [userFromStore]);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  useEffect(() => {
    console.log("hi");
    if (!userFromStore) {
      dispatch(getCurrentUser());
      // setLoading(false)
    }
  }, [dispatch, userFromStore]);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(removeUserDetails());
    localStorage.removeItem("user");
    navigate("/");
  };

  const updateUser = () => {
    dispatch(updateUserDetails(user));
    setIsDirty(false);
  };

  const handleEditProfileClick = () => {
    const imageInput = document.getElementById("imageInput");
    imageInput.click();
  };

  const image = useSelector((state) => state.file.url);

  useEffect(() => {
    if (image) {
      console.log(image, "img");
      setIsDirty(true);
      setUser((prevUser) => ({
        ...prevUser,
        image,
      }));
    }
  }, [image]);

  useEffect(() => {
    return () => {
      if (image != null) dispatch(emptyImage("profile"));
    };
  }, []);

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

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // You can use FileReader to read the selected image as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(uploadFile(selectedFile, "profile"));
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
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              id="profile-name"
              label="Full name"
              variant="outlined"
              value={user?.fullName}
              name="fullName"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              style={{ display: "none" }}
              id="profile-username"
              label="Username"
              variant="outlined"
              value={user?.username}
              name="fullName"
            />
            <TextField
              fullWidth
              id="profile-age"
              label="Age"
              variant="outlined"
              value={user?.age}
              name="age"
              onChange={handleInputChange}
            />
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-label"
              name="gender"
              className="form-field"
              value={user?.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                sele
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            {user && userFromStore?.role === "doctor" ? (
              <>
                <TextField
                  fullWidth
                  id="profile-experience"
                  label="Experience"
                  variant="outlined"
                  value={user?.experience}
                  name="experience"
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  id="profile-address"
                  label="City"
                  variant="outlined"
                  value={user?.address}
                  name="address"
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  id="profile-language"
                  label="Language"
                  variant="outlined"
                  value={user?.language}
                  name="language"
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  id="profile-hospital"
                  label="Hospital"
                  variant="outlined"
                  value={user?.hospital}
                  name="hospital"
                  onChange={handleInputChange}
                />

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="speciality-label">
                    Anatomical Region
                  </InputLabel>
                  <Select
                    labelId="speciality-label"
                    id="speciality"
                    value={user?.speciality}
                    onChange={handleInputChange}
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
            ) : null}
            <TextField
              fullWidth
              id="profile-phone"
              label="Phone no."
              variant="outlined"
              value={user?.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              fullWidth
              id="profile-email"
              label="Email"
              variant="outlined"
              value={user?.email}
              name="email"
            />
            {user && userFromStore?.role === "doctor" ? (
              <Grid container spacing={2}>
                {/* First Row */}
                <Grid item xs={6}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="primary-specialist-label">
                      Primary Specialist
                    </InputLabel>
                    <Select
                      labelId="primary-specialist-label"
                      id="primary-specialist-select"
                      label="Primary Specialist"
                      value={user?.["Primary Specialist"]}
                      onChange={handleInputChange}
                      name="Primary Specialist"
                    >
                      {specialist.map((item) => {
                        return (
                          <MenuItem value={item}>{toTitleCase(item)}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="secondary-specialist-label">
                      Secondary Specialist
                    </InputLabel>
                    <Select
                      labelId="secondary-specialist-label"
                      id="secondary-specialist-select"
                      label="Secondary Specialist"
                      value={user?.["Secondary Specialist"]}
                      onChange={handleInputChange}
                      name="Secondary Specialist"
                    >
                      {specialist.map((item) => {
                        return (
                          <MenuItem value={item}>{toTitleCase(item)}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Second Row */}
                <Grid item xs={6}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="tertiary-specialist-label">
                      Tertiary Specialist
                    </InputLabel>
                    <Select
                      labelId="tertiary-specialist-label"
                      id="tertiary-specialist-select"
                      label="Tertiary Specialist"
                      value={user?.["Tertiary Specialist"]}
                      onChange={handleInputChange}
                      name="Tertiary Specialist"
                    >
                      {specialist.map((item) => {
                        return (
                          <MenuItem value={item}>{toTitleCase(item)}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  {/* TextField for Appointment Price */}
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      type="number"
                      label="Appointment Price"
                      variant="outlined"
                      id="appointment-price"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={user?.["priceAppointment"]}
                      onChange={handleInputChange}
                      name="priceAppointment"
                      
                    />
                  </FormControl>
                </Grid>
              </Grid>
            ) : null}
            <div className="user-location">
              <Map lat={user?.latitude} lng={user?.longitude}></Map>
            </div>
            <Button
              variant="contained"
              disabled={!isDirty}
              onClick={(e) => updateUser()}
            >
              Save
            </Button>
            <Button variant="contained" onClick={(e) => logoutUser()}>
              Logout
            </Button>
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
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
