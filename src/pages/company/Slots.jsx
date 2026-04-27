import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout, Modal, Toast, EmptyState } from '../../components/Shared'
import { Briefcase, Plus, Trash2 } from 'lucide-react'
import { getCompanySlots, deleteCompanySlot } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function CompanySlots() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(null)
  const [toast, setToast] = useState(null)
  const user = getStoredUser()

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
    try {
      await deleteCompanySlot(deleteModal.schedule_id)
      setSlots(s => s.filter(sl => sl.schedule_id !== deleteModal.schedule_id))
      setToast({ message: 'Slot deleted successfully', type: 'success' })
    } catch {
      setToast({ message: 'Failed to delete slot', type: 'error' })
    } finally {
      setDeleteModal(null)
    }
  }

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Internship Slots">
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-secondary text-sm">{slots.length} slots created</p>
        <Link to="/company/create-slot" className="btn-primary"><Plus size={18} /> Create New Slot</Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading slots...</div>
      ) : slots.length === 0 ? (
        <EmptyState icon={Briefcase} title="No slots yet" desc="Create your first internship slot to start receiving bookings."
          action={<Link to="/company/create-slot" className="btn-primary">Create Slot</Link>} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {slots.map(slot => (
            <div key={slot.schedule_id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <button onClick={() => setDeleteModal(slot)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Start</p>
              <p className="font-semibold text-text-primary text-sm mb-3">{new Date(slot.start_date).toLocaleString()}</p>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">End</p>
              <p className="font-semibold text-text-primary text-sm">{new Date(slot.end_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Slot">
        <p className="text-text-secondary text-sm mb-6">Are you sure you want to delete this slot? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
          <button onClick={handleDelete} className="flex-1 justify-center bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </Modal>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}