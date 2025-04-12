import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { createCategory } from "../controllers/categoryController.js";

const router = Router();

// Route to fetch all categories
router.get('/categories', getCategories);

// Route to create a new category
router.post('/categories', createCategory);

export default router;