import { deleteMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
  if(event.target.id.startsWith("deleteMessage--")) {
    const messageId = event.target.id.split("--")[1]
    deleteMessage(messageId)
  }
})

export const Message = messageObj => {
  const { id, message, userId, user, timestamp } = messageObj;

  return `
    <div class="message">
      <p id="chatMessage--${userId}">${user.username}:</p>
      <p>${message}</p>
      ${ messageDeleteButton(id, userId) }
    </div>
  `
}

const messageDeleteButton = (messageId, userId) => {
  const activeUser = parseInt(sessionStorage.getItem("activeUser"))
  if(userId === activeUser) {
    return `
      <button id="deleteMessage--${messageId}">Delete Message</button>
    `
  }
  return "";
}