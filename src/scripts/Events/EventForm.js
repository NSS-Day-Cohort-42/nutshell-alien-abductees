//emily h
//renders the form that allows users to create events

import { saveEvents, editEvent, useEvents, getEvents } from "./EventDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".formContainer")

eventHub.addEventListener("createEventClicked", () => {
    eventForm()
})

eventHub.addEventListener("editEventClicked", customEvent => {
    eventForm()
    
    const events = useEvents()
    const eventId = customEvent.detail.eventId
    const eventToEdit = events.find(eventObj => eventId === eventObj.id)

        const eventTitle = document.querySelector("#eventTitle")
        const eventDate = document.querySelector("#eventDate")
        const eventCity = document.querySelector("#eventCity")
        const eventState = document.querySelector("#eventState")
        const eventZipCode = document.querySelector("#eventZip")
        const id = document.querySelector("#eventId")

        eventTitle.value = eventToEdit.name
        eventDate.value =  eventToEdit.date.split("T")[0]
        eventCity.value =   eventToEdit.city 
        eventState.value = eventToEdit.state
        eventZipCode.value = eventToEdit.zip
        id.value = eventToEdit.id
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "saveEvent") {
        const eventTitle = document.querySelector("#eventTitle").value
        const eventDate = document.querySelector("#eventDate").value + "T00:00:00"
        const eventCity = document.querySelector("#eventCity").value
        const eventState = document.querySelector("#eventState").value
        const eventZipCode = document.querySelector("#eventZip").value
        const id = document.querySelector("#eventId").value

        const newEvent = {
            name: eventTitle,
            date: eventDate,
            city: eventCity,
            state: eventState,
            zip: eventZipCode,
            userId: parseInt(sessionStorage.getItem("activeUser")),
            id: id
        }

        if(eventTitle === "" || eventDate === "" || eventCity === "" || eventState === "" || eventZipCode === ""){
            window.alert("Please fill out ALL fields before submitting")
        } else {
            if(id ===""){
                saveEvents(newEvent)
                contentTarget.innerHTML = "" // wipe out formContainer after submission of new event
            } else {
                editEvent(newEvent) 
                    .then(getEvents)
                    .then(() => {
                        document.querySelector("#eventId").value = ""
                    })
                    .then(() => {
                        contentTarget.innerHTML = ""
                    })
            }
        }
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
                <input type="hidden" name="eventId" id="eventId">
            <button id="saveEvent">Save Event</button>
        </div>
    `
}