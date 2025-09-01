import * as cl from '../common/bookClass';
const loadingSvg = require('../../assets/loading-svgrepo-com.svg');

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

async function displayCovers(glideIdx, books) {
  displayRotationSvg(glideIdx);
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const slide = document.querySelector(
      `.glide${glideIdx} .glide__track .glide__slides #book${i} img`
    );
    const data = await getBookData(book.title, book.author);
    slide.classList.add('book-cover');
    slide.classList.remove('rotate');
    if (!data) return null;

    slide.setAttribute('data-key', data.key);
    slide.setAttribute('src', data.cover);
    slide.setAttribute('alt', book.title);
    slide.setAttribute('tabindex', '0');
  }
}

function displayRotationSvg(glideIdx) {
  document
    .querySelectorAll(
      `.glide${glideIdx} .glide__track .glide__slides .glide__slide img`
    )
    .forEach((cover) => {
      cover.setAttribute('src', loadingSvg);
      cover.classList.add('rotate');
    });
}

// Renders book shelf with position for 10 books
for (let i = 2; i < 7; i++) {
  makeBookShelf(10, `.glide${i} .glide__track .glide__slides`)
}

async function getBookData(title, author) {
  try {
    const book = new cl.Book(title, author);
    const data = await book.getBookData();
    return data;
  }
  catch(err) {
    return null;
  }
}

displayCovers(2, cl.bookLibrary.trendingBooks);
displayCovers(3, cl.bookLibrary.classicBooks);
displayCovers(4, cl.bookLibrary.educationalBooks);
displayCovers(5, cl.bookLibrary.kidBooks);
displayCovers(6, cl.bookLibrary.horrorBooks);
