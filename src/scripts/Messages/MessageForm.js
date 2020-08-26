import { saveMessage } from "./MessageDataProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
  if(event.target.id === "saveMessage") {
    const messageData = {
      message: document.querySelector(".messageForm__message").value
    }

    saveMessage(messageData)
  }
})

export const MessageForm = () => {
  return `
    <div class="messageForm">
      <textarea class="messageForm__message" placeholder="Enter a message"></textarea>
      <button id="saveMessage">Send Message</button>
    </div>
  `
}