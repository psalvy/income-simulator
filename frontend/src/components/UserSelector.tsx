import { useState } from 'react';
import { User } from '../types';

interface UserSelectorProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onCreateUser: (name: string) => void;
  onDeleteUser: (userId: number) => void;
}

function UserSelector({ users, onSelectUser, onCreateUser, onDeleteUser }: UserSelectorProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleCreate = () => {
    if (newUserName.trim()) {
      onCreateUser(newUserName.trim());
      setNewUserName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Select Your Profile</h2>

        <div className="profile-selector">
          {users.map((user) => (
            <div
              key={user.id}
              className="profile-tile"
              onClick={() => onSelectUser(user)}
            >
              <h3>{user.name}</h3>
              <p>Created: {new Date(user.created_at).toLocaleDateString()}</p>
              <button
                className="btn btn-danger"
                style={{ marginTop: '12px', width: '100%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete profile "${user.name}"?`)) {
                    onDeleteUser(user.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))}

          {showCreateForm ? (
            <div className="profile-tile" style={{ border: '2px dashed #2563eb' }}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                  autoFocus
                />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '8px' }} onClick={handleCreate}>
                Create
              </button>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowCreateForm(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div
              className="profile-tile"
              style={{ border: '2px dashed #d1d5db', cursor: 'pointer' }}
              onClick={() => setShowCreateForm(true)}
            >
              <h3 style={{ fontSize: '48px', marginBottom: '8px' }}>+</h3>
              <p>Create New Profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSelector;
