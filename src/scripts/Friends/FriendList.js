/* Esther Sanders ... renders the friend list for current activeUser, listens for friendStateChanged and re-renders when new friend is added or deleted
also includes HTML converter function */

import { getFriends, useFriends, saveFriend, deleteFriend } from "./FriendDataProvider.js"
import { getUsers, useUsers } from "../Users/UserDataProvider.js"

const contentTarget = document.querySelector(".friendsContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("friendStateChanged", customEvent => {
    const updatedFriends = useFriends()
    render(updatedFriends)
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
                let relatedUsers = arrOfUsers.filter(user => relObj.userId === user.id)
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
                const matchingFriend = friends.find(friend => friend.userId === userId)
                deleteFriend(matchingFriend)
            })
        
    }
})

const FriendsHTMLConverter = (users) => {
    return `
    ${
        users.map(user => {
            return `<div>${user.username}</div>
                    <button id="deleteFriend--${user.id}">Delete Friend</button>`
        })
    }
    `
}
