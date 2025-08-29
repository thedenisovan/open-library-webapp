import { processBook, processBookAuthor } from "./apiCall.js";

const backupCover = require('../../assets/book-not-found.png');

export class Book {
  // Validates either user have input have at least author or title and return appropriate data
  async #bookDataValidation() {
    let data;
    if (!this.title && !this.author) return null;
    else if (!this.title) data = await processBookAuthor(this.author); 
    else data = await processBook(this.title, this.author);

    if(!data) return null;
    return data;
  }

  // Returns cover id of book user wants to find
  async #getCoverId() {
    const data = await this.#bookDataValidation(this.title, this.author);
    if (!data) return null;
  
    return data[0]?.cover_edition_key || null;
  }

  constructor(title, author = '') {
    this.title = title;
    this.author = author;
  }

  async getCoverUrl() {
    const coverId = await this.#getCoverId();
    return coverId ? `https://covers.openlibrary.org/b/olid/${coverId}-M.jpg` : backupCover;
  }
}

export const bookLibrary = {
  trendingBooks: [
    new Book('The Midnight Library', 'Matt Haig'),
    new Book('Project Hail Mary', 'Andy Weir'),
    new Book('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid'),
    new Book('It Ends with Us', 'Colleen Hoover'),
    new Book('Dune', 'Frank Herbert'),
    new Book('Klara and the Sun', 'Kazuo Ishiguro'),
    new Book('Atomic Habits', 'James Clear'),
    new Book('Where the Crawdads Sing', 'Delia Owens'),
    new Book('The Song of Achilles', 'Madeline Miller'),
    new Book('The Invisible Life of Addie LaRue', 'V.E. Schwab')
  ],
  classicBooks: [
    new Book('Pride and Prejudice', 'Jane Austen'),
    new Book('Moby-Dick', 'Herman Melville'),
    new Book('Great Expectations', 'Charles Dickens'),
    new Book('To Kill a Mockingbird', 'Harper Lee'),
    new Book('1984', 'George Orwell'),
    new Book('The Great Gatsby', 'F. Scott Fitzgerald'),
    new Book('Jane Eyre', 'Charlotte Brontë'),
    new Book('Wuthering Heights', 'Emily Brontë'),
    new Book('Crime and Punishment', 'Fyodor Dostoevsky'),
    new Book('The Catcher in the Rye', 'J.D. Salinger')
  ]
}