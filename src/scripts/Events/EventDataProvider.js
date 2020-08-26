let events = []


const eventHub = document.querySelector(".container")


export const dispatchEventState = () => {
    const customEvent = new CustomEvent("eventStateChanged")
    
    eventHub.dispatchEvent(customEvent)
}



export const getEvents = () => {
    return fetch('http://localhost:8088/events')
        .then(events => events.json())
        .then(parsedEvents => {
            events = parsedEvents
        })
}


export const useEvents = () => {
    const sortedByDate = events.sort(
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

export const deleteEvents = (eventId) => {
    return fetch('http://localhost:8088/events/${eventId}', {
        method: "DELETE"
    })
        .then(getEvents)
        .then(dispatchEventState)

}

//sessionStorage.getItem(“activeUser”)

    
/*
export const editEvent = (eventId) => {
    return  fetch('http://localhost:8088/events/${eventId}', {
        method: "PUT"
    })
        .then(getEntries)
        .then(dispatchEventChange)
}
*/