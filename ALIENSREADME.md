# Nutshell: Alien Abductees
Application Overview:
Nutshell is a dashboard for aliens to use to organize their daily tasks, events, news articles, friends and chat messages.
  

# To run this app, follow these instructions:
Make sure you have Node.js and npm installed
1. Clone this repository
1. `cd` into the directory it creates
1. npm install
1. Make a `database.json` file in the `api` directory
1. Delete the `.ignore` file in the `api` directory

> **Note:** Your `database.json` file is already in the `.gitignore` file for this project, so it will never be added to the repo or pushed to Github.

1. In your `database.json` file, add the following empty arrays: "users": [], "tasks": [], "events": [], "news": [], "messages": [], and "friends": []

1. Serve JSON file utilizing json-server -w database.json -p 8088
1. In a new tab in your terminal, cd into src, and serve ("hs")
1. Go to localhost:8080 in your browser and register an account

# Homepage

1. User can save a new task, event, news article
1. User can view their tasks, events, and news articles as well as their friends' events and news articles
1. User can can edit or delete tasks, events, and news articles
1. User can view weather for each event (if it is within the next 5 days)
1. User can add a new friend by entering username into Friend Form or by clicking on Friend in the Chat window
1. User can message a friend publicly or privately
