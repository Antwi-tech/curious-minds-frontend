import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, ArrowRight } from 'lucide-react'
import { loginAdmin } from '../../api'
import { Logo } from '../../components/Shared'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setServerError('')
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)

    try {
      const res = await loginAdmin({ email, password })
      const { access_token, refresh_token, admin } = res.data
      localStorage.setItem('token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('user', JSON.stringify(admin))
      localStorage.setItem('role', 'admin')
      navigate('/admin/dashboard')
    } catch (err) {
      if (err.response?.data?.error) {
        setServerError(err.response.data.error)
      } else {
        setServerError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Kente pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 3px, transparent 3px, transparent 24px)'
      }} />

      <div className="relative w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <Logo light />
          <div className="mt-6 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-accent" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Admin Access
          </h1>
          <p className="text-white/60 text-sm">
            Restricted area. Authorised personnel only.
          </p>
        </div>

        {/* Server error */}
        {serverError && (
          <div className="mb-5 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm text-center">
            {serverError}
          </div>
        )}

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@curiousminds.gh"
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                  errors.email ? 'border-red-400' : 'border-white/20'
                }`}
              />
              {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                    errors.password ? 'border-red-400' : 'border-white/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-300 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {loading
                ? <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                : <>Access Dashboard <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Not an admin? <a href="/login" className="text-white/60 hover:text-white underline">Go back to login</a>
        </p>
      </div>
    </div>
  )
}