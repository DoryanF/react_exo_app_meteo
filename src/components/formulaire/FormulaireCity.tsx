import React, { useEffect, useState } from 'react'
import { serviceMeteo } from '../../services/Services';

const FormulaireCity = () => {
    const [city, setCity] = useState("votre ville");

    const [lattitude, setLattitude] = useState(0);

    const [longitude, setLongitude] = useState(0);

    const [weatherData, setWeatherData] = useState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    }


   useEffect(() => {
        serviceMeteo.getCityData(city)
        .then(data => {
            setLattitude(data[0].lat);
            setLongitude(data[0].lon);
        })
        .catch((error) => console.error(error));
   }, [])
    
   console.log(lattitude, longitude);

   const viewWeather = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        serviceMeteo.getWeather(lattitude, longitude)
        .then((data) => {
            setWeatherData(data);
        })
   }

   console.log(weatherData);
  return (
    <div>
        <form onSubmit={viewWeather}>
            <label htmlFor="sity">Ville: </label>
            <input type="text" name="city" id="city" onChange={handleChange}/>

            <input type="submit" value="Search" />
        </form>
        <div>
            <h2>{weatherData}</h2>
        </div>
    </div>
  )
}

export default FormulaireCity