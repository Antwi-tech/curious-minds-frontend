import { useState } from "react";
import { Building2, Mail, Phone, MapPin, FileText, CheckCircle, ChevronDown } from "lucide-react";
import { CompanyLayout, FormField, Toast } from "../../components/shared";
import { ghanaRegions, industries } from "../../data/mockData";

export default function CompanyProfile() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "Scancom Ghana (MTN)", industry: "Telecommunications",
    email: "internships@mtn.com.gh", phone: "+233 24 200 0000",
    city: "Accra", region: "Greater Accra",
    about: "MTN Ghana is the country's leading telecommunications provider, offering voice, data, and fintech solutions to over 25 million subscribers. We are passionate about developing Ghana's digital economy and nurturing young talent."
  });
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: replace with API call PATCH /api/companies/me
    setToast({ message: "Profile updated successfully!", type: "success" });
  };

  return (
    <CompanyLayout title="My Profile">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-3xl">
        {/* Verification badge */}
        <div className="card mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
            <Building2 size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-text-primary text-xl">{form.name}</h2>
            <p className="text-text-secondary text-sm">{form.industry} • {form.city}, {form.region}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
            <CheckCircle size={14} /> Verified
          </div>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-lg mb-6">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Company Name">
                <div className="relative">
                  <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" value={form.name} onChange={set("name")} className="input-field pl-9" />
                </div>
              </FormField>
              <FormField label="Industry / Sector">
                <div className="relative">
                  <select value={form.industry} onChange={set("industry")} className="input-field appearance-none">
                    {industries.map(i => <option key={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Email Address">
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="email" value={form.email} onChange={set("email")} className="input-field pl-9" />
                </div>
              </FormField>
              <FormField label="Phone Number">
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="tel" value={form.phone} onChange={set("phone")} className="input-field pl-9" />
                </div>
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="City">
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" value={form.city} onChange={set("city")} className="input-field pl-9" />
                </div>
              </FormField>
              <FormField label="Region">
                <div className="relative">
                  <select value={form.region} onChange={set("region")} className="input-field appearance-none">
                    {ghanaRegions.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>
            <FormField label="About / Description">
              <div className="relative">
                <FileText size={15} className="absolute left-3.5 top-3.5 text-text-secondary" />
                <textarea value={form.about} onChange={set("about")} rows={4}
                  className="input-field pl-9 resize-none" placeholder="Tell schools about your company..." />
              </div>
            </FormField>
            <div className="flex justify-end pt-2">
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </CompanyLayout>
  );
}
