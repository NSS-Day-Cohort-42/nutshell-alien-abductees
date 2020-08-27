import {saveFriend} from "./FriendDataProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "addFriend") {

    }

    else {
        window.alert("No user exists with that name")
    }
})

export const FriendForm = () => {
    return `
    <div class="friendForm">
        <input type="text" class="friendForm__username">Enter username to add a new friend</input>
        <button id="addFriend">Add Friend</button>
    </div>


    `
}