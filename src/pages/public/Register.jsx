import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, KenteDivider } from '../../components/Shared'
import { ghanaRegions, departments } from '../../data/mockData'
import { Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react'

function PasswordField({ value, onChange, label, error, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} value={value} onChange={onChange}
          placeholder={placeholder || '••••••••'} className={`input-field pr-12 ${error ? 'border-red-300' : ''}`} />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export function RegisterCompany() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', industry: '', email: '', phone: '', city: '', region: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const industries = ['Banking & Finance', 'Telecommunications', 'Manufacturing / FMCG', 'Information Technology', 'Healthcare', 'Media & Communications', 'Oil & Gas', 'Education', 'Retail & Commerce', 'Agriculture', 'Construction', 'Hospitality & Tourism', 'NGO / Civil Society', 'Government / Public Sector']

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'Company name is required'
    if (!form.industry) e.industry = 'Please select an industry'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone) e.phone = 'Phone is required'
    if (!form.city) e.city = 'City is required'
    if (!form.region) e.region = 'Region is required'
    if (form.password.length < 8) e.password = 'At least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    // TODO: POST /api/auth/register/company
    setTimeout(() => { setLoading(false); navigate('/pending-approval') }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Logo />
        <Link to="/login" className="text-sm text-text-secondary hover:text-primary">Already registered? Sign in</Link>
      </nav>
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 size={28} className="text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary">Company Registration</h1>
            <p className="text-text-secondary mt-2">Join CuriousMinds and connect with Ghana's top schools.</p>
          </div>

          <form onSubmit={handleSubmit} className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="label">Company Name</label>
                <input value={form.name} onChange={set('name')} placeholder="e.g. Ecobank Ghana" className={`input-field ${errors.name ? 'border-red-300' : ''}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Industry / Sector</label>
                <select value={form.industry} onChange={set('industry')} className={`input-field ${errors.industry ? 'border-red-300' : ''}`}>
                  <option value="">Select an industry...</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="hr@company.com.gh" className={`input-field ${errors.email ? 'border-red-300' : ''}`} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input value={form.phone} onChange={set('phone')} placeholder="+233 24 000 0000" className={`input-field ${errors.phone ? 'border-red-300' : ''}`} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="label">City</label>
                <input value={form.city} onChange={set('city')} placeholder="e.g. Accra" className={`input-field ${errors.city ? 'border-red-300' : ''}`} />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="label">Region</label>
                <select value={form.region} onChange={set('region')} className={`input-field ${errors.region ? 'border-red-300' : ''}`}>
                  <option value="">Select region...</option>
                  {ghanaRegions.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
              </div>
              <PasswordField value={form.password} onChange={set('password')} label="Password" error={errors.password} />
              <PasswordField value={form.confirm} onChange={set('confirm')} label="Confirm Password" error={errors.confirm} />
            </div>

            <p className="text-xs text-text-secondary mt-5">By registering, you agree that your account will be reviewed and verified by a CuriousMinds administrator before activation.</p>

            <button type="submit" disabled={loading} className="btn-secondary justify-center w-full mt-6 disabled:opacity-60">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Company Account <ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="text-center text-sm text-text-secondary mt-4">
            Are you a school? <Link to="/register-school" className="text-primary font-semibold hover:underline">Register as a school</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export function RegisterSchool() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', type: '', email: '', phone: '', district: '', region: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'School name is required'
    if (!form.type) e.type = 'Please select school type'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone) e.phone = 'Phone is required'
    if (!form.district) e.district = 'District is required'
    if (!form.region) e.region = 'Region is required'
    if (form.password.length < 8) e.password = 'At least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    // TODO: POST /api/auth/register/school
    setTimeout(() => { setLoading(false); navigate('/pending-approval') }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Logo />
        <Link to="/login" className="text-sm text-text-secondary hover:text-primary">Already registered? Sign in</Link>
      </nav>
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏫</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary">School Registration</h1>
            <p className="text-text-secondary mt-2">Get your students access to Ghana's best internship opportunities.</p>
          </div>

          <form onSubmit={handleSubmit} className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="label">School Name</label>
                <input value={form.name} onChange={set('name')} placeholder="e.g. Achimota Senior High School" className={`input-field ${errors.name ? 'border-red-300' : ''}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">School Type</label>
                <div className="flex gap-3">
                  {['JHS', 'SHS', 'Both'].map(t => (
                    <label key={t} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.type === t ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-text-secondary hover:border-gray-300'}`}>
                      <input type="radio" name="type" value={t} checked={form.type === t} onChange={set('type')} className="hidden" />
                      <span className="font-semibold text-sm">{t}</span>
                    </label>
                  ))}
                </div>
                {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="admin@school.edu.gh" className={`input-field ${errors.email ? 'border-red-300' : ''}`} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input value={form.phone} onChange={set('phone')} placeholder="+233 30 000 0000" className={`input-field ${errors.phone ? 'border-red-300' : ''}`} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="label">District</label>
                <input value={form.district} onChange={set('district')} placeholder="e.g. Ayawaso West" className={`input-field ${errors.district ? 'border-red-300' : ''}`} />
                {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
              </div>
              <div>
                <label className="label">Region</label>
                <select value={form.region} onChange={set('region')} className={`input-field ${errors.region ? 'border-red-300' : ''}`}>
                  <option value="">Select region...</option>
                  {ghanaRegions.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
              </div>
              <PasswordField value={form.password} onChange={set('password')} label="Password" error={errors.password} />
              <PasswordField value={form.confirm} onChange={set('confirm')} label="Confirm Password" error={errors.confirm} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary justify-center w-full mt-6 disabled:opacity-60">
              {loading ? <span className="w-5 h-5 border-2 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" /> : <>Create School Account <ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="text-center text-sm text-text-secondary mt-4">
            Are you a company? <Link to="/register-company" className="text-primary font-semibold hover:underline">Register as a company</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
