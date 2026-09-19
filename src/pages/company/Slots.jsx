import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DashboardLayout, Toast, Modal } from '../../components/Shared'
import { getStoredUser } from './companyHelpers'
import { getCompanySlots, deleteCompanySlot } from '../../api'
import { Plus, Calendar, Trash2, Clock, ChevronRight, Briefcase } from 'lucide-react'

export default function CompanySlots() {
  const user = getStoredUser()
  const navigate = useNavigate()
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await getCompanySlots()
        setSlots(res.data.slots || [])
      } catch {
        setToast({ message: 'Failed to load slots', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchSlots()
  }, [])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteCompanySlot(deleteModal.schedule_id)
      setSlots(prev => prev.filter(s => s.schedule_id !== deleteModal.schedule_id))
      setToast({ message: 'Slot deleted successfully', type: 'info' })
    } catch {
      setToast({ message: 'Failed to delete slot', type: 'error' })
    } finally {
      setDeleting(false)
      setDeleteModal(null)
    }
  }

  const getDuration = (start, end) => {
    const diff = new Date(end) - new Date(start)
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''}`
    const weeks = Math.floor(days / 7)
    const remaining = days % 7
    if (remaining === 0) return `${weeks} week${weeks !== 1 ? 's' : ''}`
    return `${weeks}w ${remaining}d`
  }

  const getSlotStatus = (start, end) => {
    const now = new Date()
    const startDate = new Date(start)
    const endDate = new Date(end)
    if (now < startDate) return { label: 'Upcoming', color: 'bg-blue-50 text-blue-700' }
    if (now > endDate) return { label: 'Expired', color: 'bg-gray-100 text-gray-500' }
    return { label: 'Active', color: 'bg-green-50 text-green-700' }
  }

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Internship Slots">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Slot">
        <p className="text-text-secondary text-sm mb-6">
          Are you sure you want to delete the slot from{' '}
          <strong className="text-text-primary">
            {deleteModal && new Date(deleteModal.start_date).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </strong>?
          Any pending bookings for this slot will also be affected.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteModal(null)} className="btn-outline flex-1 justify-center">
            Keep Slot
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 justify-center bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60">
            {deleting
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><Trash2 size={15} /> Delete Slot</>}
          </button>
        </div>
      </Modal>

      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-text-secondary text-sm">
            {loading ? 'Loading...' : `${slots.length} slot${slots.length !== 1 ? 's' : ''} created`}
          </p>
        </div>
        <Link to="/company/create-slot" className="btn-secondary gap-2">
          <Plus size={18} /> Create New Slot
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-text-secondary text-sm">Loading slots...</div>
      ) : slots.length === 0 ? (
        /* ── Empty State ── */
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Briefcase size={36} className="text-primary" />
          </div>
          <h3 className="font-display font-bold text-text-primary text-xl mb-2">
            No slots yet
          </h3>
          <p className="text-text-secondary text-sm max-w-sm mx-auto mb-6">
            Create your first internship slot so schools can start browsing and booking opportunities with your company.
          </p>
          <Link to="/company/create-slot" className="btn-secondary gap-2">
            <Plus size={18} /> Create Your First Slot
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {slots.map(slot => {
            const status = getSlotStatus(slot.start_date, slot.end_date)
            const duration = getDuration(slot.start_date, slot.end_date)
            const start = new Date(slot.start_date)
            const end = new Date(slot.end_date)

            return (
              <div
                key={slot.schedule_id}
                className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-200 group">

                {/* Colored top strip */}
                <div className={`h-1.5 w-full ${
                  status.label === 'Active' ? 'bg-green-500' :
                  status.label === 'Upcoming' ? 'bg-primary' :
                  'bg-gray-300'
                }`} />

                <div className="p-6">
                  {/* Status + duration row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-xs text-text-secondary font-medium bg-surface px-2.5 py-1 rounded-full">
                      {duration}
                    </span>
                  </div>

                  {/* Start date */}
                  <div className="mb-5">
                    <p className="text-xs text-text-secondary font-medium mb-1">Start Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary flex-shrink-0" />
                      <p className="text-sm font-semibold text-text-primary">
                        {start.toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Arrow divider */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-px bg-gray-100" />
                    <ChevronRight size={14} className="text-text-secondary" />
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* End date */}
                  <div className="mb-5">
                    <p className="text-xs text-text-secondary font-medium mb-1">End Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary flex-shrink-0" />
                      <p className="text-sm font-semibold text-text-primary">
                        {end.toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Created at */}
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-5">
                    <Clock size={11} />
                    <span>Created {new Date(slot.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => setDeleteModal(slot)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-red-100 text-red-500 text-sm font-semibold hover:bg-red-50 hover:border-red-200 transition-all duration-200">
                    <Trash2 size={14} /> Delete Slot
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}