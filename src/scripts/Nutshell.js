import {TaskForm} from "./Tasks/TaskForm.js"
import {TaskList} from "./Tasks/TaskList.js"


import { eventList } from "./Events/EventsList.js"
import { eventForm } from "./Events/EventForm.js"

export const Nutshell = () => {
    // Render all your UI components here
    console.log(`logged in to nutshell as user ${sessionStorage.getItem("activeUser")}`)

    TaskForm()
    TaskList()
    eventForm()
    eventList()
}