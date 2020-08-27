//emily h
//renders the form that allows users to create events

import { saveEvents } from "./EventDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".formContainer")

eventHub.addEventListener("createEventClicked", () => {
    eventForm()
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "saveEvent") {
        const eventTitle = document.querySelector("#eventTitle").value
        const eventDate = document.querySelector("#eventDate").value + "T00:00:00"
        const eventCity = document.querySelector("#eventCity").value
        const eventState = document.querySelector("#eventState").value
        const eventZipCode = document.querySelector("#eventZip").value

        const newEvent = {
            name: eventTitle,
            date: eventDate,
            city: eventCity,
            state: eventState,
            zip: eventZipCode,
            userId: sessionStorage.getItem("activeUser")
        }
        saveEvents(newEvent)
        contentTarget.innerHTML = "" // wipe out formContainer after submission of new event
    }
})

export const eventForm = () => {
    contentTarget.innerHTML = `
        <div class="eventForm">
            <h2 class="eventFormTitle"> Create New Event</h2>
                <fieldset>
                    <label for="eventTitle">Event Title: </label>
                    <input id="eventTitle" type="text" placeholder="enter title of event...">
                </fieldset>
                <fieldset class="eventDate">
                    <label for="eventDate">When is the event taking place?</label>
                    <input id="eventDate" type="date" name="eventDate">
                </fieldset>
                <fieldset class="eventLocation">
                    <label for="eventLocation">Where is the event taking place?</label>
                    <input id="eventCity" type="text" placeholder="city">
                    <input id="eventState" type="text" placeholder="state postal code">
                    <input id="eventZip" type="text" placeholder="zipcode">
                </fieldset>
            <button id="saveEvent">Save Event</button>
        </div>
    
    
    
    `
}