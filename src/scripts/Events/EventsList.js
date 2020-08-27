//emily h
//combines info from the provider and events.js to render events that have already been created

import { getEvents, useEvents } from "./EventDataProvider.js"
import {eventsHTML, showEventWeather} from "./Events.js"
import {useEventWeather, getEventWeather} from "../Weather/WeatherDataProvider.js"


const contentTarget = document.querySelector(".eventsContainer")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("showWeatherClicked", (eventIdFromDetail) => {
    const eventId = parseInt(eventIdFromDetail.detail.eventId)
    const eventsArray = useEvents()
    const matchedEvent = eventsArray.find(event => event.id === eventId)
    getEventWeather(matchedEvent.zip)
        .then(() => {
            const weather = useEventWeather()
            const eventDT = new Date(matchedEvent.date).getTime()/1000
             if(eventDT > weather.list[0].dt && eventDT < weather.list[weather.list.length-1].dt){
                const weatherObj = weather.list.find(listItem => listItem.dt === eventDT)
                const theDialog = document.querySelector(`#test--${eventId}`)
                const rep = `
                <div class="weather--${weatherObj.dt}">
                <img class="weatherIcon" src="./images/WeatherIcons/${weatherObj.weather[0].icon}.png" alt="Weather description icon">
                <div class="weatherDetail">${weatherObj.weather[0].description}</div>
                <div class="weatherDetail">high of ${Math.floor(weatherObj.main.temp_max)}°F</div>
                <div class="weatherDetail">low of ${Math.floor(weatherObj.main.temp_min)}°F</div>
                </div> 
            `
                 theDialog.innerHTML = rep 
                 return theDialog.showModal()
        } else {
            return contentTarget.innerHTML = `Weather Data not Available`
        }
        })
        })


const render = () => {
    const events = useEvents()

    const rep = events.map(event => {
        return eventsHTML(event)
    }).join("")
    contentTarget.innerHTML = rep
}





export const eventList = () => {
    getEvents()
        .then(showEventWeather)
        .then(render)
    
}

eventHub.addEventListener("eventStateChanged", eventList)