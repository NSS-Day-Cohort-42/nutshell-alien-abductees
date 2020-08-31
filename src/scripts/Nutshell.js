import { weatherList } from "./Weather/WeatherList.js"
import { NavBar } from "./NavBar/NavBar.js"
import { TaskList } from "./Tasks/TaskList.js"
import { eventList } from "./Events/EventsList.js"
import { MessageList } from "./Messages/MessageList.js"
import { NewsList } from "./News/NewsList.js"
import "./Tasks/TaskForm.js"
import "./Events/EventForm.js"
import "./News/NewsForm.js"
import "./Friends/FriendForm.js"
import { FriendList } from "./Friends/FriendList.js"
import { getUsername } from "./auth/CurrentLogin.js"
import {logoutButton} from "./auth/Logout.js"


export const Nutshell = () => {
    document.querySelector(".nutshell").classList.remove("hidden")

    weatherList()
    FriendList()
    logoutButton()

    NavBar();
    MessageList()
    TaskList()
    eventList()
    NewsList()
    getUsername()
}