# NC-News

Welcome to NC-News! This project is a front-end application built using React, allowing users to view and interact with articles. The application supports features such as sorting articles, switching between users, and posting comments.

## Deployed Version

You can access the live version of the app here: [NC-News Live](https://main--polite-kheer-a1aa6f.netlify.app/)

## General Information

NC-News is a news aggregation application where users can:

- View articles sorted by various criteria (date, votes, comment count).
- Switch between different users to see user-specific content and actions.
- Post comments on articles.
- Delete comments if logged in as the author of that comment.
- Vote on articles.


## Back End Repository

The backend for this application is built using Node.js and Express and is hosted on Render. You can find the backend repository here: [be-NC-news] (https://github.com/pirateMagoo/be-NC-news)

## Node Version

The minimum Node version required to run this project locally is `v18.13.0`. You can check your current Node version by running `node --version` in your terminal.

## Running the Project Locally

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/pirateMagoo/fe-nc-news
    ```

2. Navigate into the project directory:
    ```bash
    cd fe-nc-news
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following environment variables:
    ```
    REACT_APP_BACKEND_URL=https://your-backend-url.com/api
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:5173` to view the app.

## Digital Skills Bootcamp

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).

