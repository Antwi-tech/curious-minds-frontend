import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout, Toast } from '../../components/Shared'
import { getStoredUser } from './companyHelpers'
import { createCompanySlot } from '../../api'
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, X } from 'lucide-react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function CalendarPicker({ label, selected, onChange, minDate }) {
  const today = new Date()
  const initial = selected ? new Date(selected) : (minDate ? new Date(minDate) : today)
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const isSelected = (day) => {
    if (!selected) return false
    const d = new Date(selected)
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day
  }

  const isDisabled = (day) => {
    if (!minDate) return false
    const d = new Date(viewYear, viewMonth, day)
    const min = new Date(minDate)
    min.setHours(0, 0, 0, 0)
    return d < min
  }

  const isToday = (day) => {
    return today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
  }

  const handleSelect = (day) => {
    if (isDisabled(day)) return
    const date = new Date(viewYear, viewMonth, day)
    onChange(date.toISOString().split('T')[0])
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="flex-1">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">{label}</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button type="button" onClick={prevMonth}
            className="w-8 h-8 rounded-lg hover:bg-surface flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <ChevronLeft size={16} />
          </button>
          <p className="font-display font-bold text-text-primary text-base">
            {MONTHS[viewMonth]} {viewYear}
          </p>
          <button type="button" onClick={nextMonth}
            className="w-8 h-8 rounded-lg hover:bg-surface flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-text-secondary py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => (
            <div key={i} className="flex items-center justify-center">
              {day ? (
                <button
                  type="button"
                  onClick={() => handleSelect(day)}
                  disabled={isDisabled(day)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-150
                    ${isSelected(day)
                      ? 'bg-primary text-white shadow-md scale-105'
                      : isToday(day)
                      ? 'border-2 border-primary text-primary font-bold'
                      : isDisabled(day)
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-text-primary hover:bg-primary/10 hover:text-primary cursor-pointer'
                    }`}>
                  {day}
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {/* Selected date display */}
        {selected && (
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
            <Calendar size={13} className="text-primary" />
            <p className="text-xs text-text-secondary">
              Selected: <span className="font-semibold text-primary">
                {new Date(selected).toLocaleDateString('en-GB', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CreateSlot() {
  const navigate = useNavigate()
  const user = getStoredUser()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!startDate) e.startDate = 'Please select a start date'
    if (!endDate) e.endDate = 'Please select an end date'
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      e.endDate = 'End date must be after start date'
    }
    return e
  }

  const getDuration = () => {
    if (!startDate || !endDate) return null
    const diff = new Date(endDate) - new Date(startDate)
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''}`
    const weeks = Math.floor(days / 7)
    const remaining = days % 7
    if (remaining === 0) return `${weeks} week${weeks !== 1 ? 's' : ''}`
    return `${weeks} week${weeks !== 1 ? 's' : ''} and ${remaining} day${remaining !== 1 ? 's' : ''}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    setErrors(e2)
    if (Object.keys(e2).length > 0) return
    setLoading(true)
    try {
      await createCompanySlot({
        start_date: `${startDate}T00:00:00`,
        end_date: `${endDate}T00:00:00`,
      })
      setToast({ message: 'Internship slot created successfully!', type: 'success' })
      setTimeout(() => navigate('/company/slots'), 1500)
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create slot'
      setToast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const duration = getDuration()
  const today = new Date().toISOString().split('T')[0]

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Create Internship Slot">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-1">
            Schedule an Internship Slot
          </h2>
          <p className="text-text-secondary text-sm">
            Select a start and end date for your internship availability window.
            Schools will be able to browse and book this slot.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Calendar row */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <CalendarPicker
              label="Start Date"
              selected={startDate}
              onChange={(val) => {
                setStartDate(val)
                setErrors(p => ({ ...p, startDate: '' }))
                if (endDate && new Date(endDate) <= new Date(val)) {
                  setEndDate('')
                }
              }}
              minDate={today}
            />
            <CalendarPicker
              label="End Date"
              selected={endDate}
              onChange={(val) => {
                setEndDate(val)
                setErrors(p => ({ ...p, endDate: '' }))
              }}
              minDate={startDate || today}
            />
          </div>

          {/* Error messages */}
          {(errors.startDate || errors.endDate) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <X size={14} />
              {errors.startDate || errors.endDate}
            </div>
          )}

          {/* Duration summary card */}
          {startDate && endDate && !errors.endDate && (
            <div className="card p-5 mb-6 flex items-center gap-4 border-l-4 border-primary animate-fade-in-up">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium mb-0.5">Slot Duration</p>
                <p className="font-display font-bold text-text-primary">
                  {duration}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' → '}
                  {new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/company/slots')}
              className="btn-outline">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !startDate || !endDate}
              className="btn-secondary disabled:opacity-60 disabled:cursor-not-allowed">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><CheckCircle size={16} /> Create Slot</>}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}