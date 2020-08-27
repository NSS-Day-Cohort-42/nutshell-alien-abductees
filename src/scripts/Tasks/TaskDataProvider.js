//Esther Sanders module to get and use tasks from the API, save new tasks to the API, and edit or delete them from the API

let tasks = []

const eventHub = document.querySelector(".container")

//function to dispatch change event that app state changed
const dispatchStateChangeEvent = () => {
    const taskStateChangedEvent = new CustomEvent("taskStateChanged")
    eventHub.dispatchEvent(taskStateChangedEvent)
}

//function to make a copy of tasks array
export const useTasks = () => {

    const personalTasks = tasks.filter(task => {
        if (task.userId === parseInt(sessionStorage.getItem("activeUser"))) {
            return true
        }
    })
    return personalTasks.slice()
}

//function to get tasks from API
export const getTasks = () => {
    return fetch("http://localhost:8088/tasks")
        //turn it into JSON
        .then(response => response.json())
        .then(parsedTasks => {
            tasks = parsedTasks
        })
}

//function to edit a task
export const editTask = (taskObj) => {
    return fetch(`http://localhost:8088/tasks/${taskObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObj)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
        
}

export const deleteTask = taskId => {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "DELETE"
    })
    //don't need response => on delete operation
        .then(getTasks)
        .then(dispatchStateChangeEvent)
}

//function to save task after entered into form
export const saveTask = (taskObj) => {
    const jsonTask = JSON.stringify(taskObj) //turn object into string/strings

    return fetch("http://localhost:8088/tasks", {
        method: "POST", //send it back to API?
        //what is this object?
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonTask //body is the stringified object
    })
    .then(getTasks) //get updated data from the API
    .then(dispatchStateChangeEvent) //event that says app state was changed
}

export const patchTask = (taskId) => {
    const completedTask = {
        complete: true
    }
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedTask)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}


