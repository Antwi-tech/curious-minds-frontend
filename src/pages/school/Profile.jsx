import { useState } from "react";
import { School, Mail, Phone, MapPin, CheckCircle, ChevronDown } from "lucide-react";
import { SchoolLayout, FormField, Toast } from "../../components/shared";
import { ghanaRegions } from "../../data/mockData";

export default function SchoolProfile() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "Achimota Senior High School", type: "SHS",
    email: "admin@achimotashs.edu.gh", phone: "+233 30 240 1234",
    district: "Accra Metro", region: "Greater Accra",
  });
  const set = k => e => setForm({ ...form, [k]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: replace with API call PATCH /api/schools/me
    setToast({ message: "Profile updated successfully!", type: "success" });
  };

  return (
    <SchoolLayout title="My Profile">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-3xl">
        <div className="card mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0">
            <School size={24} className="text-primary-dark" />
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-text-primary text-xl">{form.name}</h2>
            <p className="text-text-secondary text-sm">{form.type} • {form.district}, {form.region}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
            <CheckCircle size={14} /> Verified
          </div>
        </div>
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-lg mb-6">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="School Name">
                <div className="relative"><School size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" value={form.name} onChange={set("name")} className="input-field pl-9" />
                </div>
              </FormField>
              <FormField label="School Type">
                <div className="relative">
                  <select value={form.type} onChange={set("type")} className="input-field appearance-none">
                    <option value="JHS">JHS</option><option value="SHS">SHS</option><option value="both">Both</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Email Address">
                <div className="relative"><Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="email" value={form.email} onChange={set("email")} className="input-field pl-9" />
                </div>
              </FormField>
              <FormField label="Phone Number">
                <div className="relative"><Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="tel" value={form.phone} onChange={set("phone")} className="input-field pl-9" />
                </div>
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="District">
                <div className="relative"><MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" value={form.district} onChange={set("district")} className="input-field pl-9" />
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
            <div className="flex justify-end pt-2">
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </SchoolLayout>
  );
}
