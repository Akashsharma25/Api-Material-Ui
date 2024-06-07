import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import './FlipClock.css'; // Import the CSS file for flip animation

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  const renderFlipUnit = (current, key) => (
    <Box key={key} className="flip-clock">
      <Typography className="flip-unit" key={current}>{padTime(current)}</Typography>
    </Box>
  );

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={4} className="time-container">
      {renderFlipUnit(hours, 'hours')}
      <Typography variant="h4">:</Typography>
      {renderFlipUnit(minutes, 'minutes')}
      <Typography variant="h4">:</Typography>
      {renderFlipUnit(seconds, 'seconds')}
    </Box>
  );
};

export default FlipClock;
