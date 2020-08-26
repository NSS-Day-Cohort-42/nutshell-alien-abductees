export const Message = message => {
  const { message, userId, username, timestamp } = message;

  return `
    <div class="message">
      <p>User ID: ${userId}</p>
      <p>${message}</p>
    </div>
  `
}