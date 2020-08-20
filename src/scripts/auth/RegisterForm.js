const contentTarget = document.querySelector(".auth--register")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("userAuthenticated", e => {
    contentTarget.innerHTML = ""
})


eventHub.addEventListener("click", e => {
    if (e.target.id === "register--button") {
        const username = document.querySelector("#register--username").value
        const email = document.querySelector("#register--email").value
        const password = document.querySelector("#register--password").value
        const passwordVerify = document.querySelector("#register--password-verify").value

        if (username !== ""
            && email !== ""
            && password !== ""
            && passwordVerify !== ""
            && (password === passwordVerify)) {

            // Does the user exist?
            fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length === 0) {
                    fetch("http://localhost:8088/users", {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "username": username,
                            "email": email,
                            "password": password
                        })
                    })
                        .then(response => response.json())
                        .then((newUser) => {
                            sessionStorage.setItem("activeUser", newUser.id)

                            eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                        })

                }
                else {
                    window.alert("Username already exists!  😭")
                }
            })
        }
    }
})


const render = () => {
    contentTarget.innerHTML += `
        <section class="register">
            <input id="register--username" type="text" placeholder="Enter your username">
            <input id="register--email" type="text" placeholder="Enter your email address">
            <input id="register--password" type="password" placeholder="Enter your password">
            <input id="register--password-verify" type="password" placeholder="Verify your password">

            <button id="register--button">Register</button>
        </section>
    `
}

export const RegisterForm = () => {
    render()
}