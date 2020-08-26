import { NavBar } from "./NavBar/NavBar.js"
import { TaskList } from "./Tasks/TaskList.js"
import { eventList } from "./Events/EventsList.js"
import { MessageList } from "./Messages/MessageList.js"
import { NewsList } from "./News/NewsList.js"
import { NewsForm } from "./News/NewsForm.js"
import "./Tasks/TaskForm.js"
import "./Events/EventForm.js"

export const Nutshell = () => {
    // Render all your UI components here
    console.log(`logged in to nutshell as user ${sessionStorage.getItem("activeUser")}`)

    NavBar();

    MessageList()
    TaskList()
    eventList()

    NewsList()
    NewsForm()
}