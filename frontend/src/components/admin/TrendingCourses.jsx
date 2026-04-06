export default function TrendingCourses({ data, dark = true }) {
  return (
    <div style={{
      background: dark ? '#1a2332' : '#ffffff',
      borderRadius: 12, padding: 20,
      border: dark ? '1px solid #2a3a4a' : '1px solid #e8e8e8',
      transition: 'all 0.3s'
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700,
                   color: dark ? '#fff' : '#1A1D2E', marginBottom: 16 }}>
        Trending Courses
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
        {data.map((c) => (
          <div key={c.title} style={{
            background: dark ? '#0f1623' : '#F4F7FE',
            borderRadius: 12, padding: 14,
            border: dark ? '1px solid #2a3a4a' : '1px solid #e8e8e8',
            borderTop: `3px solid ${c.color}`,
            cursor: 'pointer', transition: 'all 0.2s'
          }}>

            {/* Category */}
            <span style={{ fontSize: 10, fontWeight: 700,
                           color: c.color, display: 'block',
                           marginBottom: 4 }}>
              {c.category}
            </span>

            {/* Title */}
            <p style={{ fontSize: 12, fontWeight: 600,
                        color: dark ? '#fff' : '#1A1D2E',
                        marginBottom: 4, lineHeight: 1.3 }}>
              {c.title}
            </p>

            {/* Students */}
            <p style={{ fontSize: 11, color: dark ? '#64748b' : '#888',
                        marginBottom: 8 }}>
              {typeof c.students === 'number'
                ? c.students >= 1000
                  ? `${(c.students / 1000).toFixed(1)}k`
                  : c.students
                : c.students} students
            </p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center',
                          gap: 4, marginBottom: 8 }}>
              <span style={{ color: '#f0a500', fontSize: 13 }}>★</span>
              <span style={{ fontSize: 12, fontWeight: 600,
                             color: dark ? '#cbd5e1' : '#555' }}>
                {c.rating}
              </span>
            </div>

            {/* Rating bar */}
            <div style={{ height: 3,
                          background: dark ? '#2a3a4a' : '#e8e8e8',
                          borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2,
                width: `${(c.rating / 5) * 100}%`,
                background: c.color, transition: 'width 0.5s ease'
              }} />
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}