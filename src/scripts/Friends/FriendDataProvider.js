//Esther Sanders ... module to get and use friends from API, save new friend, and delete friend


let friends = []

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const friendStateChangedEvent = new CustomEvent("friendStateChanged")
    eventHub.dispatchEvent(friendStateChangedEvent)
}


export const getFriends = () => {
    return fetch("http://localhost:8088/friends")
        .then(res => res.json())
        .then(parsedFriends => {
            friends = parsedFriends
        })

}

export const useFriends = () => {
    return friends.slice()
}

export const saveFriend = (userId) => {
    const friendObj = {
        userId: parseInt(userId),
        activeUserId: parseInt(sessionStorage.getItem("activeUser"))
    }

    return fetch("http://localhost:8088/friends", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(friendObj)
    })
    .then(getFriends)
    .then(dispatchStateChangeEvent)
}


export const deleteFriend = (friend) => {
    return fetch(`http://localhost:8088/friends/${friend.id}`, {
        method: "DELETE"
    })
        .then(getFriends)
        .then(dispatchStateChangeEvent)
}

