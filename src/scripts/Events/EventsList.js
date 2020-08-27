//emily h
//combines info from the provider and events.js to render events that have already been created

import { getEvents, useEvents } from "./EventDataProvider.js"
import {eventsHTML, showEventWeather} from "./Events.js"
import {useEventWeather, getEventWeather} from "../Weather/WeatherDataProvider.js"


const contentTarget = document.querySelector(".eventsContainer")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("showWeatherClicked", (locationEntered) => {
    console.log("custom event heard")
    const locationZip = locationEntered.detail.location
    getEventWeather(locationZip).then(eventList)
    //variableRepresentingDialog.showModal()
        })


const render = () => {
    const events = useEvents()
    const weather = useEventWeather()

    const rep = events.map(eventObj => {
        const eventDT = new Date(eventObj.date).getTime()/1000
        if(eventDT > weather.list[0].dt && eventDT < weather.list[weather.list.length-1].dt){
            const matchedWeatherObj = weather.list.find(listItem => listItem.dt === eventDT)
            eventsHTML(event, matchedWeatherObj)
            return contentTarget.innerHTML = rep
        } else {
            return contentTarget.innerHTML = `Weather Data not Available`
        }
    }).join("")

}





export const eventList = () => {
    getEvents()
        .then(showEventWeather)
        .then(render)
    
}

eventHub.addEventListener("eventStateChanged", eventList)