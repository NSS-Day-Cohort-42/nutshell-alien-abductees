import { saveMessage, updateMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

// handle user clicking on the saveMessage button, either save a new message or update an existing message
eventHub.addEventListener("click", event => {
  if(event.target.id.startsWith("saveMessage")) {

    const id = event.target.id.split("--")[1] // will be empty string if new message, or id of message we are editing if editing message

    const messageObj = {
      message: document.querySelector(`#messageForm__message--${id}`).value.trim()
    }

    if(validateMessage(messageObj)) {
      if(id) {
        updateMessage(id, messageObj)
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
      <button id="saveMessage--${idValue}">${idValue ? "Update" : "Send"} Message</button>
    </div>
  `
}

// validate a message - if invalid do an error alert and return false. otherwise return true
const validateMessage = messageObj => {
  if(!messageObj.message) {
    window.alert("You cannot submit an empty chat message.")
    return false
  }
  return true
}