import React, { useEffect, useState } from 'react'
import { serviceMeteo } from '../../services/Services';

const FormulaireCity = () => {
    const [input, setInput] = useState("votre ville");

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [city, setCity] = useState("votre ville");

    const [lattitude, setLattitude] = useState(0);

    const [longitude, setLongitude] = useState(0);

    const [weatherData, setWeatherData] = useState(0);

    const [temperature, setTemperature] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    //Je récupère la longitude et lattitude et je l'insert dans mes useState
     // Je récupère la longitude et la latitude et je l'insère dans mes useState
     useEffect(() => {
        if (isSubmitted) {
            serviceMeteo.getCityData(input)
                .then(data => {
                    if (data && data.length > 0) {
                        setCity(data[0].name);
                        setLattitude(data[0].lat);
                        setLongitude(data[0].lon);
                    } else {
                        // Gère le cas de la data non disponible pour la ville
                        console.error("No data available for the city: ", input);
                    }
                })
                .catch((error) => console.error(error));

            setIsSubmitted(false); // Reset après le search
        }
    }, [input, isSubmitted]);
    

   //Je récupère les données de l'API avec la longitude et lattitude récupérer plus haut
   const viewWeather = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
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
            <h2>Il fait : {weatherData} à {city}</h2>
            <p>Température : {temperature}°C</p>
        </div>}
    </div>
  )
}

export default FormulaireCity