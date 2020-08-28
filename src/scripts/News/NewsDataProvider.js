import {
    useFriends
} from "../Friends/FriendDataProvider.js"

const eventHub = document.querySelector(".container")
let news = []
let friends = []


const dispatchStateChangeEvent = () => {
    const newsStateChangeEvent = new CustomEvent("newsStateChanged")

    eventHub.dispatchEvent(newsStateChangeEvent)
}

eventHub.addEventListener("friendStateChanged", customEvent => {
    getNews()
        .then(dispatchStateChangeEvent)
})


export const getNews = () => {
    return fetch(" http://localhost:8088/news")
        .then(res => res.json())
        .then(parseRes => {
            //filter news here to include only current user and friends?
            friends = useFriends()
            news = parseRes
        })
}

export const saveNews = (article) => {
    return fetch(" http://localhost:8088/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
        .then(getNews)
        .then(dispatchStateChangeEvent)
}

export const editNews = (id,newsObj) => {
    return fetch(`http://localhost:8088/news/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newsObj)
    })
    .then(getNews)
    .then(dispatchStateChangeEvent)
        
}

export const deleteNews = (articleId) => {
    return fetch(` http://localhost:8088/news/${articleId}`, {
            method: "DELETE"
        })
        .then(getNews)
        .then(dispatchStateChangeEvent)
}

export const useNews = () => {
    //get friend relationships of current user
    const friendRel = friends.filter(friendRel => {
        return friendRel.activeUserId === parseInt(sessionStorage.getItem("activeUser"))
    })
    //filter news
    const filteredNews = news.filter(article => {
        //if the article id matches the current user then display article
        if (article.userId === parseInt(sessionStorage.getItem("activeUser"))) {
            return true
        } else {
            const foundFriend = friendRel.find(frobj => {
                return article.userId === frobj.userId
            })
            if (typeof foundFriend !== 'undefined') {
                return true
            }
        }
    })
    return filteredNews.slice()
}