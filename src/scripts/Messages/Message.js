import { deleteMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

// handle a click event on the message card... can be the message delete button, edit button, or can represent the user opening an add friend <dialog> and clicking yes/cancel in that dialog
eventHub.addEventListener("click", event => {
  const [ prefix, id ] = event.target.id.split("--")

  if(prefix === "deleteMessage") {
    deleteMessage(id)
  }

  else if(prefix === "editMessage") {
    const editMessageButtonCilckedEvent = new CustomEvent("editMessageButtonClicked", {
      detail: {
        messageId: id
      }
    })
    eventHub.dispatchEvent(editMessageButtonCilckedEvent)
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
    const dialogNode = document.querySelector(`#addFriendDialog--${id}`)
    dialogNode.close()
  }
})

export const Message = messageObj => {
  const { id, message, userId, user, timestamp } = messageObj;

  const isActiveUser = userId === parseInt(sessionStorage.getItem("activeUser"))

  return `
    <div class="message">
      <div class="message__username-and-text-wrapper">
        <button class="message__username" id="openAddFriendDialog--${userId}" ${isActiveUser ? "disabled" : ""}>${user.username}:</button>
        <p class="message__text">${message}</p>
      </div>
      ${ messageActionButtonsHTML(id, isActiveUser) }

      <dialog class="dialog friend-dialog" id="addFriendDialog--${userId}">
        <p class="friend-dialog__prompt">Would you like to add ${user.username} as a friend?</p>
        <button class="addFriendButton" id="addFriend--${userId}">Yes</button>
        <button class="closeDialogButton" id="closeAddFriendDialog--${userId}">Cancel</button>
      </dialog>
    </div>
  `
}

/**
 * If the given userId matches the userId of the activeUser, then return a div containing buttons that will allow them to manipulate their message (delete it or edit it)
 */
const messageActionButtonsHTML = (messageId, isActiveUser) => {
  if(isActiveUser) {
    return `
      <div class="message__actionButtonsWrapper">
        <button class="message__editButton" id="editMessage--${messageId}">Edit</button>
        <button class="message__deleteButton" id="deleteMessage--${messageId}">Delete</button>
      </div>
    `
  }
  return "";
}