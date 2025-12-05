import { useState, useEffect } from 'react';
import { Profile } from '../types';

interface SettingsProps {
  profile: Profile;
  onUpdateProfile: (updates: Partial<Profile>) => void;
}

function Settings({ profile, onUpdateProfile }: SettingsProps) {
  const [formData, setFormData] = useState({
    simulation_mode: profile.simulation_mode,
    ksk_eligible: profile.ksk_eligible,
    monthly_alg_amount: profile.monthly_alg_amount?.toString() || '',
    gruendungszuschuss_start_date: profile.gruendungszuschuss_start_date || '',
    gruendungszuschuss_phase: profile.gruendungszuschuss_phase || 1,
    health_insurance_rate: profile.health_insurance_rate.toString(),
    pension_rate: profile.pension_rate.toString(),
    nursing_care_rate: profile.nursing_care_rate.toString(),
    tax_free_allowance: profile.tax_free_allowance.toString(),
  });

  useEffect(() => {
    setFormData({
      simulation_mode: profile.simulation_mode,
      ksk_eligible: profile.ksk_eligible,
      monthly_alg_amount: profile.monthly_alg_amount?.toString() || '',
      gruendungszuschuss_start_date: profile.gruendungszuschuss_start_date || '',
      gruendungszuschuss_phase: profile.gruendungszuschuss_phase || 1,
      health_insurance_rate: profile.health_insurance_rate.toString(),
      pension_rate: profile.pension_rate.toString(),
      nursing_care_rate: profile.nursing_care_rate.toString(),
      tax_free_allowance: profile.tax_free_allowance.toString(),
    });
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updates: Partial<Profile> = {
      simulation_mode: formData.simulation_mode,
      ksk_eligible: formData.ksk_eligible,
      health_insurance_rate: parseFloat(formData.health_insurance_rate),
      pension_rate: parseFloat(formData.pension_rate),
      nursing_care_rate: parseFloat(formData.nursing_care_rate),
      tax_free_allowance: parseFloat(formData.tax_free_allowance),
    };

    if (formData.monthly_alg_amount) {
      updates.monthly_alg_amount = parseFloat(formData.monthly_alg_amount);
    }

    if (formData.gruendungszuschuss_start_date) {
      updates.gruendungszuschuss_start_date = formData.gruendungszuschuss_start_date;
      updates.gruendungszuschuss_phase = formData.gruendungszuschuss_phase;
    }

    onUpdateProfile(updates);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Settings & Configuration</h2>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px' }}>Simulation Mode</h3>

          <div className="form-group">
            <label>Select Mode</label>
            <select
              value={formData.simulation_mode}
              onChange={(e) => setFormData({ ...formData, simulation_mode: e.target.value as any })}
            >
              <option value="kleinunternehmer">Kleinunternehmer (Small Business)</option>
              <option value="alg">Arbeitslosengeld (Unemployment Benefit)</option>
              <option value="gruendungszuschuss">Gründungszuschuss (Startup Grant)</option>
            </select>
          </div>

          {formData.simulation_mode === 'alg' && (
            <div className="form-group">
              <label>Monthly ALG Amount (€)</label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g., 1200"
                value={formData.monthly_alg_amount}
                onChange={(e) => setFormData({ ...formData, monthly_alg_amount: e.target.value })}
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                You can earn up to €165/month without deductions. Above that, excess is deducted from ALG.
              </small>
            </div>
          )}

          {formData.simulation_mode === 'gruendungszuschuss' && (
            <>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.gruendungszuschuss_start_date}
                  onChange={(e) => setFormData({ ...formData, gruendungszuschuss_start_date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Monthly ALG Amount Before Grant (€)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 1200"
                  value={formData.monthly_alg_amount}
                  onChange={(e) => setFormData({ ...formData, monthly_alg_amount: e.target.value })}
                />
                <small style={{ color: '#6b7280', fontSize: '12px' }}>
                  Phase 1 (6 months): ALG amount + €300. Phase 2 (9 months): €300 only.
                </small>
              </div>
              <div className="form-group">
                <label>Current Phase</label>
                <select
                  value={formData.gruendungszuschuss_phase}
                  onChange={(e) => setFormData({ ...formData, gruendungszuschuss_phase: parseInt(e.target.value) as 1 | 2 })}
                >
                  <option value="1">Phase 1 (First 6 months)</option>
                  <option value="2">Phase 2 (Months 7-15)</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px' }}>Social Insurance (KSK)</h3>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.ksk_eligible}
                onChange={(e) => setFormData({ ...formData, ksk_eligible: e.target.checked })}
              />
              Eligible for Künstlersozialkasse (KSK)
            </label>
            <small style={{ color: '#6b7280', fontSize: '12px' }}>
              KSK covers 50% of health, pension, and nursing care contributions for eligible artists.
            </small>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px' }}>Contribution Rates (2025)</h3>

          <div className="grid grid-3">
            <div className="form-group">
              <label>Health Insurance (%)</label>
              <input
                type="number"
                step="0.01"
                value={formData.health_insurance_rate}
                onChange={(e) => setFormData({ ...formData, health_insurance_rate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Pension (%)</label>
              <input
                type="number"
                step="0.01"
                value={formData.pension_rate}
                onChange={(e) => setFormData({ ...formData, pension_rate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Nursing Care (%)</label>
              <input
                type="number"
                step="0.01"
                value={formData.nursing_care_rate}
                onChange={(e) => setFormData({ ...formData, nursing_care_rate: e.target.value })}
              />
            </div>
          </div>

          <small style={{ color: '#6b7280', fontSize: '12px' }}>
            Default 2025 rates: Health 14.6%, Pension 18.6%, Nursing Care 3.05%
            {formData.ksk_eligible && ' (You pay 50% with KSK)'}
          </small>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px' }}>Income Tax</h3>

          <div className="form-group">
            <label>Tax-Free Allowance (€/year)</label>
            <input
              type="number"
              step="1"
              value={formData.tax_free_allowance}
              onChange={(e) => setFormData({ ...formData, tax_free_allowance: e.target.value })}
            />
            <small style={{ color: '#6b7280', fontSize: '12px' }}>
              2025 Grundfreibetrag: €12,096 per person
            </small>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
