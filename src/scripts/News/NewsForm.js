import {
    useNews,
    saveNews,
    editNews
} from "./NewsDataProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".formContainer")

eventHub.addEventListener("createNewsStoryClicked", () => {
    NewsForm()
})

export const NewsForm = () => {
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

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveArticle") {
        let date = new Date()
        const title = document.querySelector("#newsTitle")
        const synop = document.querySelector("#newsSynop")
        const url = document.querySelector("#newsUrl")
        const currentDate = date.getTime()
        if (title.value && synop.value && url.value) {
            const newArticle = {
                title: title.value,
                synopsis: synop.value,
                url: url.value,
                timestamp: currentDate,
                userId: parseInt(sessionStorage.getItem("activeUser"))

            }
            saveNews(newArticle)

            contentTarget.innerHTML = ""
        } else {
            window.alert("Please complete all fields")
        }
    }
})

eventHub.addEventListener("editNewsClicked", customEvent => {
    const allNews = useNews()
    const dialog = document.querySelector("#editDialog")

    const newsObjToEdit = allNews.find(newsObj => customEvent.detail.newsId === newsObj.id)
    dialog.innerHTML = `
    <section class = "EditNoteForm">
    <h2>Edit News Post</h2>
    <fieldset>
        <input type = "text" id="newsTitleEdit" value = "${newsObjToEdit.title}" />
    </fieldset>
    <fieldset>
        <textarea id="newsSynopEdit" rows="3" cols="20">${newsObjToEdit.synopsis}</textarea>
    </fieldset>
    <fieldset>
        <input type = "text" id="newsUrlEdit" value = "${newsObjToEdit.url}"/>
    </fieldset>
<button id= "saveEdit--${newsObjToEdit.id}"> Save Changes </button>
<button id= "cancelNewsEdit"> Cancel </button>
</section>  
    `
    dialog.showModal()

})

eventHub.addEventListener("click", clickEvent=>{
    if(clickEvent.target.id.startsWith("saveEdit--")){
        const dialog = document.querySelector("#editDialog")
        const id = clickEvent.target.id.split("--")[1]
        let date = new Date()
        const currentDate = date.getTime()
        const title = document.querySelector("#newsTitleEdit")
        const synop = document.querySelector("#newsSynopEdit")
        const url = document.querySelector("#newsUrlEdit")
        if (title.value && synop.value && url.value) {

        const editedNews = {
            
                title: title.value,
                synopsis: synop.value,
                url: url.value,
                timestamp: currentDate,
                userId: parseInt(sessionStorage.getItem("activeUser"))
        }
        editNews(id,editedNews)
        dialog.close()
    }else{
        window.alert("Please complete all fields")
    }
    }
   else if(clickEvent.target.id === "cancelNewsEdit"){
    const dialog = document.querySelector("#editDialog")
    dialog.close()
   }
})