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
    userId = parseInt(userId)
    const activeUserId = parseInt(sessionStorage.getItem("activeUser"))

    // only save a new friend if there doesn't already exist a friend object between this activeUser and the userId supplied as an argument
    if(!friends.some(friend => friend.userId === userId && friend.activeUserId === activeUserId)) {
        const friendObj = {
            userId: userId,
            activeUserId: activeUserId
        }

        fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendObj)
        })
        .then(getFriends)
        .then(dispatchStateChangeEvent)
    }
<<<<<<< HEAD

    return fetch("http://localhost:8088/friends", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(friendObj)
    })
    .then(getFriends)
    .then(dispatchStateChangeEvent)
=======
>>>>>>> master
}


export const deleteFriend = (friend) => {
    return fetch(`http://localhost:8088/friends/${friend.id}`, {
        method: "DELETE"
    })
        .then(getFriends)
        .then(dispatchStateChangeEvent)
}

