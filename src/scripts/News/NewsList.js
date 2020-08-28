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
    const sortedNews = allNews.sort(function(a,b){
        return new Date(b.timestamp) - new Date(a.timestamp)
      })
    
    contentTarget.innerHTML = sortedNews.map(article =>{
        return newsHTML(article)
    }).join("")
}

eventHub.addEventListener("newsStateChanged",customEvent =>{
allNews = useNews()
renderNews()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editArt--")) {
        const newsSelected = clickEvent.target.id.split("--")[1]
        const editNewsClicked = new CustomEvent("editNewsClicked", {
            detail: {
                newsId: parseInt(newsSelected)
            }
        })
        eventHub.dispatchEvent(editNewsClicked)
    }
})
