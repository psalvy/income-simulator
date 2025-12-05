import { useState, useEffect } from 'react';
import { User } from './types';
import UserSelector from './components/UserSelector';
import Dashboard from './pages/Dashboard';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setLoading(false);
    }
  };

  const createUser = async (name: string) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setSelectedUser(newUser);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== userId));
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>Income Simulator for Berlin Artists</h1>
        <p>Simulate your income, taxes, and social contributions under different German business structures</p>
      </div>

      {!selectedUser ? (
        <UserSelector
          users={users}
          onSelectUser={setSelectedUser}
          onCreateUser={createUser}
          onDeleteUser={deleteUser}
        />
      ) : (
        <Dashboard
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default App;
