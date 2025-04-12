import prisma from "../utils/prisma.js";
export const getCategories = async (req, res) => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          inspections: true, // Fetch related inspections as well
          issues: true, // Fetch related issues
        },
      });
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching categories', details: err.message });
    }
  };
  
  // Create a new category
  export const createCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }
  
      const newCategory = await prisma.category.create({
        data: {
          name,
        },
      });
  
      res.status(201).json(newCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating category', details: err.message });
    }
  };