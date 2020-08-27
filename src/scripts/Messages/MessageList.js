import { getMessages, useMessages } from "./MessageDataProvider.js"
import { Message } from "./Message.js"
import { MessageForm } from "./MessageForm.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".chatContainer")

let messages = []

let editingMessageId = null
let currentScrollPos = null

eventHub.addEventListener("messagesStateChanged", event => {
  messages = useMessages()
  const stateChangeDescription = event.detail.stateChangeDescription

  switch(stateChangeDescription) {
    case "newMessage":
      render()
      scrollToBottom()
      break
    case "editedMessage":
      editingMessageId = null
      render()
      scrollToPreviousScrollPosition()
      break
    default:
      render()
      scrollToPreviousScrollPosition()
  }
})

eventHub.addEventListener("editMessageButtonClicked", event => {
  const messageId = parseInt(event.detail.messageId)
  editingMessageId = messageId
  render()
  scrollToPreviousScrollPosition()
})

export const MessageList = () => {
  getMessages()
    .then(() => {
      messages = useMessages()
      render()
      scrollToBottom()
    })
}

const render = () => {
  contentTarget.innerHTML = `
    <div class="messageList">
      ${ messages.map(message => {
        if(message.id === editingMessageId) {
          return MessageForm(message)
        }
        return Message(message)
      }).join("") }
      ${ MessageForm() }
    </div>
  `

  document.querySelector(".messageList").addEventListener("scroll", event => {
    currentScrollPos = event.target.scrollTop
  })
}

const scrollToBottom = () => {
  const messageList = document.querySelector(".messageList")
  messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight
}

const scrollToPreviousScrollPosition = () => {
  const messageList = document.querySelector(".messageList")
  messageList.scrollTop = currentScrollPos
}