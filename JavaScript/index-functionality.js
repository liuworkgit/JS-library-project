'use strict'

let library = [];

/**
 * object constructor for a book object
 * 
 * @param {*} t - the title of the book
 * @param {*} a - the author of the book
 * @param {*} pn - the number of pages in the book
 * @field isRead - whether or not the book has been read. By default this is false
 * @field id - a unique id produced by Date.now() at the book's creation.
 */
function Book(t, a, pn) {
    this.title = t;
    this.author = a;
    this.pageNum = pn;
    this.isRead = false;
    this.id = Date.now();
};

/**
 * Changes isRead to true if false, and vice versa.
 */
Book.prototype.changeIsRead = function () {
    this.isRead = !this.isRead;
};

// ******************************************************************************

/**
 * Converts submission form input into a Book object.
 * @returns Book
 */
function inputToBook() {
    const form = document.getElementById("submit-form");
    const formData = new FormData(form);
    console.log(`Successfully read form data - ${formData}`);

    let book = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pageNum")
    );
    console.log(`Successfully made book - ${book}`);
    return book;
};

/**
 * Adds a book to the library.
 */
function addBook() {
    library.push(inputToBook());
};

/**
 * Deletes the book identified by id from the library.
 * @param {Number} id - the id of the book to delete.
 * @requires 0 <= id < library.length
 */
function deleteBook(id) {
    library.splice(findBook(id), 1);
};

/**
 * Returns the index of the book with the given id.
 * @param {Number} id - the id of the book to find.
 * @returns Number
 */
function findBook(id) {
    if (library != []) {
        for (let i = 0; i < library.length; i++) {
            if (library[i].id == id) {
                return i;
            };
        };
    };
};

/**
 * Displays the library on the webpage.
 */
function showLibrary() {
    if (library != []) {
        for (let i = 0; i < library.length; i++) {
            bookToHTML(i);
        };
    };
};

/**
 * Converts a book to an HTML object.
 * @param {Number} index - index of the book to be converted.
 * @requires library.length > 0
 * @requires 0 <= index < library.length
 */
function bookToHTML(index) {
    const book = library[index];

    let newEntry = document.createElement("div");
    newEntry.className = "book-entry";
    newEntry.setAttribute("data-id", book.id);
    document.getElementById("book-display").appendChild(newEntry);

    addInfo(newEntry, book);
    addReadStatus(newEntry, book);
    addDeleteButton(newEntry);
    addMarkReadButton(newEntry);
};

/**
 * Adds a book's information to its display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify
 * @param {Book} book - the book to get info from
 */
function addInfo(entry, book) {
    let bookInfo = document.createElement("p");
    bookInfo.className = "book-entry-text";
    bookInfo.innerHTML = book.title + " - " + book.author + " - " + book.pageNum;
    entry.appendChild(bookInfo);
};

/**
 * Adds a book's read status to its display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify
 * @param {Book} book - the book to get info from
 */
function addReadStatus(entry, book) {
    let readStatus = document.createElement("p");
    readStatus.className = "read-status";
    readStatus.innerHTML = (book.isRead) ? "Has been read" : "Hasn't been read";
    entry.appendChild(readStatus);
};

/**
 * Adds a delete button to a book's display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify
 */
function addDeleteButton(entry) {
    let button = document.createElement("button");

    button.type = "button";
    button.className = "delete-button";
    button.innerHTML = "Delete Book";

    button.addEventListener("click", whileDeleteBook, false);

    entry.appendChild(button);
};

/**
 * Adds a "mark as read" button to a book's display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify
 */
function addMarkReadButton(entry) {
    let button = document.createElement("button");

    button.type = "button";
    button.className = "mark-read-button";
    button.innerHTML = "Mark as Read";

    button.addEventListener("click", whileMarkRead, false);

    entry.appendChild(button);
};

/**
 * Prevents the form from sending to the server as there is no server.
 * @param {Event} event - the action which triggers addBook
 */
function whileAddBook(event) {
    event.preventDefault();
    addBook();
    bookToHTML(library.length - 1);
};

/**
 * Ensures the book is deleted from the library and the DOM.
 */
function whileDeleteBook() {
    deleteBook(Number(this.parentElement.getAttribute("data-id")));
    document.getElementById("book-display").removeChild(this.parentElement);
};

/**
 * Changes a book's read status in the library and the DOM.
 */
function whileMarkRead() {
    let readStatus = this.parentElement.querySelector(".read-status");
    readStatus.innerHTML = (readStatus.innerHTML == "Has been read") ? "Hasn't been read" : "Has been read";

    let index = findBook(this.parentElement.getAttribute("data-id"));
    library[index].changeIsRead();
};

/**
 * Adds an EventListener to the submit button of the submission form.
 */
document.getElementById("submit-button").addEventListener("click", whileAddBook, false);