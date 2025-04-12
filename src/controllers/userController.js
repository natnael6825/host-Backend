// controllers/userController.js
import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '1d';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create user with token and expiry
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
     
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'User creation failed', details: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token and update in DB
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        authToken: token,
        authExprire: expireAt,
      },
    });

    res.json({ token, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user info" });
  }
};
