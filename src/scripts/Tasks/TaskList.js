//Esther Sanders ... renders all tasks, listens for taskStateChanged event and re-renders as a user creates new tasks, edits, deletes, or completes tasks

import {getTasks, useTasks, deleteTask} from "./TaskDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".tasksContainer")


//listens for any changes to the app state and re-renders the task list
eventHub.addEventListener("taskStateChanged", customEvent => {
    const updatedTasks = useTasks()
    render(updatedTasks)
})