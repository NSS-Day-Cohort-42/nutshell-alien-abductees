export const Message = messageObj => {
  const { id, message, userId, username, timestamp } = messageObj;

  return `
    <div class="message">
      <p>User ID: ${userId}</p>
      <p>${message}</p>
      ${ messageDeleteButton(id, userId) }
    </div>
  `
}

const messageDeleteButton = (messageId, userId) => {
  const activeUser = parseInt(sessionStorage.getItem("activeUser"))
  if(userId === activeUser) {
    return `
      <button id="deleteMessage--${messageId}">Delete Message</button>
    `
  }
  return "";
}