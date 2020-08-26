//Esther Sanders ... module to get and use friends from API, save new friend, and delete friend

let friends = []


export const getFriends = () => {
    return fetch("http://localhost:8088/tasks")
        .then(res => res.json())
        .then(parsedFriends => {
            friends = parsedFriends
            )}