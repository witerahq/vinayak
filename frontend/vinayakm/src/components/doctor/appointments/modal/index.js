import React, { useEffect, useState } from 'react';
import { Modal, Card, CardHeader, IconButton, Tabs, Tab, Box, Chip, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorAvailability, updateAvailabilityStatus, updateDayslotStatus } from '../../../../actions/doctorAvailabilityActions';
import moment from 'moment';

const WeekTabsModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  

  const availabilityFromStore = useSelector((state)=>{
    console.log('state',state.availability?.availability)
    return state.availability.availability
  })
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState(availabilityFromStore || []); // Local state for prescriptions

  useEffect(()=>{
    if(!availabilityFromStore){
      dispatch(fetchDoctorAvailability())
    }
  },[availabilityFromStore])

 

  const changeTab = (value)=>{
    setSelectedTab(value)
  }

  const handleChipClick = (timeOfDay, index) => {
      let slot = availability[selectedTab].timeSlots[timeOfDay][index]
      let slots = [...availability]
      if(slot.status!='booked'){
        slots[selectedTab].timeSlots[timeOfDay][index].status =  slot.status == 'open'? 'blocked':'open'
      } 
      console.log(slots,availability)

      setAvailability(slots)


      if(availability){}
  };

  const updateAvailability = () =>{
    dispatch(updateAvailabilityStatus(availability))
  }
  

  const updateDayAvailability = (value) =>{
    console.log('value',value._id)
    var status = ''
    if(value.status=='open'){
        status = 'closed'
    } else {
      status = 'open'
    }
    dispatch(updateDayslotStatus(value._id,status))
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Card className="weektabs-modal">
        <CardHeader
          className="modal-header"
          title="Week Tabs"
          action={
            <IconButton onClick={onClose}>
              <CloseIcon htmlColor='white' />
            </IconButton>
          }
        />
        <Box className="tabs-container">
          
          <Tabs value={selectedTab} onChange={(e, newValue) => changeTab(newValue)} variant="scrollable" scrollButtons>
            {availability&&availability?.map((item, i) => {
              console.log('ava',item)
              return <Tab key={i} label={moment(item.day).format("ddd, Do MMM")} />
            })}
            {/* <Tab icon={<CalendarTodayIcon />} /> */}
          </Tabs>



          <Button variant='outlined' onClick={e=>{updateDayAvailability(availability?.[selectedTab])}} size='small' style={{marginTop:'24px',marginBottom:'12px'}}>Slots : {availability?.[selectedTab]?.status}</Button>

          <Box className="time-sections">
            {availability?.[selectedTab]&&Object.keys(availability?.[selectedTab]?.timeSlots).map((time, idx) => (
              <div key={idx} className="time-slot">
                <h3>{time}</h3>
                {availability[selectedTab].timeSlots[time.toLowerCase()].map((item, sIdx) => (
                  <Chip 
                    key={sIdx}
                    label={item.startTime +' - '+item.endTime+':'+item.status} 
                    className={item.status}
                    onClick={() => handleChipClick(time, sIdx)}
                  />
                ))}
              </div>
            ))}
          </Box>
        <Button variant='outlined' onClick={e=>{updateAvailability()}} size='small' style={{marginTop:'16px',marginBottom:'16px',float:'right'}}>Update</Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default WeekTabsModal;
