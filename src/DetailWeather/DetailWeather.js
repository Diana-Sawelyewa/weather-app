import './DetailWeather.scss';
import useService from '../Services';
import { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const DetailWeather = (props) => {
    const [weather, setWeather] = useState({}); 

    const {loading, error, clearError, getWeatherNow} = useService(props.city); 

    useEffect( () => {
        updateWeather(); 
    }, [props.city])

    const updateWeather = () => { 
        clearError(); 
        getWeatherNow()
        .then(onWeatherLoaded)
        .catch(()=> console.log('ошибка'))
        
    }

    const onWeatherLoaded = (weather) => {
        setWeather(weather);
    }



    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View weather={weather}/> : null; 


    return (
    <div className='detail_weather'>
        {errorMessage}
       {spinner}
       {content}
       </div>
    )
}

export default DetailWeather;

const View = ({weather}) => { //почему в фигурных скобках?
    const {wind_deg, wind_speed, wind_gust, pressure, humidity, clouds, visibility, isNight, sunrise, sunset} = weather;
    const gust = wind_gust ? <span>Порывы ветра до {wind_gust} м/с<img src='./pics/gust.png'/></span> : null;
    const sun = isNight ? <div className='sun'>Восход {sunrise} <img src='./pics/sunrise.png'/></div> : <div className='sun'>Закат {sunset} <img src='./pics/sunset.png'/></div>;
    return  (
        <>
            <div className='column1'>
                Давление<br/>Влажность<br/>Облачность<br/>Видимость
            </div>
            <div className='column1'>
                {pressure} мм рт.ст.<br/>{humidity} %<br/>{clouds} %<br/>{visibility ? visibility+' км' : 'неизвестно'}
            </div>
            <div className='column1 column0'>
            {wind_deg} ветер {wind_speed} м/с<br/>
            {gust}
            {sun}
            </div> 
            </>
    )
}