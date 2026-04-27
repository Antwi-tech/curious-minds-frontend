import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout, Toast } from '../../components/Shared'
import { Plus } from 'lucide-react'
import { createCompanySlot } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function CreateSlot() {
  const navigate = useNavigate()
  const user = getStoredUser()
  const [form, setForm] = useState({ start_date: '', start_time: '', end_date: '', end_time: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.start_date) e.start_date = 'Start date is required'
    if (!form.start_time) e.start_time = 'Start time is required'
    if (!form.end_date) e.end_date = 'End date is required'
    if (!form.end_time) e.end_time = 'End time is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    try {
      await createCompanySlot({
        start_date: `${form.start_date}T${form.start_time}:00`,
        end_date: `${form.end_date}T${form.end_time}:00`,
      })
      navigate('/company/slots')
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to create slot', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Create Internship Slot">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="card p-8">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Start Date</label>
                <input type="date" value={form.start_date} onChange={set('start_date')} className={`input-field ${errors.start_date ? 'border-red-300' : ''}`} />
                {errors.start_date && <p className="text-xs text-red-500 mt-1">{errors.start_date}</p>}
              </div>
              <div>
                <label className="label">Start Time</label>
                <input type="time" value={form.start_time} onChange={set('start_time')} className={`input-field ${errors.start_time ? 'border-red-300' : ''}`} />
                {errors.start_time && <p className="text-xs text-red-500 mt-1">{errors.start_time}</p>}
              </div>
              <div>
                <label className="label">End Date</label>
                <input type="date" value={form.end_date} onChange={set('end_date')} className={`input-field ${errors.end_date ? 'border-red-300' : ''}`} />
                {errors.end_date && <p className="text-xs text-red-500 mt-1">{errors.end_date}</p>}
              </div>
              <div>
                <label className="label">End Time</label>
                <input type="time" value={form.end_time} onChange={set('end_time')} className={`input-field ${errors.end_time ? 'border-red-300' : ''}`} />
                {errors.end_time && <p className="text-xs text-red-500 mt-1">{errors.end_time}</p>}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate('/company/slots')} className="btn-outline flex-1 justify-center">Cancel</button>
              <button type="submit" disabled={loading} className="btn-secondary flex-1 justify-center disabled:opacity-60">
                {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus size={16} /> Create Slot</>}
              </button>
            </div>
          </div>
        </form>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}