import { useState } from 'react'

export default function RecentEnrollments({ data, dark = true }) {
  const [search, setSearch] = useState('')

  const filtered = data.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.course?.toLowerCase().includes(search.toLowerCase())
  )

  const statusStyle = {
    Active:  { bg: dark ? '#0a3d2a' : '#E1F5EE', color: dark ? '#1dd1a1' : '#0F6E56' },
    Pending: { bg: dark ? '#3d2a0a' : '#FAEEDA', color: dark ? '#f59e0b' : '#854F0B' },
    Refund:  { bg: dark ? '#3d0a0a' : '#FCEBEB', color: dark ? '#ff6b6b' : '#A32D2D' },
  }

  return (
    <div style={{
      background: dark ? '#1a2332' : '#ffffff',
      borderRadius: 12, padding: 20,
      border: dark ? '1px solid #2a3a4a' : '1px solid #e8e8e8',
      minHeight: 520, transition: 'all 0.3s'
    }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700,
                     color: dark ? '#fff' : '#1A1D2E' }}>
          Recent Enrollments
        </h3>
        <input
          placeholder="Search student..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: dark ? '#0f1623' : '#F4F7FE',
            border: dark ? '1px solid #2a3a4a' : '1px solid #e8e8e8',
            borderRadius: 6, padding: '5px 10px',
            fontSize: 12, color: dark ? '#94a3b8' : '#888',
            outline: 'none', width: 160
          }}
        />
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.7fr 0.8fr 0.8fr',
        fontSize: 12, color: dark ? '#64748b' : '#888',
        fontWeight: 500, paddingBottom: 10,
        borderBottom: dark ? '1px solid #2a3a4a' : '1px solid #eee'
      }}>
        <span>Student</span>
        <span>Course</span>
        <span>Date</span>
        <span>Status</span>
        <span style={{ textAlign: 'right' }}>Amount</span>
      </div>

      {/* Rows */}
      <div>
        {filtered.map((row, i) => {
          const s = statusStyle[row.status] || statusStyle.Active
          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.2fr 0.7fr 0.8fr 0.8fr',
              alignItems: 'center', padding: '12px 0',
              borderBottom: dark ? '1px solid #1e293b' : '1px solid #f5f5f5',
              fontSize: 13
            }}>
              <span style={{ fontWeight: 600,
                             color: dark ? '#fff' : '#1A1D2E' }}>
                {row.name}
              </span>
              <span style={{ color: dark ? '#94a3b8' : '#555' }}>
                {row.course}
              </span>
              <span style={{ fontSize: 12,
                             color: dark ? '#64748b' : '#888' }}>
                {row.date}
              </span>
              <span style={{
                display: 'inline-block', padding: '2px 10px',
                borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: s.bg, color: s.color, width: 'fit-content'
              }}>
                {row.status}
              </span>
              <span style={{ textAlign: 'right', fontWeight: 700,
                             color: dark ? '#fff' : '#1A1D2E' }}>
                ₹{row.amount?.toLocaleString('en-IN') ?? '—'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}