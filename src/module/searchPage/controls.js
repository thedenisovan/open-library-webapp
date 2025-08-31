import * as cl from '../common/bookClass.js';
import * as dom from './searchDom.js';

const els = {
  title: document.querySelector('[data-title-inp]'),
  author: document.querySelector('[data-author-inp]'),
  errCont: document.querySelector('[data-search-err]'),
  loadingSvg: document.querySelector('[data-loader]')
}

// Function that converts user input to new book
export function bookFromUserInput() {
  const title = els.title.value;
  const author = els.author.value;

  if (!title && !author) return null;

  return new cl.Book(title, author);
}

// Binds event listener on main search section
async function bindSearch() {
  const main = document.querySelector('#search');

  main.addEventListener('click', async (event) => {
    const target = event.target;

    // Triggers book search event
    if (target.closest('[data-search]')) {
      if (!els.title.value && !els.author.value) return;
      // Hides previous search
      dom.hideBookData();
      els.errCont.textContent = '';
      
      let book = bookFromUserInput();
      if (!book) return null;
      dom.showLoadingSvg(els.loadingSvg);

      try {
        let bookData = await book.getBookData();
        dom.renderSearchedBook(bookData); 
        
        localStorage.setItem('bookKey', bookData.key);
      }
      catch {
        dom.errorMessage(els.errCont, els.title.value, els.author.value);
      }
      
      dom.hideLoadingSvg(els.loadingSvg);
      els.title.value = '';
      els.author.value = '';
    }
    if (target.closest('[data-cover]')) {
      let urlLocation = localStorage.getItem('bookKey');
      window.open(`https://openlibrary.org/${urlLocation}`, "openLibrary");
    }
  });
}

bindSearch();