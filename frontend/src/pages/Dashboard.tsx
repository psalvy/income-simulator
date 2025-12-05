import { useState, useEffect } from 'react';
import { User, Profile, Gig, CalculationResponse } from '../types';
import Calendar from '../components/Calendar';
import Statistics from '../components/Statistics';
import Settings from '../components/Settings';

const API_URL = 'http://localhost:5000/api';

interface DashboardProps {
  user: User;
  onBack: () => void;
}

function Dashboard({ user, onBack }: DashboardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [calculations, setCalculations] = useState<CalculationResponse | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState<'calendar' | 'stats' | 'settings'>('calendar');

  useEffect(() => {
    fetchProfile();
    fetchGigs();
  }, [user.id, currentYear]);

  useEffect(() => {
    if (profile) {
      fetchCalculations();
    }
  }, [profile, gigs, currentYear]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/profiles/user/${user.id}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchGigs = async () => {
    try {
      const response = await fetch(`${API_URL}/gigs/user/${user.id}`);
      const data = await response.json();
      setGigs(data);
    } catch (error) {
      console.error('Failed to fetch gigs:', error);
    }
  };

  const fetchCalculations = async () => {
    try {
      const response = await fetch(`${API_URL}/calculations/user/${user.id}/year/${currentYear}`);
      const data = await response.json();
      setCalculations(data);
    } catch (error) {
      console.error('Failed to fetch calculations:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;

    try {
      const response = await fetch(`${API_URL}/profiles/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const createGig = async (gig: Omit<Gig, 'id' | 'created_at'>) => {
    try {
      const response = await fetch(`${API_URL}/gigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gig),
      });
      const newGig = await response.json();
      setGigs([...gigs, newGig]);
    } catch (error) {
      console.error('Failed to create gig:', error);
    }
  };

  const updateGig = async (gigId: number, updates: Partial<Gig>) => {
    try {
      const response = await fetch(`${API_URL}/gigs/${gigId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedGig = await response.json();
      setGigs(gigs.map(g => g.id === gigId ? updatedGig : g));
    } catch (error) {
      console.error('Failed to update gig:', error);
    }
  };

  const deleteGig = async (gigId: number) => {
    try {
      await fetch(`${API_URL}/gigs/${gigId}`, { method: 'DELETE' });
      setGigs(gigs.filter(g => g.id !== gigId));
    } catch (error) {
      console.error('Failed to delete gig:', error);
    }
  };

  if (!profile) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2>{user.name}'s Income Dashboard</h2>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>
              Mode: {profile.simulation_mode === 'alg' ? 'Arbeitslosengeld' :
                     profile.simulation_mode === 'kleinunternehmer' ? 'Kleinunternehmer' :
                     'Gründungszuschuss'}
            </p>
          </div>
          <button className="btn btn-secondary" onClick={onBack}>
            Change Profile
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '2px solid #e5e7eb' }}>
          <button
            className="btn"
            style={{
              backgroundColor: activeTab === 'calendar' ? '#eff6ff' : 'transparent',
              color: activeTab === 'calendar' ? '#2563eb' : '#6b7280',
              borderRadius: '4px 4px 0 0',
            }}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar & Gigs
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: activeTab === 'stats' ? '#eff6ff' : 'transparent',
              color: activeTab === 'stats' ? '#2563eb' : '#6b7280',
              borderRadius: '4px 4px 0 0',
            }}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: activeTab === 'settings' ? '#eff6ff' : 'transparent',
              color: activeTab === 'settings' ? '#2563eb' : '#6b7280',
              borderRadius: '4px 4px 0 0',
            }}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {activeTab === 'calendar' && (
          <Calendar
            userId={user.id}
            gigs={gigs}
            year={currentYear}
            onYearChange={setCurrentYear}
            onCreateGig={createGig}
            onUpdateGig={updateGig}
            onDeleteGig={deleteGig}
          />
        )}

        {activeTab === 'stats' && calculations && (
          <Statistics
            calculations={calculations}
            year={currentYear}
          />
        )}

        {activeTab === 'settings' && (
          <Settings
            profile={profile}
            onUpdateProfile={updateProfile}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
