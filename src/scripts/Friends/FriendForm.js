//Esther Sanders ... renders a form that allows user to add a friend by entering a userName
// listens for addFriendClicked

import {saveFriend} from "./FriendDataProvider.js"
import {getUsers, useUsers} from "../Users/UserDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".formContainer")

//listens for addFriendClicked and renders friend form
eventHub.addEventListener("addFriendClicked", () => {
    FriendForm()
})

//listens for addFriend click Event and invokes saveFriend function
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "addNewFriend") {
        const inputString = document.getElementById("friendForm__username").value
        getUsers()
            .then(() => {
                const arrOfUsers = useUsers()
                const relatedUser = arrOfUsers.find(user => user.username.toLowerCase() === inputString.toLowerCase())

                if (relatedUser !== undefined) {
                    saveFriend(parseInt(relatedUser.id))
                }
                else {
                    window.alert("No user exists with that name")
                }          
            })
    }
  
})

export const FriendForm = () => {
    contentTarget.innerHTML = `
    <div class="friendForm">
        <input type="text" id="friendForm__username" placeholder="Enter username to add a new friend"></input>
        <button id="addNewFriend">Add Friend</button>
    </div>


    `
}