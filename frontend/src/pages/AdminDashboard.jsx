import { useState, useEffect } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import StatCard from '../components/admin/StatCard'
import RevenueChart from '../components/admin/RevenueChart'
import RecentEnrollments from '../components/admin/RecentEnrollments'
import TrendingCourses from '../components/admin/TrendingCourses'
import { Sun, Moon, Bell } from 'lucide-react'

const dummyEnrollments = [
  { name: 'Arjun Sharma', course: 'React Masterclass', date: 'Mar 28', status: 'Active',  amount: 2999 },
  { name: 'Priya Patel',  course: 'AI/ML Bootcamp',    date: 'Mar 26', status: 'Active',  amount: 4999 },
  { name: 'Rahul Mehta',  course: 'Python for ML',     date: 'Mar 26', status: 'Pending', amount: 1999 },
  { name: 'Sneha Joshi',  course: 'UI/UX Design',      date: 'Mar 25', status: 'Active',  amount: 3499 },
  { name: 'Vikram Nair',  course: 'Data Analytics',    date: 'Mar 25', status: 'Refund',  amount: 2499 },
]

const dummyRevenue = [
  { month: 'Jan', amount: 48200  },
  { month: 'Feb', amount: 61500  },
  { month: 'Mar', amount: 284500 },
]

export default function AdminDashboard() {
  const [stats, setStats]              = useState([])
  const [enrollments]                  = useState(dummyEnrollments)
  const [revenueData]                  = useState(dummyRevenue)
  const [trendingCourses, setTrending] = useState([])
  const [loading, setLoading]          = useState(true)
  const [dark, setDark]                = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/courses/stats/cards')
      .then(r => r.json())
      .then(data => {
        setStats([
          { label: 'Total Users',     value: data.totalUsers?.toLocaleString()       || '0', percent: 12.8, up: true,  color: '#00BFA5', icon: '👥' },
          { label: 'Active Courses',  value: data.totalCourses?.toLocaleString()     || '0', percent: 14.6, up: true,  color: '#378ADD', icon: '📚' },
          { label: 'Total Revenue',   value: `₹${(data.totalRevenue||0).toLocaleString()}`,  percent: 51.3, up: true,  color: '#FF6B35', icon: '💰' },
          { label: 'Enrollments',     value: data.totalEnrollments?.toLocaleString() || '0', percent: 3.1,  up: false, color: '#7F77DD', icon: '📝' },
          { label: 'Instructors',     value: data.totalInstructors?.toLocaleString() || '0', percent: 3.7,  up: true,  color: '#E24B4A', icon: '🏫' },
          { label: 'Completion Rate', value: `${data.completionRate || 0}%`,                 percent: 2.4,  up: true,  color: '#639922', icon: '🎯' },
        ])
      })
      .catch(() => {})

    fetch('http://localhost:5000/api/courses')
      .then(r => r.json())
      .then(data => {
        const courses = Array.isArray(data) ? data : data.courses || []
        const colors  = ['#00BFA5', '#378ADD', '#7F77DD', '#FF6B35', '#BA7517']
        setTrending(
          courses.slice(0, 5).map((c, i) => ({
            title:    c.title || c.name,
            category: c.category || 'Course',
            students: c.students || 0,
            rating:   c.rating   || 4.5,
            color:    colors[i % colors.length],
          }))
        )
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const bg      = dark ? '#0f1623' : '#F4F7FE'
  const cardBg  = dark ? '#1a2332' : '#ffffff'
  const border  = dark ? '#2a3a4a' : '#e8e8e8'
  const txtMain = dark ? '#ffffff' : '#1A1D2E'
  const txtMute = dark ? '#64748b' : '#888888'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, transition: 'all 0.3s' }}>
      <AdminSidebar dark={dark} />

      <main style={{ flex: 1, padding: 24, overflow: 'auto' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: txtMain }}>
              Admin Dashboard
            </h1>
            <p style={{ fontSize: 13, color: txtMute, marginTop: 4 }}>
              Here's what's happening with UptoSkills today
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Dark/Light toggle */}
            <button
              onClick={() => setDark(!dark)}
              style={{
                width: 40, height: 40, borderRadius: 10, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: cardBg, border: `1px solid ${border}`,
                color: dark ? '#facc15' : '#64748b', transition: 'all 0.3s'
              }}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Bell */}
            <div style={{ position: 'relative', width: 40, height: 40,
                          borderRadius: 10, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', background: cardBg,
                          border: `1px solid ${border}`, cursor: 'pointer' }}>
              <Bell size={18} color={dark ? '#94a3b8' : '#64748b'} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 8,
                             height: 8, background: '#ef4444', borderRadius: '50%',
                             border: '2px solid white' }} />
            </div>

            {/* Date */}
            <span style={{ fontSize: 13, color: dark ? '#94a3b8' : '#888',
                           background: cardBg, border: `1px solid ${border}`,
                           padding: '6px 12px', borderRadius: 8 }}>
              {new Date().toLocaleDateString('en-IN',
                { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>

            {/* Avatar */}
            <div style={{ width: 36, height: 36, borderRadius: '50%',
                          background: '#00BFA5', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 700, fontSize: 13 }}>
              A
            </div>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '16px 0', fontSize: 13 }}>
            Loading data...
          </div>
        )}

        {/* Stat Cards */}
        {stats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                        gap: 16, marginBottom: 20 }}>
            {stats.map((s) => <StatCard key={s.label} {...s} dark={dark} />)}
          </div>
        )}

        {/* Middle row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr',
                      gap: 16, marginBottom: 20 }}>
          <RecentEnrollments data={enrollments} dark={dark} />
          <RevenueChart data={revenueData} dark={dark} />
        </div>

        {/* Trending Courses */}
        {trendingCourses.length > 0 && (
          <TrendingCourses data={trendingCourses} dark={dark} />
        )}

      </main>
    </div>
  )
}