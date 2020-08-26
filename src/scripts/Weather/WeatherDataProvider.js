//emily h
//handles weather data from the external API

import settings from "../../Settings.js"

let eventWeather = []
let nashWeather = []

export const useWeather = () => {
    return eventWeather
}

export const useNashvilleWeather = () => {
    return nashWeather
}

export const getEventWeather = (locationObj) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${locationObj.zip}&appid=${settings.weatherKey}&units=imperial`)
        .then(res => res.json())
        .then(weatherData => {
            eventWeather = weatherData
        })
}

export const getNasvilleWeather = () => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=37211&appid=${settings.weatherKey}&units=imperial`)
        .then(res => res.json())
        .then(weatherData => {
            nashWeather = weatherData
        })
}