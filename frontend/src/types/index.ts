export interface User {
  id: number;
  name: string;
  created_at: string;
}

export interface Profile {
  id: number;
  user_id: number;
  simulation_mode: 'alg' | 'kleinunternehmer' | 'gruendungszuschuss';
  annual_income_estimate: number;
  monthly_alg_amount?: number;
  minijob_monthly_income?: number;
  gruendungszuschuss_start_date?: string;
  gruendungszuschuss_phase?: 1 | 2;
  ksk_eligible: boolean;
  health_insurance_rate: number;
  pension_rate: number;
  nursing_care_rate: number;
  tax_free_allowance: number;
  updated_at: string;
}

export interface Gig {
  id: number;
  user_id: number;
  date: string;
  title: string;
  price: number;
  notes?: string;
  created_at: string;
}

export interface MonthlyCalculation {
  month: string;
  gross_income: number;
  minijob_income?: number;
  health_insurance: number;
  pension: number;
  nursing_care: number;
  income_tax: number;
  alg_deduction?: number;
  alg_received?: number;
  gruendungszuschuss_amount?: number;
  net_income: number;
  total_contributions: number;
}

export interface AnnualSummary {
  total_gross_income: number;
  total_minijob_income: number;
  total_health_insurance: number;
  total_pension: number;
  total_nursing_care: number;
  total_income_tax: number;
  total_alg_received: number;
  total_gruendungszuschuss: number;
  total_net_income: number;
  total_contributions: number;
}

export interface CalculationResponse {
  monthly: MonthlyCalculation[];
  annual: AnnualSummary;
  profile: Profile;
}
