const contentTarget = document.querySelector(".logoutButtonContainer")
const eventHub = document.querySelector(".container")


export const logoutButton = () => {
contentTarget.innerHTML = `
<button class="logoutButton" id="logoutButton">Log Out</button>
`
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id==="logoutButton") {
        sessionStorage.clear()
    }
})