import React, { useEffect, useState } from "react";
import {
  Modal,
  Card,
  CardHeader,
  IconButton,
  Tabs,
  Tab,
  Box,
  Chip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorAvailability,
  updateAvailabilityStatus,
  updateDayslotStatus,
} from "../../../../actions/doctorAvailabilityActions";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const WeekTabsModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [value, setValue] = React.useState();

  const availabilityFromStore = useSelector((state) => {
    console.log("state", state.availability?.availability);
    return state.availability.availability;
  });
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState(availabilityFromStore || []); // Local state for prescriptions

  useEffect(() => {
    if (!availabilityFromStore) {
      dispatch(fetchDoctorAvailability());
    }
  }, [availabilityFromStore]);

  const changeTab = (value) => {
    setSelectedTab(value);
  };

  const handleChipClick = (timeOfDay, index) => {
    let slot = availability[selectedTab].timeSlots[timeOfDay][index];
    let slots = [...availability];
    if (slot.status != "booked") {
      slots[selectedTab].timeSlots[timeOfDay][index].status =
        slot.status == "open" ? "blocked" : "open";
    }
    console.log(slots, availability);

    setAvailability(slots);

    if (availability) {
    }
  };

  const updateAvailability = () => {
    dispatch(updateAvailabilityStatus(availability));
  };

  const updateDayAvailability = (value) => {
    console.log("value", value._id);
    var status = "";
    if (value.status == "open") {
      status = "closed";
    } else {
      status = "open";
    }
    dispatch(updateDayslotStatus(value._id, status));
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});
  const [dialogStartTime, setDialogStartTime] = useState("");
  const [dialogEndTime, setDialogEndTime] = useState("");

  const openDialog = (time) => {
    setSelectedTime(time);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedTime({});
    setDialogStartTime("");
    setDialogEndTime("");
  };

  const handleTimeChange = (newTime) => {
    if (newTime.startTime) {
      setDialogStartTime(dayjs(newTime.startTime).format("HH:mm A"));
    } else {
      setDialogEndTime(dayjs(newTime.endTime).format("HH:mm A"));
    }
  };

  const handleDialogSave = () => {
    if (selectedTime.index !== undefined) {
      let slot =
        availability[selectedTab].timeSlots[selectedTime.timeOfDay][
          selectedTime.index
        ];
      let slots = [...availability];

      if (dialogStartTime.length)
        slots[selectedTab].timeSlots[selectedTime.timeOfDay][selectedTime.index].startTime = dialogStartTime;

      if (dialogEndTime.length)
        slots[selectedTab].timeSlots[selectedTime.timeOfDay][selectedTime.index].endTime = dialogEndTime;

      setAvailability(slots);
    } else {
      console.log(selectedTime);

      let slots = [...availability];
      if(dialogStartTime.length && dialogEndTime.length) {
        let data = {
          startTime: dialogStartTime,
          endTime: dialogEndTime,
          status:'open'
        }
        slots[selectedTab].timeSlots[selectedTime.timeOfDay].push(data)

        slots[selectedTab].timeSlots[selectedTime.timeOfDay].sort((a,b)=> new Date('1-12-2024 '+a.startTime) - new Date('1-12-2024 '+b.startTime))
        setAvailability(slots);
      } else {
        alert('Select both start and edit time for your slots...')
      }
    }
    closeDialog();
  };

  const addHoursToDate = (date, time) => {
    var [hours, minutes] = time?.split(":")?.map((part) => parseInt(part, 10));
    if (time.toLowerCase().includes("pm") && hours !== 12) {
      hours += 12;
    }

    const newDate = new Date(date);
    newDate.setHours(hours, minutes);

    return newDate;
  };

  const handleDialogDelete = () => {
    let slots = [...availability];
    slots[selectedTab].timeSlots[selectedTime.timeOfDay].splice(selectedTime.index,1)
    slots[selectedTab].timeSlots[selectedTime.timeOfDay].sort((a,b)=> new Date('1-12-2024 '+a.startTime) - new Date('1-12-2024 '+b.startTime))
    setAvailability(slots);

    closeDialog();
  }

  const getAvailableHours = () => {
    switch (selectedTime.timeOfDay) {
      case 'morning':
        return Array.from({ length: 6 }, (_, i) => i + 6); // Example: 6 AM to 11 AM
      case 'afternoon':
        return Array.from({ length: 6 }, (_, i) => i + 12); // Example: 12 PM to 5 PM
      case 'evening':
        return Array.from({ length: 6 }, (_, i) => i + 18); // Example: 6 PM to 11 PM
      default:
        return [];
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Card className="weektabs-modal">
        <CardHeader
          className="modal-header"
          title="Week Tabs"
          action={
            <IconButton onClick={onClose}>
              <CloseIcon htmlColor="white" />
            </IconButton>
          }
        />
        <Box className="tabs-container">
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => changeTab(newValue)}
            variant="scrollable"
            scrollButtons
          >
            {availability &&
              availability?.map((item, i) => {
                return (
                  <Tab key={i} label={moment(item.day).format("ddd, Do MMM")} />
                );
              })}
            {/* <Tab icon={<CalendarTodayIcon />} /> */}
          </Tabs>

          <Button
            variant="outlined"
            onClick={(e) => {
              updateDayAvailability(availability?.[selectedTab]);
            }}
            size="small"
            style={{ marginTop: "24px", marginBottom: "12px" }}
          >
            Slots : {availability?.[selectedTab]?.status}
          </Button>

          <Box className="time-sections">
            {availability?.[selectedTab] &&
              Object.keys(availability?.[selectedTab]?.timeSlots).map(
                (time, idx) => (
                  <div key={idx} className="time-slot">
                    <div
                      className="flex align-items-center"
                      style={{
                        marginTop: "15px",
                        marginBottom: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <h3 style={{ margin: "0" }}>{time}</h3>
                      <AddCircleOutlineIcon
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                        onClick={() =>
                          openDialog({
                            timeOfDay: time.toLowerCase(),
                            timeIndex: idx,
                          })
                        }
                      />
                    </div>
                    {availability[selectedTab].timeSlots[
                      time.toLowerCase()
                    ].map((item, sIdx) => (
                      <div className="flex align-items-center">
                        <Chip
                          key={sIdx}
                          label={`${item.startTime} - ${item.endTime}:${item.status}`}
                          className={item.status}
                          onClick={() => handleChipClick(time, sIdx)}
                        />
                        {item.status !== "booked" ? (
                          <EditIcon
                            style={{ marginLeft: "4px", cursor: "pointer" }}
                            onClick={() =>
                              openDialog({
                                timeOfDay: time.toLowerCase(),
                                index: sIdx,
                                slot: item,
                              })
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
          </Box>

          <Button
            variant="outlined"
            onClick={(e) => {
              updateAvailability();
            }}
            size="small"
            style={{ marginTop: "16px", marginBottom: "16px", float: "right" }}
          >
            Update
          </Button>
        </Box>
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>
            {selectedTime.index !== undefined
              ? "Edit time for"
              : "Add time for"}{" "}
            {selectedTime.timeOfDay}
          </DialogTitle>
          <DialogContent style={{ paddingTop: "12px" }}>
            {/* Add TimePicker components here for selecting start and end times */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start time"
                getHours={(date) => getAvailableHours()}

                defaultValue={
                  selectedTime.index !== undefined
                    ? dayjs(
                        addHoursToDate(new Date(), selectedTime.slot.startTime)
                      )
                    : null
                }
                sx={{ marginRight: "8px" }}
                onChange={(newTime) => handleTimeChange({ startTime: newTime })}
              />
              <TimePicker
                label="End time"
                getHours={(date) => getAvailableHours()}

                defaultValue={
                  selectedTime.index !== undefined
                    ? dayjs(
                        addHoursToDate(new Date(), selectedTime.slot.endTime)
                      )
                    : null
                }
                onChange={(newTime) => handleTimeChange({ endTime: newTime })}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={handleDialogDelete}>Delete</Button>
            <Button onClick={handleDialogSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Modal>
  );
};

export default WeekTabsModal;
