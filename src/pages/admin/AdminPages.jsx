import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout, StatCard, StatusBadge, FilterTabs, Toast, EmptyState } from '../../components/Shared'
import { mockBookings } from '../../data/mockData'
import {
  Building2, GraduationCap, BookOpen, AlertCircle, Search, Download,
  CheckCircle, XCircle, Eye, UserX, ChevronRight, Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import {
  adminGetAllCompanies, adminVerifyCompany, adminDeactivateCompany, adminActivateCompany,
  adminGetAllSchools, adminVerifySchool, adminDeactivateSchool, adminGetAllBookings
} from '../../api'

const bookingChartData = [
  { month: 'Jan', bookings: 12 }, { month: 'Feb', bookings: 19 }, { month: 'Mar', bookings: 28 },
  { month: 'Apr', bookings: 24 }, { month: 'May', bookings: 35 }, { month: 'Jun', bookings: 42 },
]
const statusData = [
  { name: 'Approved', value: 45, color: '#22C55E' },
  { name: 'Pending', value: 18, color: '#F59E0B' },
  { name: 'Completed', value: 30, color: '#3B82F6' },
  { name: 'Rejected', value: 7, color: '#EF4444' },
]

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
export function AdminDashboard() {
  const [companies, setCompanies] = useState([])
  const [schools, setSchools] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cRes, sRes, bRes] = await Promise.all([
          adminGetAllCompanies(),
          adminGetAllSchools(),
          adminGetAllBookings(),
        ])
        setCompanies(cRes.data.companies || [])
        setSchools(sRes.data.schools || [])
        setBookings(bRes.data || [])
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const pendingCompanies = companies.filter(c => !c.is_verified && c.is_active)
  const pendingSchools = schools.filter(s => !s.is_verified && s.is_active)
  const pendingCount = pendingCompanies.length + pendingSchools.length

  return (
    <DashboardLayout role="admin" userName="Admin" title="Admin Dashboard">
      {/* Alerts */}
      {pendingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center gap-4 animate-fade-in">
          <AlertCircle size={22} className="text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">{pendingCount} account{pendingCount > 1 ? 's' : ''} awaiting verification</p>
            <p className="text-amber-700 text-xs mt-0.5">New registrations need to be reviewed and approved.</p>
          </div>
          <div className="ml-auto">
            <Link to="/admin/companies" className="text-xs bg-amber-200 text-amber-800 font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-300 transition-colors">Review →</Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Building2} label="Total Companies" value={loading ? '...' : companies.length} color="primary" />
        <StatCard icon={GraduationCap} label="Total Schools" value={loading ? '...' : schools.length} color="blue" />
        <StatCard icon={BookOpen} label="Total Bookings" value={loading ? '...' : bookings.length} color="green" />
        <StatCard icon={Clock} label="Pending Verifications" value={loading ? '...' : pendingCount} color="amber" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-2">
          <h3 className="section-title text-base mb-6">Bookings Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bookingChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="bookings" stroke="#1B4332" strokeWidth={2.5} dot={{ fill: '#F4A623', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h3 className="section-title text-base mb-4">Bookings by Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11, color: '#6B7280' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="section-title text-base">Pending Companies</h3>
            <Link to="/admin/companies" className="text-xs text-primary font-medium">View all <ChevronRight size={14} className="inline" /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingCompanies.length === 0
              ? <p className="text-center text-text-secondary text-sm py-6">No pending companies</p>
              : pendingCompanies.slice(0, 5).map(c => (
                <div key={c.company_id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm text-text-primary">{c.company_name}</p>
                    <p className="text-text-secondary text-xs">{c.industry_type} · {c.region}</p>
                  </div>
                  <Link to={`/admin/company/${c.company_id}`} className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors font-medium">Review</Link>
                </div>
              ))}
          </div>
        </div>
        <div className="card">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="section-title text-base">Pending Schools</h3>
            <Link to="/admin/schools" className="text-xs text-primary font-medium">View all <ChevronRight size={14} className="inline" /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingSchools.length === 0
              ? <p className="text-center text-text-secondary text-sm py-6">No pending schools</p>
              : pendingSchools.slice(0, 5).map(s => (
                <div key={s.school_id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm text-text-primary">{s.school_name}</p>
                    <p className="text-text-secondary text-xs">{s.school_type} · {s.region}</p>
                  </div>
                  <Link to={`/admin/school/${s.school_id}`} className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors font-medium">Review</Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// ─── Admin Companies ──────────────────────────────────────────────────────────
export function AdminCompanies() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await adminGetAllCompanies()
        setCompanies(res.data.companies || [])
      } catch (err) {
        setToast({ message: 'Failed to load companies', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  // Derive status string from backend booleans
  const getStatus = (c) => {
    if (!c.is_active) return 'deactivated'
    if (!c.is_verified) return 'pending'
    return 'verified'
  }

  const filtered = companies.filter(c => {
    const q = search.toLowerCase()
    const match = !q || c.company_name.toLowerCase().includes(q) || (c.industry_type || '').toLowerCase().includes(q)
    const status = filter === 'All' || getStatus(c) === filter.toLowerCase()
    return match && status
  })

  const handleVerify = async (id) => {
    try {
      await adminVerifyCompany(id)
      setCompanies(prev => prev.map(c => c.company_id === id ? { ...c, is_verified: true } : c))
      setToast({ message: 'Company verified successfully!', type: 'success' })
    } catch (err) {
      setToast({ message: 'Failed to verify company', type: 'error' })
    }
  }

  const handleDeactivate = async (id) => {
    try {
      await adminDeactivateCompany(id)
      setCompanies(prev => prev.map(c => c.company_id === id ? { ...c, is_active: false } : c))
      setToast({ message: 'Company deactivated', type: 'info' })
    } catch (err) {
      setToast({ message: 'Failed to deactivate company', type: 'error' })
    }
  }

  const handleActivate = async (id) => {
    try {
      await adminActivateCompany(id)
      setCompanies(prev => prev.map(c => c.company_id === id ? { ...c, is_active: true } : c))
      setToast({ message: 'Company reactivated!', type: 'success' })
    } catch (err) {
      setToast({ message: 'Failed to activate company', type: 'error' })
    }
  }

  const filters = ['All', 'Verified', 'Pending', 'Deactivated']

  return (
    <DashboardLayout role="admin" userName="Admin" title="Manage Companies">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." className="input-field pl-10 text-sm" />
        </div>
        <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading companies...</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-surface/50">
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Company</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Industry</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Region</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0
                  ? <tr><td colSpan={5} className="text-center text-text-secondary text-sm py-10">No companies found</td></tr>
                  : filtered.map(c => (
                    <tr key={c.company_id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm text-text-primary">{c.company_name}</p>
                        <p className="text-xs text-text-secondary font-mono">{c.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{c.industry_type || '—'}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{c.region}</td>
                      <td className="px-6 py-4"><StatusBadge status={getStatus(c)} /></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 flex-wrap">
                          <Link to={`/admin/company/${c.company_id}`} className="text-xs py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-text-secondary transition-colors font-medium inline-flex items-center gap-1">
                            <Eye size={12} /> View
                          </Link>
                          {!c.is_verified && c.is_active && (
                            <button onClick={() => handleVerify(c.company_id)} className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium">
                              <CheckCircle size={12} className="inline mr-1" />Verify
                            </button>
                          )}
                          {c.is_active
                            ? <button onClick={() => handleDeactivate(c.company_id)} className="text-xs py-1.5 px-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium">
                                <UserX size={12} className="inline mr-1" />Deactivate
                              </button>
                            : <button onClick={() => handleActivate(c.company_id)} className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium">
                                <CheckCircle size={12} className="inline mr-1" />Activate
                              </button>
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Admin Company Detail ─────────────────────────────────────────────────────
export function AdminCompanyDetail() {
  const companyBookings = mockBookings.filter(b => b.company === 'Ecobank Ghana')
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  // Get company id from URL
  const companyId = window.location.pathname.split('/').pop()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await adminGetAllCompanies()
        const found = (res.data.companies || []).find(c => String(c.company_id) === String(companyId))
        setCompany(found || null)
      } catch (err) {
        setToast({ message: 'Failed to load company', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [companyId])

  const getStatus = (c) => {
    if (!c.is_active) return 'deactivated'
    if (!c.is_verified) return 'pending'
    return 'verified'
  }

  const handleVerify = async () => {
    try {
      await adminVerifyCompany(company.company_id)
      setCompany(prev => ({ ...prev, is_verified: true }))
      setToast({ message: 'Company verified!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to verify', type: 'error' })
    }
  }

  const handleDeactivate = async () => {
    try {
      await adminDeactivateCompany(company.company_id)
      setCompany(prev => ({ ...prev, is_active: false }))
      setToast({ message: 'Company deactivated', type: 'info' })
    } catch {
      setToast({ message: 'Failed to deactivate', type: 'error' })
    }
  }

  const handleActivate = async () => {
    try {
      await adminActivateCompany(company.company_id)
      setCompany(prev => ({ ...prev, is_active: true }))
      setToast({ message: 'Company reactivated!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to activate', type: 'error' })
    }
  }

  if (loading) return <DashboardLayout role="admin" userName="Admin" title="Company Detail"><div className="text-center py-16 text-text-secondary text-sm">Loading...</div></DashboardLayout>
  if (!company) return <DashboardLayout role="admin" userName="Admin" title="Company Detail"><div className="text-center py-16 text-text-secondary text-sm">Company not found</div></DashboardLayout>

  return (
    <DashboardLayout role="admin" userName="Admin" title="Company Detail">
      <div className="max-w-3xl">
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display text-2xl font-bold">
                {company.company_name.charAt(0)}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary">{company.company_name}</h2>
                <p className="text-text-secondary text-sm">{company.industry_type} · {company.region}</p>
              </div>
            </div>
            <StatusBadge status={getStatus(company)} />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            {[
              ['Email', company.email],
              ['Phone', company.phone_number],
              ['Address', company.company_address],
              ['Contact Person', company.contact_person],
              ['Region', company.region],
              ['Website', company.website || '—'],
            ].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
                <p className="text-text-primary font-medium text-sm">{v}</p>
              </div>
            ))}
          </div>

          {company.description && (
            <div className="bg-surface rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">About</p>
              <p className="text-text-primary text-sm">{company.description}</p>
            </div>
          )}

          <div className="flex gap-3">
            {!company.is_verified && company.is_active && (
              <button onClick={handleVerify} className="btn-secondary gap-2">
                <CheckCircle size={16} /> Verify Account
              </button>
            )}
            {company.is_active
              ? <button onClick={handleDeactivate} className="bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2 text-sm">
                  <UserX size={16} /> Deactivate
                </button>
              : <button onClick={handleActivate} className="btn-outline gap-2">
                  <CheckCircle size={16} /> Reactivate
                </button>
            }
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-gray-50">
            <h3 className="section-title text-base">Booking History</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {companyBookings.length === 0
              ? <p className="text-center text-text-secondary text-sm py-8">No bookings yet</p>
              : companyBookings.map(b => (
                <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-text-primary">{b.school}</p>
                    <p className="text-xs text-text-secondary">{b.slotTitle} · {b.date}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
          </div>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Admin Schools ────────────────────────────────────────────────────────────
export function AdminSchools() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await adminGetAllSchools()
        setSchools(res.data.schools || [])
      } catch (err) {
        setToast({ message: 'Failed to load schools', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchSchools()
  }, [])

  const getStatus = (s) => {
    if (!s.is_active) return 'deactivated'
    if (!s.is_verified) return 'pending'
    return 'verified'
  }

  const filtered = schools.filter(s => {
    const q = search.toLowerCase()
    const match = !q || s.school_name.toLowerCase().includes(q) || s.region.toLowerCase().includes(q)
    const status = filter === 'All' || getStatus(s) === filter.toLowerCase()
    return match && status
  })

  const handleVerify = async (id) => {
    try {
      await adminVerifySchool(id)
      setSchools(prev => prev.map(s => s.school_id === id ? { ...s, is_verified: true } : s))
      setToast({ message: 'School verified!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to verify school', type: 'error' })
    }
  }

  const handleDeactivate = async (id) => {
    try {
      await adminDeactivateSchool(id)
      setSchools(prev => prev.map(s => s.school_id === id ? { ...s, is_active: false } : s))
      setToast({ message: 'School deactivated', type: 'info' })
    } catch {
      setToast({ message: 'Failed to deactivate school', type: 'error' })
    }
  }

  const filters = ['All', 'Verified', 'Pending', 'Deactivated']

  return (
    <DashboardLayout role="admin" userName="Admin" title="Manage Schools">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search schools..." className="input-field pl-10 text-sm" />
        </div>
        <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading schools...</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-surface/50">
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Type</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Region</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0
                  ? <tr><td colSpan={5} className="text-center text-text-secondary text-sm py-10">No schools found</td></tr>
                  : filtered.map(s => (
                    <tr key={s.school_id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm text-text-primary">{s.school_name}</p>
                        <p className="text-xs text-text-secondary font-mono">{s.email}</p>
                      </td>
                      <td className="px-6 py-4"><span className="badge bg-blue-50 text-blue-700">{s.school_type || '—'}</span></td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{s.region}</td>
                      <td className="px-6 py-4"><StatusBadge status={getStatus(s)} /></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link to={`/admin/school/${s.school_id}`} className="text-xs py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-text-secondary transition-colors font-medium">
                            <Eye size={12} className="inline mr-1" />View
                          </Link>
                          {!s.is_verified && s.is_active && (
                            <button onClick={() => handleVerify(s.school_id)} className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium">
                              <CheckCircle size={12} className="inline mr-1" />Verify
                            </button>
                          )}
                          {s.is_active && (
                            <button onClick={() => handleDeactivate(s.school_id)} className="text-xs py-1.5 px-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium">
                              <UserX size={12} className="inline mr-1" />Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Admin School Detail ──────────────────────────────────────────────────────
export function AdminSchoolDetail() {
  const [school, setSchool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const schoolId = window.location.pathname.split('/').pop()

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await adminGetAllSchools()
        const found = (res.data.schools || []).find(s => String(s.school_id) === String(schoolId))
        setSchool(found || null)
      } catch {
        setToast({ message: 'Failed to load school', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchSchools()
  }, [schoolId])

  const getStatus = (s) => {
    if (!s.is_active) return 'deactivated'
    if (!s.is_verified) return 'pending'
    return 'verified'
  }

  const handleVerify = async () => {
    try {
      await adminVerifySchool(school.school_id)
      setSchool(prev => ({ ...prev, is_verified: true }))
      setToast({ message: 'School verified!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to verify', type: 'error' })
    }
  }

  if (loading) return <DashboardLayout role="admin" userName="Admin" title="School Detail"><div className="text-center py-16 text-text-secondary text-sm">Loading...</div></DashboardLayout>
  if (!school) return <DashboardLayout role="admin" userName="Admin" title="School Detail"><div className="text-center py-16 text-text-secondary text-sm">School not found</div></DashboardLayout>

  return (
    <DashboardLayout role="admin" userName="Admin" title="School Detail">
      <div className="max-w-3xl">
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-3xl">🏫</div>
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary">{school.school_name}</h2>
                <p className="text-text-secondary text-sm">{school.school_type} · {school.region}</p>
              </div>
            </div>
            <StatusBadge status={getStatus(school)} />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-6">
            {[
              ['Email', school.email],
              ['Phone', school.phone_number],
              ['Region', school.region],
              ['District', school.district || '—'],
            ].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
                <p className="text-text-primary font-medium text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {!school.is_verified && school.is_active && (
              <button onClick={handleVerify} className="btn-secondary gap-2">
                <CheckCircle size={16} /> Verify School
              </button>
            )}
          </div>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Admin Bookings ───────────────────────────────────────────────────────────
export function AdminBookings() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const filters = ['All', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled']

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await adminGetAllBookings()
        setBookings(res.data || [])
      } catch (err) {
        console.error('Failed to load bookings', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const filtered = bookings.filter(b => {
    const status = filter === 'All' || (b.status || '').toLowerCase() === filter.toLowerCase()
    return status
  })

  return (
    <DashboardLayout role="admin" userName="Admin" title="All Bookings">
      <div className="mb-4"><FilterTabs tabs={filters} active={filter} onChange={setFilter} /></div>
      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading bookings...</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-surface/50">
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Company</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Date</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0
                  ? <tr><td colSpan={4} className="text-center text-text-secondary text-sm py-10">No bookings found</td></tr>
                  : filtered.map(b => (
                    <tr key={b.id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-text-primary">{b.school_id}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{b.company_id}</td>
                      <td className="px-6 py-4 text-sm font-mono text-text-secondary">{b.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}