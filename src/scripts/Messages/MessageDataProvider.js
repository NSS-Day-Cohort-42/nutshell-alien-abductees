// Jacob Eckert - module to handle all data manipulation stuff with messages (incl. loading messages from API, returning collection of public messages/private messages, saving messages, updating messages, deleting messages, broadcasting state change events when message state changes)

let messages = []

const eventHub = document.querySelector(".container")

localStorage.setItem("newMessagesState", "false") // seems that this has to be initialized for the "storage" event to fire correctly

const broadcastMessagesStateChanged = stateChangeDescription => {
  const messagesStateChangedEvent = new CustomEvent("messagesStateChanged", {
    detail: {
      stateChangeDescription: stateChangeDescription
    }
  })
  eventHub.dispatchEvent(messagesStateChangedEvent)

  localStorage.setItem("newMessagesState", "true")
}

export const getMessages = () => {
  return fetch("http://localhost:8088/messages?_expand=user")
    .then(res => res.json())
    .then(messagesData => messages = messagesData) 
}

export const usePublicMessages = () => {
  return messages
    .slice()
    .filter(message => !message.recipientId)
    .sort((currentMessage, nextMessage) => currentMessage.timestamp - nextMessage.timestamp)
}

export const usePrivateMessagesWithUser = userId => {
  return messages
    .filter((message) => isPrivateMessageBetweenActiveUserAndUser(message, userId))
    .sort((currentMessage, nextMessage) => currentMessage.timestamp - nextMessage.timestamp)
}

const isPrivateMessageBetweenActiveUserAndUser = (message, userId) => {
  const activeUserId = parseInt(sessionStorage.getItem("activeUser"))

  return (
    (message.userId === activeUserId && message.recipientId === userId) ||
    (message.userId === userId && message.recipientId === activeUserId)
  )
}

export const saveMessage = messageData => {
  const messageObj = {
    message: messageData.message,
    recipientId: messageData.recipientId,
    timestamp: Date.now(),
    userId: parseInt(sessionStorage.getItem("activeUser"))
  }

  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageObj)
  })
    .then(getMessages)
    .then(() => broadcastMessagesStateChanged("newMessage"))
}

export const updateMessage = (id, messageObj) => {
  return fetch(`http://localhost:8088/messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageObj)
  })
    .then(getMessages)
    .then(() => broadcastMessagesStateChanged("editedMessage"))
}

export const deleteMessage = messageId => {
  return fetch(`http://localhost:8088/messages/${messageId}`, {
    method: "DELETE"
  })
    .then(getMessages)
    .then(() => broadcastMessagesStateChanged("deletedMessage"))
}