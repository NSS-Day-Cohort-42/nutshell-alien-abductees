//Sam Johnson -- Componet that gets and renders the news. Listens for a change made by the user and then re-renders if necessary

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
    
    const newsRep = sortedNews.map(article =>{
        return newsHTML(article)
    }).join("")
    contentTarget.innerHTML = `
    <h2>News</h2>
    ${newsRep}
    `
  
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
