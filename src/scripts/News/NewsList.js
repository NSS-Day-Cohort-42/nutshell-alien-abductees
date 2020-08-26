import { getNews, useNews } from "./NewsDataProvider.js";
import { newsHTML } from "./NewsHTML.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".newsContainer")

let allNews = []


export const NewsList = () =>{
    getNews()
    .then(()=>{
        allNews = useNews()
        renderNews(allNews)
    })

}

const renderNews = () =>{
    contentTarget.innerHTML = allNews.map(article =>{
        return newsHTML(article)
    }).join("")
}

eventHub.addEventListener("newsStateChanged",customEvent =>{
allNews = useNews()
renderNews()
})
