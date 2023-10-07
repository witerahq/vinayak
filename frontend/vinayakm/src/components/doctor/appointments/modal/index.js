import React, { useState } from 'react';
import { Modal, Card, CardHeader, IconButton, Tabs, Tab, Box, Chip, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './index.scss';

const WeekTabsModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();

  const initialSlots = {
    morning: Array(4).fill('available'),   // Representing 8, 9, 10, 11 AM slots
    afternoon: Array(4).fill('available'), // Representing 12, 1, 2, 3 PM slots
    evening: Array(4).fill('available'),   // Representing 4, 5, 6, 7 PM slots
  };

  const [slots, setSlots] = useState(initialSlots);

  const handleChipClick = (timeOfDay, index) => {
    setSlots(prevSlots => {
      const newSlots = { ...prevSlots };
      if (newSlots[timeOfDay][index] === 'available') {
        newSlots[timeOfDay][index] = 'disabled';
      } else if (newSlots[timeOfDay][index] === 'disabled') {
        newSlots[timeOfDay][index] = 'available';
      }
      return newSlots;
    });
  };

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
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} variant="scrollable" scrollButtons>
            {[...Array(7)].map((_, i) => {
              const dateObj = new Date(currentDate);
              dateObj.setDate(currentDate.getDate() + i);
              return <Tab key={i} label={`${('0'+dateObj.getDate()).slice(-2)} ${days[dateObj.getDay()]} `} />
            })}
            {/* <Tab icon={<CalendarTodayIcon />} /> */}
          </Tabs>

          <Box className="time-sections">
            {['Morning', 'Afternoon', 'Evening'].map((time, idx) => (
              <div key={idx} className="time-slot">
                <h3>{time}</h3>
                {slots[time.toLowerCase()].map((status, sIdx) => (
                  <Chip 
                    key={sIdx}
                    label={`${time} Slot ${sIdx + 1}`} 
                    className={status}
                    onClick={() => status !== 'booked' && handleChipClick(time.toLowerCase(), sIdx)}
                  />
                ))}
              </div>
            ))}
          </Box>
        <Button variant='outlined' size='small' style={{marginTop:'16px',marginBottom:'16px',float:'right'}}>Update</Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default WeekTabsModal;
