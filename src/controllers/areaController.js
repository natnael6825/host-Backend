import prisma from '../utils/prisma.js'; // assuming you already have prisma client set up

// Fetch all areas
export const getAreas = async (req, res) => {
  try {
    const areas = await prisma.area.findMany({
      include: {
        inspections: true, // Fetch related inspections
        issues: true, // Fetch related issues
      },
    });
    res.status(200).json(areas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching areas', details: err.message });
  }
};

// Create a new area
export const createArea = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Area name is required' });
    }

    const newArea = await prisma.area.create({
      data: {
        name,
      },
    });

    res.status(201).json(newArea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating area', details: err.message });
  }
};
