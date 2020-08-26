import { getMessages, useMessages } from "./MessageDataProvider.js"
import { Message } from "./Message.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".chatContainer")

let messages = []

export const MessageList = () => {
  getMessages()
    .then(() => {
      messages = useMessages()
      render()
    })
}

const render = () => {
  contentTarget.innerHTML = `
    <div class="messageList">
      ${ messages.map(message => Message(message)).join("") }
    </div>
  `
}