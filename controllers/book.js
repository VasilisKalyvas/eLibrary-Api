const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, description, writter, year, category, image } = req.body;

    const newBook = await prisma.book.create({
      data: {
        title,
        description,
        writter,
        year,
        category,
        image,
      },
    });

    res.json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific book by ID
const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const { title, description, writter, year, category, image } = req.body;

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        title,
        description,
        writter,
        year,
        category,
        image,
      },
    });

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    const deletedBook = await prisma.book.delete({
      where: { id: bookId },
    });

    res.json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
