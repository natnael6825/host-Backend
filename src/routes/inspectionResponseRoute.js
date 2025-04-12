import { Router } from "express";
// import createInspectionResponse from "../controllers/inspectionResponse.js";
// import getAllInspectionResponses  from "../controllers/inspectionResponse.js";

import {getInspectionResponseById ,createInspectionResponse,getAllInspectionResponses}from "../controllers/inspectionResponse.js";


const router = Router();

// Create a new inspection response
router.post('/',  createInspectionResponse);

// Get all inspection responses
router.get('/', getAllInspectionResponses);

// Get a specific inspection response by ID
router.get('/:id', getInspectionResponseById);

export default router;
