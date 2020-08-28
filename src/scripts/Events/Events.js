//emily h
//handles html representation, 
//listens for click events to manipulate innerHTML as needed

import { deleteEvent } from "./EventDataProvider.js"

const eventHub = document.querySelector(".container")

//listens for delete button being clicked, deletes event
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteEvent")){
        const eventIdString = clickEvent.target.id.split("--")[1]
        const contentElement = document.querySelector(`.event--${eventIdString}`)
        deleteEvent(eventIdString)
        contentElement.innerHTML = contentElement.remove()
    }
})

//listens for show weather, dispatches custom event
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

//listens for the eventActions button and opens dialog with event actions
eventHub.addEventListener("click", clickEvent => {
  if(clickEvent.target.id.startsWith("eventActions--")) {
    const buttonId = clickEvent.target.id.split("--")[1]
    const theDialog = document.querySelector(`#eventActionDialog--${buttonId}`)
    theDialog.showModal()
  }
})


//listens for edit button, dispatches a custom event
eventHub.addEventListener("click", clickEvent => {
  if(clickEvent.target.id.startsWith("editEvent--")){
      const eventId = clickEvent.target.id.split("--")[1]
      const customEvent = new CustomEvent("editEventClicked", {
          detail: {
              eventId: parseInt(eventId)
          }
      })
      const theDialog = document.querySelector(`#eventActionDialog--${eventId}`)
      theDialog.remove()
      eventHub.dispatchEvent(customEvent)
  }
})


const userActionButtons = (event) => {
  if(parseInt(sessionStorage.getItem("activeUser")) === event.userId) {
    return `
        <button id="eventActions--${event.id}">...</button>
        <dialog id="eventActionDialog--${event.id}">
              <button id="deleteEvent--${event.id}">x</button>
              <button id="editEvent--${event.id}">edit</button>
        </dialog>`
    } else {
        return ""
    }
  }


export const eventsHTML = (eventObj) => {
    return `
    ${parseInt(sessionStorage.getItem("activeUser")) === eventObj.userId ? `<div id="event" class="event--${eventObj.id} eventCard">` : `<div id="event" class="event--${eventObj.id} eventCard friendEvent">`}
    ${userActionButtons(eventObj)}
        <h3 class="eventTitle">${eventObj.name}</h3>
        <div class="eventDate">${new Date(eventObj.date).toLocaleDateString('en-US')}</div>
        <div class="eventLocation">${eventObj.city}, ${eventObj.state}</div>
        <button id="eventWeather--${eventObj.id}" class="showWeather">Show Weather</button>
        <dialog id="weather--${eventObj.id}">
        </dialog>
        </div>
        `
      }