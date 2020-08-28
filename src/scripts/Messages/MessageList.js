import { getMessages, usePublicMessages } from "./MessageDataProvider.js"
import { Message } from "./Message.js"
import { MessageForm } from "./MessageForm.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".chatContainer")

let messages = []

let editingMessageId = null
let currentScrollPos = null

// react to a state change of messages, handle re-rendering the list with new messages state, scrolling the list to where it should most user-friendly-ly be scrolled to, and unsetting the currently-editing message ID if state change represents a new edit
eventHub.addEventListener("messagesStateChanged", event => {
  messages = usePublicMessages()
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

// handle user clicking an "edit" button in a message card - set component state such that that is the message currently being edited and re-render list
eventHub.addEventListener("editMessageButtonClicked", event => {
  const messageId = parseInt(event.detail.messageId)
  editingMessageId = messageId
  render()
  scrollToPreviousScrollPosition()
})

export const MessageList = () => {
  getMessages()
    .then(() => {
      messages = usePublicMessages()
      render()
      scrollToBottom()
    })
}

const render = () => {
  contentTarget.innerHTML = `
    <div class="messageList">
      ${ messages.map(message => {

        // if the current message is the one component state has marked as being edited, render the MessageForm here to edit that message
        if(message.id === editingMessageId) {
          return MessageForm(message)
        }

        // otherwise just render a message card
        return Message(message)

      }).join("") }
      ${ MessageForm() }
    </div>
  `

  // add scroll event listener to messageList after putting it on the dom, keep track of where the list is scrolled to
  document.querySelector(".messageList").addEventListener("scroll", event => {
    currentScrollPos = event.target.scrollTop
  })
}

// scroll the list to the bottom
const scrollToBottom = () => {
  const messageList = document.querySelector(".messageList")
  messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight
}

// scroll the list to the last scroll position it was scrolled to
const scrollToPreviousScrollPosition = () => {
  const messageList = document.querySelector(".messageList")
  messageList.scrollTop = currentScrollPos
}