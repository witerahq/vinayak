import Subheader from "../sub-header/subheader";
import noRecordsImage from "../../assets/no-records.webp";
import "./medical-records.scss";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumentFileRecords } from "../../actions/medicalRecordFileActions";
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
// import TimelineDot from '@mui/lab/TimelineDot';
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import FolderImage from "../../assets/folder.png";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import moment from 'moment';

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const {id} = useParams()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const medicalRecordsFromStore = useSelector((state) => {
    console.log(state);
    console.log(state.medicalRecordFile);
    return state?.medicalRecordFile?.medicalFileRecords;
  });

  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!medicalRecordsFromStore){id?.length? dispatch(fetchDocumentFileRecords(id)):dispatch(fetchDocumentFileRecords(user?._id));}
  }, [dispatch, medicalRecordsFromStore]);

  return (
    <>
      <Subheader text={"Health files"} route={"/"}></Subheader>
      <div className="MedicalRecords">
        {medicalRecordsFromStore?.length ? (
          <div className="records">
            {/* Top Chip */}
            <Chip
              label="Timeline "
              color="primary"
              variant="outlined"
              sx={{
                position: "absolute",
                top: "-31px",
                left: "17.5%",
                transform: "translateX(-50%)",
              }}
            />
            {medicalRecordsFromStore.map((item) => {
              return (
                <Timeline position="right">
                  {/* Timeline Item */}
                  <TimelineItem>
                    {/* Left Content */}
                    <TimelineOppositeContent
                      sx={{
                        flex: 0.1,
                        padding: "40px 20px 40px 0px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {moment(item?.date).format('D MMM')}
                      </Typography>
                    </TimelineOppositeContent>

                    {/* Separator */}
                    <TimelineSeparator>
                      <TimelineConnector />

                      <TimelineConnector />
                    </TimelineSeparator>

                    {/* Right Content */}
                    <TimelineContent
                      sx={{ flex: 0.9 }}
                      className="document-card"
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          padding: 2,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <div className="icon">
                          <img src={FolderImage} alt="folder image" />
                        </div>

                        <div className="content">
                          <Typography variant="h6">{item?.documentName}</Typography>
                          <Typography variant="body2" className="type">
                            {item?.recordType} 
                          </Typography>

                          <div className="doctor-icon">
                            <VaccinesIcon fontSize="extrasmall"></VaccinesIcon>
                          </div>
                        </div>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>

                  {/* Add more TimelineItems as needed */}
                </Timeline>
              );
            })}
          </div>
        ) : (
          <div className="no-records">
            <img src={noRecordsImage} alt="no record image" />
            <p className="head">No Medical Records Found</p>
            <p>No medical records have been uploaded or fetched</p>
          </div>
        )}
        {!id?.length?
        <div
          className="add-record"
          onClick={(e) => navigate("/add-medical-record")}
        >
          <AddIcon></AddIcon>
        </div>:null
      }
      </div>
    </>
  );
};

export default MedicalRecords;
