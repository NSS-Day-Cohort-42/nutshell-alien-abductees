//Esther Sanders ... exports a function to convert a task object into HTML

export const TaskHTMLConverter = (taskObj) => {
    return `
        <div class="taskCard--${taskObj.id}">
            <p>Task: ${taskObj.task}</p>
            <p>Complete by: ${taskObj.targetDate}</p>
            <label for="complete">Completed?</label>
            <input type="radio" id="complete">
            <button id="editTask--${task.id}">
            <button id="deleteTask--${task.id}">
        </div>
    `
}