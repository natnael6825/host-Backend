import { Router } from "express";
import { register, login } from "../controllers/userController.js";

const router = Router()

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router