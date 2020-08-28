//emily h
//combines info from the provider and events.js to render events that have already been created
//listens for show weather clicked from events.js to render the forecast for the event

import { getEvents, useEvents } from "./EventDataProvider.js"
import {eventsHTML} from "./Events.js"
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
            const eventSplitDT = matchedEvent.date.split("T")[0]
            const eventDT = new Date(eventSplitDT).getTime()/1000
             if(eventDT > weather.list[0].dt && eventDT < weather.list[weather.list.length-1].dt){
                const weatherObj = weather.list.find(listItem => listItem.dt === eventDT)
                const theDialog = document.querySelector(`#weather--${eventId}`)
                const rep = `
                <div class="weather--${weatherObj.dt}">
                <button id="hideWeather--${eventId}">Hide</button>
                <h4>forecast:</h4>
                <img class="weatherIcon" src="./images/WeatherIcons/${weatherObj.weather[0].icon}.png" alt="Weather description icon">
                <div class="weatherDetail">${weatherObj.weather[0].description}</div>
                <div class="weatherDetail">high of ${Math.floor(weatherObj.main.temp_max)}°F</div>
                <div class="weatherDetail">low of ${Math.floor(weatherObj.main.temp_min)}°F</div>
                </div> 
            `
                 theDialog.innerHTML = rep 
                 return theDialog.showModal()
        } else {
            const theDialog = document.querySelector(`#weather--${eventId}`)
            theDialog.innerHTML = `
            <button id="hideWeather--${eventId}">Hide</button>
            Weather Data not available`
            return theDialog.showModal()
        }
        })
        })


const render = () => {
    const events = useEvents()
        const rep = events.map(event => {
             return eventsHTML(event)
        }).join("")
    contentTarget.innerHTML = `
    <h2>Upcoming Events</h2>
    ${rep}
    `
   
}





export const eventList = () => {
    getEvents()
    .then(render)
    .then(() => {
        const element = document.getElementById("event")
        element.classList.add("firstEvent")
    })
}

eventHub.addEventListener("eventStateChanged", eventList)