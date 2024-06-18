import React, { useState } from 'react';

function AddBook({ addBook }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addBook({ titulo, autor, genero, imagem });
    setTitulo('');
    setAutor('');
    setGenero('');
    setImagem('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Livro</h2>
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
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AddBook;

