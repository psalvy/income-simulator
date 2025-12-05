import { Router, Request, Response } from 'express';
import db from '../database/init';
import { Profile, Gig } from '../types';
import { calculateMonthlyContributions, calculateAnnualSummary, MonthlyIncome } from '../utils/calculations';

const router = Router();

// Get calculations for a user by year
router.get('/user/:userId/year/:year', (req: Request, res: Response) => {
  try {
    const { userId, year } = req.params;

    // Get user's profile
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId) as Profile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Get all gigs for the year
    const gigs = db.prepare(`
      SELECT * FROM gigs
      WHERE user_id = ? AND date >= ? AND date < ?
      ORDER BY date ASC
    `).all(userId, `${year}-01-01`, `${parseInt(year) + 1}-01-01`) as Gig[];

    // Group gigs by month and calculate monthly income
    const monthlyIncome: MonthlyIncome[] = [];
    for (let month = 0; month < 12; month++) {
      const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
      const monthGigs = gigs.filter(g => g.date.startsWith(monthStr));
      const income = monthGigs.reduce((sum, g) => sum + g.price, 0);

      // Count unique days with gigs (for ALG de-registration)
      const uniqueGigDays = new Set(monthGigs.map(g => g.date)).size;

      monthlyIncome.push({
        month: monthStr,
        income: income,
        gigDays: uniqueGigDays,
      });
    }

    // Calculate contributions and taxes
    const monthlyCalculations = calculateMonthlyContributions(monthlyIncome, profile);
    const annualSummary = calculateAnnualSummary(monthlyCalculations);

    res.json({
      monthly: monthlyCalculations,
      annual: annualSummary,
      profile: profile,
    });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate contributions' });
  }
});

export default router;
