'use strict'

let library = [];

/**
 * @class Book
 * 
 * represents a book.
 */
class Book {
    /**
     * Constructor for a Book.
     * 
     * @param {String} title - The title of the book.
     * @param {String} author - The author of the book.
     * @param {Number} numPage - The number of pages in the book.
     * @var {boolean} isRead - Whether the book has been read. By default this is false.
     * @var {Number} id - A unique id produced by Date.now() at the book's creation.
     * @param {String} coverLink - The filepath to the book's cover. By default this is the placeholder image.
     */
    constructor(title, author, numPage, coverLink) {
        this.title = title;
        this.author = author;
        this.numPage = numPage;
        this.isRead = false;
        this.id = Date.now();
        this.coverLink = coverLink;
    };

    /**
     * Changes isRead to true if false, and vice versa.
     */
    changeIsRead() {
        this.isRead = !this.isRead;
    };

    /**
     * Returns a book's info as a string.
     * @returns String
     */
    getInfo() {
        return `{ ${this.title}, ${this.author}, ${this.numPage}, ${this.isRead}, ${this.id} }`;
    };

    // Getters and Setters
    get title() {
        return this._title;
    };
    set title(newTitle) {
        this._title = newTitle;
    };

    get author() {
        return this._author;
    };
    set author(newAuthor) {
        this._author = newAuthor;
    };

    get numPage() {
        return this._numPage;
    };
    set numPage(newNumPage) {
        this._numPage = newNumPage;
    };

    get isRead() {
        return this._isRead;
    };
    set isRead(newIsRead) {
        this._isRead = newIsRead;
    };

    get id() {
        return this._id;
    };
    set id(newId) {
        this._id = newId;
    };

    get coverLink() {
        return this._coverLink;
    };
    set coverLink(newCover) {
        this._coverLink = newCover;
    };
};

// ******************************************************************************

/**
 * Converts submission form input into a Book object.
 * @returns Book
 */
function inputToBook() {
    const form = document.getElementById("submit-form");
    const formData = new FormData(form);

    let book = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("numPage")
    );
    console.log(`Successfully made new book ${book.getInfo()}.`);

    return book;
};

/**
 * Adds a book to the library.
 */
function addBook() {
    library.push(inputToBook());
    console.log(`Added book ${library[library.length - 1].getInfo()} to library.`);
};

/**
 * Deletes the book identified by id from the library.
 * @param {Number} id - the id of the book to delete.
 * @requires 0 <= id < library.length
 */
function deleteBook(id) {
    const deleted = library.splice(findBook(id), 1);
    console.log(`Removed book ${deleted[0].getInfo()} from library.`);
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
 * Converts a Book to an HTML object and adds it to the DOM.
 * @param {Number} index - index of the book to be converted.
 * @requires library.length > 0
 * @requires 0 <= index < library.length
 */
function bookToHTML(index) {
    const book = library[index];

    let newEntry = document.createElement("div");
    newEntry.className = "book-entry";
    newEntry.setAttribute("data-id", book.id);

    addInfo(newEntry, book);
    addReadStatus(newEntry, book);
    addDeleteButton(newEntry);
    addMarkReadButton(newEntry);

    document.getElementById("book-display").appendChild(newEntry);
    console.log(`Created new entry for book ${book.getInfo()}.`);
};

/**
 * Adds a book's information to its display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify
 * @param {Book} book - the book to get info from
 */
function addInfo(entry, book) {
    let bookInfo = document.createElement("p");
    bookInfo.className = "book-entry-text";
    bookInfo.innerHTML = book.title + " - " + book.author + " - " + book.numPage;
    entry.appendChild(bookInfo);
};

/**
 * Adds a book's read status to its display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify.
 * @param {Book} book - the book to get info from.
 */
function addReadStatus(entry, book) {
    let readStatus = document.createElement("p");
    readStatus.className = "read-status";
    readStatus.innerHTML = (book.isRead) ? "Has been read" : "Hasn't been read";
    entry.appendChild(readStatus);
};

/**
 * Adds a delete button to a book's display in the DOM.
 * @param {HTMLDivElement} entry - the book's display to modify.
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
 * @param {HTMLDivElement} entry - the book's display to modify.
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
 * @param {Event} event - the action which triggers addBook.
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