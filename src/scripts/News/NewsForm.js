import { useNews, saveNews } from "./NewsDataProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".formContainer")

eventHub.addEventListener("createNewsStoryClicked", () => {
    NewsForm()
})

export const NewsForm = () =>{
contentTarget.innerHTML = `
<section class = "noteForm">
<h2>Post A News Article</h2>
    <fieldset>
        <input type = "text" id="newsTitle" placeholder = "Article Title" />
    </fieldset>
    <fieldset>
        <textarea id="newsSynop" placeholder = "Article Synopsis" rows="3" cols="20"></textarea>
    </fieldset>
    <fieldset>
        <input type = "text" id="newsUrl" placeholder = "Link" />
    </fieldset>
<button id= "saveArticle"> Post Article </button>
</section>
`
}

eventHub.addEventListener("click",clickEvent =>{
if(clickEvent.target.id === "saveArticle"){
    let date = new Date()
    const title = document.querySelector("#newsTitle")
    const synop = document.querySelector("#newsSynop")
    const url = document.querySelector("#newsUrl")
    const currentDate = date.getTime()
    if(title.value && synop.value && url.value){
        const newArticle = {
            title: title.value,
            synopsis: synop.value,
            url: url.value,
            timestamp: currentDate,
            userId: parseInt(sessionStorage.getItem("activeUser"))
    
        }
        saveNews(newArticle)
        
        contentTarget.innerHTML = ""
        }else{
            window.alert("Please complete all fields")
    }
    }

   
})