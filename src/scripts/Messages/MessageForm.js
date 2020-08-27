import { saveMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
  if(event.target.id.startsWith("saveMessage")) {
    const id = event.target.id.split("--")[1]
    const messageObj = createMessageObjectFromFormValues(id)

    if(validateMessage(messageObj)) {
      if(messageObj.id) {
        //updateMessage(messageObj)
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
      <input type="hidden" id="messageForm__message--${idValue}" value="${idValue}">
      <button id="saveMessage--${idValue}">${idValue ? "Update" : "Send"} Message</button>
    </div>
  `
}

const createMessageObjectFromFormValues = (id = "") => {
  const messageObj = {}

  const messageNode = document.querySelector(`#messageForm__message--${id}`)
  messageObj.message = messageNode.value.trim()

  // only set id property if id exists, meaning we are editing an existing message
  if(id) {
    messageObj.id = id
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