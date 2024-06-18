const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Inicialização do banco de dados
db.serialize(() => {
  db.run("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, autor TEXT, genero TEXT, imagem TEXT)");
  const stmt = db.prepare("INSERT INTO books (titulo, autor, genero, imagem) VALUES (?, ?, ?, ?)");
  const books = [
    { titulo: "Meditações", autor: "Marco Aurélio", genero: "Filosofia", imagem: "https://m.media-amazon.com/images/I/41bQU67zLnL._SY445_SX342_.jpg" },
    { titulo: "Orgulho e Preconceito", autor: "Jane Austen", genero: "Romance", imagem: "https://m.media-amazon.com/images/I/51adYP1B4xL._SY445_SX342_.jpg" },
    { titulo: "Nada Pode Me Ferir", autor: "David Goggins", genero: "Autoajuda", imagem: "https://m.media-amazon.com/images/I/71wdbq8NbFL._SY385_.jpg" },
    { titulo: "O Homem Invisível", autor: "H.G. Wells", genero: "Ficção Científica", imagem: "https://m.media-amazon.com/images/I/513KteOV-vL._SY445_SX342_.jpg" },
    { titulo: "Utopia", autor: "Thomas More", genero: "Filosofia", imagem: "https://m.media-amazon.com/images/I/51Knq6OIwtL._SY445_SX342_.jpg" },
    { titulo: "A Revolução dos Bichos", autor: "George Orwell", genero: "Fábula Política", imagem: "https://m.media-amazon.com/images/I/61owA5ey3iL._SY445_SX342_.jpg" },
    { titulo: "As Crônicas de Nárnia", autor: "C.S. Lewis", genero: "Fantasia", imagem: "https://m.media-amazon.com/images/I/71yJLhQekBL._SY385_.jpg" },
    { titulo: "Cartas Chilenas", autor: "Tomás Antônio Gonzaga", genero: "Sátira", imagem: "https://m.media-amazon.com/images/I/81iehazLn7S._SY385_.jpg" },
    { titulo: "O Príncipe", autor: "Nicolau Maquiavel", genero: "Filosofia Política", imagem: "https://m.media-amazon.com/images/I/81E9scx1JBL._SY385_.jpg" },
    { titulo: "O Guia do Mochileiro das Galáxias", autor: "Douglas Adams", genero: "Ficção Científica", imagem: "https://m.media-amazon.com/images/I/41D2p1NDFkL._SY445_SX342_.jpg" }
  ];
  books.forEach(book => {
    stmt.run(book.titulo, book.autor, book.genero, book.imagem);
  });
  stmt.finalize();
});

// Listagem dos livros
app.get('/books', (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "books": rows
    });
  });
});

// Adição de um novo livro
app.post('/books', (req, res) => {
  const { titulo, autor, genero, imagem } = req.body;
  db.run(`INSERT INTO books (titulo, autor, genero, imagem) VALUES (?, ?, ?, ?)`, [titulo, autor, genero, imagem], function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "id": this.lastID
    });
  });
});

// Edição de um livro
app.put('/books/:id', (req, res) => {
  const { titulo, autor, genero, imagem } = req.body;
  db.run(`UPDATE books SET titulo = ?, autor = ?, genero = ?, imagem = ? WHERE id = ?`, [titulo, autor, genero, imagem, req.params.id], function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "changes": this.changes
    });
  });
});

// Remoção de um livro
app.delete('/books/:id', (req, res) => {
  db.run(`DELETE FROM books WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "changes": this.changes });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
