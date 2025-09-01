import * as cl from '../common/bookClass.js';
import * as dom from './searchDom.js';

const els = {
  title: document.querySelector('[data-title-inp]'),
  author: document.querySelector('[data-author-inp]'),
  errCont: document.querySelector('[data-search-err]'),
  loadingSvg: document.querySelector('[data-loader]'),
};

// Function that converts user input to new book
export async function getBookData(title, author) {
  try {
      const book = new cl.Book(title, author);
      const data = await book.getBookData();
      return data;
    }
    catch(err) {
      return null;
    }
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
      dom.showLoadingSvg(els.loadingSvg);

      // Book boj instances values
      let data = await getBookData(els.title.value, els.author.value);
      if (!data) {
        dom.hideLoadingSvg(els.loadingSvg);
        return null;
      };

      // Adds screen information from book obj details
      try {
        dom.renderSearchedBook(data);

        // Key used to redirect user to open library website
        localStorage.setItem('bookKey', data.key);
      } catch {
        dom.errorMessage(els.errCont, els.title.value, els.author.value);
      }

      dom.hideLoadingSvg(els.loadingSvg);
      els.title.value = '';
      els.author.value = '';
    }
    // Re directs user to open library page of given book
    if (target.closest('[data-cover]')) {
      let urlLocation = localStorage.getItem('bookKey');
      window.open(`https://openlibrary.org/${urlLocation}`, 'openLibrary');
    }
  });
}

// Function which renders book details on screen if user clicks on cover on main page
async function renderBookOnLoad() {
  const bookTitle = localStorage.getItem('targetBook');

  if (bookTitle !== '') {
    const book = new cl.Book(bookTitle);
    if (!book) return null;

    dom.showLoadingSvg(els.loadingSvg);
    let bookData = await book.getBookData();
    dom.renderSearchedBook(bookData);
  }

  dom.hideLoadingSvg(els.loadingSvg);
  localStorage.setItem('targetBook', '');
}

renderBookOnLoad();
bindSearch();
