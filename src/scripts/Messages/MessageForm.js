import { saveMessage, updateMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
  if(event.target.id.startsWith("saveMessage")) {

    const id = event.target.id.split("--")[1] // will be empty string if new message, or id of message we are editing if editing message

    const messageObj = createMessageObjectFromFormValues(id)

    if(validateMessage(messageObj)) {
      if(messageObj.id) {
        updateMessage(messageObj)
      }
      else {
        saveMessage(messageObj)
      }
    }
  }
})

export const MessageForm = messageObj => {
  const defaultMessageValue = messageObj ? messageObj.message : ""
  const idValue = messageObj ? messageObj.id : ""

  return `
    <div class="messageForm">
      <textarea class="messageForm__message" id="messageForm__message--${idValue}" placeholder="Enter a message">${defaultMessageValue}</textarea>
      ${ hiddenInputs(messageObj) }
      <button id="saveMessage--${idValue}">${idValue ? "Update" : "Send"} Message</button>
    </div>
  `
}

const hiddenInputs = messageObj => {
  if(!messageObj || !messageObj.id) {
    return ""
  }

  const { id, timestamp, userId } = messageObj
  return `
    <input type="hidden" id="messageForm__id--${id}" value="${id}">
    <input type="hidden" id="messageForm__userId--${id}" value="${userId}">
    <input type="hidden" id="messageForm__timestamp--${id}" value="${timestamp}">
  `
}

const createMessageObjectFromFormValues = (id = "") => {
  const messageObj = {}
  messageObj.message = document.querySelector(`#messageForm__message--${id}`).value.trim()

  // if id is set, we are editing an existing message... attach hidden input values to it too
  if(id) {
    messageObj.id = parseInt(id)
    messageObj.userId = parseInt(document.querySelector(`#messageForm__userId--${id}`).value)
    messageObj.timestamp = parseInt(document.querySelector(`#messageForm__timestamp--${id}`).value)
  }

  return messageObj
}

const validateMessage = messageObj => {
  if(!messageObj.message) {
    window.alert("You cannot submit an empty chat message.")
    return false
  }
  return true
}