import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { CompanyLayout, FormField, Toast } from "../../components/shared";

export default function CompanyChangePassword() {
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const set = k => e => setForm({ ...form, [k]: e.target.value });
  const toggle = k => () => setShow({ ...show, [k]: !show[k] });

  const validate = () => {
    const e = {};
    if (!form.current) e.current = "Current password required";
    if (!form.newPw || form.newPw.length < 8) e.newPw = "Minimum 8 characters";
    if (form.newPw !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // TODO: replace with API call PATCH /api/companies/me/password
    setToast({ message: "Password changed successfully!", type: "success" });
    setForm({ current: "", newPw: "", confirm: "" });
    setErrors({});
  };

  const PwField = ({ name, label, field, err }) => (
    <FormField label={label} error={err}>
      <div className="relative">
        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input type={show[name] ? "text" : "password"} value={form[field]} onChange={set(field)}
          className={`input-field pl-9 pr-10 ${err ? "border-red-400" : ""}`} placeholder="••••••••" />
        <button type="button" onClick={toggle(name)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
          {show[name] ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </FormField>
  );

  return (
    <CompanyLayout title="Settings">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-md">
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-xl mb-6">Change Password</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <PwField name="current" label="Current Password" field="current" err={errors.current} />
            <div className="border-t border-gray-100 pt-5">
              <PwField name="new" label="New Password" field="newPw" err={errors.newPw} />
              <div className="mt-5">
                <PwField name="confirm" label="Confirm New Password" field="confirm" err={errors.confirm} />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="btn-primary">Save New Password</button>
            </div>
          </form>
        </div>
      </div>
    </CompanyLayout>
  );
}
