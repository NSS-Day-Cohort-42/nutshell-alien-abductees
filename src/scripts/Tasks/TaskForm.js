/* Esther Sanders ... renders a form that allows user to create a new event
listens for createTask event
listens for editTask event */

import {saveTask, editTask, useTasks } from "./TaskDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".formContainer")

//listens for createTaskClicked event and renders self when heard
eventHub.addEventListener("createTaskClicked", () => {
    render()
})

//listens for edit button click Event
eventHub.addEventListener("editClicked", customEvent => {
    render()

    const allTasks = useTasks()
    const taskId = customEvent.detail.taskId
    const taskObjToEdit = allTasks.find(taskObj => taskId === taskObj.id)

    let taskName = document.querySelector("#taskName")
    let taskTargetDate = document.querySelector("#targetDate")
    let id = document.querySelector("#taskId")

    taskName.value = taskObjToEdit.task
    taskTargetDate.value = taskObjToEdit.targetDate.split("T")[0]
    id.value = parseInt(taskId)
})


//listens for save task click event
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveTask") {
        const taskName = document.querySelector("#taskName")
        const taskTargetDate = document.querySelector("#targetDate")
        const id = document.querySelector("#taskId")
    
    if (taskName.value && taskTargetDate.value) {
        const id = document.querySelector("#taskId")
        if (id.value === "") {

            const newTask = {
                task: taskName.value,
                targetDate: taskTargetDate.value + "T00:00:00",
                userId: parseInt(sessionStorage.getItem("activeUser")),
                complete: false
            }
            saveTask(newTask)
        } else {
            const editedTask = {
                task: taskName.value,
                targetDate: taskTargetDate.value + "T00:00:00",
                userId: parseInt(sessionStorage.getItem("activeUser")),
                id: parseInt(id.value),
                complete: false
            }
            editTask(editedTask)
            id.value = ""
        }
        contentTarget.innerHTML = "" // wipe out formContainer after submit task
    } else {
        window.alert("Please complete all fields")
    }
}
})


const render = () => {
    contentTarget.innerHTML = `
    <div class="taskForm">
        <h2 class="taskFormHeader"> Create New Task: </h2>
            <fieldset>
                <label for="taskName"> Task: </label>
                <input type="text" id="taskName">
            </fieldset>
            <fieldset>
                <label for="targetDate">Target Date: </label>
                <input type ="date" name="targetDate" id="targetDate">  
            </fieldset>
            <input type="hidden" name="taskId" id="taskId"> 
        <button id="saveTask">Save Task</button>
    </div>
    `
}

export const TaskForm = () => {
    render()
}