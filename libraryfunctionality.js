'use strict'

let library = [];
// let book4 = new Book("A Court of Thorns and Roses", "Sarah J. Maas", 300);
// let book5 = new Book("Dogman Unleashed", "Dav Pilkey", 150);
// book4.indexnum = 4;
// book5.readStatus = true;
// book5.indexnum = 5;
// library.push(book4);
// library.push(book5);

/**
 * object constructor for a book object
 * 
 * @param {*} t - the title of the book
 * @param {*} a - the author of the book
 * @param {*} pn - the number of pages in the book
 * readStatus - whether or not the book has been read. By default this is false
 * indexnum - the id number of the current book. By default this is 0
 */
function Book(t, a, pn) {
    this.title = t;
    this.author = a;
    this.pageNum = pn;
    this.readStatus = false;
    this.indexnum = 0;
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
 * Displays the book associated with the given index.
 * REQUIREMENTS:
 * - library.length > 0
 * - index is within range [0, library.length]
 */
function showBook(index) {
    const book = library[index];

    // create div container and the book info paragraph that fits in it
    let newEntry = document.createElement("div");
    let newEntryChild = document.createElement("p");

    if (book.readStatus == true) {
        newEntryChild.innerHTML = book.title + 
        " - " + book.author + 
        " - " + book.pageNum + 
        " - has been read";
    } else {
        newEntryChild.innerHTML = book.title + 
        " - " + book.author + 
        " - " + book.pageNum + 
        " - hasn't been read";
    }

    // attach p to div
    newEntry.appendChild(newEntryChild);
    newEntryChild.className = "book-entry-text";

    // attach div to document
    document.getElementById("book-display").appendChild(newEntry);
    newEntry.className = "book-entry";
    newEntry.setAttribute("data-indexnum", book.indexnum);
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
    delete library[id];
    if (library != []) {
        for (let i = id; i < library.length - 1; i++) {
            library[i] = library[i + 1];
        }
        library.length = library.length - 1;
    }
}

// get submit button from webpage form
// give it an event listener that calls add book to library
// use preventDefault to stop it from sending to server
// we will assume that all form fields are filled in before
// submission - implement later
document.getElementById("submit-button").addEventListener("click", beforeAddBook, false);

displayBooks();