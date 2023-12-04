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
const getAllRents = async (req, res) => {
  try {
    const rentsWithDetails = await prisma.rent.findMany({
      include: {
        book: {
          include: {
            author: true, // Include author details if needed
            categories: true, // Include categories details if needed
          },
        },
        user: true, // Include user details
      },
    });

    res.json(rentsWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUsers, getAllRents, getUserById };
