# Income Simulator for Berlin Artists

A comprehensive income and tax simulation tool for independent artists in Berlin, Germany.

## What's Included

### Features
- **User Management**: Simple profile tiles for managing multiple artist profiles
- **Interactive Calendar**: Click dates to add gigs with prices and details
- **Three Simulation Modes**:
  1. **Arbeitslosengeld (ALG)**: Simulate income while receiving unemployment benefits
  2. **Kleinunternehmer**: Regular small business taxation
  3. **Gründungszuschuss**: Startup grant program for transitioning from unemployment
- **Automatic Calculations**: Real-time calculation of:
  - Health insurance contributions (with KSK support)
  - Pension contributions
  - Nursing care contributions
  - Income tax based on German 2025 tax brackets
- **Detailed Statistics**: Monthly and annual breakdowns with visualizations
- **Settings**: Customize rates, eligibility, and simulation parameters
- **Persistent Storage**: SQLite database stores all your data locally

### German Tax System (2025 Rules)

**Kleinunternehmer**:
- Income threshold: <€25,000 last year, <€100,000 this year (NET)
- No VAT on invoices
- Tax-free allowance: €12,096/year

**Arbeitslosengeld**:
- Can work max 15 hours/week
- Earn up to €165/month without ALG deduction
- Excess earnings deducted from ALG

**Gründungszuschuss**:
- Phase 1 (6 months): Previous ALG + €300/month
- Phase 2 (9 months): €300/month
- Requires 150+ days of ALG remaining

**KSK (Künstlersozialkasse)**:
- Covers 50% of social contributions for eligible artists
- 2025 rates: Health 14.6%, Pension 18.6%, Nursing 3.05%

## Getting Started

### Currently Running

Both servers are already running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

Open your browser and navigate to **http://localhost:3000** to start using the app!

### Starting the Servers (for future sessions)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Project Structure

```
income-sim/
├── backend/
│   ├── src/
│   │   ├── database/       # SQLite database setup
│   │   ├── routes/         # API endpoints
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Calculation engine
│   │   └── index.ts        # Server entry point
│   ├── data/               # SQLite database file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript types
│   │   ├── styles/         # CSS styles
│   │   └── App.tsx         # Main app component
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `DELETE /api/users/:id` - Delete user
- `GET /api/profiles/user/:userId` - Get user profile
- `PUT /api/profiles/:id` - Update profile
- `GET /api/gigs/user/:userId` - Get all gigs for user
- `POST /api/gigs` - Create new gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig
- `GET /api/calculations/user/:userId/year/:year` - Get calculations for year

## How to Use

1. **Create a Profile**: Click "Create New Profile" and enter your name
2. **Configure Settings**: Go to Settings tab and:
   - Select your simulation mode
   - Set your ALG amount (if applicable)
   - Configure KSK eligibility
   - Adjust contribution rates if needed
3. **Add Gigs**: Use the Calendar tab to:
   - Navigate months and years
   - Click on dates to add gigs
   - View monthly income totals
4. **View Statistics**: Check the Statistics tab for:
   - Annual income summary
   - Monthly breakdowns
   - Detailed contribution calculations
   - Net income after all deductions

## Testing the App

Try these scenarios:

**Scenario 1: Kleinunternehmer with KSK**
- Mode: Kleinunternehmer
- KSK: Enabled
- Add gigs: €2,000/month
- See how KSK halves your contributions!

**Scenario 2: ALG Recipient**
- Mode: Arbeitslosengeld
- Monthly ALG: €1,200
- Add small gigs: €150-200
- See how staying under €165 preserves full ALG

**Scenario 3: Gründungszuschuss**
- Mode: Gründungszuschuss
- Set start date
- Previous ALG: €1,200
- See grant payments + business income

## Future Deployment

The app is built with Heroku deployment in mind:
- Backend uses environment variables for configuration
- SQLite can be replaced with PostgreSQL for production
- Frontend is optimized with Vite build system

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Node.js 18, Express 5, TypeScript
- **Database**: SQLite 3 (better-sqlite3)
- **Styling**: Custom CSS with modern design

## Data Storage

All data is stored locally in `backend/data/income-sim.db`. The database includes:
- User profiles
- Simulation settings
- Gigs with dates and prices
- Automatically maintained with foreign key constraints

## Notes

- All calculations use 2025 German tax rates and regulations
- Income tax uses simplified progressive brackets (14%, 24%, 42%, 45%)
- KSK reduces contributions by 50% for eligible artists
- Database is created automatically on first run
- No authentication required (local development only)

## Next Steps

You can now:
1. Open http://localhost:3000 in your browser
2. Create your first profile
3. Start adding gigs and exploring the simulation modes!

Enjoy your income simulator!
