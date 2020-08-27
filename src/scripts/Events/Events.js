//emily h
//converts the event object in to html

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

eventHub.addEventListener("click", (clickEvent) => {
        if (clickEvent.target.id.startsWith("eventWeather--")) {
        const buttonId = clickEvent.target.id.split("--")[1]
        const customEvent = new CustomEvent("showWeatherClicked", {
          detail: {
            eventId: buttonId
          }
        })
      eventHub.dispatchEvent(customEvent) 
      } else if (clickEvent.target.id.startsWith("hideWeather--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        const contentTarget = document.querySelector(`#weather--${id}`)
        contentTarget.close()
      }
    })

export const eventsHTML = (eventObj) => {
 
    return `
    <div class="event--${eventObj.id}">
        <div class="eventTitle">${eventObj.name}</div>
        <div class="eventDate">${new Date(eventObj.date).toLocaleDateString('en-US')}</div>
        <div class="eventLocation">${eventObj.city}, ${eventObj.state}</div>
        <button id="eventWeather--${eventObj.id}">Show Weather</button>
        ${parseInt(sessionStorage.getItem("activeUser")) === eventObj.userId ? `<button id="deleteEvent--${eventObj.id}">Delete</button>`: "" }
        <dialog id="weather--${eventObj.id}">
        
        </dialog>
        </div>
        `
      }

      




