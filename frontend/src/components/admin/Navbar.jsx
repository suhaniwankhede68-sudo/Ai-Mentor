import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 28px',
      background: '#fff', borderBottom: '1px solid #eee', gap: 16 }}>

      <div>
        <div style={{ fontSize: 20, fontWeight: 600 }}>Dashboard Overview</div>
        <div style={{ fontSize: 13, color: '#888' }}>
          Here's what's happening with UptoSkills today
        </div>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8,
          background: '#f4f6f9', border: '1px solid #e0e0e0',
          borderRadius: 8, padding: '8px 14px' }}>
          <Search size={14} color="#aaa" />
          <input
            placeholder="Search users, courses..."
            style={{ border: 'none', background: 'none', outline: 'none',
              fontSize: 13, color: '#333', width: 200 }}
          />
        </div>

        {/* Notification bell */}
        <div style={{ position: 'relative', cursor: 'pointer',
          width: 36, height: 36, background: '#f4f6f9',
          border: '1px solid #e0e0e0', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={16} color="#555" />
          <span style={{
            position: 'absolute', top: 7, right: 8,
            width: 7, height: 7, background: '#e74c3c',
            borderRadius: '50%', border: '1.5px solid #fff'
          }} />
        </div>

        {/* Date */}
        <div style={{ fontSize: 12, color: '#666', background: '#f4f6f9',
          border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px' }}>
          02 Apr 2026
        </div>

        {/* Avatar */}
        <div style={{ width: 34, height: 34, borderRadius: '50%',
          background: '#1dd1a1', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 600, fontSize: 14, color: '#000' }}>
          A
        </div>
      </div>
    </div>
  );
}