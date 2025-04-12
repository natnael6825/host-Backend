import { Router } from "express";
import { getInspections } from "../controllers/inspactor.js";
import { createInspection } from "../controllers/inspactor.js";

const router = Router();

// Route to fetch all inspections
router.get('/inspections', getInspections);

// Route to create a new inspection
router.post('/inspections', createInspection);

export default router;