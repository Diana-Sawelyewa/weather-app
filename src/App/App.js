import './App.scss';
import HeaderWeather from '../HeaderWeather/HeaderWeather';
import HourListWeather from '../HourListWeather/HourListWeather';
import DaysWeather from '../DaysWeather/DaysWeather';
import DetailWeather from '../DetailWeather/DetailWeather';
import SearchCity from '../SearchCity/SearchCity';
import Container from '../Container/Container';

import { useState } from 'react';

import GeoService from '../GeoService';


function App() {

  const cityFunc = () => {
    if (localStorage.getItem('city')) {
      return localStorage.getItem('city')
    } else {
      return 'Санкт-Петербург'
    }
  }

  const [coords, setCoords] = useState({});
  const [weather, setWeather] = useState({}); 
  const [city, setCity] = useState(cityFunc()); 

  return (
    <div className="App">
      <GeoService setCoords={setCoords} coords={coords} setCity={setCity}/>
      <Container snow={weather.snow} rain={weather.rain} isPink={weather.isPink} isNight={weather.isNight} clouds={weather.clouds} wind_speed={weather.wind_speed}/>
      <SearchCity setCity={setCity} city={city}/>
      <div className='header'>
      <DetailWeather city={city}/>
      <HeaderWeather city={city} weather={weather} setWeather={setWeather}/>
      </div>
      <HourListWeather city={city} timezone={weather.timezone} sunrise={weather.sunriseX} sunset={weather.sunsetX}/>
      <DaysWeather city={city}/>
    </div>
  );
}


export default App;

