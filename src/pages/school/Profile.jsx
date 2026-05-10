import { useState, useEffect } from "react";
import { School, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { DashboardLayout, Toast, StatusBadge } from "../../components/Shared";
import { ghanaRegions } from "../../data/mockData";
import { getSchoolProfileData } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SchoolProfile() {
  const storedUser = getStoredUser();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        // Fall back to stored user data if profile endpoint fails
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
    // TODO: PATCH /school/profile
    setTimeout(() => {
      setSaving(false);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    }, 800);
  };

  if (loading) return (
    <DashboardLayout role="school" userName={storedUser.school_name || 'School'} title="My Profile">
      <div className="text-center py-16 text-text-secondary text-sm">Loading...</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="school" userName={form.school_name || 'School'} title="My Profile">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-2xl">
        {/* Header card */}
        <div className="card p-6 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <School size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="font-display font-bold text-text-primary text-xl">{form.school_name}</h2>
              <StatusBadge status={form.is_verified ? 'verified' : 'pending'} />
            </div>
            <p className="text-text-secondary text-sm mt-0.5">{form.region}</p>
          </div>
        </div>

        <div className="card p-8">
          <h3 className="section-title text-base mb-6">School Information</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="label">School Name</label>
                <div className="relative">
                  <School size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
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
                <label className="label">Description</label>
                <textarea value={form.description || ''} onChange={set('description')} rows={3} className="input-field resize-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Website <span className="text-text-secondary font-normal">(optional)</span></label>
                <input type="text" value={form.website || ''} onChange={set('website')} className="input-field" placeholder="https://yourschool.edu.gh" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={saving} className="btn-secondary disabled:opacity-60">
                {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}