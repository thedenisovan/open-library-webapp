// Adds bind to main book collection of website
document
  .querySelector('#book-collection')
  .addEventListener('click', (event) => {
    const target = event.target;

    /* If click event happens on book cover set it's alt text
     (which is set to books title) to local storage */
    if (target.closest('.glide__slide')) {
      let slideTitle = target.closest('img')
        ? target.closest('img').alt
        : '';
      let slideKey = target.closest('img')
        ? target.closest('img').dataset.key
        : '';

      // If book have loaded and user clicks on cover send him to book search page
      if (slideKey) {
        localStorage.setItem('bookKey', slideKey);
        localStorage.setItem('targetBook', slideTitle);
        window.location = './search.html';
      }
    }
  });
