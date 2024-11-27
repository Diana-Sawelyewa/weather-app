import { useEffect } from 'react';

const GeoService = ({ setCoords, coords, setCity}) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoords(coords => { 
        return { lat: position.coords.latitude, lon: position.coords.longitude };
      });
    }, function(error) {
      console.log(error.message);
    });

  }, []);

  useEffect(() => {
    fetch("http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token 312455246012300985c1c4d09fe795003088aaa3"
      },
      body: JSON.stringify(coords)
    })
    .then(response => response.json())
    .then((result) => {
      if (!result.suggestions[0]) return;
      setCity(result.suggestions[0].data.city); //setCity
    })
    .catch(error => console.log("error", error));
  }, [coords]);






  return null; // никакой верстки
};

export default GeoService;
