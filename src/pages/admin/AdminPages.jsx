import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout, StatCard, StatusBadge, FilterTabs, Toast, EmptyState } from '../../components/Shared'
import { mockCompanies, mockSchools, mockBookings } from '../../data/mockData'
import {
  Building2, GraduationCap, BookOpen, AlertCircle, Search, Download,
  CheckCircle, XCircle, Eye, UserX, ChevronRight, TrendingUp, Clock, Users
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

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
  return (
    <DashboardLayout role="admin" userName="Admin" title="Admin Dashboard">
      {/* Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center gap-4 animate-fade-in">
        <AlertCircle size={22} className="text-amber-500 flex-shrink-0" />
        <div>
          <p className="font-semibold text-amber-800 text-sm">3 accounts awaiting verification</p>
          <p className="text-amber-700 text-xs mt-0.5">New registrations need to be reviewed and approved.</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Link to="/admin/companies" className="text-xs bg-amber-200 text-amber-800 font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-300 transition-colors">Review →</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Building2} label="Total Companies" value={mockCompanies.length} color="primary" trend="+2 this month" />
        <StatCard icon={GraduationCap} label="Total Schools" value={mockSchools.length} color="blue" />
        <StatCard icon={BookOpen} label="Total Bookings" value={mockBookings.length} color="green" />
        <StatCard icon={Clock} label="Pending Verifications" value="3" color="amber" />
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
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
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

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="section-title text-base">Pending Companies</h3>
            <Link to="/admin/companies" className="text-xs text-primary font-medium">View all <ChevronRight size={14} className="inline" /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {mockCompanies.filter(c => c.status === 'pending').map(c => (
              <div key={c.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm text-text-primary">{c.name}</p>
                  <p className="text-text-secondary text-xs">{c.industry} · {c.location}</p>
                </div>
                <Link to={`/admin/company/${c.id}`} className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors font-medium">Review</Link>
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
            {mockSchools.filter(s => s.status === 'pending').map(s => (
              <div key={s.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm text-text-primary">{s.name}</p>
                  <p className="text-text-secondary text-xs">{s.type} · {s.district}, {s.region}</p>
                </div>
                <Link to={`/admin/school/${s.id}`} className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors font-medium">Review</Link>
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
  const [companies, setCompanies] = useState(mockCompanies)
  const [toast, setToast] = useState(null)

  const filters = ['All', 'Verified', 'Pending', 'Deactivated']
  const filtered = companies.filter(c => {
    const q = search.toLowerCase()
    const match = !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q)
    const status = filter === 'All' || c.status.toLowerCase() === filter.toLowerCase()
    return match && status
  })

  const verify = (id) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: 'verified' } : c))
    setToast({ message: 'Company verified successfully!', type: 'success' })
  }
  const deactivate = (id) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: 'deactivated' } : c))
    setToast({ message: 'Company deactivated', type: 'info' })
  }

  return (
    <DashboardLayout role="admin" userName="Admin" title="Manage Companies">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." className="input-field pl-10 text-sm" />
        </div>
        <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-surface/50">
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Company</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Industry</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Location</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Slots</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-sm text-text-primary">{c.name}</p>
                    <p className="text-xs text-text-secondary font-mono">{c.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{c.industry}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{c.location}</td>
                  <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">{c.slots}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      <Link to={`/admin/company/${c.id}`} className="text-xs py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-text-secondary transition-colors font-medium inline-flex items-center gap-1"><Eye size={12} /> View</Link>
                      {c.status === 'pending' && <button onClick={() => verify(c.id)} className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium"><CheckCircle size={12} className="inline mr-1" />Verify</button>}
                      {c.status !== 'deactivated' && <button onClick={() => deactivate(c.id)} className="text-xs py-1.5 px-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium"><UserX size={12} className="inline mr-1" />Deactivate</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Admin Company Detail ─────────────────────────────────────────────────────
export function AdminCompanyDetail() {
  const company = mockCompanies[0]
  const [status, setStatus] = useState(company.status)
  const [toast, setToast] = useState(null)
  const companyBookings = mockBookings.filter(b => b.company === 'Ecobank Ghana')

  return (
    <DashboardLayout role="admin" userName="Admin" title="Company Detail">
      <div className="max-w-3xl">
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display text-2xl font-bold">{company.name.charAt(0)}</div>
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary">{company.name}</h2>
                <p className="text-text-secondary text-sm">{company.industry} · {company.location}</p>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            {[['Email', company.email], ['Slots Created', company.slots], ['Joined', company.joined], ['Location', company.location]].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
                <p className="text-text-primary font-medium text-sm">{v}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {status !== 'verified' && (
              <button onClick={() => { setStatus('verified'); setToast({ message: 'Company verified!', type: 'success' }) }}
                className="btn-secondary gap-2"><CheckCircle size={16} /> Verify Account</button>
            )}
            {status !== 'deactivated' && (
              <button onClick={() => { setStatus('deactivated'); setToast({ message: 'Account deactivated', type: 'info' }) }}
                className="bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2 text-sm">
                <UserX size={16} /> Deactivate
              </button>
            )}
            {status === 'deactivated' && (
              <button onClick={() => { setStatus('verified'); setToast({ message: 'Account reactivated!', type: 'success' }) }}
                className="btn-outline gap-2"><CheckCircle size={16} /> Reactivate</button>
            )}
          </div>
        </div>

        {/* Bookings */}
        <div className="card">
          <div className="p-6 border-b border-gray-50">
            <h3 className="section-title text-base">Booking History</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {companyBookings.length === 0 ? (
              <p className="text-center text-text-secondary text-sm py-8">No bookings yet</p>
            ) : companyBookings.map(b => (
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
  const [schools, setSchools] = useState(mockSchools)
  const [toast, setToast] = useState(null)

  const filters = ['All', 'Verified', 'Pending']
  const filtered = schools.filter(s => {
    const q = search.toLowerCase()
    const match = !q || s.name.toLowerCase().includes(q) || s.region.toLowerCase().includes(q)
    const status = filter === 'All' || s.status === filter.toLowerCase()
    return match && status
  })

  const verify = (id) => { setSchools(p => p.map(s => s.id === id ? { ...s, status: 'verified' } : s)); setToast({ message: 'School verified!', type: 'success' }) }

  return (
    <DashboardLayout role="admin" userName="Admin" title="Manage Schools">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search schools..." className="input-field pl-10 text-sm" />
        </div>
        <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-surface/50">
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Type</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Location</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Bookings</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-sm text-text-primary">{s.name}</p>
                    <p className="text-xs text-text-secondary">Joined {s.joined}</p>
                  </td>
                  <td className="px-6 py-4"><span className="badge bg-blue-50 text-blue-700">{s.type}</span></td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{s.district}, {s.region}</td>
                  <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">{s.bookings}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link to={`/admin/school/${s.id}`} className="text-xs py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-text-secondary transition-colors font-medium"><Eye size={12} className="inline mr-1" />View</Link>
                      {s.status === 'pending' && <button onClick={() => verify(s.id)} className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium"><CheckCircle size={12} className="inline mr-1" />Verify</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Admin School Detail ──────────────────────────────────────────────────────
export function AdminSchoolDetail() {
  const school = mockSchools[0]
  const [status, setStatus] = useState(school.status)
  const [toast, setToast] = useState(null)

  return (
    <DashboardLayout role="admin" userName="Admin" title="School Detail">
      <div className="max-w-3xl">
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-3xl">🏫</div>
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary">{school.name}</h2>
                <p className="text-text-secondary text-sm">{school.type} · {school.district}, {school.region}</p>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-6">
            {[['Total Bookings', school.bookings], ['Region', school.region], ['District', school.district], ['Joined', school.joined]].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
                <p className="text-text-primary font-medium text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {status !== 'verified' && <button onClick={() => { setStatus('verified'); setToast({ message: 'School verified!', type: 'success' }) }} className="btn-secondary gap-2"><CheckCircle size={16} /> Verify School</button>}
          </div>
        </div>
        <div className="card">
          <div className="p-6 border-b border-gray-50"><h3 className="section-title text-base">Booking History</h3></div>
          <div className="divide-y divide-gray-50">
            {mockBookings.map(b => (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-text-primary">{b.slotTitle}</p>
                  <p className="text-xs text-text-secondary">{b.company} · {b.date}</p>
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

// ─── Admin Bookings ───────────────────────────────────────────────────────────
export function AdminBookings() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled']

  const filtered = mockBookings.filter(b => {
    const q = search.toLowerCase()
    const match = !q || b.school.toLowerCase().includes(q) || b.company.toLowerCase().includes(q) || b.slotTitle.toLowerCase().includes(q)
    const status = filter === 'All' || b.status.toLowerCase() === filter.toLowerCase()
    return match && status
  })

  const exportCSV = () => {
    // TODO: generate CSV export via API
    const csv = ['School,Company,Slot,Date,Students,Status',
      ...filtered.map(b => `${b.school},${b.company},"${b.slotTitle}",${b.date},${b.students},${b.status}`)
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'bookings.csv'; a.click()
  }

  return (
    <DashboardLayout role="admin" userName="Admin" title="All Bookings">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by school, company, or slot..." className="input-field pl-10 text-sm" />
        </div>
        <button onClick={exportCSV} className="btn-outline text-sm whitespace-nowrap"><Download size={16} /> Export CSV</button>
      </div>
      <div className="mb-4"><FilterTabs tabs={filters} active={filter} onChange={setFilter} /></div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-surface/50">
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Company</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Slot</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Date</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Students</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-sm text-text-primary">{b.school}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{b.company}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{b.slotTitle}</td>
                  <td className="px-6 py-4 text-sm font-mono text-text-secondary">{b.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">{b.students}</td>
                  <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-text-secondary text-sm py-10">No bookings match your search</p>}
        </div>
      </div>
    </DashboardLayout>
  )
}
