import { Router } from "express";
import { getInspections, getInspectionsByInspaectorId } from "../controllers/inspactor.js";
import { createInspection } from "../controllers/inspactor.js";
import { updateInspection } from "../controllers/inspactor.js";

const router = Router();

// Route to fetch all inspections
router.get('/inspections', getInspections);

// Route to create a new inspection
router.post('/inspections', createInspection);
router.put('/updateInspection', updateInspection);
router.post('/inspections/by-inspector', getInspectionsByInspaectorId);



export default router;