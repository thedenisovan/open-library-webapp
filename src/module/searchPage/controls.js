import * as cl from '../common/bookClass.js';

const els = {
  title: document.querySelector('[data-title-inp]'),
  author: document.querySelector('[data-author-inp]'),
}

// Function that converts user input to new book
export function convertInputToBook() {
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

    if (target.closest('[data-search]')) {
      let data = convertInputToBook();
      if (!data) return null;

      let bookData = await data.getBookData();    
    }
  });
}

bindSearch();


