import { bookLibrary } from '../common/bookClass';
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
    const slide = document.querySelector(`.glide${glideIdx} .glide__track .glide__slides #book${i} img`);
    const url = await book.getCoverUrl();
    
    slide.classList.remove('rotate');
    slide.setAttribute('src', url);
    slide.setAttribute('alt', book.title);
    slide.setAttribute('tabindex', '0');
  }
}

function displayRotationSvg(glideIdx) {
  document.querySelectorAll(`.glide${glideIdx} .glide__track .glide__slides .glide__slide img`)
    .forEach((cover) => {
      cover.setAttribute('src', loadingSvg);
      cover.classList.add('rotate');
    });
}

makeBookShelf(10, '.glide2 .glide__track .glide__slides');
makeBookShelf(10, '.glide3 .glide__track .glide__slides');
makeBookShelf(10, '.glide4 .glide__track .glide__slides');
makeBookShelf(10, '.glide5 .glide__track .glide__slides');
makeBookShelf(10, '.glide6 .glide__track .glide__slides');

displayCovers(2, bookLibrary.trendingBooks);
displayCovers(3, bookLibrary.classicBooks);
displayCovers(4, bookLibrary.educationalBooks);
displayCovers(5, bookLibrary.kidBooks);
displayCovers(6, bookLibrary.horrorBooks);