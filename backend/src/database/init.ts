import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'income-sim.db');
const db = new Database(dbPath);

export function initializeDatabase() {
  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create profiles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      simulation_mode TEXT NOT NULL CHECK(simulation_mode IN ('alg', 'kleinunternehmer', 'gruendungszuschuss')),
      annual_income_estimate REAL DEFAULT 0,
      monthly_alg_amount REAL,
      gruendungszuschuss_start_date TEXT,
      gruendungszuschuss_phase INTEGER CHECK(gruendungszuschuss_phase IN (1, 2)),
      ksk_eligible INTEGER DEFAULT 0,
      health_insurance_rate REAL DEFAULT 14.6,
      pension_rate REAL DEFAULT 18.6,
      nursing_care_rate REAL DEFAULT 3.05,
      tax_free_allowance REAL DEFAULT 12096,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create gigs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gigs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
    CREATE INDEX IF NOT EXISTS idx_gigs_user_id ON gigs(user_id);
    CREATE INDEX IF NOT EXISTS idx_gigs_date ON gigs(date);
  `);

  console.log('Database initialized successfully');
}

export default db;
