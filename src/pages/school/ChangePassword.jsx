import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { DashboardLayout, Toast } from "../../components/Shared";
import { changeSchoolPassword } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SchoolChangePassword() {
  const user = getStoredUser();
  const [show, setShow] = useState({ current: false, newPw: false, confirm: false });
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      // TODO: PATCH /school/change_password
      await changeSchoolPassword({
        old_password: form.current,
        new_password: form.newPw
      });
      setToast({ message: "Password changed successfully!", type: "success" });
      setForm({ current: "", newPw: "", confirm: "" });
      setErrors({});
    } catch (err) {
      setToast({
        message: err.response?.data?.error || "Failed to change password. Check current password.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const PwField = ({ name, label, field, err }) => (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type={show[name] ? "text" : "password"}
          value={form[field]}
          onChange={set(field)}
          className={`input-field pl-9 pr-10 ${err ? "border-red-400" : ""}`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={toggle(name)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
          {show[name] ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
    </div>
  );

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Settings">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-md">
        <div className="card p-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Lock size={24} className="text-primary" />
          </div>
          <h3 className="font-display font-bold text-text-primary text-xl mb-1">Change Password</h3>
          <p className="text-text-secondary text-sm mb-6">For your security, choose a strong unique password.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <PwField name="current" label="Current Password" field="current" err={errors.current} />
            <div className="border-t border-gray-100 pt-5 space-y-5">
              <PwField name="newPw" label="New Password" field="newPw" err={errors.newPw} />
              <PwField name="confirm" label="Confirm New Password" field="confirm" err={errors.confirm} />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loading} className="btn-secondary disabled:opacity-60">
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : 'Save New Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}