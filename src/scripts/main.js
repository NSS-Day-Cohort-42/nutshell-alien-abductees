import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { Nutshell } from "./Nutshell.js"
import "./auth/Logout.js"

const eventHub = document.querySelector(".container")
const eventHubBody = document.body

/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

eventHub.addEventListener("userAuthenticated", Nutshell) 

if(sessionStorage.getItem("activeUser")) {
    Nutshell()

}
else {
    LoginForm()
    RegisterForm()
}

eventHubBody.addEventListener("userLoggedOut", customEvent => {
    console.log("logout clicked")
    sessionStorage.clear()
    LoginForm() 
    RegisterForm()
    document.querySelector(".nutshell").classList.add("hidden")
})
