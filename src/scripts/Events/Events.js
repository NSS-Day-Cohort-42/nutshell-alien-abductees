import { deleteEvent } from "./EventDataProvider.js"

const eventHub = document.querySelector(".container")


eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteEvent")){
        const eventIdString = clickEvent.target.id.split("--")[1]
        const contentElement = document.querySelector(`.event--${eventIdString}`)
        deleteEvent(eventIdString)
        contentElement.innerHTML = contentElement.remove()
    }
})




export const eventsHTML = (eventObj) => {
    return `
    <div class="event--${eventObj.id}">
    <div class="eventTitle">${eventObj.name}</div>
    <div class="eventDate">${new Date(eventObj.date).toLocaleDateString('en-US')}</div>
    <div class="eventLocation">${eventObj.city}, ${eventObj.state}</div>
    <button id="eventWeather--${eventObj.id}">Show Weather</button>
    <button id="deleteEvent--${eventObj.id}">Delete Event</button>
    </div>
    `
}



