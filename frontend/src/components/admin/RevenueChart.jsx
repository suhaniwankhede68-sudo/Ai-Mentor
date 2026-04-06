import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

export default function RevenueChart({ data, dark = true }) {
  const max = Math.max(...data.map((d) => d.amount))

  const fmt = (n) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000  ? `₹${(n / 1000).toFixed(1)}k`
    : `₹${n}`

  return (
    <div style={{
      background: dark ? '#1a2332' : '#ffffff',
      borderRadius: 12, padding: 16,
      border: dark ? '1px solid #2a3a4a' : '1px solid #e8e8e8',
      minHeight: 520, transition: 'all 0.3s'
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700,
                   color: dark ? '#fff' : '#1A1D2E', marginBottom: 16 }}>
        Revenue Trend
      </h3>

      {/* Horizontal bars */}
      <div style={{ marginBottom: 20 }}>
        {data.map((d) => (
          <div key={d.month} style={{ display: 'flex', alignItems: 'center',
                                      gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: dark ? '#64748b' : '#888',
                           width: 24 }}>{d.month}</span>
            <div style={{ flex: 1, background: dark ? '#0f1623' : '#F4F7FE',
                          borderRadius: 5, height: 22, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 5,
                width: `${(d.amount / max) * 100}%`,
                background: d.amount === max ? '#FF6B35' : '#00BFA5',
                display: 'flex', alignItems: 'center',
                paddingLeft: 8, fontSize: 10,
                fontWeight: 600, color: '#fff',
                transition: 'width 0.5s ease'
              }}>
                {fmt(d.amount)}
              </div>
            </div>
            <span style={{ fontSize: 10, color: dark ? '#94a3b8' : '#555',
                           width: 40, textAlign: 'right' }}>
              {fmt(d.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: dark ? '1px solid #2a3a4a' : '1px solid #eee',
                    marginBottom: 16 }} />

      {/* Area Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00BFA5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00BFA5" stopOpacity={0}   />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? '#1e293b' : '#f0f0f0'}
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: dark ? '#64748b' : '#9ca3af' }}
            axisLine={false} tickLine={false}
          />

          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 10, fill: dark ? '#64748b' : '#9ca3af' }}
            axisLine={false} tickLine={false} width={48}
          />

          <Tooltip
            formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']}
            contentStyle={{
              borderRadius: 8, fontSize: 12,
              background: dark ? '#1a2332' : '#fff',
              border: dark ? '1px solid #2a3a4a' : '1px solid #e5e7eb',
              color: dark ? '#fff' : '#1A1D2E',
            }}
          />

          <Area
            type="monotone" dataKey="amount"
            stroke="#00BFA5" strokeWidth={2.5}
            fill="url(#revenueGrad)"
            dot={{ fill: '#00BFA5', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#FF6B35' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}