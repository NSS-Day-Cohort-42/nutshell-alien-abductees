// Jacob Eckert - module to handle creating the HTML for a Message Form. Handles a message form both in the context of creating a new message and editing an existing message. Handles a message form both in the context of creating/editing a public chat message and creating/editing a private message.

import { saveMessage, updateMessage } from "./MessageDataProvider.js"
import { useUserByName } from "../Users/UserDataProvider.js"
import { isFriendWithActiveUser } from "../Friends/FriendDataProvider.js"

const eventHub = document.querySelector(".container")

// handle user clicking on the saveMessage button, either save a new message or update an existing message
eventHub.addEventListener("click", event => {
  if(event.target.id.startsWith("saveMessage")) {

    const id = event.target.id.split("--")[1] // will be empty string if new message, or id of message we are editing if editing message

    const messageObj = createMessageObjectFromFormValues(id)

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
  const defaultValues = getDefaultValues(messageObj)
  const { message, id, recipientId } = defaultValues

  return `
    <div class="messageForm">
      <textarea class="messageForm__message" id="messageForm__message--${id}" placeholder="Enter a message">${message}</textarea>
      <input type="hidden" id="messageForm__recipientId--${id}" value="${recipientId}">
      <button id="saveMessage--${id}">${id ? "Update" : "Send"} Message</button>
    </div>
  `
}

// given a message obj, get DOM-friendly optional default values (e.g., if some property is not defined in the messageObj passed in, return empty string instead of "undefined")
const getDefaultValues = messageObj => {
  const defaultValues = {}

  if(messageObj) {
    defaultValues.message = messageObj.message || ""
    defaultValues.id = messageObj.id || ""
    defaultValues.recipientId = messageObj.recipientId ? messageObj.recipientId : ""
  }

  return defaultValues
}

// create a message object from the values in the form identified by id (if id empty string, represents new message form, if set to an id represents the id of the message that is being edited)
const createMessageObjectFromFormValues = id => {
  const messageNode = document.querySelector(`#messageForm__message--${id}`)
  const recipientIdNode = document.querySelector(`#messageForm__recipientId--${id}`)

  let message = messageNode.value.trim()
  const recipientId = getRecipientId(message, recipientIdNode.value)

  if(message.startsWith("@")) {
    message = message.split(" ").slice(1).join(" ")
  }

  const messageObj = {
    message: message,
    recipientId: recipientId
  }

  return messageObj
}

const getRecipientId = (message, recipientId) => {
  if(message.startsWith("@")) {
    const username = message.split(' ')[0].substring(1)
    const user = useUserByName(username)
    if(user && isFriendWithActiveUser(user.id)) {
      return user.id
    }
  }

  if(recipientId) {
    return parseInt(recipientId)
  }

  return null
}

// validate a message - if invalid do an error alert and return false. otherwise return true
const validateMessage = messageObj => {
  if(!messageObj.message) {
    window.alert("You cannot submit an empty chat message.")
    return false
  }
  return true
}