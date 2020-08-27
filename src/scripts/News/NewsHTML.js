import { deleteNews } from "./NewsDataProvider.js"

const eventHub = document.querySelector(".container")

export const newsHTML = (article) =>{
    
    return`
<div class = "newsCard--${article.id}">
<h3 class = "newsTitle">${article.title}</h3>
<p>${new Date(article.timestamp).toLocaleDateString('en-US')}</p>
<p class = "articleSynop">${article.synopsis}</p>
<a href = "${article.url}" target = "_blank">Link to article</a>
${parseInt(sessionStorage.getItem("activeUser")) === article.userId ? `<button id="delArt--${article.id}">Delete</button>`: "" }
</div>
`
}

eventHub.addEventListener("click", clickEvent =>{
    if(clickEvent.target.id.startsWith("delArt--")){
        const selectedArticle = clickEvent.target.id.split("--")[1]
        deleteNews(selectedArticle)
    }
})


