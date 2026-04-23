import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout, StatCard, StatusBadge, FilterTabs, Toast, EmptyState, SlotCard } from '../../components/Shared'
import { mockSchool, mockSlots, mockBookings, ghanaRegions, departments } from '../../data/mockData'
import { Search, BookOpen, Users, CheckCircle, TrendingUp, ChevronRight, Filter, MapPin, Calendar, X, Clock, ArrowRight } from 'lucide-react'

// ─── School Dashboard ─────────────────────────────────────────────────────────
export function SchoolDashboard() {
  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="Dashboard">
      {/* Welcome */}
      <div className="rounded-3xl p-8 mb-8 relative overflow-hidden animate-fade-in-up" style={{ background: 'linear-gradient(135deg, #1B4332, #132D22)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #F4A623 0px, #F4A623 2px, transparent 2px, transparent 20px)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Welcome back 🎓</p>
            <h2 className="font-display text-3xl font-bold text-white">{mockSchool.name}</h2>
            <p className="text-white/60 text-sm mt-1">{mockSchool.type} · {mockSchool.district}, {mockSchool.region}</p>
          </div>
          <Link to="/school/browse" className="btn-primary whitespace-nowrap">
            <Search size={18} /> Find Internships
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={BookOpen} label="Active Bookings" value="2" color="primary" />
        <StatCard icon={Clock} label="Pending Bookings" value="1" color="amber" />
        <StatCard icon={CheckCircle} label="Completed" value="3" color="green" trend="Total internships" />
        <StatCard icon={Users} label="Students Sent" value="18" color="blue" trend="All time" />
      </div>

      {/* Recent */}
      <div className="card">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="section-title text-lg">Recent Bookings</h2>
          <Link to="/school/bookings" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">View all <ChevronRight size={16} /></Link>
        </div>
        <div className="divide-y divide-gray-50">
          {mockBookings.slice(0, 4).map(b => (
            <div key={b.id} className="px-6 py-4 flex items-center gap-4 hover:bg-surface/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-text-primary truncate">{b.slotTitle}</p>
                <p className="text-text-secondary text-xs">{b.company} · {b.date}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

// ─── School Profile ───────────────────────────────────────────────────────────
export function SchoolProfile() {
  const [form, setForm] = useState(mockSchool)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSave = () => {
    setLoading(true)
    // TODO: PUT /api/school/profile
    setTimeout(() => { setLoading(false); setToast({ message: 'Profile updated!', type: 'success' }) }, 800)
  }

  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="My Profile">
      <div className="max-w-2xl">
        <div className="card p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-2xl">🏫</div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-bold text-text-primary">{form.name}</h2>
              <StatusBadge status={form.status} />
            </div>
            <p className="text-text-secondary text-sm mt-0.5">{form.type} · {form.district}</p>
          </div>
        </div>

        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="label">School Name</label>
              <input value={form.name} onChange={set('name')} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="label">School Type</label>
              <div className="flex gap-3">
                {['JHS', 'SHS', 'Both'].map(t => (
                  <label key={t} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.type === t ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-text-secondary'}`}>
                    <input type="radio" name="type" value={t} checked={form.type === t} onChange={set('type')} className="hidden" />
                    <span className="font-semibold text-sm">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <input value={form.email} onChange={set('email')} className="input-field" />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input value={form.phone} onChange={set('phone')} className="input-field" />
            </div>
            <div>
              <label className="label">District</label>
              <input value={form.district} onChange={set('district')} className="input-field" />
            </div>
            <div>
              <label className="label">Region</label>
              <select value={form.region} onChange={set('region')} className="input-field">
                {ghanaRegions.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleSave} disabled={loading} className="btn-secondary mt-6 disabled:opacity-60">
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
          </button>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── Browse Opportunities ─────────────────────────────────────────────────────
export function BrowseOpportunities() {
  const [search, setSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = mockSlots.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.company.toLowerCase().includes(q) || s.department.toLowerCase().includes(q)
    const matchRegion = !filterRegion || s.region === filterRegion
    const matchDept = !filterDept || s.department === filterDept
    return matchSearch && matchRegion && matchDept
  })

  const clearFilters = () => { setFilterRegion(''); setFilterDept('') }

  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="Browse Opportunities">
      {/* Search bar */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by company, field, or keyword..."
              className="input-field pl-12 text-sm"
            />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`btn-outline text-sm ${showFilters ? 'bg-primary text-white' : ''}`}>
            <Filter size={16} /> Filters {(filterRegion || filterDept) ? '•' : ''}
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div>
              <label className="label text-xs">Region</label>
              <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} className="input-field text-sm">
                <option value="">All Regions</option>
                {ghanaRegions.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="label text-xs">Department / Field</label>
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="input-field text-sm">
                <option value="">All Departments</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={clearFilters} className="btn-ghost text-sm text-red-500 hover:bg-red-50">
                <X size={16} /> Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-text-secondary text-sm mb-4">{filtered.length} opportunities found</p>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No results found" desc="Try adjusting your search or filter criteria." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(slot => <SlotCard key={slot.id} slot={slot} role="school" />)}
        </div>
      )}
    </DashboardLayout>
  )
}

// ─── Slot Detail ──────────────────────────────────────────────────────────────
export function SlotDetail() {
  const slot = mockSlots[0] // TODO: use useParams to get slot id, then GET /api/slots/:id
  const spotsLeft = slot.maxStudents - slot.bookedCount

  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="Slot Detail">
      <div className="max-w-2xl">
        <div className="card overflow-hidden mb-6">
          <div className="gradient-hero p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full mb-4">{slot.department}</div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">{slot.title}</h2>
            <p className="text-white/70 text-sm">{slot.company}</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[['Date', slot.date, '📅'], ['Time', slot.time, '⏰'], ['Location', slot.location, '📍'], ['Max Students', slot.maxStudents, '👥'], ['Spots Remaining', spotsLeft, '✅'], ['Region', slot.region, '🗺️']].map(([l, v, e]) => (
                <div key={l} className="bg-surface rounded-xl p-4">
                  <p className="text-xs text-text-secondary mb-1">{e} {l}</p>
                  <p className={`font-semibold text-sm ${l === 'Spots Remaining' && spotsLeft === 0 ? 'text-red-500' : 'text-text-primary'}`}>{v}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-text-primary text-sm mb-2">About this Internship</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{slot.description}</p>
            </div>

            {slot.requirements && (
              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold text-amber-700 mb-1">Requirements</p>
                <p className="text-amber-800 text-sm">{slot.requirements}</p>
              </div>
            )}

            {spotsLeft > 0 ? (
              <Link to={`/school/book/${slot.id}`} className="btn-primary w-full justify-center">
                Book This Slot <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="w-full text-center py-3 bg-gray-100 rounded-xl text-text-secondary text-sm font-medium">
                This slot is fully booked
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// ─── Book Slot ────────────────────────────────────────────────────────────────
export function BookSlot() {
  const navigate = useNavigate()
  const slot = mockSlots[0] // TODO: use useParams
  const [form, setForm] = useState({ students: '', contact: '', phone: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    const max = slot.maxStudents - slot.bookedCount
    if (!form.students || form.students < 1) e.students = 'Enter number of students'
    if (parseInt(form.students) > max) e.students = `Maximum available: ${max} spots`
    if (!form.contact) e.contact = 'Contact name required'
    if (!form.phone) e.phone = 'Phone required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    // TODO: POST /api/bookings
    setTimeout(() => { setLoading(false); navigate('/school/bookings') }, 1000)
  }

  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="Book a Slot">
      <div className="max-w-2xl">
        {/* Slot summary */}
        <div className="card p-6 mb-6 bg-primary/5 border border-primary/20">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Booking Summary</p>
          <h3 className="font-display text-lg font-bold text-text-primary">{slot.title}</h3>
          <p className="text-text-secondary text-sm mt-1">{slot.company}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-text-secondary">
            <span>📅 {slot.date}</span>
            <span>⏰ {slot.time}</span>
            <span>📍 {slot.location}</span>
            <span>✅ {slot.maxStudents - slot.bookedCount} spots left</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="flex flex-col gap-5">
            <div>
              <label className="label">Number of Students</label>
              <input type="number" min="1" max={slot.maxStudents - slot.bookedCount}
                value={form.students} onChange={set('students')}
                placeholder={`Max: ${slot.maxStudents - slot.bookedCount}`}
                className={`input-field ${errors.students ? 'border-red-300' : ''}`} />
              {errors.students && <p className="text-xs text-red-500 mt-1">{errors.students}</p>}
            </div>
            <div>
              <label className="label">Contact Person at School</label>
              <input value={form.contact} onChange={set('contact')} placeholder="e.g. Mr. Kofi Asante" className={`input-field ${errors.contact ? 'border-red-300' : ''}`} />
              {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
            </div>
            <div>
              <label className="label">Contact Phone</label>
              <input value={form.phone} onChange={set('phone')} placeholder="+233 24 000 0000" className={`input-field ${errors.phone ? 'border-red-300' : ''}`} />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="label">Notes <span className="text-text-secondary font-normal">(optional)</span></label>
              <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Any additional information for the company..." className="input-field resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => navigate(-1)} className="btn-outline flex-1 justify-center">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60">
                {loading ? <span className="w-4 h-4 border-2 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" /> : <>Confirm Booking <CheckCircle size={16} /></>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

// ─── School Bookings ──────────────────────────────────────────────────────────
export function SchoolBookings() {
  const [filter, setFilter] = useState('All')
  const [bookings, setBookings] = useState(mockBookings)
  const [cancelModal, setCancelModal] = useState(null)
  const [toast, setToast] = useState(null)

  const filters = ['All', 'Pending', 'Approved', 'Cancelled', 'Completed']
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status.toLowerCase() === filter.toLowerCase())

  const handleCancel = () => {
    setBookings(prev => prev.map(b => b.id === cancelModal.id ? { ...b, status: 'cancelled' } : b))
    setCancelModal(null)
    setToast({ message: 'Booking cancelled', type: 'info' })
  }

  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="My Bookings">
      <div className="mb-6">
        <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No bookings yet" desc="Browse internship opportunities and book a slot for your students." action={<Link to="/school/browse" className="btn-primary">Browse Opportunities</Link>} />
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(b => (
            <div key={b.id} className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{b.slotTitle}</p>
                    <p className="text-text-secondary text-sm">{b.company}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-secondary">
                      <span>📅 {b.date}</span>
                      <span>👥 {b.students} students</span>
                      <span>📋 Submitted {b.submittedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={b.status} />
                  <Link to={`/school/booking/${b.id}`} className="btn-ghost text-xs py-2 px-3">View</Link>
                  {b.status === 'pending' && (
                    <button onClick={() => setCancelModal(b)} className="text-xs py-2 px-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium">Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCancelModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-fade-in-up">
            <h3 className="font-display text-xl font-bold mb-3">Cancel Booking?</h3>
            <p className="text-text-secondary text-sm mb-6">This will cancel your booking for <strong>{cancelModal.slotTitle}</strong>. The company will be notified.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelModal(null)} className="btn-outline flex-1 justify-center">Keep it</button>
              <button onClick={handleCancel} className="flex-1 justify-center bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2"><X size={16} /> Cancel</button>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}

// ─── School Booking Detail ────────────────────────────────────────────────────
export function SchoolBookingDetail() {
  const booking = mockBookings[0]
  const steps = [
    { label: 'Submitted', done: true },
    { label: 'Under Review', done: booking.status !== 'pending' },
    { label: 'Approved', done: booking.status === 'approved' || booking.status === 'completed' },
    { label: 'Completed', done: booking.status === 'completed' },
  ]

  return (
    <DashboardLayout role="school" userName={mockSchool.name} title="Booking Detail">
      <div className="max-w-2xl">
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">{booking.slotTitle}</h2>
              <p className="text-text-secondary text-sm mt-1">{booking.company} · {booking.date}</p>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          {/* Status timeline */}
          <div className="flex items-center gap-0 mb-8 overflow-x-auto py-2">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {step.done ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <p className={`text-xs mt-2 font-medium whitespace-nowrap ${step.done ? 'text-primary' : 'text-text-secondary'}`}>{step.label}</p>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 min-w-8 ${steps[i+1].done ? 'bg-primary' : 'bg-gray-100'}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            {[['School', booking.school], ['Contact Person', booking.contact], ['Phone', booking.phone], ['No. of Students', booking.students], ['Submitted', booking.submittedAt]].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
                <p className="text-text-primary font-medium text-sm">{v}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface rounded-xl p-5 mb-6">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Company Contact</p>
            <p className="text-text-primary font-semibold text-sm">{booking.company}</p>
          </div>

          {booking.status === 'pending' && (
            <button className="w-full justify-center bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
              <X size={16} /> Cancel Booking
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
