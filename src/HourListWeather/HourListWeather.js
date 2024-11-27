import useService from '../Services';
import { useState, useEffect } from 'react';
import './HourListWeather.scss';
/* import { Slider } from '../Carousel/Slider'; */

import setPic from '../pic';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import Slider from '../Carousel/Slider';

const HourListWeather = (props) => {
    const [weatherHours, setWeatherHours] = useState([]); 
    

    const {loading, error, clearError, getWeatherHours} = useService(props.city); 
    useEffect( () => {
        updateListWeather(); 
    }, [props.city])

    const updateListWeather = () => { //может быть, все прописать в юзЭффекте?
        clearError(); //перед новый запросом зачищаем ошибку
        getWeatherHours()
        .then(onWeatherLoaded)
        .catch(()=> console.log('ошибка'))
    }

    const onWeatherLoaded = (weather) => {
        setWeatherHours(weather); //массив
    }

    
    const elements = weatherHours.map((item, i) => {
    const {clouds, snow, rain} = item;
    const isNight = (item.dt > props.sunrise && item.dt < props.sunset) ? false : true;


    
    

    return (
        <div className='hours_item' key={i}>
            <span>{`${new Date(item.hours*1000 + new Date().getTimezoneOffset()*60*1000 + props.timezone*1000).getHours()}:00`}</span>
            <img src={setPic(isNight, clouds, snow, rain)}/>
            <div className='temp_line'>{item.temp}<span className='c'>°C</span></div>
        </div>
    )
   }) 

   const errorMessage = error ? <div className='error'><ErrorMessage/></div> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(loading || error) ? <Slider>{elements}</Slider> : null; 


    return (
            <>
            {errorMessage}
            {spinner}
            {content}
            </>
    )
    
}

export default HourListWeather;