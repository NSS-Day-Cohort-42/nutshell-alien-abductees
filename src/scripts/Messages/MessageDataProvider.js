let messages = []

const eventHub = document.querySelector(".container")

const broadcastMessagesStateChanged = () => {
  const messagesStateChangedEvent = new CustomEvent("messagesStateChanged")
  eventHub.dispatchEvent(messagesStateChangedEvent)
}

export const getMessages = () => {
  return fetch("http://localhost:8088/messages?_expand=user")
    .then(res => res.json())
    .then(messagesData => messages = messagesData)
}

export const useMessages = () => messages.slice()

export const saveMessage = messageData => {
  const messageObj = {
    message: messageData.message,
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
    .then(broadcastMessagesStateChanged)
}

export const deleteMessage = messageId => {
  return fetch(`http://localhost:8088/messages/${messageId}`, {
    method: "DELETE"
  })
    .then(getMessages)
    .then(broadcastMessagesStateChanged)
}