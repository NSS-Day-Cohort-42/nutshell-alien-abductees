import { weatherList } from "./Weather/WeatherList.js"
import { NavBar } from "./NavBar/NavBar.js"
import { TaskList } from "./Tasks/TaskList.js"
import { eventList } from "./Events/EventsList.js"
import { MessageList } from "./Messages/MessageList.js"
import { NewsList } from "./News/NewsList.js"
import "./Tasks/TaskForm.js"
import "./Events/EventForm.js"
import "./News/NewsForm.js"

export const Nutshell = () => {
    weatherList()

    NavBar();

    MessageList()
    TaskList()
    eventList()
    NewsList()
}