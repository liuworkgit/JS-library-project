'use strict'

let library = [];

/**
 * object constructor for a book object
 * 
 * @param {*} title - the title of the book
 * @param {*} author - the author of the book
 * @param {*} pageNum - the number of pages in the book
 * readStatus - whether or not the book has been read. By default this is false
 */
function Book(title, author, pageNum) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.readStatus = false;
}

/**
 * Converts user input into a Book object
 */
function inputToObject() {
    const form = document.getElementById("submit-form");
    const formData = new FormData(form);

    let book = new Book(
        formData[title], 
        formData[author],
        formData[pageNum]
    );

    return book;
}

/**
 * Adds a book to the library
 */
function addBookToLibrary() {
    library.push(inputToObject());
}

/**
 * loops through the testLibrary array and displays
 * its contents on the webpage
 */
function displayBooks() {
    if (testLibrary != []) {
        for (let book in testLibrary) {
            let newEntry = document.createElement("div");
            newEntry.className = "book-entry";

            newEntry.getElementsByClassName("book-title") = book.title;
            newEntry.getElementsByClassName("book-author") = book.author;
            newEntry.getElementsByClassName("book-num-pages") = "Number of pages:" 
            + (book.pageNum).toString();

            document.getElementById("book-display").appendChild(newEntry);
        }
    }
}

// temporary library for testing purposes
let testLibrary = [];
book1 = new Book("A Court of Thorns and Roses", "Sarah J. Maas", 300);
book2 = new Book("Dogman Unleashed", "Dav Pilkey", 150);
testLibrary.push(book1);
testLibrary.push(book2);

// TEST BUTTON
let button = document.getElementById("testbutton");
button.addEventListener("click", function () {
    displayBooks();
    console.log("button pressed!");
}, false);

module.exports = { addBookToLibrary }