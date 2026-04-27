import React, { useState, useEffect } from 'react'
import { DashboardLayout, StatusBadge, Toast } from '../../components/Shared'
import { CheckCircle, XCircle } from 'lucide-react'
import { getCompanyBookings, approveBooking, rejectBooking } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function CompanyBookingDetail() {
  const user = getStoredUser()
  const bookingId = window.location.pathname.split('/').pop()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getCompanyBookings()
        const found = (res.data.bookings || []).find(b => String(b.booking_id) === String(bookingId))
        setBooking(found || null)
      } catch {
        setToast({ message: 'Failed to load booking', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [bookingId])

  const handleApprove = async () => {
    try {
      await approveBooking(booking.booking_id)
      setBooking(prev => ({ ...prev, status: 'confirmed' }))
      setToast({ message: 'Booking approved!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to approve booking', type: 'error' })
    }
  }

  const handleReject = async () => {
    try {
      await rejectBooking(booking.booking_id)
      setBooking(prev => ({ ...prev, status: 'cancelled' }))
      setToast({ message: 'Booking rejected', type: 'info' })
    } catch {
      setToast({ message: 'Failed to reject booking', type: 'error' })
    }
  }

  if (loading) return <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Booking Detail"><div className="text-center py-16 text-text-secondary text-sm">Loading...</div></DashboardLayout>
  if (!booking) return <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Booking Detail"><div className="text-center py-16 text-text-secondary text-sm">Booking not found</div></DashboardLayout>

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Booking Detail">
      <div className="max-w-2xl">
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">{booking.school_name}</h2>
              <p className="text-text-secondary text-sm mt-1">
                {new Date(booking.start_date).toLocaleDateString()} → {new Date(booking.end_date).toLocaleDateString()}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-6">
            {[
              ['School', booking.school_name],
              ['Email', booking.school_email],
              ['Phone', booking.school_phone],
              ['Booked On', new Date(booking.created_at).toLocaleDateString()],
            ].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{l}</p>
                <p className="text-text-primary font-medium text-sm">{v}</p>
              </div>
            ))}
          </div>
          {booking.status === 'pending' && (
            <div className="flex gap-3">
              <button onClick={handleReject}
                className="flex-1 justify-center bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
                <XCircle size={16} /> Reject
              </button>
              <button onClick={handleApprove}
                className="flex-1 justify-center bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
                <CheckCircle size={16} /> Approve
              </button>
            </div>
          )}
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}