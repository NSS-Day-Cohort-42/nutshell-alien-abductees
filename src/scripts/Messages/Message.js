import { deleteMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
  const [ prefix, id ] = event.target.id.split("--")

  if(prefix === "deleteMessage") {
    deleteMessage(id)
  }

  else if(prefix === "openAddFriendDialog") {
    const dialogNode = document.querySelector(`#addFriendDialog--${id}`)
    dialogNode.showModal()
  }

  else if(prefix === "closeAddFriendDialog") {
    const dialogNode = document.querySelector(`#addFriendDialog--${id}`)
    dialogNode.close()
  }

  else if(prefix === "addFriend") {
    // saveFriend(id) // will eventually be written in FriendProvider and will save the friend with the given ID as a friend of the currently logged in user
  }
})

export const Message = messageObj => {
  const { id, message, userId, user, timestamp } = messageObj;

  return `
    <div class="message">
      <button class="message__username" id="openAddFriendDialog--${userId}">${user.username}:</button>
      <p class="message__text">${message}</p>
      ${ messageDeleteButton(id, userId) }

      <dialog class="dialog friend-dialog" id="addFriendDialog--${userId}">
        <p class="friend-dialog__prompt">Would you like to add ${user.username} as a friend?</p>
        <button class="addFriendButton" id="addFriend--${userId}">Yes</button>
        <button class="closeDialogButton" id="closeAddFriendDialog--${userId}">Cancel</button>
      </dialog>
    </div>
  `
}

/**
 * If the given userId matches the userId of the activeUser, then return a button that will allow the user to delete the message... otherwise they should not be able to delete the message so just return an empty string
 */
const messageDeleteButton = (messageId, userId) => {
  const activeUser = parseInt(sessionStorage.getItem("activeUser"))
  if(userId === activeUser) {
    return `
      <button class="message__deleteButton" id="deleteMessage--${messageId}">Delete Message</button>
    `
  }
  return "";
}