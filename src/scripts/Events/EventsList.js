import { getEvents, useEvents } from "./EventDataProvider.js"
import {eventsHTML} from "./Events.js"




const contentTarget = document.querySelector(".contentContainer")
//const eventHub = document.querySelector(".container")


const render = () => {
    const events = useEvents()

    const rep = events.map(event => {
        return eventsHTML(event)
    })
    contentTarget.innerHTML = rep

}



export const eventList = () => {
    getEvents()
        .then(render)

}