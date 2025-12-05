# Income Simulator for Berlin Artists

A comprehensive income and tax simulation tool for independent artists in Berlin, Germany. Built with React, TypeScript, and Node.js, featuring a sleek dark mode interface and accurate 2025 German tax calculations.

## Features

### Core Functionality
- **User Management**: Simple profile tiles for managing multiple artist profiles (no passwords needed)
- **Interactive Calendar**:
  - Monday-first week layout
  - Compact design showing gig titles directly in calendar cells
  - Click dates to add/edit gigs with prices and notes
  - Monthly statistics summary (total gigs, gig days, income, average per gig)
- **Three Simulation Modes**:
  1. **Arbeitslosengeld (ALG)**: Unemployment benefits with de-registration for gig days
  2. **Kleinunternehmer**: Regular small business taxation
  3. **Gründungszuschuss**: Startup grant program
- **Automatic Calculations**: Real-time calculation with 2025 German tax rules:
  - Health insurance (with €213/month minimum for de-registered days)
  - Pension contributions
  - Nursing care contributions
  - Income tax based on progressive brackets
  - KSK 50% subsidy support
- **Comprehensive Statistics**: Monthly and annual breakdowns with color-coded cards
- **Documentation Tab**: Built-in explanations of all calculation methods with official sources
- **Settings**: Full control over rates, eligibility, and simulation parameters
- **Persistent Storage**: SQLite database stores all your data locally
- **Dark Mode**: Beautiful dark theme optimized for long sessions

## German Tax System (2025 Rules)

### Kleinunternehmer (Small Business)
- Income threshold: <€25,000 last year, <€100,000 this year (NET)
- No VAT on invoices, no VAT returns required
- Tax-free allowance (Grundfreibetrag): €12,096/year
- Artists/freelancers exempt from trade tax (Gewerbesteuer)

### Arbeitslosengeld (ALG) with De-registration
- **While registered** (<15h/week work):
  - Income up to €165/month: No ALG deduction
  - Income above €165: Excess deducted from ALG
  - Social insurance covered by Arbeitsagentur
- **De-registered days** (for gigs):
  - No income limit
  - ALG prorated by registered days
  - **Minimum health insurance**: €7-9/day (~€213-266/month minimum)
  - Social contributions prorated by gig days
  - Example: 3 gig days in 30-day month = pay (3/30) of contributions + minimum health insurance

### Gründungszuschuss (Startup Grant)
- **Phase 1** (6 months): Previous ALG + €300/month
- **Phase 2** (9 months): €300/month (optional)
- Requires 150+ days of ALG remaining
- Tax-free, no repayment needed

### KSK (Künstlersozialkasse)
- Covers 50% of social contributions for eligible artists
- 2025 rates: Health 14.6%, Pension 18.6%, Nursing 3.05%
- Minimum income: €3,901/year (waived first 3 years)
- Example savings: €1,812/year on €10,000 income

## Getting Started

### Currently Running

Both servers are running:
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
│   │   ├── routes/         # API endpoints (users, profiles, gigs, calculations)
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Calculation engine with all 3 modes
│   │   └── index.ts        # Express server entry point
│   ├── data/               # SQLite database file (auto-created)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Calendar, Statistics, Settings, Documentation
│   │   ├── pages/          # Dashboard
│   │   ├── types/          # TypeScript interfaces
│   │   ├── styles/         # Dark mode CSS
│   │   └── App.tsx         # Main app with user selection
│   └── package.json
└── README.md
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user (auto-creates default profile)
- `DELETE /api/users/:id` - Delete user and all associated data

### Profiles
- `GET /api/profiles/user/:userId` - Get user's profile
- `PUT /api/profiles/:id` - Update profile settings

### Gigs
- `GET /api/gigs/user/:userId` - Get all gigs for user
- `GET /api/gigs/user/:userId/range?start=YYYY-MM-DD&end=YYYY-MM-DD` - Get gigs in date range
- `POST /api/gigs` - Create new gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig

### Calculations
- `GET /api/calculations/user/:userId/year/:year` - Get monthly and annual calculations

## How to Use

### 1. Create a Profile
- Click "Create New Profile" on the home screen
- Enter your name
- A default profile is automatically created

### 2. Configure Settings
Go to the Settings tab:
- **Select simulation mode**: ALG, Kleinunternehmer, or Gründungszuschuss
- **For ALG mode**: Enter your monthly ALG amount
- **For Gründungszuschuss**: Set start date and phase
- **KSK eligibility**: Enable if you're a member
- **Adjust rates**: Customize contribution percentages if needed
- **Tax-free allowance**: Set your Grundfreibetrag (default €12,096)

### 3. Add Gigs
Calendar tab features:
- Navigate months/years with arrow buttons
- Click any date to add a gig
- Enter title, price, and optional notes
- View gig titles directly in calendar cells
- See monthly statistics at the top (total gigs, gig days, income, average)
- Edit or delete existing gigs by clicking on dates with gigs

### 4. View Statistics
Statistics tab shows:
- Color-coded summary cards (gross income, net income, total contributions)
- Monthly breakdown table with all deductions
- Annual totals with mode-specific information
- ALG/Gründungszuschuss amounts received
- Explanation of your current mode

### 5. Read Documentation
Documentation tab provides:
- Detailed explanation of each simulation mode
- Calculation formulas with examples
- Official sources and links
- Information about KSK, minimum contributions, and German tax brackets

## Testing Scenarios

### Scenario 1: Kleinunternehmer with KSK
```
Mode: Kleinunternehmer
KSK: Enabled
Monthly gigs: €2,000
Result: Health €146, Pension €186, Nursing €30.50 (50% with KSK!)
```

### Scenario 2: ALG with De-registration
```
Mode: Arbeitslosengeld
Monthly ALG: €1,200
3 gig days with €600 income
Result:
- 27 days: (27/30) × €1,200 = €1,080 ALG
- 3 days: €21.30 minimum health insurance + prorated contributions
- Net: €600 + €1,080 - contributions
```

### Scenario 3: Gründungszuschuss
```
Mode: Gründungszuschuss
Start date: January 2025
Previous ALG: €1,200
Phase 1 (months 1-6): €1,200 + €300 = €1,500/month grant
Phase 2 (months 7-15): €300/month grant
Plus: Your gig income minus contributions
```

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite 5
- **Backend**: Node.js 18, Express 5, TypeScript
- **Database**: SQLite 3 (better-sqlite3)
- **Styling**: Custom dark mode CSS
- **Development**: Hot reload (Vite HMR + nodemon)

## Key Features

### Accurate German Tax Calculations (2025)
- Progressive income tax brackets (14%, 24%, 42%, 45%)
- Social contribution rates (health 14.6%, pension 18.6%, nursing 3.05%)
- KSK 50% subsidy calculation
- **Minimum health insurance** for ALG de-registration (€213/month)
- Prorated calculations for part-month work
- Tax-free allowance (Grundfreibetrag €12,096)

### Smart ALG De-registration
- Automatically detects gig days in each month
- Calculates prorated ALG: `(registered_days / total_days) × monthly_ALG`
- Applies minimum health insurance per day
- Prorates all contributions by gig day ratio
- Shows both ALG received and contributions paid

### Dark Mode Interface
- Easy on the eyes for long sessions
- High contrast for better readability
- Consistent color scheme across all components
- Responsive design for all screen sizes

## Data Storage

SQLite database stored in `backend/data/income-sim.db`:
- **users** table: Profile information
- **profiles** table: Simulation settings and rates
- **gigs** table: All gig data with dates and prices
- Foreign key constraints ensure data integrity
- Automatic timestamps for audit trail

## Important Notes

- All calculations use **2025 German tax rates and regulations**
- Minimum health insurance enforced for ALG de-registration
- Income tax uses **simplified progressive brackets**
- KSK reduces contributions by **exactly 50%**
- Database created automatically on first run
- No authentication (local development only)
- Calendar starts on Monday (European standard)

## Future Deployment

Ready for production deployment:
- Backend supports environment variables
- SQLite can be replaced with PostgreSQL
- Vite optimized build for frontend
- Ready for Heroku, Render, or similar platforms

## Documentation & Sources

The app includes a built-in Documentation tab with links to:
- German tax authority websites
- KSK official documentation
- Unemployment benefit guides
- Minimum contribution calculations (Mindestbeitrag)

All calculation methods are explained with examples and official sources.

## Next Steps

1. Open http://localhost:3000 in your browser
2. Create your first profile
3. Configure your simulation mode in Settings
4. Add gigs to the calendar
5. View your calculated income and contributions!

---

**Made for Berlin artists** to understand their income, taxes, and social contributions under different German business structures. All calculations are estimates - consult a Steuerberater for official advice.
