const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new book
async function createBook(req, res) {
  try {
    const { title, description, authorId, year, categories, image } = req.body;
    
    const newBook = await prisma.book.create({
      data: {
        title,
        description,
        authorId,
        year,
        image,
      },
    });

    // Connect categories after book creation
    if (categories && categories.length > 0) {
      await prisma.book.update({
        where: { id: newBook.id },
        data: {
          categories: {
            connect: categories.map(categoryId => ({ id: categoryId })),
          },
        },
      });
    }

    res.json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create multiple books
async function createManyBooks(req, res) {
  try {
    const { books } = req.body;

    const newBooks = await Promise.all(
      books.map(async (book) => {
        const createdBook = await prisma.book.create({
          data: {
            title: book.title,
            description: book.description,
            authorId: book.authorId,
            year: book.year,
            image: book.image,
            categories: {
              create: book.categories.map(categoryId => ({
                Category: { connect: { id: categoryId } }
              }))
            }
          },
          include: {
            categories: true
          }
        });

        return createdBook;
      })
    );

    res.json(newBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get Recent added Books
const getRecentBooks = async (req, res) => {
  try {
    const latestBooks = await prisma.book.findMany({
      take: 15,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        categories: true
      },
    });

    res.json(latestBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all books
const buildBookQueryOptions = (queryParams) => {
  const {
    page = 1,
    pageSize = 10,
    authorId,
    CategoryId,
    search,
    sortBy,
    sortOrder = 'asc',
    isAvailable = 'true'
  } = queryParams;

  const filters = {};

  console.log(queryParams)
  if (typeof(authorId) === 'object') {
    authorId?.map((item) => (
      filters.authorId = parseInt(item)
    ))
  } else if(typeof(authorId) === 'string'){
    filters.authorId = parseInt(authorId)
  }

  if (CategoryId) {
    // Assuming a direct relationship between Book and Category
    filters.categories = { some: { categoryId: parseInt(CategoryId) } };
  }

  filters.isAvailable = isAvailable.toLowerCase() === 'true';

  if (search) {
    filters.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const orderBy = sortBy ? { [sortBy]: sortOrder } : undefined;

  return {
    take: parseInt(pageSize),
    skip: (parseInt(page) - 1) * parseInt(pageSize),
    include: {
      author: true,
      categories: {
        include:{
          Category: true
        }
      },
    },
    where: filters,
    orderBy,
  };
};

const getAllBooks = async (req, res) => {
  try {
    const queryOptions = buildBookQueryOptions(req.query);

    const totalCount = await prisma.book.count({
      where: queryOptions.where,
    });

    const totalPages = Math.ceil(totalCount / queryOptions.take);

    const books = await prisma.book.findMany(queryOptions);

    const meta = {
      currentPage: parseInt(req.query.page || 1),
      totalPages,
      totalItems: totalCount,
    };

    res.json({ meta, data: books });
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
      include: {
        author: true,
        categories: true
      },
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

const deleteAllBooks = async (req, res) => {
  try {
    await prisma.book.deleteMany();
    res.json({ message: 'All books deleted successfully' });
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
  getRecentBooks,
  createManyBooks,
  deleteAllBooks
};
