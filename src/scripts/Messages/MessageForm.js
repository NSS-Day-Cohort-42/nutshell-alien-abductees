import { saveMessage, updateMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

// handle user clicking on the saveMessage button, either save a new message or update an existing message
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

// return the HTML for a form with optional default values set in messageObj param
export const MessageForm = messageObj => {
  const defaultMessageValue = messageObj ? messageObj.message : ""
  const idValue = messageObj ? messageObj.id : ""

  return `
    <div class="messageForm">
      <textarea class="messageForm__message" id="messageForm__message--${idValue}" placeholder="Enter a message">${defaultMessageValue}</textarea>
      ${ hiddenInputsHTML(messageObj) }
      <button id="saveMessage--${idValue}">${idValue ? "Update" : "Send"} Message</button>
    </div>
  `
}

// return the HTML for hidden inputs, storing the message id, userId of the user who wrote the message, and timestamp of the message (necessary for edit form)
const hiddenInputsHTML = messageObj => {
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

// create a message object from the values in the form. if this is a brand new message, we only need the message text, but if editing we also need to grab the hidden input values
const createMessageObjectFromFormValues = (id = "") => {
  const messageObj = {}
  messageObj.message = document.querySelector(`#messageForm__message--${id}`).value.trim()

  if(id) {
    messageObj.id = parseInt(id)
    messageObj.userId = parseInt(document.querySelector(`#messageForm__userId--${id}`).value)
    messageObj.timestamp = parseInt(document.querySelector(`#messageForm__timestamp--${id}`).value)
  }

  return messageObj
}

// validate a message - if invalid do an error alert and return false. otherwise return true
const validateMessage = messageObj => {
  if(!messageObj.message) {
    window.alert("You cannot submit an empty chat message.")
    return false
  }
  return true
}