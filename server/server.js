import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'https://prathamportfolio-beige.vercel.app',
    'https://portfolio-gray-beta-17.vercel.app',
    process.env.FRONTEND_URL 
  ].filter(Boolean),
  credentials: true
})); // enable CORS for frontend dev
app.use(express.json()); // parse JSON bodies

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Error handler (should be last)
app.use(errorHandler);

// Start server after DB connection
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
