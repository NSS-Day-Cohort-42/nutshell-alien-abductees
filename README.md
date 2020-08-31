# Nutshell: Alien Abductees
Application Overview:
Nutshell is a dashboard for aliens to use to organize their daily tasks, events, news articles, friends and chat messages.
  

# To run this app, follow these instructions:
Make sure you have Node.js and npm installed
1. `git clone` repository URL
1. `cd` into the directory it creates
1. `touch database.json` file in the `api` directory
1. Delete the `.ignore` file in the `api` directory
1. `touch src/Settings.js` 
1. Visit <https://openweathermap.org/guide#how> to create an account and get your API key
1. in `Settings.js` `export default {
    weatherKey: "your API key here"
}`
1. In your `database.json` file, copy and paste the following empty arrays: 
    `{
        "users": [],
        "tasks": [],
        "events": [],
        "news": [],
        "messages": [],
        "friends": []
    }`
1. Serve JSON file utilizing `json-server -w database.json -p 8088`
1. In a new tab in your terminal, `cd` into `src`, and `serve`
1. Go to the localhost in your browser and register an account

# Homepage

* User can save a new task, event, or news article
* User can view their tasks, events, and news articles as well as their friends' events and news articles
* User can can edit or delete tasks, events, and news articles
* User can view weather for each event (if it is within the next 5 days)
* User can add a new friend by entering username into Friend Form or by clicking on Friend in the Chat window
* User can message a friend publicly or privately

# Planning Links
1. [ERD](https://dbdiagram.io/d/5f4522ea7b2e2f40e9deb4fe)
1. [Wireframe](https://miro.com/app/board/o9J_kmqQ4As=/)
