import settings from "../../Settings.js"


export const getWeather = (locationObj) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${locationObj.zip}&appid=${settings.weatherKey}`)
}