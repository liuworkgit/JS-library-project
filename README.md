# JS Library Project
This is a web app that allows the user to manage a collection of books.

This project was made according to the specifications of [The Odin Project's Library Project, which you can access here.](https://www.theodinproject.com/lessons/node-path-javascript-library)

## Status Update - May 31 2024
I am currently beginning the process of revamping the code, by doing the following:
1. Decouple the book creation process of showBook in library-functionality.js for better cohesion.
2. Improving the UI and CSS of the webpage.
3. Decoupling the application logic into separate JavaScript modules using factory functions and the module pattern.

## User Stories
This project will have the following functionality:

1. It will display all the stored books on the page, showing their title, author, number of pages, and whether or not they've been read.
2. Users will be able to add a new book. When adding a new book, they will have the option to input details about said book, including:
- author
- title
- number of pages
3. Users will be able to remove a book by pressing a button beside a book's listing.
4. Users will be able to mark a book as read or unread by pressing a button beside a book's listing.

## Future Goals
I intend to implement these goals after the fundamental user stories have been completed.

1. Fix the "new book" form to the right of the page.
2. Reformat the book entries so they look better and allow the user to submit a book cover as well.