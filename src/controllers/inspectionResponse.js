import prisma from "../utils/prisma.js" // Adjust the import as needed


// Create a new inspection response
export const createInspectionResponse = async (req, res) => {
  const { inspectionId, response, comment } = req.body;

  try {
    // Validate input data
    if (!inspectionId || !response || !comment ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the inspection exists
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });

    if (!inspection) {
      return res.status(404).json({ error: "Inspection not found" });
    }

    // Validate response type
    const validResponses = ['yes', 'no', 'needs_attention'];
    if (!validResponses.includes(response)) {
      return res.status(400).json({ error: "Invalid response value" });
    }

    // Create the inspection response
    const newInspectionResponse = await prisma.inspectionResponse.create({
      data: {
        inspection: {
          connect: { id: inspectionId },
        },
        response,
        comment,
      },
    });

    res.status(201).json(newInspectionResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error creating inspection response",
      details: err.message,
    });
  }
};

// Fetch all inspection responses
export const getAllInspectionResponses = async (req, res) => {
  try {
    const inspectionResponses = await prisma.inspectionResponse.findMany({
      include: {
        inspection: true, // Include the associated inspection data
      },
    });
    res.status(200).json(inspectionResponses);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error fetching inspection responses",
      details: err.message,
    });
  }
};

// Fetch an inspection response by ID
export const getInspectionResponseById = async (req, res) => {
  const { id } = req.params;

  try {
    const inspectionResponse = await prisma.inspectionResponse.findUnique({
      where: { id },
      include: {
        inspection: true, // Include the associated inspection data
      },
    });

    if (!inspectionResponse) {
      return res.status(404).json({ error: "Inspection response not found" });
    }

    res.status(200).json(inspectionResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error fetching inspection response",
      details: err.message,
    });
  }
};
