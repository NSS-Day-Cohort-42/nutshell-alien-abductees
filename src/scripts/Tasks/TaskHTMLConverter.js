//Esther Sanders ... exports a function to convert a task object into HTML

export const TaskHTMLConverter = (taskObj) => {
    return `
        <div class="taskCard--${taskObj.id}">
            <p>Task: ${taskObj.task}</p>
            <p>Complete by: ${new Date(taskObj.targetDate).toLocaleDateString('en-US')}</p>
            <label for="complete">Completed?</label>
            <input type="radio" id="complete--${taskObj.id}">
            <button id="editTask--${taskObj.id}">Edit Task</button>
            <button id="deleteTask--${taskObj.id}">Delete Task</button>
        </div>
    `
}