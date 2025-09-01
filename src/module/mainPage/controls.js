// Adds bind to main book collection of website
document.querySelector("#book-collection")
  .addEventListener("click", (event) => {
    const target = event.target;

    /* If click event happens on book cover set it's alt text
     (which is set to books title) to local storage */
    if (target.closest('.glide__slide')) {
      let slideTitle = target.closest('img').alt ? target.closest('img').alt : '';
      localStorage.setItem('targetBook', slideTitle);

      window.location = './search.html';
    }
  })
