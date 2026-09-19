import { useState, useEffect } from "react";
import { GraduationCap, Mail, Phone, MapPin, Globe, User, Pencil, X, CheckCircle } from "lucide-react";
import { DashboardLayout, Toast, StatusBadge } from "../../components/Shared";
import { ghanaRegions } from "../../data/mockData";
import { getSchoolProfileData, updateSchoolProfile } from '../../api'
import { generateSchoolDescription } from '../../api'

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SchoolProfile() {
  const storedUser = getStoredUser();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    school_name: '',
    email: '',
    phone_number: '',
    school_address: '',
    region: '',
    contact_person: '',
    description: '',
    website: '',
    is_verified: false,
    is_active: true,
  });
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getSchoolProfileData();
        setForm(f => ({ ...f, ...res.data }));
      } catch {
        setForm(f => ({
          ...f,
          school_name: storedUser.school_name || '',
          email: storedUser.email || '',
          region: storedUser.region || '',
        }));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSchoolProfile({
        school_name: form.school_name,
        email: form.email,
        school_address: form.school_address,
        region: form.region,
        contact_person: form.contact_person,
        phone_number: form.phone_number,
        website: form.website,
        description: form.description,
      });
      setToast({ message: 'Profile updated successfully!', type: 'success' });
      setEditMode(false);
    } catch {
      setToast({ message: 'Failed to update profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };
  const handleGenerateDescription = async () => {
      if (!form.school_name) {
        setToast({ message: 'Please enter a school name first', type: 'error' })
        return
      }
      setGenerating(true)
      try {
        const res = await generateSchoolDescription({
          school_name: form.school_name,
          region: form.region,
        })
        setForm(prev => ({ ...prev, description: res.data.description }))
        setToast({ message: 'Description generated!', type: 'success' })
      } catch {
        setToast({ message: 'Failed to generate description', type: 'error' })
      } finally {
        setGenerating(false)
      }
    }

  if (loading) return (
    <DashboardLayout role="school" userName={storedUser.school_name || 'School'} title="My Profile">
      <div className="text-center py-16 text-text-secondary text-sm">Loading...</div>
    </DashboardLayout>
  );
  

  return (
    <DashboardLayout role="school" userName={form.school_name || 'School'} title="My Profile">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-3xl mx-auto">

        {/* ── Hero Header ── */}
        <div className="gradient-hero rounded-3xl p-8 mb-6 relative overflow-hidden">
          {/* Kente pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 4px, transparent 4px, transparent 28px),
              repeating-linear-gradient(-45deg, #F4A623 0px, #F4A623 4px, transparent 4px, transparent 28px)`
          }} />
          {/* Decorative letter */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 font-display text-[120px] font-bold text-white/5 select-none leading-none">
            {(form.school_name || 'S').charAt(0)}
          </div>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-2 border-white/30">
              <GraduationCap size={44} className="text-white" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className="font-display text-3xl font-bold text-white">
                  {form.school_name}
                </h2>
                <StatusBadge status={form.is_verified ? 'verified' : 'pending'} />
              </div>
              <p className="text-white/70 text-sm mb-3">
                {form.contact_person && `Contact: ${form.contact_person} · `}{form.region}
              </p>
              {form.description && (
                <p className="text-white/60 text-sm leading-relaxed max-w-xl line-clamp-2">
                  {form.description}
                </p>
              )}
            </div>

            {/* Edit button */}
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all border border-white/20 text-sm flex-shrink-0">
                <Pencil size={15} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* ── VIEW MODE ── */}
        {!editMode && (
          <div className="grid gap-4">

            {/* Quick info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Mail, label: 'Email', value: form.email },
                { icon: Phone, label: 'Phone', value: form.phone_number },
                { icon: MapPin, label: 'Address', value: form.school_address },
                { icon: User, label: 'Contact', value: form.contact_person },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={13} className="text-primary" />
                    </div>
                    <p className="text-xs text-text-secondary font-medium">{label}</p>
                  </div>
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {value || '—'}
                  </p>
                </div>
              ))}
            </div>

            {/* About section */}
            {form.description && (
              <div className="card p-6">
                <h3 className="font-display font-bold text-text-primary text-lg mb-3">
                  About Our School
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {form.description}
                </p>
              </div>
            )}

            {/* Website + Region */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium mb-0.5">Website</p>
                  {form.website ? (
                    <a href={form.website} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary hover:underline">
                      {form.website}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-text-primary">Not provided</p>
                  )}
                </div>
              </div>
              <div className="card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium mb-0.5">Region</p>
                  <p className="text-sm font-semibold text-text-primary">{form.region || '—'}</p>
                </div>
              </div>
            </div>

            {/* Account status */}
            <div className="card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium">Account Status</p>
                  <p className="text-sm font-semibold text-text-primary mt-0.5">
                    {form.is_active ? 'Active' : 'Inactive'} ·{' '}
                    {form.is_verified ? 'Verified by Admin' : 'Pending Verification'}
                  </p>
                </div>
              </div>
              <StatusBadge status={form.is_verified ? 'verified' : 'pending'} />
            </div>
          </div>
        )}

        {/* ── EDIT MODE ── */}
        {editMode && (
          <div className="card p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="section-title text-lg">Edit School Information</h3>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-semibold transition-colors">
                <X size={16} /> Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="label">School Name</label>
                  <div className="relative">
                    <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input type="text" value={form.school_name || ''} onChange={set('school_name')} className="input-field pl-9" />
                  </div>
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input type="email" value={form.email || ''} onChange={set('email')} className="input-field pl-9" />
                  </div>
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input type="tel" value={form.phone_number || ''} onChange={set('phone_number')} className="input-field pl-9" />
                  </div>
                </div>
                <div>
                  <label className="label">School Address</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input type="text" value={form.school_address || ''} onChange={set('school_address')} className="input-field pl-9" />
                  </div>
                </div>
                <div>
                  <label className="label">Region</label>
                  <select value={form.region || ''} onChange={set('region')} className="input-field">
                    <option value="">Select region...</option>
                    {ghanaRegions.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Contact Person</label>
                  <input type="text" value={form.contact_person || ''} onChange={set('contact_person')} className="input-field" />
                </div>
                <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">Description</label>
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={generating}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors disabled:opacity-50 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg">
                    {generating ? (
                      <>
                        <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        ✨ Generate with AI
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={form.description || ''}
                  onChange={set('description')}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe your school and what companies can expect from your students..."
                />
              </div>
                <div className="sm:col-span-2">
                  <label className="label">Website <span className="text-text-secondary font-normal">(optional)</span></label>
                  <input type="text" value={form.website || ''} onChange={set('website')} className="input-field" placeholder="https://yourschool.edu.gh" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn-outline">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-secondary disabled:opacity-60">
                  {saving
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><CheckCircle size={16} /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}