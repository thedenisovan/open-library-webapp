import { processBook, processBookAuthor } from "../common/apiCall.js";

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
  ],
  kidBooks: [
    new Book('Where the Wild Things Are', 'Maurice Sendak'),
    new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling'),
    new Book('The Very Hungry Caterpillar', 'Eric Carle'),
    new Book('Charlotte\'s Web', 'E.B. White'),
    new Book('Matilda', 'Roald Dahl'),
    new Book('The Chronicles of Narnia', 'C.S. Lewis'),
    new Book('Winnie-the-Pooh', 'A.A. Milne'),
    new Book('The Cat in the Hat', 'Dr. Seuss'),
    new Book('The Tale of Peter Rabbit', 'Beatrix Potter'),
    new Book('Anne of Green Gables', 'L.M. Montgomery')
  ],
  educationalBooks: [
  new Book('The Four Agreements', 'Don Miguel Ruiz'),
  new Book('Educated', 'Tara Westover'),
  new Book('The Power of Habit', 'Charles Duhigg'),
  new Book('Outliers', 'Malcolm Gladwell'),
  new Book('The 48 Laws of Power', 'Robert Greene'),
  new Book('Thinking, Fast and Slow', 'Daniel Kahneman'),
  new Book('Atomic Habits', 'James Clear'),
  new Book('The Art of Learning', 'Josh Waitzkin'),
  new Book('Grit: The Power of Passion and Perseverance', 'Angela Duckworth'),
  new Book('Blink', 'Malcolm Gladwell')
],
  programmingBooks: [
    new Book('Clean Code', 'Robert C. Martin'),
    new Book('The Pragmatic Programmer', 'Andrew Hunt & David Thomas'),
    new Book('JavaScript: The Good Parts', 'Douglas Crockford'),
    new Book('You Don\'t Know JS', 'Kyle Simpson'),
    new Book('Design Patterns: Elements of Reusable Object-Oriented Software', 'Erich Gamma et al.'),
    new Book('The Clean Coder', 'Robert C. Martin'),
    new Book('Introduction to Algorithms', 'Thomas H. Cormen et al.'),
    new Book('The Algorithm Design Manual', 'Steven S. Skiena'),
    new Book('Head First Design Patterns', 'Eric Freeman & Elisabeth Robson'),
    new Book('Code Complete', 'Steve McConnell')
  ],
  horrorBooks: [
    new Book('The Shining', 'Stephen King'),
    new Book('It', 'Stephen King'),
    new Book('Dracula', 'Bram Stoker'),
    new Book('The Haunting of Hill House', 'Shirley Jackson'),
    new Book('Frankenstein', 'Mary Shelley'),
    new Book('Bird Box', 'Josh Malerman'),
    new Book('The Exorcist', 'William Peter Blatty'),
    new Book('House of Leaves', 'Mark Z. Danielewski'),
    new Book('World War Z', 'Max Brooks'),
    new Book('The Silence of the Lambs', 'Thomas Harris')
  ]
};
