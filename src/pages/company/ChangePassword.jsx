import React, { useState } from 'react'
import { DashboardLayout, Toast } from '../../components/Shared'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { changeCompanyPassword } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function ChangePassword({ role = 'company' }) {
  const user = getStoredUser()
  const userName = user.company_name || user.school_name || 'User'
  const [form, setForm] = useState({ current: '', newPw: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [showFields, setShowFields] = useState({ current: false, newPw: false, confirm: false })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const toggleShow = k => () => setShowFields(p => ({ ...p, [k]: !p[k] }))

  const validate = () => {
    const e = {}
    if (!form.current) e.current = 'Current password is required'
    if (form.newPw.length < 8) e.newPw = 'At least 8 characters'
    if (form.newPw !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    try {
      await changeCompanyPassword(user.company_id, {
        old_password: form.current,
        new_password: form.newPw
      })
      setForm({ current: '', newPw: '', confirm: '' })
      setToast({ message: 'Password changed successfully!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to change password. Check current password.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { key: 'current', label: 'Current Password' },
    { key: 'newPw', label: 'New Password', hint: 'Minimum 8 characters' },
    { key: 'confirm', label: 'Confirm New Password' },
  ]

  return (
    <DashboardLayout role={role} userName={userName} title="Change Password">
      <div className="max-w-md">
        <div className="card p-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Lock size={24} className="text-primary" />
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary mb-1">Update your password</h2>
          <p className="text-text-secondary text-sm mb-6">For your security, choose a strong, unique password.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {fields.map(({ key, label, hint }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <div className="relative">
                  <input type={showFields[key] ? 'text' : 'password'} value={form[key]} onChange={set(key)}
                    placeholder="••••••••" className={`input-field pr-12 ${errors[key] ? 'border-red-300' : ''}`} />
                  <button type="button" onClick={toggleShow(key)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
                    {showFields[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {hint && <p className="text-xs text-text-secondary mt-1">{hint}</p>}
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-secondary justify-center mt-2 disabled:opacity-60">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save New Password'}
            </button>
          </form>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}