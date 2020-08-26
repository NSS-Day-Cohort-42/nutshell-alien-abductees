import {TaskForm} from "../scripts/Tasks/TaskForm.js"
import {TaskList} from "../scripts/Tasks/TaskList.js"



export const Nutshell = () => {
    // Render all your UI components here
    console.log(`logged in to nutshell as user ${sessionStorage.getItem("activeUser")}`)

    TaskForm()
    TaskList()
}