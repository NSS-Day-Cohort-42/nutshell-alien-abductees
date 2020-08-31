const contentTarget = document.querySelector(".auth--login")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("userAuthenticated", e => {
    contentTarget.innerHTML = ""
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "login--button") {
        const username = document.querySelector("#login--username").value
        const password = document.querySelector("#login--password").value


        return fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0]

                    if (user.password === password) {
                        sessionStorage.setItem("activeUser", user.id)
                        eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                    }
                    else {
                        renderLoginError()
                    }
                }
                else {
                    renderLoginError()
                }
            })
    }
})
eventHub.addEventListener("keydown", e => {
    if (e === 'Enter') {
        const username = document.querySelector("#login--username").value
        const password = document.querySelector("#login--password").value


        return fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0]

                    if (user.password === password) {
                        sessionStorage.setItem("activeUser", user.id)
                        eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                    }
                    else {
                        renderLoginError()
                    }
                }
                else {
                    renderLoginError()
                }
            })
    }
})

const render = () => {
    contentTarget.innerHTML += `
        <section class="login">
            <h2 class="login__header">Login to an Existing Account</h2>
            <input id="login--username" type="text" placeholder="Enter your username">
            <input id="login--password" type="password" placeholder="Enter your password">

            <button id="login--button">Log In</button>
        </section>
    `
}

const renderLoginError = () => {
    window.alert("The username and/or password provided does not match our records.")
}

export const LoginForm = () => {
    render()
}