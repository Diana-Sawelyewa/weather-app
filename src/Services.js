import { useHttp } from "./http.hook";

const useService = (city) => { //(city='Москва') заменила на спб

    const {loading, request, error, clearError} = useHttp();
    const _apiKey = '52b3ba06b050118cdd7b6393877ae447';
    

    //498817 СПБ

    const getWeatherNow = async () => { //запрос на погоду сейчас
        const res = await request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&lang=ru&units=metric&appid=${_apiKey}`);
        return _transformWeather(res); 
    }

    const getWeatherHours = async () => { //запрос на 12 часовых меток
        const res = await request(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&cnt=12&appid=${_apiKey}`);
        return res.list.map(_transformArrWeather); 
    }

    const getWeather5Days = async () => { //запрос на все возможные 40 меток (5 дней)
        const res = await request(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${_apiKey}`);
        return res.list.map(_transformArrWeather); 
    }

    return {loading, error, clearError, getWeatherNow, getWeatherHours, getWeather5Days}
}




export default useService;


function _transformWeather (obj) {
    return {
        name: obj.name, //только хедер
        temp: (obj.main.temp > 0.5) ? `+${Math.round(obj.main.temp)}` : `${Math.round(obj.main.temp)}`, //все
        temp_max: (obj.main.temp_max > 0.5) ? `+${Math.round(obj.main.temp_max)}` : `${Math.round(obj.main.temp_max)}`, //только детейл
        temp_min: (obj.main.temp_min > 0.5) ? `+${Math.round(obj.main.temp_min)}` : `${Math.round(obj.main.temp_min)}`, //только детейл
        feels_like: (obj.main.feels_like > 0.5) ? `+${Math.round(obj.main.feels_like)}°C` : `${Math.round(obj.main.feels_like)}°C`, //только хедер
        humidity: obj.main.humidity, //только детейл
        pressure: obj.main.pressure, //только детейл
        clouds: obj.clouds.all, //все
        rain: obj.rain ? true : undefined, //все
        snow: obj.snow ? true : undefined, //все
        descr: obj.weather[0].description, //только хедер
        wind_deg: funcWind(obj.wind.deg), //только детейл
        wind_speed: Math.round(obj.wind.speed), //детейл и контейнер
        wind_gust: obj.wind.gust ? Math.round(obj.wind.gust) : undefined, //детейл
        //timeZero: new Date(new Date().getTime() + new Date().getTimezoneOffset()*60000), //время 0+ это new Date(new Date().getTime() + new Date().getTimezoneOffset()*60000)
        timeThere: new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + obj.timezone*1000),// Местное время //оставить
        sunrise: `${new Date((obj.sys.sunrise + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getHours()}:${(new Date((obj.sys.sunrise + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getMinutes() < 10) ? (`0${new Date((obj.sys.sunrise + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getMinutes()}`) : new Date((obj.sys.sunrise + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getMinutes()}`, // восход по местному времени//детейл
        sunset: `${new Date((obj.sys.sunset + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getHours()}:${(new Date((obj.sys.sunset + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getMinutes() < 10) ? (`0${new Date((obj.sys.sunset + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getMinutes()}`) : new Date((obj.sys.sunset + new Date().getTimezoneOffset()*60 + obj.timezone)*1000).getMinutes()}`,//детейл
        isNight: ((+ new Date()) > (obj.sys.sunrise * 1000) && (+new Date()) < (obj.sys.sunset * 1000)) ? false : true,//хедер
        sunriseX: new Date(obj.sys.sunrise * 1000).getHours() + new Date(obj.sys.sunrise * 1000).getMinutes()/60,//контейнер - от хедер
        sunsetX: new Date(obj.sys.sunset * 1000).getHours() + new Date(obj.sys.sunset * 1000).getMinutes()/60,//контейнер-от хедер
        timezone: obj.timezone, //детейл
        visibility: (obj.visibility)/1000, //детейл
        isPink: (Math.abs((new Date().getHours()+new Date().getMinutes()/60) - (new Date(obj.sys.sunrise * 1000).getHours()+new Date(obj.sys.sunrise * 1000).getMinutes()/60))<1 || Math.abs((new Date().getHours()+new Date().getMinutes()/60) - (new Date(obj.sys.sunset * 1000).getHours()+new Date(obj.sys.sunset * 1000).getMinutes()/60))<1) ? true : false,
    }
};

function _transformArrWeather(obj) {
    return {
        temp: (obj.main.temp > 0.5) ? `+${Math.round(obj.main.temp)}` : `${Math.round(obj.main.temp)}`, //все
        clouds: obj.clouds.all, //все
        rain: obj.rain ? true : undefined, //все
        snow: obj.snow ? true : undefined, //все
        hours: obj.dt, //`${(new Date(obj.dt * 1000)).getHours()}:00`  //хаурс
        date: `${(new Date(obj.dt * 1000)).getDate()}.${(((new Date(obj.dt * 1000)).getMonth()+1)<10) ? `0${((new Date(obj.dt * 1000)).getMonth()+1)}` : ((new Date(obj.dt * 1000)).getMonth()+1)}`, //дэйс
        day: (new Date(obj.dt * 1000)).getDate(), //для сортировки в массивах
        hour: (new Date(obj.dt * 1000)).getHours(), //для сортировки в массивах
        dt: new Date(obj.dt*1000).getHours() + new Date(obj.dt*1000).getMinutes()/60,//хаурс/дэйс
    }
}


function funcWind(x) {
    if (60>x && x>=30) {
        return 'Северо-Восточный';
    } else if (120>x && x>=60) {
        return 'Восточный';
    } else if (150>x && x>=120) {
        return 'Юго-Восточный';
    } else if (210>x && x>=150) {
        return 'Южный';
    } else if (240>x && x>=210) {
        return 'Юго-Западный';
    } else if (300>x && x>=240) {
        return 'Западный';
    } else if (330>x && x>=300) {
        return 'Северо-Западный';
    } else {
        return 'Северный';
    }
}

