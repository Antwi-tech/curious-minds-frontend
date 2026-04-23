import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FormField } from "../components/shared";

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("school");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    // TODO: replace with API call
    navigate(`/${tab}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="kente-border absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #F4A623 0, #F4A623 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-white font-display font-bold">CM</span>
          </div>
          <span className="font-display font-bold text-white text-xl">Curious Minds</span>
        </Link>
        <div className="relative z-10">
          <h2 className="font-display font-extrabold text-white text-5xl leading-tight mb-6">
            Welcome back to Ghana's internship platform
          </h2>
          <p className="text-white/70 text-lg">Thousands of students. Hundreds of companies. One platform.</p>
        </div>
        <div className="relative z-10 flex gap-4">
          {["50+ Companies", "120+ Schools", "2,400+ Students"].map(s => (
            <div key={s} className="bg-white/10 rounded-xl px-4 py-3 text-white text-sm font-semibold">{s}</div>
          ))}
        </div>
        <div className="kente-border absolute bottom-0 left-0 right-0" />
      </div>

      {/* Right Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">CM</span>
              </div>
              <span className="font-display font-bold text-primary">Curious Minds</span>
            </Link>
            <h1 className="font-display font-bold text-text-primary text-3xl mb-2">Sign in to your account</h1>
            <p className="text-text-secondary text-sm">Don't have an account? <Link to="/register/school" className="text-primary font-semibold hover:underline">Register here</Link></p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {["school", "company", "admin"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField label="Email Address" error={errors.email}>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input type="email" placeholder="you@school.edu.gh" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={`input-field pl-10 ${errors.email ? "border-red-400" : ""}`} />
              </div>
            </FormField>

            <FormField label="Password" error={errors.password}>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input type={showPw ? "text" : "password"} placeholder="Enter your password" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className={`input-field pl-10 pr-10 ${errors.password ? "border-red-400" : ""}`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </FormField>

            <div className="flex justify-end">
              <Link to="#" className="text-sm text-primary font-semibold hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-xs text-text-secondary mt-8">
            Need to register? <Link to="/register/school" className="text-primary font-semibold hover:underline">School</Link> or <Link to="/register/company" className="text-primary font-semibold hover:underline">Company</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
