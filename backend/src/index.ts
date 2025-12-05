import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { initializeDatabase } from './database/init';

// Import routes
import usersRouter from './routes/users';
import profilesRouter from './routes/profiles';
import gigsRouter from './routes/gigs';
import calculationsRouter from './routes/calculations';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
initializeDatabase();

// Routes
app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/gigs', gigsRouter);
app.use('/api/calculations', calculationsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Income Simulator API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
