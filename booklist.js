import React from 'react';

function BookList({ books, deleteBook, setEditingBook }) {
  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <img src={book.imagem} alt={book.titulo} style={{width: '50px', height: '75px'}}/>
            <p>{book.titulo}</p>
            <p>{book.autor}</p>
            <p>{book.genero}</p>
            <button onClick={() => setEditingBook(book)}>Editar</button>
            <button onClick={() => deleteBook(book.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
