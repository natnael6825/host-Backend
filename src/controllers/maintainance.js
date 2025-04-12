
export const getInspectionsByCategory = async (req, res) => {
    const { category_id } = req.body; // or use req.query if sending as query param
  
    try {
      const inspections = await prisma.inspection.findMany({
        where: {
          categoryId: category_id,
        },
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
      res.status(500).json({
        error: "Error fetching inspections by category",
        details: err.message,
      });
    }
  };
  