export const Message = messageObj => {
  const { message, userId, username, timestamp } = messageObj;

  return `
    <div class="message">
      <p>User ID: ${userId}</p>
      <p>${message}</p>
    </div>
  `
}