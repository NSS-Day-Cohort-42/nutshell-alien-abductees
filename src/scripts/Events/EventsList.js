//emily h
//combines info from the provider and events.js to render events that have already been created

import { getEvents, useEvents } from "./EventDataProvider.js"
import {eventsHTML, showEventWeather} from "./Events.js"
//import { getEventWeather, useEventWeather } from "../Weather/WeatherDataProvider.js"


const contentTarget = document.querySelector(".eventsContainer")
const eventHub = document.querySelector(".container")



const render = () => {
    const events = useEvents()
    //const weather = useEventWeather()
            
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