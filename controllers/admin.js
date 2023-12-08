const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    // Ensure that the requesting user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get all users
    const users = await prisma.user.findMany({
      include: {
        rents: {
          include: {
            book: {
              include: {
                author: true
              }
            }
          }
        }
      }
    });
    const usersWithoutPassword = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

    res.json(usersWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    // Ensure that the requesting user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const userId = parseInt(req.params.id);

    // Get the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userWithoutPassword = { ...user, password: undefined };

    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all rents
const buildRentQueryOptions = (queryParams) => {
  const {
    page = 1,
    pageSize = 10,
    userId,
    bookId,
    from,
    until,
    status,
    sortBy,
    sortOrder = 'asc',
  } = queryParams;

  const filters = {};

  if (userId) {
    filters.userId = parseInt(userId);
  }

  if (bookId) {
    filters.bookId = parseInt(bookId);
  }
  
  if (from && until) {
    filters.from = { gte: from };
    filters.until = { lte: until };
  }

  if (status) {
    filters.status = status;
  }

  const orderBy = sortBy ? { [sortBy]: sortOrder } : undefined;

  return {
    take: parseInt(pageSize),
    skip: (parseInt(page) - 1) * parseInt(pageSize),
    include: {
      book: {
        include: {
          author: true,
          categories: true,
        },
      },
      user: true,
    },
    where: filters,
    orderBy,
  };
};


const getAllRents = async (req, res) => {
  try {
    const queryOptions = buildRentQueryOptions(req.query);

    const totalCount = await prisma.rent.count({
      where: queryOptions.where,
    });

    const totalPages = Math.ceil(totalCount / queryOptions.take);

    const rentsWithDetails = await prisma.rent.findMany(queryOptions);

    const meta = {
      currentPage: parseInt(req.query.page || 1),
      totalPages,
      totalItems: totalCount,
    };

    res.json({ meta, data: rentsWithDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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



module.exports = { getAllUsers, getAllRents, getAllBooks, getUserById };
