import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, BookOpen,
  BarChart2, FileText, Settings, LogOut
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Users',     icon: Users,           path: '/admin/users'     },
  { label: 'Courses',   icon: BookOpen,        path: '/admin/courses'   },
  { label: 'Analytics', icon: BarChart2,       path: '/admin/analytics' },
  { label: 'Reports',   icon: FileText,        path: '/admin/reports'   },
  { label: 'Settings',  icon: Settings,        path: '/admin/settings'  },
]

export default function AdminSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const active   = location.pathname

  return (
    <aside className="w-60 min-h-screen bg-[#0f1623] flex flex-col">

      {/* Logo */}
      <div className="px-5 py-5">
        <div className="bg-[#1a2332] rounded-xl px-4 py-3">
          <span className="text-[#00BFA5] font-bold text-lg">Upto</span>
          <span className="text-[#FF6B35] font-bold text-lg">Skills</span>
          <span className="text-slate-400 text-xs ml-2">ADMIN</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 mt-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = active === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                          text-sm font-medium transition-all
                          ${isActive
                            ? 'bg-[#00BFA5] text-white'
                            : 'text-slate-400 hover:bg-[#1a2332] hover:text-white'
                          }`}
            >
              <Icon size={17} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-[#2a3a4a] my-3" />

      {/* Admin info */}
      <div className="px-3 pb-5">
        <div className="bg-[#1a2332] rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00BFA5] flex items-center
                          justify-center text-white font-bold text-sm flex-shrink-0">
            A
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Admin User</p>
            <p className="text-slate-400 text-xs">Super Admin</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 mt-2
                           rounded-lg text-slate-400 hover:bg-red-500/10
                           hover:text-red-400 text-sm transition-all">
          <LogOut size={16} />
          Logout
        </button>
      </div>

    </aside>
  )
}