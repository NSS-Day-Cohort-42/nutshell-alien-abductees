const contentTarget = document.querySelector(".logoutButtonContainer")
const eventHub = document.body

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id==="logoutButton") {  
        const logoutClicked = new CustomEvent("userLoggedOut")
        eventHub.dispatchEvent(logoutClicked)
        console.log("log out clicked")
        contentTarget.innerHTML = ""
    }
})

export const logoutButton = () =>  {
    contentTarget.innerHTML = `
        <button id="logoutButton">Log Out</button>
`
}

