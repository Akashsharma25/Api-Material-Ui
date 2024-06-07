import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Card, CardContent, Grid } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true');
        const data = await response.json();
        setWeather(data.current_weather);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Current Weather</Typography>
      <Box mb={2} display="flex" alignItems="center">
        <AccessTimeIcon style={{ marginRight: 8 }} />
        <Typography variant="h6">Current Time: {currentTime.toLocaleTimeString()}</Typography>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        weather && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <ThermostatIcon style={{ marginRight: 8 }} />
                    <Typography variant="h6">Temperature: {weather.temperature}°C</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AirIcon style={{ marginRight: 8 }} />
                    <Typography variant="h6">Wind Speed: {weather.windspeed} m/s</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      )}
    </Container>
  );
};

export default Weather;
