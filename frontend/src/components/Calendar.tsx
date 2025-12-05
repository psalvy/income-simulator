import { useState } from 'react';
import { Gig } from '../types';

interface CalendarProps {
  userId: number;
  gigs: Gig[];
  year: number;
  onYearChange: (year: number) => void;
  onCreateGig: (gig: Omit<Gig, 'id' | 'created_at'>) => void;
  onUpdateGig: (gigId: number, updates: Partial<Gig>) => void;
  onDeleteGig: (gigId: number) => void;
}

interface GigFormData {
  date: string;
  title: string;
  price: string;
  notes: string;
}

function Calendar({ userId, gigs, year, onYearChange, onCreateGig, onUpdateGig, onDeleteGig }: CalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showGigForm, setShowGigForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editingGig, setEditingGig] = useState<Gig | null>(null);
  const [formData, setFormData] = useState<GigFormData>({
    date: '',
    title: '',
    price: '',
    notes: '',
  });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getGigsForDate = (date: string) => {
    return gigs.filter(g => g.date === date);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setFormData({ ...formData, date: dateStr });

    const dayGigs = getGigsForDate(dateStr);
    if (dayGigs.length === 0) {
      setEditingGig(null);
      setShowGigForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingGig) {
      onUpdateGig(editingGig.id, {
        date: formData.date,
        title: formData.title,
        price: parseFloat(formData.price),
        notes: formData.notes || undefined,
      });
    } else {
      onCreateGig({
        user_id: userId,
        date: formData.date,
        title: formData.title,
        price: parseFloat(formData.price),
        notes: formData.notes || undefined,
      });
    }

    setShowGigForm(false);
    setEditingGig(null);
    setFormData({ date: '', title: '', price: '', notes: '' });
  };

  const handleEdit = (gig: Gig) => {
    setEditingGig(gig);
    setFormData({
      date: gig.date,
      title: gig.title,
      price: gig.price.toString(),
      notes: gig.notes || '',
    });
    setShowGigForm(true);
  };

  const handleDelete = (gigId: number) => {
    if (confirm('Delete this gig?')) {
      onDeleteGig(gigId);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, selectedMonth);
    const firstDayRaw = getFirstDayOfMonth(year, selectedMonth);
    // Adjust for Monday start (0=Monday, 6=Sunday)
    const firstDay = (firstDayRaw + 6) % 7;
    const days = [];

    // Day headers (Monday first)
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.push(...dayHeaders.map(day => (
      <div key={`header-${day}`} style={{ textAlign: 'center', fontWeight: 'bold', padding: '8px' }}>
        {day}
      </div>
    )));

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayGigs = getGigsForDate(dateStr);
      const totalIncome = dayGigs.reduce((sum, g) => sum + g.price, 0);

      days.push(
        <div
          key={day}
          className={`calendar-day ${dayGigs.length > 0 ? 'has-gig' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>{day}</div>
          {dayGigs.length > 0 && (
            <div style={{ fontSize: '9px', lineHeight: '1.2' }}>
              {dayGigs.slice(0, 2).map((gig, idx) => (
                <div key={gig.id} style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '1px'
                }}>
                  <strong>{gig.title}</strong> €{gig.price}
                </div>
              ))}
              {dayGigs.length > 2 && (
                <div style={{ fontSize: '8px', color: '#6b7280' }}>
                  +{dayGigs.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthGigs = gigs.filter(g => g.date.startsWith(`${year}-${String(selectedMonth + 1).padStart(2, '0')}`));
  const monthIncome = monthGigs.reduce((sum, g) => sum + g.price, 0);
  const uniqueGigDays = new Set(monthGigs.map(g => g.date)).size;
  const avgPerGig = monthGigs.length > 0 ? monthIncome / monthGigs.length : 0;

  return (
    <div>
      <div className="calendar-header">
        <div>
          <button className="btn btn-secondary" onClick={() => onYearChange(year - 1)}>
            &lt;
          </button>
          <span style={{ margin: '0 16px', fontSize: '18px', fontWeight: 'bold' }}>{year}</span>
          <button className="btn btn-secondary" onClick={() => onYearChange(year + 1)}>
            &gt;
          </button>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}>
            &lt;
          </button>
          <span style={{ margin: '0 16px', fontSize: '18px', fontWeight: 'bold' }}>
            {monthNames[selectedMonth]}
          </span>
          <button className="btn btn-secondary" onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}>
            &gt;
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingGig(null); setShowGigForm(true); }}>
          Add Gig
        </button>
      </div>

      <div style={{
        marginBottom: '16px',
        padding: '16px',
        background: '#0f172a',
        borderRadius: '6px',
        border: '1px solid #334155',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Total Gigs</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{monthGigs.length}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Gig Days</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{uniqueGigDays}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Total Income</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>€{monthIncome.toFixed(2)}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Avg per Gig</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>€{avgPerGig.toFixed(2)}</div>
        </div>
      </div>

      <div className="calendar-grid">
        {renderCalendar()}
      </div>

      {selectedDate && getGigsForDate(selectedDate).length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '12px' }}>Gigs on {selectedDate}</h3>
          {getGigsForDate(selectedDate).map(gig => (
            <div key={gig.id} className="card" style={{ padding: '12px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <strong>{gig.title}</strong> - €{gig.price}
                  {gig.notes && <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{gig.notes}</p>}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" onClick={() => handleEdit(gig)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(gig.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showGigForm && (
        <div className="modal" onClick={() => setShowGigForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingGig ? 'Edit Gig' : 'Add New Gig'}</h2>
              <button className="close-btn" onClick={() => setShowGigForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Concert at Berghain"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Price (€)</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowGigForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingGig ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
