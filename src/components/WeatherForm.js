import React, { useState, useContext } from 'react';

import WeatherContext from '../contexts/weatherContext';


export default function WeatherForm() {
    const [city, setCity] = useState('');
    const {state, dispatch} = useContext(WeatherContext);


    const handleSubmit = e => {
        e.preventDefault()
        
        if (city.length) {
            dispatch({
                type: 'SET_CITY_QUERY',
                payload: city
            });
        }

        setCity('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="search" 
                    value={city} 
                    placeholder="Search Weather by City"
                    onChange={e => setCity(e.target.value)}
                >

                </input>
                {/* <input type="search" placeholder="Search Weather by Longitude and Latitude"></input> */}
                <button type="submit">Get Weather</button>
            </form>
        </div>
    )
}