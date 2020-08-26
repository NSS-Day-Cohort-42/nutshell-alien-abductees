import { weatherHTML } from "./Weather"



const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".currentWeatherContainer")

export const weatherList = () => {
    contentTarget.innerHTML = `<h3 class"currentWeatherHeader">Current Weather</h3>`
    render ()
}

const render = (weatherObj) => {
    contentTarget.innerHTML += 
        weatherHTML(weatherObj)
}