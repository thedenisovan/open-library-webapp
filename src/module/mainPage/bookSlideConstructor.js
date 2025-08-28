// Makes html containers for each book
export function makeBookShelf(shelfLength, bookShelf) {
  if (!shelfLength || !bookShelf) return null;

  // Parent element of whole book genre
  const shelf = document.querySelector(bookShelf);

  for (let i = 0; i < shelfLength; i++) {
    let book = document.createElement('li');
    book.classList.add('glide__slide');
    book.classList.add('trending-book');

    bookInfo = {
      cover: document.createElement('img'),
      bookTitle: document.createElement('h3'),
      author: document.createElement('h4'),
      bookDescription: document.createElement('p')
    };
    
    for (let key of Object.values(bookInfo)) {
      book.appendChild(key);
    }
    shelf.appendChild(book);
  }
}

// TODO: Make function to fill each book with data from api call