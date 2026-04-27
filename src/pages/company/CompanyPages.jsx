// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { DashboardLayout, StatCard, StatusBadge, FilterTabs, Modal, Toast, EmptyState, SlotCard } from '../../components/Shared'
// import { mockCompany, mockSlots, mockBookings, ghanaRegions, departments } from '../../data/mockData'
// import { Briefcase, BookOpen, Users, TrendingUp, Plus, CheckCircle, XCircle, Eye, Edit, Trash2, ArrowRight, ChevronRight, Clock, Lock, Eye as EyeIcon, EyeOff } from 'lucide-react'

// // ─── Company Dashboard ───────────────────────────────────────────────────────
// export function CompanyDashboard() {
//   const recentBookings = mockBookings.slice(0, 5)
//   return (
//     <DashboardLayout role="company" userName={mockCompany.name} title="Dashboard">
//       {/* Welcome banner */}
//       <div className="gradient-hero rounded-3xl p-8 mb-8 relative overflow-hidden animate-fade-in-up">
//         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 2px, transparent 2px, transparent 20px)' }} />
//         <div className="relative">
//           <p className="text-white/70 text-sm font-medium mb-1">Welcome back 👋</p>
//           <h2 className="font-display text-3xl font-bold text-white mb-2">{mockCompany.name}</h2>
//           <p className="text-white/60 text-sm">{mockCompany.industry} · {mockCompany.city}, {mockCompany.region}</p>
//           <Link to="/company/create-slot" className="btn-primary mt-6 inline-flex">
//             <Plus size={18} /> Create New Slot
//           </Link>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <StatCard icon={Briefcase} label="Total Slots" value="6" color="primary" trend="+2 this month" />
//         <StatCard icon={Clock} label="Pending Bookings" value="2" color="amber" />
//         <StatCard icon={CheckCircle} label="Confirmed Bookings" value="3" color="green" />
//         <StatCard icon={Users} label="Students Hosted" value="24" color="blue" trend="All time" />
//       </div>

//       {/* Recent bookings */}
//       <div className="card">
//         <div className="p-6 border-b border-gray-50 flex items-center justify-between">
//           <h2 className="section-title text-lg">Recent Bookings</h2>
//           <Link to="/company/bookings" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">View all <ChevronRight size={16} /></Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-50">
//                 <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
//                 <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Slot</th>
//                 <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Date</th>
//                 <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Students</th>
//                 <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {recentBookings.map(b => (
//                 <tr key={b.id} className="hover:bg-surface transition-colors cursor-pointer" onClick={() => {}}>
//                   <td className="px-6 py-4 font-medium text-sm text-text-primary">{b.school}</td>
//                   <td className="px-6 py-4 text-sm text-text-secondary">{b.slotTitle}</td>
//                   <td className="px-6 py-4 text-sm text-text-secondary font-mono">{b.date}</td>
//                   <td className="px-6 py-4 text-sm text-text-primary font-semibold">{b.students}</td>
//                   <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// // ─── Company Profile ─────────────────────────────────────────────────────────
// export function CompanyProfile() {
//   const [form, setForm] = useState(mockCompany)
//   const [toast, setToast] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

//   const handleSave = () => {
//     setLoading(true)
//     // TODO: PUT /api/company/profile
//     setTimeout(() => { setLoading(false); setToast({ message: 'Profile updated successfully!', type: 'success' }) }, 800)
//   }

//   return (
//     <DashboardLayout role="company" userName={mockCompany.name} title="My Profile">
//       <div className="max-w-2xl">
//         {/* Header card */}
//         <div className="card p-6 mb-6 flex items-center gap-5">
//           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display text-2xl font-bold">
//             {form.name.charAt(0)}
//           </div>
//           <div>
//             <div className="flex items-center gap-3">
//               <h2 className="font-display text-xl font-bold text-text-primary">{form.name}</h2>
//               <StatusBadge status={form.status} />
//             </div>
//             <p className="text-text-secondary text-sm mt-0.5">{form.industry}</p>
//           </div>
//         </div>

//         <div className="card p-8">
//           <h3 className="section-title text-base mb-6">Company Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div className="md:col-span-2">
//               <label className="label">Company Name</label>
//               <input value={form.name} onChange={set('name')} className="input-field" />
//             </div>
//             <div className="md:col-span-2">
//               <label className="label">Industry</label>
//               <input value={form.industry} onChange={set('industry')} className="input-field" />
//             </div>
//             <div>
//               <label className="label">Email Address</label>
//               <input value={form.email} onChange={set('email')} className="input-field" />
//             </div>
//             <div>
//               <label className="label">Phone Number</label>
//               <input value={form.phone} onChange={set('phone')} className="input-field" />
//             </div>
//             <div>
//               <label className="label">City</label>
//               <input value={form.city} onChange={set('city')} className="input-field" />
//             </div>
//             <div>
//               <label className="label">Region</label>
//               <select value={form.region} onChange={set('region')} className="input-field">
//                 {ghanaRegions.map(r => <option key={r}>{r}</option>)}
//               </select>
//             </div>
//             <div className="md:col-span-2">
//               <label className="label">About / Description</label>
//               <textarea value={form.about} onChange={set('about')} rows={4} className="input-field resize-none" />
//             </div>
//           </div>
//           <button onClick={handleSave} disabled={loading} className="btn-secondary mt-6 disabled:opacity-60">
//             {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
//     </DashboardLayout>
//   )
// }

// // ─── Company Slots ────────────────────────────────────────────────────────────
// export function CompanySlots() {
//   const [slots, setSlots] = useState(mockSlots)
//   const [deleteModal, setDeleteModal] = useState(null)
//   const [toast, setToast] = useState(null)

//   const handleDelete = () => {
//     setSlots(s => s.filter(sl => sl.id !== deleteModal.id))
//     setDeleteModal(null)
//     setToast({ message: 'Slot deleted successfully', type: 'success' })
//   }

//   return (
//     <DashboardLayout role="company" userName={mockCompany.name} title="Internship Slots">
//       <div className="flex items-center justify-between mb-6">
//         <p className="text-text-secondary text-sm">{slots.length} slots created</p>
//         <Link to="/company/create-slot" className="btn-primary">
//           <Plus size={18} /> Create New Slot
//         </Link>
//       </div>

//       {slots.length === 0 ? (
//         <EmptyState icon={Briefcase} title="No slots yet" desc="Create your first internship slot to start receiving bookings from schools." action={<Link to="/company/create-slot" className="btn-primary">Create Slot</Link>} />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//           {slots.map(slot => (
//             <SlotCard key={slot.id} slot={slot} role="company"
//               onEdit={() => {}}
//               onDelete={() => setDeleteModal(slot)} />
//           ))}
//         </div>
//       )}

//       <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Slot">
//         <p className="text-text-secondary text-sm mb-6">Are you sure you want to delete <strong className="text-text-primary">"{deleteModal?.title}"</strong>? This action cannot be undone.</p>
//         <div className="flex gap-3">
//           <button onClick={() => setDeleteModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
//           <button onClick={handleDelete} className="flex-1 justify-center bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2">
//             <Trash2 size={16} /> Delete
//           </button>
//         </div>
//       </Modal>
//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
//     </DashboardLayout>
//   )
// }

// // ─── Create Slot ──────────────────────────────────────────────────────────────
// export function CreateSlot() {
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ title: '', date: '', startTime: '', endTime: '', maxStudents: '', department: '', requirements: '', description: '' })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

//   const validate = () => {
//     const e = {}
//     if (!form.title) e.title = 'Title is required'
//     if (!form.date) e.date = 'Date is required'
//     if (!form.startTime) e.startTime = 'Start time required'
//     if (!form.endTime) e.endTime = 'End time required'
//     if (!form.maxStudents || form.maxStudents < 1) e.maxStudents = 'Enter a valid number'
//     if (!form.department) e.department = 'Department is required'
//     return e
//   }

//   const handleSubmit = (ev) => {
//     ev.preventDefault()
//     const e = validate()
//     setErrors(e)
//     if (Object.keys(e).length > 0) return
//     setLoading(true)
//     // TODO: POST /api/company/slots
//     setTimeout(() => { setLoading(false); navigate('/company/slots') }, 1000)
//   }

//   return (
//     <DashboardLayout role="company" userName={mockCompany.name} title="Create Internship Slot">
//       <div className="max-w-2xl">
//         <form onSubmit={handleSubmit} className="card p-8">
//           <div className="flex flex-col gap-5">
//             <div>
//               <label className="label">Slot Title</label>
//               <input value={form.title} onChange={set('title')} placeholder="e.g. IT & Software Development Internship" className={`input-field ${errors.title ? 'border-red-300' : ''}`} />
//               {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
//             </div>
//             <div>
//               <label className="label">Description</label>
//               <textarea value={form.description} onChange={set('description')} rows={3} placeholder="What will students do and learn during this internship?" className="input-field resize-none" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="label">Date</label>
//                 <input type="date" value={form.date} onChange={set('date')} className={`input-field ${errors.date ? 'border-red-300' : ''}`} />
//                 {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
//               </div>
//               <div>
//                 <label className="label">Start Time</label>
//                 <input type="time" value={form.startTime} onChange={set('startTime')} className={`input-field ${errors.startTime ? 'border-red-300' : ''}`} />
//                 {errors.startTime && <p className="text-xs text-red-500 mt-1">{errors.startTime}</p>}
//               </div>
//               <div>
//                 <label className="label">End Time</label>
//                 <input type="time" value={form.endTime} onChange={set('endTime')} className={`input-field ${errors.endTime ? 'border-red-300' : ''}`} />
//                 {errors.endTime && <p className="text-xs text-red-500 mt-1">{errors.endTime}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="label">Maximum Number of Students</label>
//                 <input type="number" min="1" max="50" value={form.maxStudents} onChange={set('maxStudents')} placeholder="e.g. 10" className={`input-field ${errors.maxStudents ? 'border-red-300' : ''}`} />
//                 {errors.maxStudents && <p className="text-xs text-red-500 mt-1">{errors.maxStudents}</p>}
//               </div>
//               <div>
//                 <label className="label">Department / Field</label>
//                 <select value={form.department} onChange={set('department')} className={`input-field ${errors.department ? 'border-red-300' : ''}`}>
//                   <option value="">Select department...</option>
//                   {departments.map(d => <option key={d}>{d}</option>)}
//                 </select>
//                 {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
//               </div>
//             </div>
//             <div>
//               <label className="label">Special Requirements <span className="text-text-secondary font-normal">(optional)</span></label>
//               <input value={form.requirements} onChange={set('requirements')} placeholder="e.g. Basic knowledge of computers preferred" className="input-field" />
//             </div>
//             <div className="flex gap-3 pt-2">
//               <button type="button" onClick={() => navigate('/company/slots')} className="btn-outline flex-1 justify-center">Cancel</button>
//               <button type="submit" disabled={loading} className="btn-secondary flex-1 justify-center disabled:opacity-60">
//                 {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus size={16} /> Create Slot</>}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </DashboardLayout>
//   )
// }

// // ─── Company Bookings ─────────────────────────────────────────────────────────
// export function CompanyBookings() {
//   const [filter, setFilter] = useState('All')
//   const [bookings, setBookings] = useState(mockBookings)
//   const [actionModal, setActionModal] = useState(null)
//   const [toast, setToast] = useState(null)

//   const filters = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled']
//   const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status.toLowerCase() === filter.toLowerCase())

//   const handleAction = (action) => {
//     setBookings(prev => prev.map(b => b.id === actionModal.booking.id ? { ...b, status: action } : b))
//     setActionModal(null)
//     setToast({ message: `Booking ${action} successfully`, type: action === 'approved' ? 'success' : 'info' })
//   }

//   return (
//     <DashboardLayout role="company" userName={mockCompany.name} title="Incoming Bookings">
//       <div className="mb-6">
//         <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
//       </div>

//       {filtered.length === 0 ? (
//         <EmptyState icon={BookOpen} title="No bookings" desc="No bookings match the selected filter." />
//       ) : (
//         <div className="card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-50 bg-surface/50">
//                   <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
//                   <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Slot</th>
//                   <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Date</th>
//                   <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Students</th>
//                   <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
//                   <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {filtered.map(b => (
//                   <tr key={b.id} className="hover:bg-surface/50 transition-colors">
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-sm text-text-primary">{b.school}</p>
//                       <p className="text-xs text-text-secondary">{b.contact}</p>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-text-secondary">{b.slotTitle}</td>
//                     <td className="px-6 py-4 text-sm font-mono text-text-secondary">{b.date}</td>
//                     <td className="px-6 py-4 text-sm font-semibold text-text-primary">{b.students}</td>
//                     <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
//                     <td className="px-6 py-4">
//                       <div className="flex gap-2">
//                         <Link to={`/company/booking/${b.id}`} className="btn-ghost text-xs py-1.5 px-3"><Eye size={14} /></Link>
//                         {b.status === 'pending' && (
//                           <>
//                             <button onClick={() => setActionModal({ booking: b, action: 'approved' })} className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium">Approve</button>
//                             <button onClick={() => setActionModal({ booking: b, action: 'rejected' })} className="text-xs py-1.5 px-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium">Reject</button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       <Modal open={!!actionModal} onClose={() => setActionModal(null)} title={`${actionModal?.action === 'approved' ? 'Approve' : 'Reject'} Booking?`}>
//         <p className="text-text-secondary text-sm mb-6">
//           {actionModal?.action === 'approved'
//             ? `You're about to approve the booking from ${actionModal?.booking?.school}. They will be notified by email.`
//             : `You're about to reject the booking from ${actionModal?.booking?.school}. They will be notified.`}
//         </p>
//         <div className="flex gap-3">
//           <button onClick={() => setActionModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
//           <button onClick={() => handleAction(actionModal?.action)} className={`flex-1 justify-center font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2 text-white ${actionModal?.action === 'approved' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
//             {actionModal?.action === 'approved' ? <><CheckCircle size={16} /> Approve</> : <><XCircle size={16} /> Reject</>}
//           </button>
//         </div>
//       </Modal>
//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
//     </DashboardLayout>
//   )
// }

// // ─── Company Booking Detail ───────────────────────────────────────────────────
// export function CompanyBookingDetail() {
//   const booking = mockBookings[0]
//   const [status, setStatus] = useState(booking.status)
//   const [notes, setNotes] = useState('')
//   const [toast, setToast] = useState(null)

//   return (
//     <DashboardLayout role="company" userName={mockCompany.name} title="Booking Detail">
//       <div className="max-w-2xl">
//         <div className="card p-8 mb-6">
//           <div className="flex items-start justify-between mb-6">
//             <div>
//               <h2 className="font-display text-xl font-bold text-text-primary">{booking.slotTitle}</h2>
//               <p className="text-text-secondary text-sm mt-1">{booking.date}</p>
//             </div>
//             <StatusBadge status={status} />
//           </div>

//           <div className="grid grid-cols-2 gap-5 mb-6">
//             {[['School', booking.school], ['Contact', booking.contact], ['Phone', booking.phone], ['Students', booking.students], ['Submitted', booking.submittedAt]].map(([l, v]) => (
//               <div key={l}>
//                 <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
//                 <p className="text-text-primary font-medium text-sm">{v}</p>
//               </div>
//             ))}
//           </div>

//           {booking.notes && (
//             <div className="bg-surface rounded-xl p-4 mb-6">
//               <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Notes from School</p>
//               <p className="text-text-primary text-sm">{booking.notes}</p>
//             </div>
//           )}

//           <div className="mb-6">
//             <label className="label">Feedback / Notes</label>
//             <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add optional feedback for the school..." className="input-field resize-none" />
//           </div>

//           {status === 'pending' && (
//             <div className="flex gap-3">
//               <button onClick={() => { setStatus('rejected'); setToast({ message: 'Booking rejected', type: 'info' }) }}
//                 className="flex-1 justify-center bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
//                 <XCircle size={16} /> Reject
//               </button>
//               <button onClick={() => { setStatus('approved'); setToast({ message: 'Booking approved!', type: 'success' }) }}
//                 className="flex-1 justify-center bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
//                 <CheckCircle size={16} /> Approve
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
//     </DashboardLayout>
//   )
// }

// // ─── Change Password ──────────────────────────────────────────────────────────
// export function ChangePassword({ role = 'company' }) {
//   const userName = role === 'company' ? mockCompany.name : mockSchool.name
//   const [form, setForm] = useState({ current: '', newPw: '', confirm: '' })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [toast, setToast] = useState(null)
//   const [showFields, setShowFields] = useState({ current: false, newPw: false, confirm: false })
//   const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
//   const toggleShow = k => () => setShowFields(p => ({ ...p, [k]: !p[k] }))

//   const validate = () => {
//     const e = {}
//     if (!form.current) e.current = 'Current password is required'
//     if (form.newPw.length < 8) e.newPw = 'At least 8 characters'
//     if (form.newPw !== form.confirm) e.confirm = 'Passwords do not match'
//     return e
//   }

//   const handleSubmit = (ev) => {
//     ev.preventDefault()
//     const e = validate()
//     setErrors(e)
//     if (Object.keys(e).length > 0) return
//     setLoading(true)
//     // TODO: POST /api/auth/change-password
//     setTimeout(() => { setLoading(false); setForm({ current: '', newPw: '', confirm: '' }); setToast({ message: 'Password changed successfully!', type: 'success' }) }, 800)
//   }

//   const fields = [
//     { key: 'current', label: 'Current Password' },
//     { key: 'newPw', label: 'New Password', hint: 'Minimum 8 characters' },
//     { key: 'confirm', label: 'Confirm New Password' },
//   ]

//   return (
//     <DashboardLayout role={role} userName={userName} title="Change Password">
//       <div className="max-w-md">
//         <div className="card p-8">
//           <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
//             <Lock size={24} className="text-primary" />
//           </div>
//           <h2 className="font-display text-xl font-bold text-text-primary mb-1">Update your password</h2>
//           <p className="text-text-secondary text-sm mb-6">For your security, choose a strong, unique password.</p>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             {fields.map(({ key, label, hint }) => (
//               <div key={key}>
//                 <label className="label">{label}</label>
//                 <div className="relative">
//                   <input type={showFields[key] ? 'text' : 'password'} value={form[key]} onChange={set(key)}
//                     placeholder="••••••••" className={`input-field pr-12 ${errors[key] ? 'border-red-300' : ''}`} />
//                   <button type="button" onClick={toggleShow(key)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
//                     {showFields[key] ? <EyeOff size={16} /> : <EyeIcon size={16} />}
//                   </button>
//                 </div>
//                 {hint && <p className="text-xs text-text-secondary mt-1">{hint}</p>}
//                 {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
//               </div>
//             ))}
//             <button type="submit" disabled={loading} className="btn-secondary justify-center mt-2 disabled:opacity-60">
//               {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save New Password'}
//             </button>
//           </form>
//         </div>
//       </div>
//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
//     </DashboardLayout>
//   )
// }

// // Import mockSchool for the change password component
// import { mockSchool } from '../../data/mockData'
