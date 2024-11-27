import useService from '../Services';
import { useEffect } from 'react';
import './HeaderWeather.scss';

import setPic from '../pic';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const HeaderWeather = (props) => {

    const {loading, error, clearError, getWeatherNow} = useService(props.city); 

    useEffect( () => {
        updateWeather(); //можно использовать выше, чем ф-ция была объявлена, т.к. юзЭффект запускается уже потом
    }, [props.city])

    const updateWeather = () => { //может быть, все прописать в юзЭффекте?
        clearError(); //перед новый запросом зачищаем ошибку
       getWeatherNow()
        .then(onWeatherLoaded)
        .catch(()=> console.log('ошибка'))

    }

    const onWeatherLoaded = (weather) => {
        props.setWeather(weather);
    }



    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View weather={props.weather}/> : null; 



    return (

        <div className='main_table'>
{errorMessage}
{spinner}
{content}

        </div>
 
    )
    
}



export default HeaderWeather;

const View = ({weather}) => { //почему в фигурных скобках?
    const {name, temp, descr, temp_max, temp_min, isNight, clouds, snow, rain, feels_like} = weather;
    return  (
        <>
            <div className='name'><img src='./pics/place.png'/>{name}</div>
            <div className='center'><img className='main_pic' src={setPic(isNight, clouds, snow, rain)}/><div>{temp}°C</div></div>
            <div className='temp'>{descr}<br/>{temp_max}/{temp_min}</div>
            <span className='feels'>По ощущениям {feels_like}</span>
            </>
    )
}