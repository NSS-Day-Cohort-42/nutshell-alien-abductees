const eventHub = document.querySelector(".container")
let news = []

export const useNews = () =>{
    return news.slice()
}

const dispatchStateChangeEvent = () =>{
    const newsStateChangeEvent = new CustomEvent("newsStateChanged")

    eventHub.dispatchEvent(newsStateChangeEvent)
}

// eventHub.addEventListener("friendStateChanged", customEvent=>{
//     getNews()
//     .then(dispatchStateChangeEvent)
// })


export const getNews = () =>{
    return fetch(" http://localhost:8088/news")
    .then(res => res.json())
    .then(parseRes =>{
        //filter news here to include only current user and friends?
        news = parseRes
    })
}

export const saveNews = (article)=>{
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

export const deleteNews = (articleId) =>{
    return fetch(` http://localhost:8088/news/${articleId}`, {
    method: "DELETE"
    })
    .then(getNews)
    .then(dispatchStateChangeEvent)
}

