const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new author
async function createAuthor(req, res) {
  try {
    const { name } = req.body;
    console.log(name)
    const newAuthor = await prisma.author.create({
      data: {
        name,
      },
    });
    res.json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create many authors

async function createAuthors(req, res) {
  try {
    const { authors } = req.body; // Assuming req.body.authors is an array of author objects
    console.log(authors);

    const newAuthors = await prisma.author.createMany({
      data: authors,
    });

    res.json(newAuthors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all authors
async function getAllAuthors(req, res) {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get a single author by ID
async function getAuthorById(req, res) {
  try {
    const authorId = parseInt(req.params.id);
    const author = await prisma.author.findUnique({
      where: { id: authorId },
    });
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an author by ID
async function updateAuthor(req, res) {
  try {
    const authorId = parseInt(req.params.id);
    const { name } = req.body;
    const updatedAuthor = await prisma.author.update({
      where: { id: authorId },
      data: {
        name,
      },
    });
    res.json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete an author by ID
async function deleteAuthor(req, res) {
  try {
    const authorId = parseInt(req.params.id);
    await prisma.author.delete({
      where: { id: authorId },
    });
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  createAuthors
};
