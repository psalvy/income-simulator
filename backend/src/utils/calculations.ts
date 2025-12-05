import { Profile, MonthlyCalculation } from '../types';

export interface MonthlyIncome {
  month: string;
  income: number;
}

export function calculateMonthlyContributions(
  monthlyIncome: MonthlyIncome[],
  profile: Profile
): MonthlyCalculation[] {
  const calculations: MonthlyCalculation[] = [];

  for (const { month, income } of monthlyIncome) {
    let calculation: MonthlyCalculation = {
      month,
      gross_income: income,
      health_insurance: 0,
      pension: 0,
      nursing_care: 0,
      income_tax: 0,
      net_income: income,
      total_contributions: 0,
    };

    // Calculate based on simulation mode
    switch (profile.simulation_mode) {
      case 'alg':
        calculation = calculateALGMode(calculation, income, profile);
        break;
      case 'kleinunternehmer':
        calculation = calculateKleinunternehmerMode(calculation, income, profile);
        break;
      case 'gruendungszuschuss':
        calculation = calculateGruendungszuschussMode(calculation, income, profile, month);
        break;
    }

    calculations.push(calculation);
  }

  return calculations;
}

function calculateALGMode(
  calc: MonthlyCalculation,
  monthlyIncome: number,
  profile: Profile
): MonthlyCalculation {
  const ALG_EXEMPT_AMOUNT = 165;
  const monthlyAlg = profile.monthly_alg_amount || 0;

  // Calculate excess income over €165
  const excessIncome = Math.max(0, monthlyIncome - ALG_EXEMPT_AMOUNT);

  // ALG is reduced by excess income
  const algDeduction = Math.min(excessIncome, monthlyAlg);
  const algReceived = monthlyAlg - algDeduction;

  // While on ALG, health insurance is covered by Arbeitsagentur
  // No pension or nursing care contributions while on ALG
  calc.alg_received = algReceived;
  calc.alg_deduction = algDeduction;
  calc.health_insurance = 0;
  calc.pension = 0;
  calc.nursing_care = 0;
  calc.income_tax = 0;

  calc.net_income = monthlyIncome + algReceived;
  calc.total_contributions = 0;

  return calc;
}

function calculateKleinunternehmerMode(
  calc: MonthlyCalculation,
  monthlyIncome: number,
  profile: Profile
): MonthlyCalculation {
  // Calculate social contributions
  if (profile.ksk_eligible) {
    // KSK covers 50% of contributions
    calc.health_insurance = (monthlyIncome * (profile.health_insurance_rate / 100)) / 2;
    calc.pension = (monthlyIncome * (profile.pension_rate / 100)) / 2;
    calc.nursing_care = (monthlyIncome * (profile.nursing_care_rate / 100)) / 2;
  } else {
    // Full contributions without KSK
    calc.health_insurance = monthlyIncome * (profile.health_insurance_rate / 100);
    calc.pension = monthlyIncome * (profile.pension_rate / 100);
    calc.nursing_care = monthlyIncome * (profile.nursing_care_rate / 100);
  }

  // Calculate income tax (simplified progressive tax)
  const annualIncome = monthlyIncome * 12;
  const taxableIncome = Math.max(0, annualIncome - profile.tax_free_allowance);

  // Simplified German income tax brackets (2025)
  let annualTax = 0;
  if (taxableIncome > 0 && taxableIncome <= 11310) {
    annualTax = taxableIncome * 0.14; // 14% up to first bracket
  } else if (taxableIncome <= 63515) {
    annualTax = 11310 * 0.14 + (taxableIncome - 11310) * 0.24; // 24% middle bracket
  } else if (taxableIncome <= 277825) {
    annualTax = 11310 * 0.14 + (63515 - 11310) * 0.24 + (taxableIncome - 63515) * 0.42; // 42% higher bracket
  } else {
    annualTax = 11310 * 0.14 + (63515 - 11310) * 0.24 + (277825 - 63515) * 0.42 + (taxableIncome - 277825) * 0.45; // 45% top bracket
  }

  calc.income_tax = annualTax / 12;

  calc.total_contributions = calc.health_insurance + calc.pension + calc.nursing_care + calc.income_tax;
  calc.net_income = monthlyIncome - calc.total_contributions;

  return calc;
}

function calculateGruendungszuschussMode(
  calc: MonthlyCalculation,
  monthlyIncome: number,
  profile: Profile,
  month: string
): MonthlyCalculation {
  // First calculate like Kleinunternehmer
  calc = calculateKleinunternehmerMode(calc, monthlyIncome, profile);

  // Add Gründungszuschuss support
  if (profile.gruendungszuschuss_start_date) {
    const startDate = new Date(profile.gruendungszuschuss_start_date);
    const currentMonth = new Date(month);
    const monthsSinceStart = (currentMonth.getFullYear() - startDate.getFullYear()) * 12 +
                             (currentMonth.getMonth() - startDate.getMonth());

    // Phase 1: First 6 months - receive previous ALG amount + €300
    if (monthsSinceStart >= 0 && monthsSinceStart < 6) {
      const algAmount = profile.monthly_alg_amount || 0;
      calc.gruendungszuschuss_amount = algAmount + 300;
    }
    // Phase 2: Months 7-15 - receive €300 only (if eligible)
    else if (monthsSinceStart >= 6 && monthsSinceStart < 15 && profile.gruendungszuschuss_phase === 2) {
      calc.gruendungszuschuss_amount = 300;
    }

    if (calc.gruendungszuschuss_amount) {
      calc.net_income += calc.gruendungszuschuss_amount;
    }
  }

  return calc;
}

// Annual summary calculation
export function calculateAnnualSummary(monthly: MonthlyCalculation[]) {
  return monthly.reduce((acc, month) => ({
    total_gross_income: acc.total_gross_income + month.gross_income,
    total_health_insurance: acc.total_health_insurance + month.health_insurance,
    total_pension: acc.total_pension + month.pension,
    total_nursing_care: acc.total_nursing_care + month.nursing_care,
    total_income_tax: acc.total_income_tax + month.income_tax,
    total_alg_received: acc.total_alg_received + (month.alg_received || 0),
    total_gruendungszuschuss: acc.total_gruendungszuschuss + (month.gruendungszuschuss_amount || 0),
    total_net_income: acc.total_net_income + month.net_income,
    total_contributions: acc.total_contributions + month.total_contributions,
  }), {
    total_gross_income: 0,
    total_health_insurance: 0,
    total_pension: 0,
    total_nursing_care: 0,
    total_income_tax: 0,
    total_alg_received: 0,
    total_gruendungszuschuss: 0,
    total_net_income: 0,
    total_contributions: 0,
  });
}
