import React from 'react';

const WeatherContext = React.createContext({
  currentCity: null,
  currentLong: null,
  currentLat: null,
  data: {}
});

export default WeatherContext;
