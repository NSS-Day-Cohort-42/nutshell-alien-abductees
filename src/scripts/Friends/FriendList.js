/* Esther Sanders ... renders the friend list for current activeUser, listens for friendStateChanged and re-renders when new friend is added or deleted
also includes HTML converter function */

import { getFriends, useFriends, saveFriend, deleteFriend } from "./FriendDataProvider.js"
import { getUsers, useUsers } from "../Users/UserDataProvider.js"

const contentTarget = document.querySelector(".friendsContainer")
const eventHub = document.querySelector(".container")

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
                let relatedUsers = arrOfFriends.filter(relObj => relObj.userId === userId)
                return FriendsHTMLConverter(relatedUsers)

            }).join("")
            contentTarget.innerHTML = FriendsHTMLList
        })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith === "deleteFriend--") {
        const [prompt, userId] = clickEvent.target.id("--")
        deleteFriend(userId)
    }
})
