import useService from '../Services';
import { useState, useEffect } from 'react';
import './DaysWeather.scss';

import setPic from '../pic';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const DaysWeather = (props) => {
    const [weatherDays, setWeatherDays] = useState([]); 
    const {loading, error, clearError, getWeather5Days} = useService(props.city); 

    useEffect( () => {
        updateDaysWeather(); 
    }, [props.city])

    const updateDaysWeather = () => { //может быть, все прописать в юзЭффекте?
        clearError(); //перед новый запросом зачищаем ошибку
        getWeather5Days()
        .then(onWeatherLoaded)
        .catch(()=> console.log('ошибка'))
    }

    const onWeatherLoaded = (weather) => {
        setWeatherDays(funcArr(weather)); //массив
    }


    const wholeElements = weatherDays.slice(1, 5).map((item) => { //вытаскивает целые 4 массива и выбирает из них только две часовые метки
         return item.filter(function (item) {
            return (item.hour === 15 || item.hour === 3)
        })
    })

    const errorMessage = error ? <div className='error'><ErrorMessage/></div> : null;
    const spinner = loading ? <Spinner/> : null;


    const elements = wholeElements.map((item, i) => { 
        return (
            <div className='item_day' key={i}>
{errorMessage}                
{spinner}
{!(loading || error) ? <View item={item}/> : null}
            </div>
        )
    })

    


        return (
                <div className='days_container'>
                {elements}
                </div>
                
        ) 
}

export default DaysWeather;

function funcArr (arr, key='day') {
    return arr.reduce((a,c) => {
      const idx = a.findIndex(e => e.length > 0 && e[0][key] === c[key]);
      return idx !== -1 ? (a[idx].push(c), a) : (a.push([c]), a);
    }, [])
  }

  const View = ({item}) => { 

    return  (
        <>
    <span className='night'>Ночь {item[0].temp}</span>
     <img className='night' src={setPic(true, item[0].clouds, item[0].snow, item[0].rain)}/><br/>
  <span className='day'>День</span><br/>
  <img className='day' src={setPic(false, item[1].clouds, item[1].snow, item[1].rain)}/>
  <div className='temp_day'>{item[1].temp}°C</div>
  <div className='date'>{item[0].date}</div>
            </>
    )
}


