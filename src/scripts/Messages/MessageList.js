import { getMessages, useMessages } from "./MessageDataProvider.js"
import { Message } from "./Message.js"
import { MessageForm } from "./MessageForm.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".chatContainer")

let messages = []

eventHub.addEventListener("messagesStateChanged", () => {
  messages = useMessages()
  render()
})

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
      ${ MessageForm() }
    </div>
  `
  scrollToBottom()
}

const scrollToBottom = () => {
  const messageList = document.querySelector(".messageList")
  messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight
}