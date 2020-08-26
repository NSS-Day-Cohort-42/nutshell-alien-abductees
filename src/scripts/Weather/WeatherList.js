import { weatherHTML } from "./Weather.js"
import { getNasvilleWeather, useNashvilleWeather } from "./WeatherDataProvider.js"



//const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".currentWeatherContainer")

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