import React, { useState, useEffect, useContext, useReducer } from 'react';

import WeatherForm from './WeatherForm';
import WeatherMap from './WeatherMap';

import WeatherContext from '../contexts/weatherContext';
import weatherReducer from '../reducers/weatherReducer';


const APIKEY = '1b6c94def92d4887b9996bc59dee0ff3';

const useAPI = endpoint => {
  const [data, setData] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(endpoint).then(res => res.json());

    setData(response);
  };

  return data;
};

const getPosition = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}


export default function WeatherWidget() {
  const [curWeather, setCurWeather] = useState('');
  const [curLocation, setCurLocation] = useState('');

  const initialState = useContext(WeatherContext);
  const [state, dispatch] = useReducer(weatherReducer, initialState);


  let encodedLocation = encodeURIComponent('Los Angeles');
  const locationData = useAPI(
    `http://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&units=imperial&q=${encodedLocation}`
  );
  

  useEffect(() => {
    getPosition().then(position => {
      let curPos = {};
      curPos.lat = position.coords.latitude;
      curPos.long = position.coords.longitude;
  
      const getCurrentTemp = async () => {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&units=imperial&lat=${curPos.lat}&lon=${curPos.long}`)
        const json = await res.json();

        return json;
      }
  
      getCurrentTemp().then(data => {
        setCurWeather(data.main.temp)
        setCurLocation(data.name)
      });
      
    }).catch((err => {
      console.log(err);
    }));

  })

  useEffect(() => {
    dispatch({
      type: 'GET_CURRENT_LOCATION',
      payload: locationData
    });
  }, []);

  // const map = useAPI(`http://maps.openweathermap.org/maps/2.0/weatherappid=TA2?&appid=${APIKEY}`)
  // console.log(map);

  return (
    <WeatherContext.Provider
      value={{
        state,
        dispatch
      }}
    >
       <h1>Weather APP</h1> 
       <div>
         {curWeather ? `It is ${curWeather} degrees in ${curLocation}` : `Fetching Current Weather...`}
       </div>
       <WeatherForm />


       <WeatherMap />
    </WeatherContext.Provider>
  );
}
