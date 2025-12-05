import { Router, Request, Response } from 'express';
import db from '../database/init';
import { Profile } from '../types';

const router = Router();

// Get profile by user ID
router.get('/user/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId) as Profile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      simulation_mode,
      annual_income_estimate,
      monthly_alg_amount,
      gruendungszuschuss_start_date,
      gruendungszuschuss_phase,
      ksk_eligible,
      health_insurance_rate,
      pension_rate,
      nursing_care_rate,
      tax_free_allowance,
    } = req.body;

    const updates: string[] = [];
    const values: any[] = [];

    if (simulation_mode !== undefined) {
      updates.push('simulation_mode = ?');
      values.push(simulation_mode);
    }
    if (annual_income_estimate !== undefined) {
      updates.push('annual_income_estimate = ?');
      values.push(annual_income_estimate);
    }
    if (monthly_alg_amount !== undefined) {
      updates.push('monthly_alg_amount = ?');
      values.push(monthly_alg_amount);
    }
    if (gruendungszuschuss_start_date !== undefined) {
      updates.push('gruendungszuschuss_start_date = ?');
      values.push(gruendungszuschuss_start_date);
    }
    if (gruendungszuschuss_phase !== undefined) {
      updates.push('gruendungszuschuss_phase = ?');
      values.push(gruendungszuschuss_phase);
    }
    if (ksk_eligible !== undefined) {
      updates.push('ksk_eligible = ?');
      values.push(ksk_eligible ? 1 : 0);
    }
    if (health_insurance_rate !== undefined) {
      updates.push('health_insurance_rate = ?');
      values.push(health_insurance_rate);
    }
    if (pension_rate !== undefined) {
      updates.push('pension_rate = ?');
      values.push(pension_rate);
    }
    if (nursing_care_rate !== undefined) {
      updates.push('nursing_care_rate = ?');
      values.push(nursing_care_rate);
    }
    if (tax_free_allowance !== undefined) {
      updates.push('tax_free_allowance = ?');
      values.push(tax_free_allowance);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const sql = `UPDATE profiles SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const updatedProfile = db.prepare('SELECT * FROM profiles WHERE id = ?').get(id) as Profile;
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
