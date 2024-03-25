'use strict'

let library = [];
let book1 = new Book("A Court of Thorns and Roses", "Sarah J. Maas", 300);
let book2 = new Book("Dogman Unleashed", "Dav Pilkey", 150);
library.push(book1);
library.push(book2);

/**
 * object constructor for a book object
 * 
 * @param {*} t - the title of the book
 * @param {*} a - the author of the book
 * @param {*} pn - the number of pages in the book
 * readStatus - whether or not the book has been read. By default this is false
 */
function Book(t, a, pn) {
    this.title = t;
    this.author = a;
    this.pageNum = pn;
    this.readStatus = false;
}

/**
 * Converts user input into a Book object
 * FIX LATER
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
 * FIX LATER
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
        for (let book of library) {
            let newEntry = document.createElement("p");
            document.getElementById("book-display").appendChild(newEntry);
            newEntry.className = "book-entry";

            if (book.readStatus == true) {
                newEntry.innerHTML = book.title + 
                " - " + book.author + 
                " - " + book.pageNum + 
                " - has been read";
            } else {
                newEntry.innerHTML = book.title + 
                " - " + book.author + 
                " - " + book.pageNum + 
                " - hasn't been read";
            }
        }
    }
}

displayBooks();