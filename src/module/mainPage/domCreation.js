import { bookLibrary } from './bookClass.js';

// TODO: refactor function to create full html glide not just part of it
// Makes html containers for each book
export function makeBookShelf(shelfLength, bookShelf) {
  if (!shelfLength || !bookShelf) return null;

  // Parent element of whole book genre
  const shelf = document.querySelector(bookShelf);

  for (let i = 0; i < shelfLength; i++) {
    let book = document.createElement('li');
    let cover = document.createElement('img');
    book.classList.add('glide__slide');
    book.id = `book${i}`;

    book.appendChild(cover);
    shelf.appendChild(book);
  }
}
makeBookShelf(10, '.glide2 .glide__track .glide__slides');
makeBookShelf(10, '.glide3 .glide__track .glide__slides');

async function displayCovers(glideIdx, books) {
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const url = await book.getCoverUrl();
    const slide = document.querySelector(`.glide${glideIdx} .glide__track .glide__slides #book${i} img`);
    slide.setAttribute('src', url);
  }
}

displayCovers(2, bookLibrary.trendingBooks);
displayCovers(3, bookLibrary.classicBooks);