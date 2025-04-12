import { Router } from "express";
import { getAreas,createArea } from "../controllers/areaController.js";

const router = Router();

// Route to fetch all areas
router.get('/areas', getAreas);

// Route to create a new area
router.post('/areas', createArea);

export default router;