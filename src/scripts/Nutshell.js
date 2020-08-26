import { NavBar } from "./NavBar/NavBar.js"
import { TaskList } from "./Tasks/TaskList.js"
import { eventForm } from "./Events/EventForm.js"
import { eventList } from "./Events/EventsList.js"
import { MessageList } from "./Messages/MessageList.js"
import { NewsList } from "./News/NewsList.js"
import { NewsForm } from "./News/NewsForm.js"
import  "./Tasks/TaskForm.js"

export const Nutshell = () => {
    // Render all your UI components here
    console.log(`logged in to nutshell as user ${sessionStorage.getItem("activeUser")}`)

    NavBar();

    TaskList()
    
    eventForm()
    eventList()

    MessageList()

    NewsList()
    NewsForm()
}