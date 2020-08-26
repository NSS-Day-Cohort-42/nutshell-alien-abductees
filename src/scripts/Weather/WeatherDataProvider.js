import settings from "../../Settings.js"


let weather = []

export const useWeather = () => {
    return weather.slice()
}

export const getWeather = (locationObj) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${locationObj.zip}&appid=${settings.weatherKey}`)
        .then(res => res.json())
        .then(weatherData => {
            weather = weatherData
        })
}