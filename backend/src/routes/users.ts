import { Router, Request, Response } from 'express';
import db from '../database/init';
import { User } from '../types';

const router = Router();

// Get all users
router.get('/', (req: Request, res: Response) => {
  try {
    const users = db.prepare('SELECT * FROM users ORDER BY created_at DESC').all() as User[];
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create user
router.post('/', (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
    const result = stmt.run(name);

    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as User;

    // Create default profile for new user
    db.prepare(`
      INSERT INTO profiles (user_id, simulation_mode, ksk_eligible)
      VALUES (?, 'kleinunternehmer', 1)
    `).run(result.lastInsertRowid);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Delete user
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
