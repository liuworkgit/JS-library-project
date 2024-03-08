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