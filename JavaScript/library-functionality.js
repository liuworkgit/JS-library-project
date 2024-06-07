'use strict'

let library = [];

/**
 * object constructor for a book object
 * 
 * @param {*} t - the title of the book
 * @param {*} a - the author of the book
 * @param {*} pn - the number of pages in the book
 * @field isRead - whether or not the book has been read. By default this is false
 */
function Book(t, a, pn) {
    this.title = t;
    this.author = a;
    this.pageNum = pn;
    this.isRead = false;
}

/**
 * Changes isRead to true if false and vice versa
 */
Book.prototype.changeIsRead = function () {
    this.isRead = !this.isRead;
}

// ******************************************************************************

/**
 * Converts user input into a Book object.
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
 * @requires library.length >= 0
 * @requires index in [0, library.length)
 */
function bookToHTML(index) {
    const book = library[index];

    let newEntry = document.createElement("div");
    newEntry.className = "book-entry";
    newEntry.setAttribute("data-indexnum", index);
    document.getElementById("book-display").appendChild(newEntry);

    addInfo(newEntry, book);
    addReadStatus(newEntry, book);
    addDeleteButton(newEntry);
    addMarkReadButton(newEntry);
};

/**
 * Adds a book's information to its display in the DOM.
 * @param {HTMLDivElement} entry
 * @param {Book} book
 */
function addInfo(entry, book) {
    let bookInfo = document.createElement("p");
    bookInfo.className = "book-entry-text";
    bookInfo.innerHTML = book.title + " - " + book.author + " - " + book.pageNum;
    entry.appendChild(bookInfo);
};

/**
 * Adds a book's read status to its display in the DOM.
 * @param {HTMLDivElement} entry
 * @param {Book} book
 */
function addReadStatus(entry, book) {
    let readStatus = document.createElement("p");
    readStatus.className = "read-status";
    readStatus.innerHTML = (book.isRead) ? "Has been read" : "Hasn't been read";
    entry.appendChild(readStatus);
};

/**
 * Adds a delete button to a book's display in the DOM.
 * @param {HTMLDivElement} entry
 */
function addDeleteButton(entry) {
    let button = document.createElement("button");

    button.type = "button";
    button.className = "delete-button";
    button.innerHTML = "Delete Book";

    button.addEventListener("click", function () {
        whileDeleteBook(this.parentElement);
    }, false);

    entry.appendChild(button);
};

/**
 * Adds a "mark as read" button to a book's display in the DOM.
 * @param {HTMLDivElement} entry
 */
function addMarkReadButton(entry) {
    let button = document.createElement("button");

    button.type = "button";
    button.className = "mark-read-button";
    button.innerHTML = "Mark as Read";

    button.addEventListener("click", markAsRead, false);

    entry.appendChild(button);
};

/**
 * Prevents the form from sending to the server so the book can be added to
 * the client instead.
 * @param {Event} event
 */
function whileAddBook(event) {
    event.preventDefault();
    addBook();
    bookToHTML(library.length - 1);
}

/**
 * Ensures the display is updated after a book's deletion.
 * @param {HTMLDivElement} toDelete
 */
function whileDeleteBook(toDelete) {
    const toDelId = Number(toDelete.getAttribute("data-indexnum"));
    deleteBook(toDelId);
    document.getElementById("book-display").removeChild(toDelete);
    updateDOM(toDelId);
};

/**
 * Updates the DOM's appearance after a book has been deleted.
 * @param {Number} toDelId
 */
function updateDOM(toDelId) {
    let bookList = document.getElementsByClassName("book-entry");
    for (let i = toDelId + 1; i < bookList.length - 1; i++) {
        bookList[i].setAttribute("data-indexnum", i + 1);
    };
};

/**
 * Deletes the book at index id from the library.
 * @requires 0 <= id < library.length
 */
function deleteBook(id) {
    library.splice(id, 1);
};

/**
 * Changes a book entry's read status.
 */
function markAsRead() {
    let readStatus = this.parentElement.querySelector(".read-status");
    let curr = this.parentElement.getAttribute("data-indexnum");

    readStatus.innerHTML = (readStatus.innerHTML == "Has been read") ? "Hasn't been read" : "Has been read";
    library[curr].changeIsRead();
};

/**
 * Adds event listener to submit button of new book form.
 */
document.getElementById("submit-button").addEventListener("click", whileAddBook, false);

showLibrary();