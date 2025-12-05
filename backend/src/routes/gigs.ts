import { Router, Request, Response } from 'express';
import db from '../database/init';
import { Gig } from '../types';

const router = Router();

// Get all gigs for a user
router.get('/user/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const gigs = db.prepare('SELECT * FROM gigs WHERE user_id = ? ORDER BY date DESC').all(userId) as Gig[];
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
});

// Get gigs by date range
router.get('/user/:userId/range', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end dates are required' });
    }

    const gigs = db.prepare(`
      SELECT * FROM gigs
      WHERE user_id = ? AND date >= ? AND date <= ?
      ORDER BY date ASC
    `).all(userId, start, end) as Gig[];

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
});

// Create gig
router.post('/', (req: Request, res: Response) => {
  try {
    const { user_id, date, title, price, notes } = req.body;

    if (!user_id || !date || !title || price === undefined) {
      return res.status(400).json({ error: 'user_id, date, title, and price are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO gigs (user_id, date, title, price, notes)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(user_id, date, title, price, notes || null);
    const newGig = db.prepare('SELECT * FROM gigs WHERE id = ?').get(result.lastInsertRowid) as Gig;

    res.status(201).json(newGig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gig' });
  }
});

// Update gig
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, title, price, notes } = req.body;

    const updates: string[] = [];
    const values: any[] = [];

    if (date !== undefined) {
      updates.push('date = ?');
      values.push(date);
    }
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (price !== undefined) {
      updates.push('price = ?');
      values.push(price);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      values.push(notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const sql = `UPDATE gigs SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    const updatedGig = db.prepare('SELECT * FROM gigs WHERE id = ?').get(id) as Gig;
    res.json(updatedGig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gig' });
  }
});

// Delete gig
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM gigs WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.json({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gig' });
  }
});

export default router;
