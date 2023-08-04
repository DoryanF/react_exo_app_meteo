import React, { useEffect, useState } from 'react'
import { serviceMeteo } from '../../services/Services';

const FormulaireCity = () => {
    const [city, setCity] = useState("votre ville");

    const [lattitude, setLattitude] = useState(0);

    const [longitude, setLongitude] = useState(0);

    const [weatherData, setWeatherData] = useState(0);

    const [temperature, setTemperature] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    }


    //Je récupère la longitude et lattitude et je l'insert dans mes useState
   useEffect(() => {
        serviceMeteo.getCityData(city)
        .then(data => {
            setLattitude(data[0].lat);
            setLongitude(data[0].lon);
        })
        .catch((error) => console.error(error));
   }, [city])
    

   //Je récupère les données de l'API avec la longitude et lattitude récupérer plus haut
   const viewWeather = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        serviceMeteo.getWeather(lattitude, longitude)
        .then((data) => {
            setWeatherData(data.weather[0].main);
            setTemperature(Math.round((data.main.temp) - 273.15))
        })
   }

  return (
    <div>
        <form onSubmit={viewWeather}>
            <label htmlFor="city">Météo de votre ville: </label>
            <input type="text" name="city" id="city" onChange={handleChange}/>

            <input type="submit" value="Search" />
            
        </form>
        {weatherData !== 0 && <div>
            <h2>Il fait : {weatherData}</h2>
            <p>Température: {temperature}°C</p>
        </div>}
    </div>
  )
}

export default FormulaireCity