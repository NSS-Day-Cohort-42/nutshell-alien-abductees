//Esther Sanders exports getUsers and useUsers functions for Friend List

let users = []

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(parsedUsers => users = parsedUsers)
}

export const useUsers = () => {
    return users.slice()
}

export const useUserByName = username => {
    return users.find(user => user.username === username)
}