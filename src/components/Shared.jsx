import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, Briefcase, BookOpen, Settings, LogOut,
  Bell, ChevronDown, Menu, X, CheckCircle, AlertCircle, Info,
  Building2, GraduationCap, Shield, Search
} from 'lucide-react'

// ─── Logo ───────────────────────────────────────────────────────────────────
export function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow">
        <span className="text-primary-dark font-display font-bold text-lg leading-none">C</span>
      </div>
      <span className={`font-display font-bold text-xl ${light ? 'text-white' : 'text-primary'}`}>
        Curious<span className={light ? 'text-accent' : 'text-accent'}>Minds</span>
      </span>
    </Link>
  )
}

// ─── Public Navbar ────────────────────────────────────────────────────────────
export function PublicNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Home</Link>
            <Link to="/login" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Login</Link>
            <Link to="/register-school" className="btn-outline text-sm py-2 px-4">Register School</Link>
            <Link to="/register-company" className="btn-primary text-sm py-2 px-4">Register Company</Link>
          </div>
          <button className="md:hidden p-2 text-text-secondary" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3 animate-fade-in">
            <Link to="/" className="text-text-secondary hover:text-primary text-sm font-medium px-2">Home</Link>
            <Link to="/login" className="text-text-secondary hover:text-primary text-sm font-medium px-2">Login</Link>
            <Link to="/register-school" className="btn-outline text-sm justify-center">Register School</Link>
            <Link to="/register-company" className="btn-primary text-sm justify-center">Register Company</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const companySidebarLinks = [
  { to: '/company/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/company/profile', label: 'My Profile', icon: User },
  { to: '/company/slots', label: 'Internship Slots', icon: Briefcase },
  { to: '/company/bookings', label: 'Bookings', icon: BookOpen },
  { to: '/company/settings', label: 'Settings', icon: Settings },
]
const schoolSidebarLinks = [
  { to: '/school/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/school/profile', label: 'My Profile', icon: User },
  { to: '/school/browse', label: 'Browse Opportunities', icon: Search },
  { to: '/school/bookings', label: 'My Bookings', icon: BookOpen },
  { to: '/school/settings', label: 'Settings', icon: Settings },
]
const adminSidebarLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/companies', label: 'Companies', icon: Building2 },
  { to: '/admin/schools', label: 'Schools', icon: GraduationCap },
  { to: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ role = 'company', userName = 'User', userSub = '' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const links = role === 'company' ? companySidebarLinks : role === 'school' ? schoolSidebarLinks : adminSidebarLinks
  const roleIcon = role === 'company' ? <Building2 size={16} /> : role === 'school' ? <GraduationCap size={16} /> : <Shield size={16} />
  const roleLabel = role === 'company' ? 'Company' : role === 'school' ? 'School' : 'Admin'

  return (
    <aside className={`sidebar flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && <Logo light />}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors ml-auto">
          <Menu size={18} />
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{userName}</p>
              <p className="text-white/50 text-xs flex items-center gap-1">{roleIcon} {roleLabel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`sidebar-link ${location.pathname === to ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? label : ''}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
    <div className="p-3 border-t border-white/10">
      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          navigate('/login');
        }}
        className={`sidebar-link w-full hover:bg-red-500/20 hover:text-red-300 ${collapsed ? 'justify-center px-2' : ''}`}
        title={collapsed ? 'Logout' : ''}
      >
        <LogOut size={18} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
    </aside>
  )
}

// ─── Dashboard Layout ─────────────────────────────────────────────────────────
export function DashboardLayout({ role, userName, userSub, children, title }) {
  const [notifOpen, setNotifOpen] = useState(false)
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} userName={userName} userSub={userSub} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <h1 className="page-title text-xl md:text-2xl">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-xl hover:bg-surface transition-colors text-text-secondary hover:text-primary">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-fade-in z-50">
                  <h3 className="font-semibold text-sm text-text-primary mb-3">Notifications</h3>
                  <p className="text-text-secondary text-xs">No new notifications</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {userName?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-text-primary hidden md:block">{userName}</span>
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, color = 'primary', trend }) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/20 text-accent-dark',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  }
  return (
    <div className="stat-card animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium mb-1">{label}</p>
          <p className="font-display text-3xl font-bold text-text-primary">{value}</p>
          {trend && <p className="text-xs text-green-600 mt-1 font-medium">{trend}</p>}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    pending: 'badge-pending', approved: 'badge-approved', confirmed: 'badge-approved',
    rejected: 'badge-rejected', cancelled: 'badge-cancelled', completed: 'badge-completed',
    verified: 'badge-verified', open: 'badge-open', full: 'badge-full',
    active: 'badge-approved', deactivated: 'badge-rejected',
  }
  return <span className={map[status?.toLowerCase()] || 'badge bg-gray-100 text-gray-600'}>{status}</span>
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  const styles = { success: 'bg-green-50 border-green-200 text-green-800', error: 'bg-red-50 border-red-200 text-red-800', info: 'bg-blue-50 border-blue-200 text-blue-800' }
  const icons = { success: <CheckCircle size={18} />, error: <AlertCircle size={18} />, info: <Info size={18} /> }
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-lg animate-fade-in-up font-body ${styles[type]}`}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={16} /></button>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-text-primary">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-4">
        <Icon size={36} className="text-primary/40" />
      </div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm max-w-xs mb-6">{desc}</p>
      {action}
    </div>
  )
}

// ─── Slot Card ────────────────────────────────────────────────────────────────
export function SlotCard({ slot, role = 'school', onBook, onEdit, onDelete }) {
  const spotsLeft = slot.maxStudents - slot.bookedCount
  return (
    <div className="card p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Briefcase size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-text-primary text-sm">{slot.title}</p>
            <p className="text-text-secondary text-xs">{slot.company}</p>
          </div>
        </div>
        <StatusBadge status={spotsLeft === 0 ? 'full' : 'open'} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary mb-4">
        <span>📅 {slot.date}</span>
        <span>⏰ {slot.time}</span>
        <span>📍 {slot.location}</span>
        <span>🏛️ {slot.department}</span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-xs text-text-secondary">
          <span className={`font-semibold ${spotsLeft > 5 ? 'text-green-600' : spotsLeft > 0 ? 'text-amber-600' : 'text-red-600'}`}>{spotsLeft}</span> spots left
        </span>
        {role === 'school' && (
          <Link to={`/school/slot/${slot.id}`} className="btn-primary text-xs py-2 px-4">View & Book</Link>
        )}
        {role === 'company' && (
          <div className="flex gap-2">
            <button onClick={() => onEdit?.(slot)} className="btn-ghost text-xs py-1.5 px-3">Edit</button>
            <button onClick={() => onDelete?.(slot)} className="text-xs py-1.5 px-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="kente-border" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo light />
            <p className="text-white/60 text-sm mt-3 max-w-xs leading-relaxed">
              Connecting Ghana's brightest young minds with industry-leading companies through structured internship experiences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              {['For Schools', 'For Companies', 'How it Works'].map(l => (
                <Link key={l} to="/" className="text-white/50 hover:text-accent text-sm transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-3">Support</h4>
            <div className="flex flex-col gap-2">
              {['Contact Us', 'FAQs', 'Privacy Policy'].map(l => (
                <a key={l} href="#" className="text-white/50 hover:text-accent text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© 2025 CuriousMinds Ghana. All rights reserved.</p>
          <p className="text-white/40 text-xs">Built for Ghana's Future Workforce 🇬🇭</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Kente Divider ────────────────────────────────────────────────────────────
export function KenteDivider() {
  return <div className="kente-border my-0" />
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────
export function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            active === tab ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// ─── Form helpers ─────────────────────────────────────────────────────────────
export function FormField({ label, error, children, hint }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {hint && <p className="text-xs text-text-secondary mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
