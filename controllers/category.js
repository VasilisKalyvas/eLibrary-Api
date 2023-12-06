const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new category
async function createCategory(req, res) {
  try {
    const { key, title } = req.body;
    const newCategory = await prisma.category.create({
      data: {
        key,
        title,
      },
    });
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create many categories
async function createCategories(req, res) {
  try {
    const { categories } = req.body; // Assuming req.body.authors is an array of author objects
    
    const newCategories = await prisma.category.createMany({
      data: categories,
    });

    res.json(newCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get a single category by ID
async function getCategoryById(req, res) {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a category by ID
async function updateCategory(req, res) {
  try {
    const categoryId = parseInt(req.params.id);
    const { key, title, bookId } = req.body;
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        key,
        title,
        bookId,
      },
    });
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a category by ID
async function deleteCategory(req, res) {
  try {
    const categoryId = parseInt(req.params.id);
    await prisma.category.delete({
      where: { id: categoryId },
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategories
};