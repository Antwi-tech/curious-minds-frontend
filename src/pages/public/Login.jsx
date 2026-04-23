import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Toast } from '../../components/Shared'
import { Eye, EyeOff, Building2, GraduationCap, Shield, ArrowRight } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('school')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const tabs = [
    { key: 'school', label: 'School', icon: GraduationCap },
    { key: 'company', label: 'Company', icon: Building2 },
    { key: 'admin', label: 'Admin', icon: Shield },
  ]

  const validate = () => {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    // TODO: replace with API call to POST /api/auth/login
    setTimeout(() => {
      setLoading(false)
      if (role === 'school') navigate('/school/dashboard')
      else if (role === 'company') navigate('/company/dashboard')
      else navigate('/admin/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #F9F6F0 0%, #e8f5e9 100%)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 3px, transparent 3px, transparent 24px)'
        }} />
        <div className="relative text-center max-w-sm">
          <Logo light />
          <h2 className="font-display text-4xl font-bold text-white mt-8 mb-4">Welcome back</h2>
          <p className="text-white/60 text-base leading-relaxed">Continue connecting Ghana's schools and companies for meaningful internship experiences.</p>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[['200+', 'Schools'], ['150+', 'Companies'], ['5000+', 'Students']].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <p className="font-display text-2xl font-bold text-accent">{v}</p>
                <p className="text-white/60 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display text-3xl font-bold text-text-primary mb-2">Sign in</h1>
          <p className="text-text-secondary mb-8">Choose your role and enter your credentials.</p>

          {/* Role tabs */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setRole(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${role === key ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" className={`input-field ${errors.email ? 'border-red-300 focus:ring-red-200' : ''}`} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className={`input-field pr-12 ${errors.password ? 'border-red-300 focus:ring-red-200' : ''}`} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn-secondary justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{' '}
            <Link to={role === 'school' ? '/register-school' : '/register-company'} className="text-primary font-semibold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  )
}
