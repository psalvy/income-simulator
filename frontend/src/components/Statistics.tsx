import { CalculationResponse } from '../types';

interface StatisticsProps {
  calculations: CalculationResponse;
  year: number;
}

function Statistics({ calculations, year }: StatisticsProps) {
  const { monthly, annual, profile } = calculations;

  const formatCurrency = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };

  const formatMonth = (monthStr: string) => {
    const [_, month] = monthStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[parseInt(month) - 1];
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Income Statistics - {year}</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Gross Income</h3>
          <p>{formatCurrency(annual.total_gross_income)}</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <h3>Total Net Income</h3>
          <p>{formatCurrency(annual.total_net_income)}</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <h3>Total Contributions</h3>
          <p>{formatCurrency(annual.total_contributions)}</p>
        </div>
        {annual.total_alg_received > 0 && (
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <h3>ALG Received</h3>
            <p>{formatCurrency(annual.total_alg_received)}</p>
          </div>
        )}
        {annual.total_gruendungszuschuss > 0 && (
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <h3>Gründungszuschuss</h3>
            <p>{formatCurrency(annual.total_gruendungszuschuss)}</p>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Annual Breakdown</h3>
        <div className="grid grid-2">
          <div>
            <strong>Health Insurance:</strong> {formatCurrency(annual.total_health_insurance)}
            {profile.ksk_eligible && <span style={{ color: '#6b7280', fontSize: '12px' }}> (50% with KSK)</span>}
          </div>
          <div><strong>Pension:</strong> {formatCurrency(annual.total_pension)}</div>
          <div><strong>Nursing Care:</strong> {formatCurrency(annual.total_nursing_care)}</div>
          <div><strong>Income Tax:</strong> {formatCurrency(annual.total_income_tax)}</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Monthly Details</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Month</th>
                <th style={{ textAlign: 'right', padding: '12px' }}>Gross</th>
                <th style={{ textAlign: 'right', padding: '12px' }}>Health</th>
                <th style={{ textAlign: 'right', padding: '12px' }}>Pension</th>
                <th style={{ textAlign: 'right', padding: '12px' }}>Tax</th>
                {profile.simulation_mode === 'alg' && <th style={{ textAlign: 'right', padding: '12px' }}>ALG</th>}
                {profile.simulation_mode === 'gruendungszuschuss' && <th style={{ textAlign: 'right', padding: '12px' }}>Grant</th>}
                <th style={{ textAlign: 'right', padding: '12px' }}>Net</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((month) => (
                <tr key={month.month} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{formatMonth(month.month)}</td>
                  <td style={{ textAlign: 'right', padding: '12px' }}>{formatCurrency(month.gross_income)}</td>
                  <td style={{ textAlign: 'right', padding: '12px', color: '#dc2626' }}>
                    -{formatCurrency(month.health_insurance)}
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px', color: '#dc2626' }}>
                    -{formatCurrency(month.pension)}
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px', color: '#dc2626' }}>
                    -{formatCurrency(month.income_tax)}
                  </td>
                  {profile.simulation_mode === 'alg' && (
                    <td style={{ textAlign: 'right', padding: '12px', color: '#16a34a' }}>
                      +{formatCurrency(month.alg_received || 0)}
                    </td>
                  )}
                  {profile.simulation_mode === 'gruendungszuschuss' && (
                    <td style={{ textAlign: 'right', padding: '12px', color: '#16a34a' }}>
                      +{formatCurrency(month.gruendungszuschuss_amount || 0)}
                    </td>
                  )}
                  <td style={{ textAlign: 'right', padding: '12px', fontWeight: 'bold' }}>
                    {formatCurrency(month.net_income)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid #1f2937', fontWeight: 'bold' }}>
                <td style={{ padding: '12px' }}>Total</td>
                <td style={{ textAlign: 'right', padding: '12px' }}>{formatCurrency(annual.total_gross_income)}</td>
                <td style={{ textAlign: 'right', padding: '12px', color: '#dc2626' }}>
                  -{formatCurrency(annual.total_health_insurance)}
                </td>
                <td style={{ textAlign: 'right', padding: '12px', color: '#dc2626' }}>
                  -{formatCurrency(annual.total_pension)}
                </td>
                <td style={{ textAlign: 'right', padding: '12px', color: '#dc2626' }}>
                  -{formatCurrency(annual.total_income_tax)}
                </td>
                {profile.simulation_mode === 'alg' && (
                  <td style={{ textAlign: 'right', padding: '12px', color: '#16a34a' }}>
                    +{formatCurrency(annual.total_alg_received)}
                  </td>
                )}
                {profile.simulation_mode === 'gruendungszuschuss' && (
                  <td style={{ textAlign: 'right', padding: '12px', color: '#16a34a' }}>
                    +{formatCurrency(annual.total_gruendungszuschuss)}
                  </td>
                )}
                <td style={{ textAlign: 'right', padding: '12px' }}>{formatCurrency(annual.total_net_income)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px', background: '#eff6ff' }}>
        <h3 style={{ marginBottom: '12px', color: '#1e40af' }}>About Your Simulation Mode</h3>
        {profile.simulation_mode === 'kleinunternehmer' && (
          <div style={{ color: '#1e3a8a' }}>
            <p><strong>Kleinunternehmer (Small Business)</strong></p>
            <p style={{ marginTop: '8px', fontSize: '14px' }}>
              You're taxed as a small business. Income below €25,000 (last year) and €100,000 (this year) means no VAT.
              {profile.ksk_eligible && ' As a KSK member, you only pay 50% of social contributions.'}
            </p>
          </div>
        )}
        {profile.simulation_mode === 'alg' && (
          <div style={{ color: '#1e3a8a' }}>
            <p><strong>Arbeitslosengeld (Unemployment Benefit)</strong></p>
            <p style={{ marginTop: '8px', fontSize: '14px' }}>
              You receive ALG and can work up to 15 hours/week. Income up to €165/month has no deduction.
              Above €165, the excess is deducted from your ALG. Social insurance covered by Arbeitsagentur.
            </p>
          </div>
        )}
        {profile.simulation_mode === 'gruendungszuschuss' && (
          <div style={{ color: '#1e3a8a' }}>
            <p><strong>Gründungszuschuss (Startup Grant)</strong></p>
            <p style={{ marginTop: '8px', fontSize: '14px' }}>
              Phase 1 (6 months): Previous ALG + €300/month. Phase 2 (9 months): €300/month.
              You pay social contributions like a Kleinunternehmer.
              {profile.ksk_eligible && ' With KSK, you pay only 50% of contributions.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
