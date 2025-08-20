const img = document.createElement('img');
const body = document.querySelector('body');

async function processData() {
  const url = `https://openlibrary.org/search.json?q=onyx-storm`;

  const response = await fetch(url);
  const data = await response.json();

  const coverId = data.docs[0].cover_i;
  img.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  img.style.width = '150px';
  body.appendChild(img); 
}

processData();