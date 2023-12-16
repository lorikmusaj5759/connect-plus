/* 
   Filename: complex_code.js
   Description: This code is a complex and sophisticated implementation of a web application for managing a library system.
*/

// Global Variables
let libraryData = []; // stores all the books in the library
let borrowHistory = []; // stores the borrowing history of books
let currentUser = null; // stores the currently logged in user

// Utility Functions
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function generateRandomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Book Class
class Book {
  constructor(title, author, genre, pubDate) {
    this.id = generateRandomId();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pubDate = pubDate;
    this.available = true;
  }

  borrowBook(user) {
    if (this.available) {
      this.available = false;
      borrowHistory.push({
        bookId: this.id,
        userId: user.id,
        borrowedDate: new Date(),
        returnedDate: null
      });
      console.log(`Book "${this.title}" successfully borrowed by ${user.name}`);
    } else {
      console.log(`Book "${this.title}" is currently unavailable`);
    }
  }

  returnBook() {
    if (!this.available) {
      this.available = true;
      const borrowEntry = borrowHistory.find(entry => entry.bookId === this.id && entry.returnedDate === null);
      if (borrowEntry) {
        borrowEntry.returnedDate = new Date();
        console.log(`Book "${this.title}" successfully returned`);
      }
    } else {
      console.log(`Book "${this.title}" is already marked as available`);
    }
  }
}

// User Class
class User {
  constructor(name, email) {
    this.id = generateRandomId();
    this.name = name;
    this.email = email;
  }

  listBorrowedBooks() {
    const borrowedBooks = borrowHistory.filter(entry => entry.userId === this.id && entry.returnedDate === null);
    console.log(`Borrowed Books for User "${this.name}":`);
    borrowedBooks.forEach(entry => {
      const book = libraryData.find(book => book.id === entry.bookId);
      console.log(`- ${book.title} (Borrowed on ${formatDate(entry.borrowedDate)})`);
    });
  }
}

// Initialize the Library
function initializeLibrary() {
  const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Classic", new Date(1925, 4, 10));
  const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "Novel", new Date(1960, 6, 11));
  const book3 = new Book("1984", "George Orwell", "Dystopian", new Date(1949, 5, 8));

  libraryData.push(book1);
  libraryData.push(book2);
  libraryData.push(book3);

  console.log("Library Initialized!");
}

// Sample User Interactions
function sampleInteractions() {
  currentUser = new User("John Doe", "john.doe@example.com");

  libraryData[0].borrowBook(currentUser);
  libraryData[1].borrowBook(currentUser);
  libraryData[2].borrowBook(currentUser);

  currentUser.listBorrowedBooks();

  libraryData[1].returnBook();
}

// Run the Sample Interactions
initializeLibrary();
sampleInteractions();
