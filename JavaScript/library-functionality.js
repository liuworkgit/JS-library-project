'use strict'

let library = [];
let book1 = new Book("Shadow of the Gods", "John Gwynne", 500);
let book2 = new Book("Sun and Moon", "Bran Underwood", 1029);
let book3 = new Book("Placeholder", "Placeholder", 123);
let book4 = new Book("Placeholder", "Placeholder", 123);
let book5 = new Book("Placeholder", "Placeholder", 123);
book2.indexnum = 1;
book3.indexnum = 2;
book4.indexnum = 3;
book5.indexnum = 4;
library.push(book1, book2, book3, book4, book5);

/**
 * object constructor for a book object
 * 
 * @param {*} t - the title of the book
 * @param {*} a - the author of the book
 * @param {*} pn - the number of pages in the book
 * @field readStatus - whether or not the book has been read. By default this is false
 * @field indexnum - the id number of the current book. By default this is 0
 */
function Book(t, a, pn) {
    this.title = t;
    this.author = a;
    this.pageNum = pn;
    this.readStatus = false;
    this.indexnum = 0;
}

/**
 * Defines an id number getter for the Book prototype
 * Returns the book's id number.
 */
Book.prototype.getIndexNum = function() {
    return this.indexnum;
}

/**
 * Converts user input into a Book object
 */
function inputToObject() {
    const form = document.getElementById("submit-form");
    const formData = new FormData(form);
    console.log(formData);

    let book = new Book(formData.get("title"), formData.get("author"), formData.get("pageNum"));
    book.indexnum = library.length;
    return book;
}

/**
 * Adds a book to the library
 */
function addBookToLibrary() {
    library.push(inputToObject());
}

/**
 * loops through the library array and displays
 * its contents on the webpage
 */
function displayBooks() {
    if (library != []) {
        for (let i = 0; i < library.length; i++) {
            showBook(i);
        }
    }
}

/**
 * Displays the book associated with the given index by converting
 * the JS object into an HTML element and adding it to the DOM.
 * REQUIREMENTS:
 * - library.length > 0
 * - index is within range [0, library.length]
 */
function showBook(index) {
    const book = library[index];

    // create div container and the book info paragraph that fits in it
    let newEntry = document.createElement("div");
    let newEntryDesc = document.createElement("p");
    let newDeleteButton = document.createElement("button");

    if (book.readStatus == true) {
        newEntryDesc.innerHTML = book.title + 
        " - " + book.author + 
        " - " + book.pageNum + 
        " - has been read";
    } else {
        newEntryDesc.innerHTML = book.title + 
        " - " + book.author + 
        " - " + book.pageNum + 
        " - hasn't been read";
    }

    // attach p to div
    newEntry.appendChild(newEntryDesc);
    newEntryDesc.className = "book-entry-text";

    // attach div to document
    document.getElementById("book-display").appendChild(newEntry);
    newEntry.className = "book-entry";
    newEntry.setAttribute("data-indexnum", book.indexnum);

    // attach delete button to div
    newEntry.appendChild(newDeleteButton);
    newDeleteButton.type = "button";
    newDeleteButton.className = "delete-button";
    newDeleteButton.innerHTML = "Delete Book";
    newDeleteButton.addEventListener("click", function () {
        deleteBook(this.parentElement.getAttribute("data-indexnum"));
        document.getElementById("book-display").removeChild(this.parentElement);
    }, false);    
}

/**
 * prevents the submission form from sending to a server
 * when a new book is submitted. This is because there is 
 * no server currently.
 */
function beforeAddBook(event) {
    event.preventDefault();
    addBookToLibrary();
    // not sure how to implement refreshing
    // the library display each time a book is added.
    // makes most sense to just call displayBooks again
    showBook(library.length - 1);
}

/**
 * Deletes the book associated with the given id number from
 * the library.
 * Requires: 0 <= id < library.length
 */
function deleteBook(id) {
    library.splice(id, 1);
}

// /**
//  * Gives deleteBook access to the associated book's id
//  * so it can delete it.
//  * Requires: 0 <= id < library.length
//  */
// function beforeDeleteBook() {
//     deleteBook();
// }

/**
 * get submit button from webpage form
 * give it an event listener that calls add book to library
 * use preventDefault to stop it from sending to server
 * we will assume that all form fields are filled in before
 * submission - implement later
 */
document.getElementById("submit-button").addEventListener("click", beforeAddBook, false);

displayBooks();