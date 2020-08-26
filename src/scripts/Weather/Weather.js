
export const weatherHTML = (weather) => {
   return `  
            <div class="previewContent" id="previewWeather">
            <div class="day--${weather.dt}">
                <div class="weatherDetail">${new Date(weather.dt*1000).toLocaleDateString('en-US')}</div>
                <img class="weatherIcon" src="./images/WeatherIcons/${weather.weather[0].icon}.png" alt="Weather description icon">
                <div class="weatherDetail">${weather.weather[0].description}</div>
                <div class="weatherDetail">temperature: ${Math.floor(weather.main.temp)}°F</div>
            </div>
            </div>
            `
        }