import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import axios from '../../../service/apiService';
import Subheader from "../../sub-header/subheader";
import "./add-medical-record.scss";
import moment from 'moment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { createDocumentFileRecord, fetchDocumentFileRecords } from "../../../actions/medicalRecordFileActions";

const AddMedicalRecord = () => {
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [recordFor, setRecordFor] = useState("");
  const [recordType, setRecordType] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => {
    console.log(state.user.user)
    return state.user.user;
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setDocumentName(selectedFile.name);
    handleSaveSecurely(selectedFile);

  };

  const handleSaveSecurely = (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        // Handle the response as needed
        console.log("File upload response:", response.data.url);
        setUrl(response.data.url);
      })
      .catch((error) => {
        // Handle errors here
        console.error("File upload failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(",").map((tag) => tag.trim()));
  };

  const isFormValidated = () => {
    return !!documentName && !!file && !!recordFor && !!recordType && !!date;
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();



  const saveData = () =>{
    let data = {
      date,url,tags:tags.join(', '),recordType,recordFor,documentName
    }
    dispatch(createDocumentFileRecord(data))
    dispatch(fetchDocumentFileRecords(user?._id))
    navigate('/medical-records')
  }

  return (
    <>
      <Subheader route={"/medical-records"} text={"Add document details"}></Subheader>
      <Card className="AddMedicalRecord">
        <CardContent>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <label htmlFor="fileInput">
            <Card className="file-card">
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <div className="icon">
                  <CloudUploadIcon />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div className="text">{file ? file.name : "Choose a file"}</div>
                  <div className="date">Prescription | {moment(new Date()).format('Do MMM, YYYY')}</div>
                </div>
                <Button
                  variant="outlined"
                  component="span"
                  style={{ marginLeft: "auto" }}
                  className="view"
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </label>

          <div
            style={{ display: "flex", marginTop: "20px" }}
            className="form-group"
          >
            <IconButton>
              <EditIcon /> Document Name
            </IconButton>
            <TextField
              placeholder="Document Name"
              variant="outlined"
              fullWidth
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>

          <div
            style={{ display: "flex",  marginTop: "20px" }}
            className="form-group"
          >
            <IconButton>
              <SummarizeIcon /> Type of record
            </IconButton>
            <TextField
              placeholder="Record Type"
              variant="outlined"
              fullWidth
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
            />
          </div>

          <div
            style={{ display: "flex", marginTop: "20px" }}
            className="form-group"
          >
            <IconButton>
              <PersonIcon /> Record For
            </IconButton>
            <TextField
              placeholder="Record For"
              variant="outlined"
              fullWidth
              value={recordFor}
              onChange={(e) => setRecordFor(e.target.value)}
            />
          </div>

          <div
            style={{ display: "flex",  marginTop: "20px" }}
            className="form-group"
          >
            <IconButton>
              <CalendarTodayIcon /> Document Date
            </IconButton>
            <TextField
              placeholder="Date"
              variant="outlined"
              fullWidth
              type="date"
              value={date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div
            style={{ display: "flex", marginTop: "20px" }}
            className="form-group"
          >
            <IconButton>
              <LocalOfferIcon /> Tags
            </IconButton>
            <TextField
              placeholder="Tags"
              variant="outlined"
              fullWidth
              value={tags.join(", ")}
              onChange={handleTagChange}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={saveData}
            disabled={!isFormValidated() || loading}
            style={{ marginTop: "20px" }}
            className="save"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Securely"
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddMedicalRecord;
