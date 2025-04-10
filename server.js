// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const books = [
  {
    bookId: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    publisher: "Prentice Hall",
    publishedYear: 2008,
    genre: "Programming",
    copiesAvailable: 5
  },
  {
    bookId: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780201616224",
    publisher: "Addison-Wesley",
    publishedYear: 1999,
    genre: "Programming",
    copiesAvailable: 3
  }
];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
