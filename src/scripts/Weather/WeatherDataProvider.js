//emily h
//handles weather data from the external API

import settings from "../../Settings.js"

let weather = []
let nashWeather = []

export const useWeather = () => {
    return weather.slice()
}

export const useNashvilleWeather = () => {
    return nashWeather
}

export const getWeather = (locationObj) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${locationObj.zip}&appid=${settings.weatherKey}&units=imperial`)
        .then(res => res.json())
        .then(weatherData => {
            weather = weatherData
        })
}

export const getNasvilleWeather = () => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=37211&appid=${settings.weatherKey}&units=imperial`)
        .then(res => res.json())
        .then(weatherData => {
            nashWeather = weatherData
        })
}