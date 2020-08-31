//Esther Sanders ... renders a logout button after user logs in, dispatches click event to main.js when user clicks button, returns user to login/ registration form



const contentTarget = document.querySelector(".logoutButtonContainer")
const eventHub = document.body
const loggedInAs = document.querySelector(".currentLogin")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id==="logoutButton") {  
        const logoutClicked = new CustomEvent("userLoggedOut")
        eventHub.dispatchEvent(logoutClicked)
        console.log("log out clicked")
        contentTarget.innerHTML = ""
        loggedInAs.innerHTML = ""
    }
})

export const logoutButton = () =>  {
    contentTarget.innerHTML = `
        <button id="logoutButton">Log Out</button>
`
}

