//emily h
//works with Event Data from database, all state change related functions are defined here

import {useFriends} from "../Friends/FriendDataProvider.js"

let events = []
let friends = []

const eventHub = document.querySelector(".container")

export const dispatchEventState = () => {
    const customEvent = new CustomEvent("eventStateChanged")
    
    eventHub.dispatchEvent(customEvent)
}

eventHub.addEventListener("friendStateChanged", customEvemt => {
    getEvents()
        .then(dispatchEventState)
})


export const getEvents = () => {
    return fetch('http://localhost:8088/events')
        .then(events => events.json())
        .then(parsedEvents => {
            friends = useFriends()
            events = parsedEvents
        })
}


export const useEvents = () => {
    const friendRelationships = friends.filter(friendRel => {
        return friendRel.activeUserId === parseInt(sessionStorage.getItem("activeUser"))
    })
    const filteredEvents = events.filter(event => {
        if (event.userId === parseInt(sessionStorage.getItem("activeUser"))) {
            return true
        } else {
            const foundFriend = friendRelationships.find(friendObj => {
                return event.userId === friendObj.userId
            })
            if (typeof foundFriend !== "undefined") {
                return true
            }
        }
    })
    const sortedByDate = filteredEvents.sort(
        (currentEntry, nextEntry) =>
        Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
        )
    return sortedByDate
}


export const saveEvents = (event) => {
    const jsonEntry = JSON.stringify(event)

    return fetch('http://localhost:8088/events', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:jsonEntry
    })
    .then(getEvents)
    .then(dispatchEventState)
}

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method: "DELETE"
    })
        .then(getEvents)
        .then(dispatchEventState)
}   

export const editEvent = (eventObj) => {
    const jsonEntry = JSON.stringify(eventObj)

    return  fetch(`http://localhost:8088/events/${eventObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:jsonEntry
    })
        .then(getEvents)
        .then(dispatchEventState)
}
