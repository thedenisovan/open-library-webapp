const desiredFields = '&fields=author_name,cover_i,ebook_access,first_publish_year,title';

// Function which will get api data if author and title is provided or if only title is provided
export async function processBook(bookTitle, authorName) {
  // If author name is not provided it is set to empty string
  !authorName ? authorName = '' : authorName = `&author=${authorName}`;

  try {
    const url = `https://openlibrary.org/search.json?&lang=en&title=${bookTitle}${authorName}&sort=old${desiredFields}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.docs);

    return data.docs;
  }
  catch {

  }
}

// Function which will get api data if only author is provided
export async function processBookAuthor(authorName) {
  try {
    const url = `https://openlibrary.org/search.json?&lang=en&title=author=${authorName}&sort=old${desiredFields}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.docs;
  }
  catch {
    
  }
}

processBook('Blood of elves');