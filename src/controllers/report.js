import prisma from "../utils/prisma.js";
// Create a new issue report
export const createIssueReport = async (req, res) => {
    const {
      reportedById,
      inspectionId,
      description,
      categoryId,
      areaId,
      priority,
      mediaUrl,
      status,
    } = req.body;
  
    try {
      // Validate input data
      if (
        !reportedById ||
        !inspectionId ||
        !description ||
        !categoryId ||
        !areaId ||
        !priority ||
        !mediaUrl ||
        !status
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if the inspection exists
      const inspection = await prisma.inspection.findUnique({
        where: { id: inspectionId },
      });
  
      if (!inspection) {
        return res.status(404).json({ error: "Inspection not found" });
      }
  
      // Check if the category exists
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
  
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      // Check if the area exists
      const area = await prisma.area.findUnique({
        where: { id: areaId },
      });
  
      if (!area) {
        return res.status(404).json({ error: "Area not found" });
      }
  
      // Check if the reportedBy user exists
      const reportedBy = await prisma.user.findUnique({
        where: { id: reportedById },
      });
  
      if (!reportedBy) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Create a new issue report
      const newIssueReport = await prisma.issueReport.create({
        data: {
          reportedBy: {
            connect: { id: reportedById },
          },
          inspection: {
            connect: { id: inspectionId },
          },
          description,
          category: {
            connect: { id: categoryId },
          },
          area: {
            connect: { id: areaId },
          },
          priority,
          mediaUrl,
          status,
        },
      });
  
      res.status(201).json(newIssueReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error creating issue report",
        details: err.message,
      });
    }
  };
  
  // Fetch all issue reports
  export const getAllIssueReports = async (req, res) => {
    try {
      const issueReports = await prisma.issueReport.findMany({
        include: {
          reportedBy: true,
          inspection: true,
          category: true,
          area: true,
        },
      });
      res.status(200).json(issueReports);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error fetching issue reports",
        details: err.message,
      });
    }
  };
  
  // Fetch an issue report by ID
  export const getIssueReportById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const issueReport = await prisma.issueReport.findUnique({
        where: { id },
        include: {
          reportedBy: true,
          inspection: true,
          category: true,
          area: true,
        },
      });
  
      if (!issueReport) {
        return res.status(404).json({ error: "Issue report not found" });
      }
  
      res.status(200).json(issueReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error fetching issue report",
        details: err.message,
      });
    }
  };