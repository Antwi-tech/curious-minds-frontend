import React, { useState, useEffect } from 'react'
import { DashboardLayout, StatusBadge, FilterTabs, Modal, Toast, EmptyState } from '../../components/Shared'
import { BookOpen, CheckCircle, XCircle } from 'lucide-react'
import { getCompanyBookings, approveBooking, rejectBooking } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function CompanyBookings() {
  const [filter, setFilter] = useState('All')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionModal, setActionModal] = useState(null)
  const [toast, setToast] = useState(null)
  const user = getStoredUser()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getCompanyBookings()
        setBookings(res.data.bookings || [])
      } catch {
        setToast({ message: 'Failed to load bookings', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const filters = ['All', 'pending', 'confirmed', 'cancelled']
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  const handleAction = async (action) => {
    try {
      if (action === 'confirmed') await approveBooking(actionModal.booking.booking_id)
      else await rejectBooking(actionModal.booking.booking_id)
      setBookings(prev => prev.map(b =>
        b.booking_id === actionModal.booking.booking_id ? { ...b, status: action } : b
      ))
      setToast({ message: `Booking ${action} successfully`, type: action === 'confirmed' ? 'success' : 'info' })
    } catch {
      setToast({ message: 'Action failed. Please try again.', type: 'error' })
    } finally {
      setActionModal(null)
    }
  }

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Incoming Bookings">
      <div className="mb-6">
        <FilterTabs tabs={filters} active={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading bookings...</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No bookings" desc="No bookings match the selected filter." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-surface/50">
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">School</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Start Date</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">End Date</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Status</th>
                  <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(b => (
                  <tr key={b.booking_id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-sm text-text-primary">{b.school_name}</p>
                      <p className="text-xs text-text-secondary">{b.school_email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-text-secondary">{new Date(b.start_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-mono text-text-secondary">{new Date(b.end_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => setActionModal({ booking: b, action: 'confirmed' })}
                              className="text-xs py-1.5 px-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors font-medium">Approve</button>
                            <button onClick={() => setActionModal({ booking: b, action: 'cancelled' })}
                              className="text-xs py-1.5 px-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium">Reject</button>
                          </>
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

      <Modal open={!!actionModal} onClose={() => setActionModal(null)}
        title={`${actionModal?.action === 'confirmed' ? 'Approve' : 'Reject'} Booking?`}>
        <p className="text-text-secondary text-sm mb-6">
          {actionModal?.action === 'confirmed'
            ? `Approve booking from ${actionModal?.booking?.school_name}?`
            : `Reject booking from ${actionModal?.booking?.school_name}?`}
        </p>
        <div className="flex gap-3">
          <button onClick={() => setActionModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
          <button onClick={() => handleAction(actionModal?.action)}
            className={`flex-1 justify-center font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2 text-white ${actionModal?.action === 'confirmed' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
            {actionModal?.action === 'confirmed' ? <><CheckCircle size={16} /> Approve</> : <><XCircle size={16} /> Reject</>}
          </button>
        </div>
      </Modal>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}