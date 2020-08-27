//emily h
//converts weather object to html representation
export const weatherHTML = (weather) => {
   return `  
            <div class="day--${weather.dt}">
                <div class="weatherDetail">${new Date(weather.dt*1000).toLocaleDateString('en-US')}</div>
                <img class="weatherIcon" src="./images/WeatherIcons/${weather.weather[0].icon}.png" alt="Weather description icon">
                <div class="weatherDetail">${weather.weather[0].description}</div>
                <div class="weatherDetail">temperature: ${Math.floor(weather.main.temp)}°F</div>
            </div>
            
            `
        }

/*export const weatherEventsHTML = (weather) => {
    return `
        <div class="previewContent" id="previewWeather">
            <div class="weather--${weather.list[0].dt}">
            <img class="weatherIcon" src="./images/WeatherIcons/${weather.list[0].weather[0].icon}.png" alt="Weather description icon">
            <div class="weatherDetail">${weather.list[0].weather[0].description}</div>
                <div class="weatherDetail">high of ${Math.floor(weather.list[0].main.temp_max)}°F</div>
                <div class="weatherDetail">low of ${Math.floor(weather.list[0].main.temp_min)}°F</div>
            </div>
        </div>
    
    `
} */


