const els = {
  cover: document.querySelector('[data-cover]'),
  title: document.querySelector('[data-title]'),
  author: document.querySelector('[data-author]'),
  description: document.querySelector('[data-desc'),
}

export function renderSearchedBook(book) {
  els.cover.src = book.cover;
  els.title.textContent = book.title;
  els.author.innerHTML = 'by ' + book.name + ` <span style="color:black;">(${book.publishYear})</span>`;
}

export function hideBookData() {
  els.cover.removeAttribute('src');
  els.title.textContent = ''
  els.author.textContent = '';
}

export function showLoadingSvg(el) {
  el.classList.remove('hidden');
}

export function hideLoadingSvg(el) {
  el.classList.add('hidden');
}

export function redirectUserToOpenLibrary(book) {
  window.location.href = `https://openlibrary.org/books/${book.key}`;
}

export function errorMessage(errContainer, title = '', author = '') {
  errContainer.textContent = `Could not find ${title} ${author}`;
}