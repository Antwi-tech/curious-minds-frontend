import React, { useState, useEffect } from 'react'
import { DashboardLayout, StatusBadge, Toast } from '../../components/Shared'
import { ghanaRegions } from '../../data/mockData'
import { getStoredUser } from './companyHelpers'
import { getCompanyProfile, updateCompanyProfile } from '../../api'

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
    try {
      await updateCompanyProfile({
        company_name: form.company_name,
        email: form.email,
        industry_type: form.industry_type,
        company_address: form.company_address,
        region: form.region,
        contact_person: form.contact_person,
        phone_number: form.phone_number,
        website: form.website,
        description: form.description,
      })
      setToast({ message: 'Profile updated successfully!', type: 'success' })
    } catch {
      setToast({ message: 'Failed to update profile', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <DashboardLayout role="company" userName="..." title="My Profile">
      <div className="text-center py-16 text-text-secondary text-sm">Loading...</div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout role="company" userName={form.company_name || 'Company'} title="My Profile">
      <div className="max-w-3xl mx-auto">

        {/* Header card — make it more visually impressive */}
        <div className="card p-8 mb-6">
          <div className="flex items-center gap-6">
            {/* Larger avatar with gradient */}
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0">
              {(form.company_name || 'C').charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-2xl font-bold text-text-primary">{form.company_name}</h2>
                <StatusBadge status={form.is_verified ? 'verified' : 'pending'} />
              </div>
              <p className="text-text-secondary mt-1">{form.industry_type}</p>
              <p className="text-text-secondary text-sm">{form.region}</p>
            </div>
          </div>
        </div>

        {/* Form card — give it more breathing room */}
        <div className="card p-10">
          <h3 className="section-title text-lg mb-8">Company Information</h3>
          {/* form fields go here */}
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