import React, {useContext} from 'react';

import WeatherContext from '../contexts/weatherContext';

export default function WeatherMap() {
    const {state: {currentCity}, dispatch} = useContext(WeatherContext);

    return (
        <div>
            {currentCity ? `${currentCity}` : 'Search for the weather in your city'}
            <div>WeatherMap</div>
        </div>
        
    )
}