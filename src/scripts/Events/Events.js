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

export const eventsHTML = (eventObj, weatherObj) => {
    return `
    <div class="event--${eventObj.id}">
        <div class="eventTitle">${eventObj.name}</div>
        <div class="eventDate">${new Date(eventObj.date).toLocaleDateString('en-US')}</div>
        <div class="eventLocation">${eventObj.city}, ${eventObj.state}</div>
        <button id="eventWeather--${eventObj.id}">Show Weather</button>
        <button id="deleteEvent--${eventObj.id}">Delete Event</button>
      <dialog id="test--${eventObj.id}">
        <div class="weather--${weatherObj.list[0].dt}">
          <img class="weatherIcon" src="./images/WeatherIcons/${weather.list[0].weather[0].icon}.png" alt="Weather description icon">
          <div class="weatherDetail">${weatherObj.list[0].weather[0].description}</div>
          <div class="weatherDetail">high of ${Math.floor(weatherObj.list[0].main.temp_max)}°F</div>
          <div class="weatherDetail">low of ${Math.floor(weatherObj.list[0].main.temp_min)}°F</div>
        </div> 
        <button id="hideWeather--${eventObj.id}">Hide</button>
      </dialog>
    </div>
        `
}


export const showEventWeather = () => {
    eventHub.addEventListener("click", (clickEvent) => {
      if (clickEvent.target.id.startsWith("eventWeather--")) {
        const buttonId = clickEvent.target.id.split("--")[1]
        const contentTarget = document.querySelector(`#test--${buttonId}`)
        const contentElement = document.querySelector()
        const cutomEvent = new CustomEvent("showWeatherClicked", {
          detail: {
            eventId: eventObj.id
          }
        }
      //  eventHub.dispatchEvent(customEvent) 
        )
      } else if (clickEvent.target.id.startsWith("hideWeather--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        const contentTarget = document.querySelector(`#test--${id}`)
        contentTarget.close()
      }
    })
  }


