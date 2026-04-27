import React, { useState, useEffect } from 'react'
import { DashboardLayout, StatusBadge, Toast } from '../../components/Shared'
import { ghanaRegions } from '../../data/mockData'
import { getCompanyProfile } from '../../api'
import { getStoredUser } from './companyHelpers'

export default function CompanyProfile() {
  const [form, setForm] = useState({})
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getCompanyProfile()
        setForm(res.data)
      } catch {
        setToast({ message: 'Failed to load profile', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    // TODO: PATCH /company/profile
    setTimeout(() => {
      setSaving(false)
      setToast({ message: 'Profile updated successfully!', type: 'success' })
    }, 800)
  }

  if (loading) return (
    <DashboardLayout role="company" userName="..." title="My Profile">
      <div className="text-center py-16 text-text-secondary text-sm">Loading...</div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout role="company" userName={form.company_name || 'Company'} title="My Profile">
      <div className="max-w-2xl">
        <div className="card p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display text-2xl font-bold">
            {(form.company_name || 'C').charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-bold text-text-primary">{form.company_name}</h2>
              <StatusBadge status={form.is_verified ? 'verified' : 'pending'} />
            </div>
            <p className="text-text-secondary text-sm mt-0.5">{form.industry_type}</p>
          </div>
        </div>
        <div className="card p-8">
          <h3 className="section-title text-base mb-6">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="label">Company Name</label>
              <input value={form.company_name || ''} onChange={set('company_name')} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="label">Industry</label>
              <input value={form.industry_type || ''} onChange={set('industry_type')} className="input-field" />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input value={form.email || ''} onChange={set('email')} className="input-field" />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input value={form.phone_number || ''} onChange={set('phone_number')} className="input-field" />
            </div>
            <div>
              <label className="label">Company Address</label>
              <input value={form.company_address || ''} onChange={set('company_address')} className="input-field" />
            </div>
            <div>
              <label className="label">Region</label>
              <select value={form.region || ''} onChange={set('region')} className="input-field">
                {ghanaRegions.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label">About / Description</label>
              <textarea value={form.description || ''} onChange={set('description')} rows={4} className="input-field resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="label">Website <span className="text-text-secondary font-normal">(optional)</span></label>
              <input value={form.website || ''} onChange={set('website')} className="input-field" />
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-secondary mt-6 disabled:opacity-60">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
          </button>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  )
}