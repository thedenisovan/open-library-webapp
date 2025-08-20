export async function processData(bookTitle, author) {
  const titleStr = editString(bookTitle);
  const authorStr = editString(author);

  const url = `https://openlibrary.org/search.json?q=${titleStr}&author=${authorStr}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}

processData('harry potter and the deathly hallows', 'J.K');

// Returns acceptable string value for book search input
function editString(str) {
  return str.split(' ').join('').split('').join('+');
}