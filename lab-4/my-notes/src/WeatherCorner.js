import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiDayRain, WiDaySnow, WiThunderstorm } from 'react-icons/wi';

const WeatherCorner = () => {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try 
            {
                // GET request to openweathermap (Dublin)
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Dublin&units=metric&appid=2e52540a357ffd6169b3714fd9a8c728`);

                if (response.status !== 200) 
                {
                    throw new Error('Cannot connect to OpenWeatherMap');
                }

                // Extract data from the response
                const data = response.data;
                setWeather(data);
            } 
            catch (error) 
            {
                console.error('Error fetching weather data:', error);
            } 
            finally 
            {
                setLoading(false); // Setting loading to false
            }
        };

        // Call when mounts
        fetchData();
    }, []);

    return (
        <div className="weather-corner">
        {loading ? (
            <p>Loading weather...</p>
        ) : (
            <>
            <h3>Weather</h3>
            {weather.main && weather.weather && weather.weather.length > 0 && (
                <>
                <div className="weather-icon">
                    {weather.weather[0].main === 'Clear' && <WiDaySunny />}
                    {weather.weather[0].main === 'Clouds' && <WiCloudy />}
                    {weather.weather[0].main === 'Rain' && <WiDayRain />}
                    {weather.weather[0].main === 'Snow' && <WiDaySnow />}
                    {weather.weather[0].main === 'Thunderstorm' && <WiThunderstorm />}
                </div>
                <p>{Math.round(weather.main.temp)}°C</p>
                <p>{weather.weather[0].description}</p>
                </>
            )}
            </>
        )}
        </div>
    );
};

export default WeatherCorner;
