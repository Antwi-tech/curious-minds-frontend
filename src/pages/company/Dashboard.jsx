import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout, StatCard, StatusBadge, Toast } from '../../components/Shared'
import { Briefcase, Plus, CheckCircle, Users, Clock, ChevronRight } from 'lucide-react'
import { getCompanyProfile, getCompanySlots, getCompanyBookings } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function CompanyDashboard() {
  const [profile, setProfile] = useState(getStoredUser())
  const [slots, setSlots] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, slotsRes, bookingsRes] = await Promise.all([
          getCompanyProfile(),
          getCompanySlots(),
          getCompanyBookings(),
        ])
        setProfile(profileRes.data)
        setSlots(slotsRes.data.slots || [])
        setBookings(bookingsRes.data.bookings || [])
      } catch (err) {
        setToast({ message: 'Failed to load dashboard data', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const recentBookings = bookings.slice(0, 5)

  return (
    <DashboardLayout role="company" userName={profile.company_name || 'Company'} title="Dashboard">
      <div className="gradient-hero rounded-3xl p-8 mb-8 relative overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 2px, transparent 2px, transparent 20px)' }} />
        <div className="relative">
          <p className="text-white/70 text-sm font-medium mb-1">Welcome back 👋</p>
          <h2 className="font-display text-3xl font-bold text-white mb-2">{profile.company_name || '...'}</h2>
          <p className="text-white/60 text-sm">{profile.industry_type} · {profile.region}</p>
          <Link to="/company/create-slot" className="btn-primary mt-6 inline-flex">
            <Plus size={18} /> Create New Slot
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Briefcase} label="Total Slots" value={loading ? '...' : slots.length} color="primary" />
        <StatCard icon={Clock} label="Pending Bookings" value={loading ? '...' : pendingBookings.length} color="amber" />
        <StatCard icon={CheckCircle} label="Confirmed Bookings" value={loading ? '...' : confirmedBookings.length} color="green" />
        <StatCard icon={Users} label="Total Bookings" value={loading ? '...' : bookings.length} color="blue" />
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="section-title text-lg">Recent Bookings</h2>
          <Link to="/company/bookings" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">View all <ChevronRight size={16} /></Link>
        </div>
        {loading ? (
          <div className="text-center py-10 text-text-secondary text-sm">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-10 text-text-secondary text-sm">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Start Date</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">End Date</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map(b => (
                  <tr key={b.booking_id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4 font-medium text-sm text-text-primary">{b.school_name}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono">{new Date(b.start_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono">{new Date(b.end_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}