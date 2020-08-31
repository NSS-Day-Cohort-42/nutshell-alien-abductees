/* Esther Sanders ... renders the friend list for current activeUser, listens for friendStateChanged and re-renders when new friend is added or deleted
also includes HTML converter function */

import { getFriends, useFriends, deleteFriend } from "./FriendDataProvider.js"
import { getUsers, useUsers } from "../Users/UserDataProvider.js"

const contentTarget = document.querySelector(".friendsContainer")
const eventHub = document.querySelector(".container")

let selectedFriendId = null

eventHub.addEventListener("friendStateChanged", customEvent => {
    const updatedFriends = useFriends()
    render(updatedFriends)
})

eventHub.addEventListener("friendSelected", event => {
    const friendId = event.detail.friendId
    if(selectedFriendId === friendId) {
        selectedFriendId = null
    }
    else {
        selectedFriendId = friendId
    }

    const friends = useFriends()
    render(friends)
})

eventHub.addEventListener("initiatedPrivateChat", event => {
    const friendId = event.detail.userId
    selectedFriendId = friendId

    const friends = useFriends()
    render(friends)
})

export const FriendList = () => {
    getFriends()
        .then(() => {
            const allFriends = useFriends()
            render(allFriends)
        })
}

const render = (arrOfFriends) => {
    getUsers()
        .then(() => {
            const arrOfUsers = useUsers()
            const FriendsHTMLList = arrOfFriends.map(relObj => {
                let relatedUsers = arrOfUsers.filter(user => parseInt(relObj.userId) === user.id && relObj.activeUserId === parseInt(sessionStorage.getItem("activeUser")))
                return FriendsHTMLConverter(relatedUsers)

            }).join("")
            contentTarget.innerHTML = `
            <div class="friendList">
            <h4>My Friends: </h4>
            ${FriendsHTMLList}
            </div>
            `
        })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteFriend--")) {
        const [prompt, userId] = clickEvent.target.id.split("--")
        getFriends()
            .then(() => {
                const friends = useFriends()
                const matchingFriend = friends.find(friend => friend.userId === parseInt(userId) && friend.activeUserId === parseInt(sessionStorage.getItem("activeUser")))
                deleteFriend(matchingFriend)
            })
        
    }
    else if(clickEvent.target.id.startsWith("friendList__friend--")) {
        const userId = parseInt(clickEvent.target.id.split("--")[1])
        const friendSelectedEvent = new CustomEvent("friendSelected", {
            detail: {
                friendId: userId
            }
        })
        eventHub.dispatchEvent(friendSelectedEvent)
    }
})

const FriendsHTMLConverter = (users) => {
    return `
    ${
        users.map(user => {
            const selectedClassName = user.id === selectedFriendId ? "friendList__friend--selected" : ""
            return `<div id="friendList__friend--${user.id}" class="friendList__friend ${selectedClassName}">${user.username}</div>
                    <button id="deleteFriend--${user.id}">Delete Friend</button>`
        })
    }
    `
}
