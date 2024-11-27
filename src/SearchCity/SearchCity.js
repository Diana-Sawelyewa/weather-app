import { useState, useRef, useEffect} from 'react';
import russia from './russia';
import './SearchCity.scss'

const SearchCity = (props) => {
    const [str, setStr] = useState('');
    const [results, setResults] = useState([]);

    const updateCity = (e) => {
        setStr(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (str !== '' ) {
          let result = (russia.filter(function (item){
            return item.city.startsWith(str.trim())
        })[0]) ? (russia.filter(function (item){
          return item.city.startsWith(str.trim())
      })[0].city) : null;
        if (result) { props.setCity(result) } 
        else { result = (russia.filter(function (item){
          return item.city.startsWith(str.trim().slice(0,3))
      })[0]) ? (russia.filter(function (item){
        return item.city.startsWith(str.trim().slice(0,3))
    })[0].city) : null
      if (result) { props.setCity(result) } else {
        result = (russia.filter(function (item){
          return item.city.startsWith(str.trim().slice(0,2))
      })[0]) ? (russia.filter(function (item){
        return item.city.startsWith(str.trim().slice(0,2))
    })[0].city) : null
      if (result) {props.setCity(result)}
      }
        }
          
        };
        setStr('');
        setResults([]);
    }



    const resultClick = (value) => {
        props.setCity(value);
        localStorage.setItem('city', value)
        setStr('');
        setResults([]);
      };


    const showResults = (e) => {
        e.target.value = e.target.value ? e.target.value[0].toUpperCase() + e.target.value.slice(1) : e.target.value;
        setResults([])
        if (e.target.value.length < 2) return;
        setResults(russia.filter(function (item){
            return item.city.startsWith(e.target.value)
        }));

    };


    function useOutsideAlerter(onOutsideClick) { 
        const ref = useRef();
      
        useEffect(() => {
          function handleClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              onOutsideClick();
            }
          }
          document.addEventListener('mousedown', handleClick);
          
          return () => {
            document.removeEventListener('mousedown', handleClick);
          };
        }, [onOutsideClick]);
      
        return ref;
      }

    return (
        <>
        <form className='city_form' onSubmit={onSubmit}>
        <input type="text" placeholder="Введите название города" onInput={showResults} value={str} onChange={updateCity}/>
        <button onSubmit={onSubmit}/>
        </form>
        <div ref={useOutsideAlerter(() => setResults([]))} className='results'>
        {results.map((item,i) => {
            return(
                <div onClick={() => resultClick(item.city)} key={i}>{item.city}, {item.region.slice(0, 30)}</div>
            )
        })}
        </div>
        </>
    )
}

export default SearchCity;


