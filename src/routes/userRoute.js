import { Router } from "express";
import { register, login, getAllUsers } from "../controllers/userController.js";

const router = Router()

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

router.get('/users', getAllUsers);

export default router