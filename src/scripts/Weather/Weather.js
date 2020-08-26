export const weatherHTML = (weatherObj) => {
    return `  
    <div class="previewContent" id="previewWeather">
    <div class="day--${weatherObj.dt}">
        <div class="weatherDetail">${new Date(weatherObj.dt*1000).toLocaleDateString('en-US')}</div>
        <img class="weatherIcon" src="./images/WeatherIcons/${weatherObj.weather[1].icon}.png" alt="Weather description icon">
        <div class="weatherDetail">${weatherObj.weather[2].description}</div>
        <div class="weatherDetail">Current Temperature ${Math.floor(weatherObj.main.temp)}°F</div>
    </div>
    </div>
    `
}