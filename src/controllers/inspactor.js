import prisma from "../utils/prisma.js";
export const getInspections = async (req, res) => {
  try {
    const inspections = await prisma.inspection.findMany({
      include: {
        inspector: true,
        category: true,
        area: true,
        assignedBy: true,
        responses: true,
        issues: true,
      },
    });
    res.status(200).json(inspections);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error fetching inspections", details: err.message });
  }
};

// Create a new inspection
export const createInspection = async (req, res) => {
    const {
      inspectorId,
      categoryId,
      areaId,
      status,
      type,
      scheduledDate,
    } = req.body;
  
    try {
      // Validate input data
      if (
        !inspectorId ||
        !categoryId ||
        !areaId ||
        !status ||
        !type ||
        !scheduledDate
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if category exists
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      // Check if area exists
      const area = await prisma.area.findUnique({
        where: { id: areaId },
      });
  
      if (!area) {
        return res.status(404).json({ error: "Area not found" });
      }
  
      // Check if inspector exists
      const inspector = await prisma.user.findUnique({
        where: { id: inspectorId },
      });
  
      if (!inspector) {
        return res.status(404).json({ error: "Inspector not found" });
      }
  
      // Create a new inspection
      const newInspection = await prisma.inspection.create({
        data: {
          inspector: {
            connect: { id: inspectorId },
          },
          category: {
            connect: { id: categoryId },
          },
          area: {
            connect: { id: areaId },
          },
          status,
          type,
          scheduledDate,
        },
      });
  
      res.status(201).json(newInspection);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error creating inspection",
        details: err.message,
      });
    }
  };
  