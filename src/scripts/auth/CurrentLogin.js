import {
    useUsers,
    getUsers
} from "../Users/UserDataProvider.js";


const contentTarget = document.querySelector(".currentLogin")

const render = (username) => {
    contentTarget.innerHTML = `
    <p>Current Login:<b> ${username}</b></p>
    `
}


export const getUsername = () => {
    getUsers()
        .then(() => {
            let allUsers = useUsers()
            const foundUser = allUsers.find(user => {
                return user.id === parseInt(sessionStorage.getItem("activeUser"))
            })
            render(foundUser.username)
        })

}