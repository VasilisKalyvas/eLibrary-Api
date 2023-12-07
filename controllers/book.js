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
  } = queryParams;

  const filters = {};

  if (authorId) {
    if (Array.isArray(authorId)) {
      filters.authorId = { in: authorId.map((id) => parseInt(id)) };
    } else if (typeof authorId === 'string') {
      filters.authorId = parseInt(authorId);
    }
  }
  
  if (CategoryId) {
    // Assuming a direct relationship between Book and Category
    filters.categories = { some: { categoryId: parseInt(CategoryId) } };
  }

  if (search) {
    filters.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { author: { name: { contains: search } } },
    ];
  }

  const orderBy = sortBy ? { [sortBy]: sortOrder } : undefined;

  const take = pageSize === '0' ? undefined : parseInt(pageSize);

  return {
    take,
    skip: take ? (parseInt(page) - 1) * take : undefined,
    include: {
      author: true,
      categories: {
        include: {
          Category: true,
        },
      },
      rents: {
        include: {
          user: true,
        },
      },
      rendedBy: true,
      activeRent: {
        include: {
          user: true,
        },
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

    const totalPages = Math.ceil(totalCount / (queryOptions.take || 1));

    const books = await prisma.book.findMany(queryOptions);

    const meta = 
      req.query.pageSize === '0' 
      ? 
        undefined
      :
        {
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
        categories: true,
        rents: {
          include: {
            user: true
          }
        },
        rendedBy:true,
        activeRent: {
          include: {
            user: true
          }
        }
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

const rentBook = async (req, res) => {
  try {
    const { userId, bookId, from, until } = req.body;
    if (!from || !until) {
      return res.status(400).json({ error: 'Missing from or until' });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        rents: {
          include: {
            book: true,
          },
          orderBy: { createdAt: 'desc' }, // Order rents by creation date in descending order
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User does not exist!' });
    }

    const book = await prisma.book.findUnique({
      where: { id: parseInt(bookId) },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if the most recent rent for the book is in "returned" status
    const mostRecentRent = user.rents[0];

    if (mostRecentRent && mostRecentRent.bookId === book.id && mostRecentRent.status === 'returned') {
      // The book was previously rented and returned, but we allow re-renting
      console.log('Book can be rented again');
    } else if (!book.isAvailable) {
      console.log('Book is currently not available for rent');
      return res.status(404).json({ error: 'Book is not available for rent' });
    }

    // Create a new rent
    const rent = await prisma.rent.create({
      data: {
        userId: parseInt(userId),
        bookId: parseInt(bookId),
        from,
        until,
        status: 'rent',
      },
    });

    // Update book availability and association with the new rent
    await prisma.book.update({
      where: { id: parseInt(bookId) },
      data: {
        isAvailable: false,
        rentedById: parseInt(userId),
        activeRentId: rent.id,
      },
    });

    res.json({ data: rent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User does not exist!' });
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: parseInt(bookId) },
      include: {
        activeRent: true
      }
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if the book is rented by the user
    if (book.rentedById !== parseInt(userId)) {
      return res.status(404).json({ error: 'Book not rented by user' });
    };

    const activeRentId = book.activeRentId

    if (!activeRentId) {
      return res.status(404).json({ error: 'No active rent found for the user and book' });
    }

    // Update the rent record status to indicate the book has been returned
    const updatedRent = await prisma.rent.update({
      where: { id: activeRentId },
      data: { status: 'returned', }, // Update this based on your actual status
    });

    // Update the book to make it available again
    await prisma.book.update({
      where: { id: parseInt(bookId) },
      data: {
        isAvailable: true,
        rentedById: null,
        activeRentId: null,
      },
    });

    res.json({ data: updatedRent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRent = async (req, res) => {
  const rentId = parseInt(req.params.id);

  try {
    // Use Prisma to delete the rent by ID
    const deletedRent = await prisma.rent.delete({
      where: {
        id: rentId,
      },
    });

    await prisma.book.update({
      where: {
        id: deletedRent?.bookId
      },
      data: {
        isAvailable: true,
        activeRentId: null
      }
    })
    // Send a success response
    res.json({ message: 'Rent deleted successfully', deletedRent });
  } catch (error) {
    // Handle errors
    console.error('Error deleting rent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateRentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(404).json({ error: 'Id of Rent missing!' });
    }
    // Check if user exists
    const rent = await prisma.rent.findUnique({
      where: { id: parseInt(id) },
    });

    if (!rent) {
      return res.status(404).json({ error: 'Rent does not exist!' });
    }

    if(rent?.status === 'rent') {
      await prisma.rent.update({
        where: { id: parseInt(id) },
        data: { status: 'returned', },
      });

      await prisma.book.update({
        where: { id: parseInt(rent?.activeBookId) },
        data: {
          isAvailable: true,
          rentedById: null,
          activeRentId: null,
        },
      });

      res.json({ message: `Status of Rent: ${id} updated to Returned` });
    } else {

      await prisma.rent.update({
        where: { id: parseInt(id) },
        data: { 
          status: 'rent', 
          activeBookId: rent?.bookId
        }, // Update this based on your actual status
      });

      await prisma.book.update({
        where: { id: parseInt(rent?.bookId) },
        data: {
          isAvailable: false,
          rentedById: parseInt(rent?.userId),
          activeRentId: parseInt(rent?.id),
        },
      });

      res.json({ message: `Status of Rent: ${id} updated to Rent` });
    }
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
  deleteAllBooks,
  rentBook,
  returnBook,
  deleteRent,
  updateRentStatus
};
