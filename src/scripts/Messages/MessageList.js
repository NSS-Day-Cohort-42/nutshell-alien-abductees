import { getMessages, usePublicMessages, usePrivateMessagesWithUser } from "./MessageDataProvider.js"
import { useUsers } from "../Users/UserDataProvider.js"
import { Message } from "./Message.js"
import { MessageForm } from "./MessageForm.js"
import { useFriends } from "../Friends/FriendDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".chatContainer")

let messages = []

let editingMessageId = null
let currentScrollPos = null
let selectedFriendId = null

// react to a state change of messages, handle re-rendering the list with new messages state, scrolling the list to where it should most user-friendly-ly be scrolled to, and unsetting the currently-editing message ID if state change represents a new edit
eventHub.addEventListener("messagesStateChanged", event => {
  updateMessagesState()
  const stateChangeDescription = event.detail.stateChangeDescription

  switch(stateChangeDescription) {
    case "newMessage":
      currentScrollPos = null
      render()
      break
    case "editedMessage":
      editingMessageId = null
      render()
      break
    default:
      render()
  }
})

// handle user clicking an "edit" button in a message card - set component state such that that is the message currently being edited and re-render list
eventHub.addEventListener("editMessageButtonClicked", event => {
  const messageId = parseInt(event.detail.messageId)
  editingMessageId = messageId
  render()
})

export const MessageList = () => {
  getMessages()
    .then(() => {
      messages = usePublicMessages()
      render()
    })
}

// handle user having selected a friend. update messages state to only be those private messages between the activeUser and the selected user, rerender with only these messages
eventHub.addEventListener("friendSelected", event => {
  const friendId = event.detail.friendId

  if(selectedFriendId === friendId) {
    selectedFriendId = null
  }
  else {
    selectedFriendId = friendId
  }

  updateMessagesState()
  currentScrollPos = null
  render()
})

// if friend state changed such that the active user is no longer friends with the selected user they are private chatting, set message list back to public chat state
eventHub.addEventListener("friendStateChanged", () => {
  if(selectedFriendId) {
    const friends = useFriends()
    const activeUserId = parseInt(sessionStorage.getItem("activeUser"))
    if(!friends.some(friend => friend.activeUserId === activeUserId && friend.userId === selectedFriendId)) {
      selectedFriendId = null
      updateMessagesState()
      currentScrollPos = null
      render()
    }
  }
})

// update component-state messages array - if no selectedFriendId is set that means we want public chat messages and thus usePublicMessage(), otherwise we should update component state messages to be the messages between the activeUser and the selected user
const updateMessagesState = () => {
  if(selectedFriendId) {
    messages = usePrivateMessagesWithUser(selectedFriendId)
  }
  else {
    messages = usePublicMessages()
  }
}

const render = () => {
  let headerMessage;

  if(selectedFriendId) {
    const selectedUser = useUsers().find(user => user.id === selectedFriendId)
    headerMessage = `Private Chat with ${selectedUser.username}`
  }
  else {
    headerMessage = "Public Chat"
  }

  contentTarget.innerHTML = `
    <h3 class="messageList__header">${headerMessage}</h3>
    <div class="messageList">
      ${ messages.map(message => {

        // if the current message is the one component state has marked as being edited, render the MessageForm here to edit that message
        if(message.id === editingMessageId) {
          return MessageForm(message)
        }

        // otherwise just render a message card
        return Message(message)

      }).join("") }
      ${ MessageForm({ recipientId: selectedFriendId }) }
    </div>
  `

  scrollToTargetScrollPosition()

  // add scroll event listener to messageList after putting it on the dom, keep track of where the list is scrolled to
  document.querySelector(".messageList").addEventListener("scroll", event => {
    currentScrollPos = event.target.scrollTop
  })
}

// scroll the list to the last scroll position it was scrolled to saved in component-state currentScrollPos variable, or if currentScrollPos is null scroll to bottom of list
const scrollToTargetScrollPosition = () => {
  const messageList = document.querySelector(".messageList")
  if(currentScrollPos === null) {
    currentScrollPos = messageList.scrollHeight - messageList.clientHeight
  }
  messageList.scrollTop = currentScrollPos
}