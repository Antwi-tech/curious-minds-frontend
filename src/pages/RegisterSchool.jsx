import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { School, Mail, Phone, MapPin, Lock, Eye, EyeOff, ArrowRight, ChevronDown } from "lucide-react";
import { FormField } from "../components/shared";
import { ghanaRegions } from "../data/mockData";

export default function RegisterSchool() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", email: "", phone: "", district: "", region: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "School name is required";
    if (!form.type) e.type = "School type is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone) e.phone = "Phone number is required";
    if (!form.district) e.district = "District is required";
    if (!form.region) e.region = "Region is required";
    if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    // TODO: replace with API call POST /api/schools/register
    navigate("/pending-approval");
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold">CM</span>
            </div>
            <span className="font-display font-bold text-primary text-xl">Curious Minds</span>
          </Link>
          <h1 className="font-display font-bold text-text-primary text-3xl mb-2">Register Your School</h1>
          <p className="text-text-secondary text-sm">Give your students access to Ghana's best internship opportunities</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl mb-6 border border-accent/20">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <School size={18} className="text-primary-dark" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">School Account</p>
              <p className="text-xs text-text-secondary">Your school will be verified by our admin team before full access is granted</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="School Name" error={errors.name}>
                <div className="relative">
                  <School size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" placeholder="e.g. Achimota Senior High School" value={form.name}
                    onChange={set("name")} className={`input-field pl-9 ${errors.name ? "border-red-400" : ""}`} />
                </div>
              </FormField>

              <FormField label="School Type" error={errors.type}>
                <div className="relative">
                  <select value={form.type} onChange={set("type")}
                    className={`input-field appearance-none ${errors.type ? "border-red-400" : ""}`}>
                    <option value="">Select type</option>
                    <option value="JHS">Junior High School (JHS)</option>
                    <option value="SHS">Senior High School (SHS)</option>
                    <option value="both">Both JHS & SHS</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Email Address" error={errors.email}>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="email" placeholder="admin@school.edu.gh" value={form.email}
                    onChange={set("email")} className={`input-field pl-9 ${errors.email ? "border-red-400" : ""}`} />
                </div>
              </FormField>

              <FormField label="Phone Number" error={errors.phone}>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="tel" placeholder="+233 30 000 0000" value={form.phone}
                    onChange={set("phone")} className={`input-field pl-9 ${errors.phone ? "border-red-400" : ""}`} />
                </div>
              </FormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="School address/District" error={errors.district}>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" placeholder="e.g. Accra Metro" value={form.district}
                    onChange={set("district")} className={`input-field pl-9 ${errors.district ? "border-red-400" : ""}`} />
                </div>
              </FormField>

              <FormField label="Region" error={errors.region}>
                <div className="relative">
                  <select value={form.region} onChange={set("region")}
                    className={`input-field appearance-none ${errors.region ? "border-red-400" : ""}`}>
                    <option value="">Select region</option>
                    {ghanaRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Password" error={errors.password}>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" value={form.password}
                    onChange={set("password")} className={`input-field pl-9 pr-10 ${errors.password ? "border-red-400" : ""}`} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </FormField>

              <FormField label="Confirm Password" error={errors.confirmPassword}>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="password" placeholder="Re-enter password" value={form.confirmPassword}
                    onChange={set("confirmPassword")} className={`input-field pl-9 ${errors.confirmPassword ? "border-red-400" : ""}`} />
                </div>
              </FormField>
            </div>

            <button type="submit" className="btn-primary w-full justify-center text-base py-3.5 mt-2">
              Create School Account <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already registered? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
