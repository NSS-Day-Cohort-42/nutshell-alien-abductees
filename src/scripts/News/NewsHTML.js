import { deleteNews } from "./NewsDataProvider.js"

const eventHub = document.querySelector(".container")

export const newsHTML = (article) =>{
    
    return`
<div id = "newsCard" class = "newsCard--${article.id}">
${parseInt(sessionStorage.getItem("activeUser")) === article.userId ? `<h3 class = "newsTitle">${article.title}</h3>`: `<h3 class = "newsTitle"><em>${article.title}</em></h3>` }
<p>${new Date(article.timestamp).toLocaleDateString('en-US')}</p>
<p class = "articleSynop">${article.synopsis}</p>
<a href = "${article.url}" target = "_blank">View Full Article</a>
${parseInt(sessionStorage.getItem("activeUser")) === article.userId ? `<button id="delArt--${article.id}" class = "delArt">Delete</button> <button id="editArt--${article.id}" class="editArt">Edit</button>`: "" }
</div>
<dialog id="editDialog"></dialog>
`
}

eventHub.addEventListener("click", clickEvent =>{
    if(clickEvent.target.id.startsWith("delArt--")){
        const selectedArticle = clickEvent.target.id.split("--")[1]
        deleteNews(selectedArticle)
    }
})


