function Documentation() {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Documentation & Sources</h2>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>About This Tool</h3>
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          This income simulator helps independent artists in Berlin understand their tax obligations and social
          contributions under different German business structures. All calculations are based on 2025 regulations.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>1. Kleinunternehmer (Small Business)</h3>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>Eligibility (2025)</h4>
        <ul style={{ marginLeft: '20px', color: '#6b7280', lineHeight: '1.8' }}>
          <li>Previous year turnover: &lt;€25,000 (NET)</li>
          <li>Current year expected: &lt;€100,000 (NET)</li>
          <li>No VAT charged on invoices, no VAT returns required</li>
          <li>Artists/freelancers exempt from Gewerbesteuer (trade tax)</li>
        </ul>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>How It's Calculated</h4>
        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #334155' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '8px', color: '#f1f5f9' }}>
            <strong>Social Contributions (Monthly Income × Rate):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Health Insurance: Income × 14.6%</li>
            <li>Pension: Income × 18.6%</li>
            <li>Nursing Care: Income × 3.05%</li>
          </ul>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '8px', color: '#f1f5f9' }}>
            <strong>With KSK:</strong> You pay only 50% of these amounts!
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '12px', color: '#f1f5f9' }}>
            <strong>Income Tax (Annual):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>First €12,096: 0% (tax-free allowance)</li>
            <li>€12,096 - €23,406: 14% progressive</li>
            <li>€23,406 - €63,515: 24%</li>
            <li>€63,515 - €277,825: 42%</li>
            <li>Above €277,825: 45%</li>
          </ul>
        </div>

        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          <strong>Sources:</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#2563eb' }}>
          <li><a href="https://norman.finance/blog/kleinunternehmer" target="_blank" rel="noopener">Kleinunternehmer 2025 Guide</a></li>
          <li><a href="https://www.jobbers.io/the-complete-german-freelancer-tax-calculator-guide-2025/" target="_blank" rel="noopener">German Freelancer Tax Guide 2025</a></li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>2. Arbeitslosengeld (Unemployment Benefit + De-registration)</h3>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>How It Works</h4>
        <ul style={{ marginLeft: '20px', color: '#6b7280', lineHeight: '1.8' }}>
          <li>You receive monthly ALG payments while registered as unemployed</li>
          <li>Can work max 15 hours/week while maintaining unemployment status</li>
          <li>For days with gigs, you can de-register temporarily</li>
        </ul>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>How It's Calculated</h4>
        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #334155' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '8px', color: '#f1f5f9' }}>
            <strong>While Registered (working &lt;15h/week):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Income up to €165/month: No deduction from ALG</li>
            <li>Income above €165: Excess deducted from ALG</li>
            <li>Social insurance: Covered by Arbeitsagentur (€0 for you)</li>
          </ul>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '12px', color: '#f1f5f9' }}>
            <strong>De-registered Days (for gigs):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>No income limit on those days</li>
            <li>No ALG payment for de-registered days</li>
            <li><strong>Minimum health insurance:</strong> ~€7-9/day (~€213-266/month minimum)</li>
            <li>Social contributions prorated by working days in month</li>
            <li>Calculated like Kleinunternehmer for working days only</li>
          </ul>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '12px', color: '#f1f5f9' }}>
            <strong>Example:</strong> 3 gig days in a 30-day month, €600 income
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>27 days: Receive (27/30) × ALG = €1,080</li>
            <li>3 days: Pay minimum ~€24 health insurance + prorated contributions</li>
            <li>Net: €600 + €1,080 - contributions = ~€1,650</li>
          </ul>
        </div>

        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          <strong>Sources:</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#3b82f6' }}>
          <li><a href="https://www.iamexpat.de/expat-info/social-security/unemployment-benefits-germany-arbeitslosengeld" target="_blank" rel="noopener" style={{ color: '#3b82f6' }}>Unemployment Benefits in Germany</a></li>
          <li><a href="https://liveingermany.de/unemployment-benefits-in-germany-arbeitslosengeld/" target="_blank" rel="noopener" style={{ color: '#3b82f6' }}>Unemployment Benefits Guide</a></li>
          <li><a href="https://allaboutberlin.com/glossary/Mindestbeitrag" target="_blank" rel="noopener" style={{ color: '#3b82f6' }}>Minimum Health Insurance Contribution (Mindestbeitrag)</a></li>
          <li><a href="https://www.tk.de/en/become-a-member/join-tk/health-care-contribution-self-employed-2158124" target="_blank" rel="noopener" style={{ color: '#3b82f6' }}>Health Insurance Contributions for Self-Employed</a></li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>3. Gründungszuschuss (Startup Grant)</h3>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>Eligibility</h4>
        <ul style={{ marginLeft: '20px', color: '#6b7280', lineHeight: '1.8' }}>
          <li>Must be receiving ALG I with at least 150 days remaining</li>
          <li>Must prove viability through expert statement</li>
          <li>Must work at least 15 hours/week as main occupation</li>
          <li>Discretionary benefit - no legal entitlement</li>
        </ul>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>Grant Amounts</h4>
        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #334155' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '8px', color: '#f1f5f9' }}>
            <strong>Phase 1 (First 6 months):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Previous ALG amount (e.g., €1,200/month)</li>
            <li>PLUS €300/month for social security</li>
            <li>Total example: €1,500/month</li>
          </ul>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '12px', color: '#f1f5f9' }}>
            <strong>Phase 2 (Months 7-15):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>€300/month for social security</li>
            <li>Must apply separately (optional)</li>
          </ul>
        </div>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>How It's Calculated</h4>
        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #334155' }}>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Business income: Taxed like Kleinunternehmer</li>
            <li>Social contributions: Full contributions (50% if KSK eligible)</li>
            <li>Grant money: Tax-free, no repayment needed</li>
            <li>Total net income: Business income - contributions + grant</li>
          </ul>
        </div>

        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          <strong>Sources:</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#2563eb' }}>
          <li><a href="https://www.arbeitsagentur.de/en/business-start-up" target="_blank" rel="noopener">Federal Employment Agency - Start-up Grant</a></li>
          <li><a href="https://firedupspace.com/how-to-get-the-gruendungszuschuss-2024/" target="_blank" rel="noopener">Gründungszuschuss Step-by-Step Guide</a></li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>4. Künstlersozialkasse (KSK)</h3>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>What is KSK?</h4>
        <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '12px' }}>
          The KSK is Germany's social insurance fund for artists and publicists. It's like being an employee -
          the KSK covers the "employer's share" of your social contributions (50%), while you pay the "employee's share."
        </p>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>Eligibility</h4>
        <ul style={{ marginLeft: '20px', color: '#6b7280', lineHeight: '1.8' }}>
          <li>Minimum €3,901/year from artistic work (waived first 3 years)</li>
          <li>Professional, not temporary artistic activity</li>
          <li>Max 1 employee (excluding trainees/mini-jobbers)</li>
          <li>Includes: Visual artists, musicians, writers, photographers, illustrators, performers</li>
        </ul>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>The KSK Advantage</h4>
        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #334155' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '8px', color: '#f1f5f9' }}>
            <strong>Without KSK (€10,000 annual income):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Health: €1,460/year</li>
            <li>Pension: €1,860/year</li>
            <li>Nursing: €305/year</li>
            <li>Total: €3,625/year (€302/month)</li>
          </ul>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '12px', color: '#f1f5f9' }}>
            <strong>With KSK (€10,000 annual income):</strong>
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Health: €730/year (50%)</li>
            <li>Pension: €930/year (50%)</li>
            <li>Nursing: €152.50/year (50%)</li>
            <li>Total: €1,812.50/year (€151/month)</li>
            <li><strong>You save: €1,812.50/year!</strong></li>
          </ul>
        </div>

        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          <strong>Sources:</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#2563eb' }}>
          <li><a href="https://germanpedia.com/artists-social-insurance-fund/" target="_blank" rel="noopener">KSK Complete Guide 2025</a></li>
          <li><a href="https://www.settle-in-berlin.com/health-insurance-germany/ksk-insurance-guide-germany-english/" target="_blank" rel="noopener">KSK Insurance Guide</a></li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>5. Minijob (Geringfügige Beschäftigung)</h3>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>What is a Minijob?</h4>
        <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '12px' }}>
          A minijob is a part-time employment relationship with special tax treatment in Germany.
          It allows employees to earn extra income without paying income tax or standard social contributions.
        </p>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>Eligibility (2025)</h4>
        <ul style={{ marginLeft: '20px', color: '#6b7280', lineHeight: '1.8' }}>
          <li>Maximum earnings: €538/month (previously €520 in 2024)</li>
          <li>Can be combined with freelance work, ALG, or other income</li>
          <li>Employer pays flat-rate contributions (~30% to social security)</li>
          <li>Employee pays no income tax and no social contributions</li>
        </ul>

        <h4 style={{ marginTop: '12px', marginBottom: '8px', color: '#3b82f6' }}>How It Works in This Calculator</h4>
        <div style={{ background: '#0f172a', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #334155' }}>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Minijob income is added to your monthly net income</li>
            <li>No social contributions deducted from minijob income</li>
            <li>No income tax on minijob income (up to €538/month limit)</li>
            <li>Shows separately in statistics for transparency</li>
          </ul>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '12px', color: '#f1f5f9' }}>
            <strong>Example:</strong> €300/month minijob + €1,500 freelance income
          </p>
          <ul style={{ marginLeft: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <li>Freelance income: €1,500 - contributions = varies</li>
            <li>Minijob income: €300 (no deductions)</li>
            <li>Total net: Freelance net + €300</li>
          </ul>
        </div>

        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          <strong>Sources:</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#2563eb' }}>
          <li><a href="https://www.minijob-zentrale.de/EN/0_Home/01_home.html" target="_blank" rel="noopener">Official Minijob-Zentrale (English)</a></li>
          <li><a href="https://allaboutberlin.com/guides/minijob" target="_blank" rel="noopener">All About Berlin - Minijob Guide</a></li>
        </ul>
      </div>

      <div className="card" style={{ background: '#fef3c7' }}>
        <h3 style={{ marginBottom: '16px', color: '#92400e' }}>Important Disclaimers</h3>
        <ul style={{ marginLeft: '20px', color: '#92400e', lineHeight: '1.8' }}>
          <li>This tool provides estimates based on 2025 regulations</li>
          <li>Income tax calculations use simplified progressive brackets</li>
          <li>Actual taxes may vary based on personal circumstances</li>
          <li>Always consult with a tax advisor (Steuerberater) for official advice</li>
          <li>Regulations may change - verify current rules with Arbeitsagentur or Finanzamt</li>
        </ul>
      </div>
    </div>
  );
}

export default Documentation;
