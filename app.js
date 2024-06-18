import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data.books));
  }, []);

  const addBook = book => {
    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(newBook => setBooks([...books, { ...book, id: newBook.id }]));
  };

  const updateBook = updatedBook => {
    fetch(`http://localhost:3001/books/${updatedBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })
      .then(() => {
        setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
        setEditingBook(null);
      });
  };

  const deleteBook = id => {
    fetch(`http://localhost:3001/books/${id}`, {
      method: 'DELETE'
    })
      .then(() => setBooks(books.filter(book => book.id !== id)));
  };

  return (
    <div className="App">
      <h1>Livraria</h1>
      {editingBook ? (
        <EditBook book={editingBook} updateBook={updateBook} />
      ) : (
        <AddBook addBook={addBook} />
      )}
      <BookList books={books} deleteBook={deleteBook} setEditingBook={setEditingBook} />
    </div>
  );
}

export default App;
