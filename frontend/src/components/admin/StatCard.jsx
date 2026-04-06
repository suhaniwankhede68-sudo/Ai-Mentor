const colorMap = {
  teal:   { bg: 'bg-[#E1F5EE]', text: 'text-[#0F6E56]' },
  blue:   { bg: 'bg-[#E6F1FB]', text: 'text-[#185FA5]' },
  amber:  { bg: 'bg-[#FAEEDA]', text: 'text-[#854F0B]' },
  purple: { bg: 'bg-[#EEEDFE]', text: 'text-[#534AB7]' },
  red:    { bg: 'bg-[#FCEBEB]', text: 'text-[#A32D2D]' },
  green:  { bg: 'bg-[#EAF3DE]', text: 'text-[#3B6D11]' },
}

export default function StatCard({ icon, label, value, percent = 0, color, up = true, dark = true }) {
  return (
    <div style={{
      background: dark ? '#1a2332' : '#ffffff',
      borderRadius: 12,
      border: dark ? '1px solid #2a3a4a' : '1px solid #e8e8e8',
      padding: 20, transition: 'all 0.3s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 13, color: dark ? '#8fadb8' : '#888' }}>{label}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
          background: up ? (dark ? '#0a3d2a' : '#E1F5EE') : (dark ? '#3d0a0a' : '#FCEBEB'),
          color: up ? '#1dd1a1' : '#ff6b6b'
        }}>
          {up ? '▲' : '▼'} {percent}%
        </span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700,
                    color: dark ? '#fff' : '#1A1D2E', marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: up ? '#1dd1a1' : '#ff6b6b', marginBottom: 10 }}>
        {up ? '+' : '-'}{percent}% this month
      </div>
      <div style={{ height: 3, background: dark ? '#2a3a4a' : '#f0f0f0', borderRadius: 2 }}>
        <div style={{
          height: '100%', borderRadius: 2, background: color,
          width: `${Math.min(percent, 100)}%`, transition: 'width 0.6s ease'
        }} />
      </div>
    </div>
  )
}