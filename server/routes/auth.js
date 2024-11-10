// server/routes/auth.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email Regex for University Email Validation
const universityEmailRegex = /^[a-zA-Z0-9._%+-]+@tezu\.ac\.in$/;

// NodeMailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🛠️ Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate University Email
    if (!universityEmailRegex.test(email)) {
      return res.status(400).json({ error: 'Please use your university email (@tezu.ac.in).' });
    }

    // Check if User Already Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Generate Verification Token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send Verification Email
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click the link below to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`,
    });

    res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// 🛠️ Email Verification Route
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ error: 'Invalid token.' });
    }

    // Check if User is Already Verified
    if (user.isVerified) {
      return res.status(400).json({ error: 'User is already verified.' });
    }

    // Mark User as Verified
    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
});

// 🛠️ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if User Exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please sign up first.' });
    }

    // Check if User is Verified
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Please verify your email before logging in.' });
    }

    // Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

export default router;
