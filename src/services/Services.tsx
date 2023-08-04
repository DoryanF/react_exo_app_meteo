class Service {
    getCityData = (city: string) => {
        const API_KEY = "cc770ea01b9eade5f11865fa676c7e09";

        return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
        .then((response) => response.json())
        .catch((error) => console.error(error))

    }

    getWeather= (lattitude: number, longitude: number) => {
        const API_KEY = "cc770ea01b9eade5f11865fa676c7e09";

        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${API_KEY}`)
        .then((response) => response.json())
        .catch((error) => console.error(error))

    }

}



export const serviceMeteo = new Service();