//Esther Sanders ... renders all tasks, listens for taskStateChanged event and re-renders as a user creates new tasks, edits, deletes, or completes tasks

import {getTasks, useTasks, deleteTask, saveTask} from "./TaskDataProvider.js"
import { TaskHTMLConverter } from "./TaskHTMLConverter.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".tasksContainer")


//listens for any changes to the app state and re-renders the task list
eventHub.addEventListener("taskStateChanged", customEvent => {
    const updatedTasks = useTasks()
    render(updatedTasks)
})

const render = (tasks) => {
    contentTarget.innerHTML = tasks.map(
        (taskObj) => {
            return TaskHTMLConverter(taskObj)
        }).join("")       
}

export const TaskList = () => {
    getTasks()
        .then(useTasks)
        .then(render)
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editTask--")) {
        const [prompt, taskId] = clickEvent.target.id.split("--")
        const editTaskClicked = new CustomEvent("editClicked", {
            detail: {
                taskId: parseInt(taskId)
            }
        })
        eventHub.dispatchEvent(editTaskClicked)
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteTask--")) {
        const [prompt, id] = clickEvent.target.id.split("--")
        deleteTask(id)
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("complete--")) {
        const [promt, id] = clickEvent.target.id.split("--")
        const completedTask = {
            task:
            targetDate:
            id: parseInt(id.value),
            complete: true
        }
        saveTask(completedTask)
    }
})

// eventHub.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id.startsWith("complete--")) {
//         const [promt, id] = clickEvent.target.id.split("--")
//         deleteTask(id)
//     }
// })