// Import dependencies
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes (make sure this is after app initialization)
import authRoutes from './routes/auth.js';

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Define API routes
app.use('/api/auth', authRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the Campus Marketplace API!');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
