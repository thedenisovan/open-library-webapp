import { processBook, processBookAuthor } from './apiCall.js';

// Makes html containers for each book
export function makeBookShelf(shelfLength, bookShelf) {
  if (!shelfLength || !bookShelf) return null;

  // Parent element of whole book genre
  const shelf = document.querySelector(bookShelf);

  for (let i = 0; i < shelfLength; i++) {
    let book = document.createElement('li');
    let cover = document.createElement('img');
    book.classList.add('glide__slide');
    book.classList.add(`trending-book-${i}`);

    book.appendChild(cover);
    shelf.appendChild(book);
  }
}

export async function displayBookCover(bookTitle, authorName = '', bookIdx) {
  const data = await bookDataValidation(bookTitle, authorName);
  const bookCover = data[0].cover_edition_key;
  const book = document.querySelector(
    `.glide2 .glide__track .glide__slides .trending-book-${bookIdx}`
  );
  const cover = book.children[0];

  cover.src = `https://covers.openlibrary.org/b/olid/${bookCover}-M.jpg`;
}

// TODO: finish function to fill book data after user clicks on cover and wants to see more info about it
export async function fillBookData(bookTitle, authorName = '', bookIdx) {
  const data = await bookDataValidation(bookTitle, authorName);
  const book = document.querySelector(
    `.glide2 .glide__track .glide__slides .trending-book-${bookIdx}`
  );
  const cover = book.children[0];
}

// Validates user input and return correct format book data based on it
async function bookDataValidation(bookTitle, authorName = '') {
  let data;
  if (!bookTitle && !authorName) return null;
  else if (!bookTitle) data = await processBookAuthor(authorName); 
  else data = await processBook(bookTitle, authorName);

  return data;
}
