# Final project - A personal blogging system - Team Amber Antelopes

This repository contains a starting point for your team's final project. We look forward to seeing your progress and your final results this semester!

Your team should update this README to include the information required, as presented in the project handout available on Canvas. _Please see our updates below: we added a couple of comments (in italics) in this section and the Development Environment Setup & Commit Guidelines section. We updated the Git section and added a new section called Code Submission._

Your team members are:
- Sean Liew
- Melissa Valnegri
- Emily-Jane Stockman
- Vanni Kapoor
- Lee McMillan _(withdrawn)_

## Development Environment Setup & Commit Guidelines

It is important each team member has the right development environment setup on their computer.
Please update this with any other processes your group is following.

Extensions to install:

- [VSCode Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [VSCode Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- _Add other optional extensions here :)_ --> _we didn't have to add any extenstions other than the ones suggested._

Commands to run before commits:

- In Backend `npm run format` to double check code is formatted
- In Frontend `npm run format` to double check code is formatted

All commits MUST have a brief descriptive message

## Git

Each one of us has followed the guidelines around Pull Requests and we agreed that Sean, our team leader, was the person reviewing the code and approve it/merge it into main. When Sean had pulled requests, one of the rest of the team reviewed his request and approved accordingly.

When we have pulled requests, we all left comments for the reviewer to get an initial understanding of what the pull request was about.

We also followed naming convention as suggested.

By following the above conventions and rules we managed to keep the code tidy and up to date.

## Code submission

In addition to your source code, your team repo should also include the following:

1. An SQL script with your CREATE TABLE statements and any initialization data;

    Our code has two SQL scripts, one called init-db.sql with our CREATE TABLE statements, and one called init-db2.sql with our articles and comments initialization data. The users initialization data is in database.js.
2. A README.md file containing the following information:

    a. A brief introduction to your webapp

        Our blogging website called Amber Antelopes Diaries has a minimalist, clean look and allows the user to browse all articles from the homepage, or articles by genre by clicking on the categories on the left side of the page. 
        If a user wants to contribute to the blog, they can register by filling up their details on the sign up page. Once registered, they can log in to make comments on existing articles and write their own articles.
        When they are logged in, the user can decide to delete their articles and comments, and can also delete their entire account. If they want to delete their account, a confirmation modal dialog pops up and alerts the user that deleting the account is irreversible.
        When the user logs out, a confirmation message that they have logged out appears and they are redirected to the homepage.

    b. A description of the extent to which your team has completed the compulsory features

        Our team has completed all the compulsory features and they are all working.

    c. A description of the extra features your team has implemented

        Our extra features (all completed) are:
            i. sub-grouping articles via genre - users can click on each genre of article on the left panel on the homepage to retrieve a list of all articles within the selected genre

            ii. comments for article and all comments-related CRUD - once logged in, users can add their comments to the article, see all of their comments in the My Comments section on the navbar, edit and delete their comments

            iii. confirmation modal dialog screen - if the user wants to delete their account and clicks on delete, a modal dialog screen pops up alerting the user that all the articles, comments and user profile will be deleted and that the action won't be reversible. From this modal dialog screen the user can decide to keep their account or confirming the deletion 

            iv. logout successful screen - once the user clicks on log out, a feedback screen shows a 'logout successful' message and an option to go back to homepage is offered. The user will be automatically redirected to the homepage after 3 seconds.

    d. Instructions on what the database file (*.db file) should be named

        The .db database file should be called project-database.

    e. Does the marker need to do anything prior to running your webapp, other than npm install?

        No.

    f. Does the marker need to do anything special to run your webapp, other than running npm start?

        No.

    g. At least one username / password combination for an existing user in your system with some already-published articles

        We have created 10 users and 55 articles, you can use any of the users to test the website. The first is John Doe, username: johndoe, password: 12345. If you want to test other users, the username and passwords are in the database.js file.

    h. Any other instructions / comments you wish to make to your markers.

        Thank you for giving us full marks :)

![](./backend/public/images/Amber%20Antelopes.webp)
