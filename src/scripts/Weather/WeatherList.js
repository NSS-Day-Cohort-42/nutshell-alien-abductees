//emily h
//combines data and html representation to render current nasville weather to the DOM

import { weatherHTML } from "./Weather.js"
import { getNasvilleWeather, useNashvilleWeather } from "./WeatherDataProvider.js"



//const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".currentWeatherContainer")
const contentElement = document.querySelector(".eventWeather")

export const weatherList = () => {
 render()
}

const render = () => {
    getNasvilleWeather()
        .then(() => {
            const weather = useNashvilleWeather()
            contentTarget.innerHTML = `
            <h3 class"currentWeatherHeader">Current Weather for Nashville</h3>
            ${weatherHTML(weather)}` 
        })

}

//-------------------

