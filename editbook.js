import React, { useState } from 'react';

function EditBook({ book, updateBook }) {
  const [titulo, setTitulo] = useState(book.titulo);
  const [autor, setAutor] = useState(book.autor);
  const [genero, setGenero] = useState(book.genero);
  const [imagem, setImagem] = useState(book.imagem);

  const handleSubmit = e => {
    e.preventDefault();
    updateBook({ id: book.id, titulo, autor, genero, imagem });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Livro</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gênero"
        value={genero}
        onChange={e => setGenero(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL da Imagem"
        value={imagem}
        onChange={e => setImagem(e.target.value)}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}

export default EditBook;
