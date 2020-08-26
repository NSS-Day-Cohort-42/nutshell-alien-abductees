const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".navBarContainer")

eventHub.addEventListener("cancelFormClicked", () => {
  document.querySelector(".formContainer").innerHTML = ""
})

eventHub.addEventListener("click", event => {
  if(event.target.classList.contains("navBar__button")) {
    const customEventName = getCustomEventNameFromButtonId(event.target.id)
    const customEvent = new CustomEvent(customEventName)
    eventHub.dispatchEvent(customEvent)
  }
})

const getCustomEventNameFromButtonId = buttonId => {
  switch(buttonId) {
    case "createTask":
      return "createTaskClicked"

    case "createEvent":
      return "createEventClicked"

    case "createNewsStory":
      return "createNewsStoryClicked"

    case "addFriend":
      return "addFriendClicked"

    case "cancelForm":
      return "cancelFormClicked"
  }
}

export const NavBar = () => {
  contentTarget.innerHTML = `
    <nav class="navBar">
      <button class="navBar__button" id="createTask">New Task</button>
      <button class="navBar__button" id="createEvent">New Event</button>
      <button class="navBar__button" id="createNewsStory">New News Story</button>
      <button class="navBar__button" id="addFriend">Add a Friend</button>
      <button class="navBar__button" id="cancelForm">Cancel Form</button>
    </nav>
  `
}