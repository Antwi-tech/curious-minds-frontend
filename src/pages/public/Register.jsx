import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Shared'
import { ghanaRegions } from '../../data/mockData'
import { Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react'
import { registerCompany, registerSchool } from '../../api'

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
  const [form, setForm] = useState({
    company_name: '',
    industry_type: '',
    email: '',
    phone_number: '',
    company_address: '',
    region: '',
    contact_person: '',
    description: '',
    website: '',
    password: '',
    confirm: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const industries = ['Banking & Finance', 'Telecommunications', 'Manufacturing / FMCG', 'Information Technology', 'Healthcare', 'Media & Communications', 'Oil & Gas', 'Education', 'Retail & Commerce', 'Agriculture', 'Construction', 'Hospitality & Tourism', 'NGO / Civil Society', 'Government / Public Sector']

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.company_name) e.company_name = 'Company name is required'
    if (!form.industry_type) e.industry_type = 'Please select an industry'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone_number) e.phone_number = 'Phone is required'
    if (!form.company_address) e.company_address = 'Address is required'
    if (!form.region) e.region = 'Region is required'
    if (!form.contact_person) e.contact_person = 'Contact person is required'
    if (!form.description) e.description = 'Description is required'
    if (form.password.length < 8) e.password = 'At least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
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
      await registerCompany({
        company_name: form.company_name,
        email: form.email,
        password: form.password,
        contact_person: form.contact_person,
        phone_number: form.phone_number,
        company_address: form.company_address,
        region: form.region,
        description: form.description,
        industry_type: form.industry_type,
        website: form.website || undefined,
      })
      navigate('/pending-approval')
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

          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="label">Company Name</label>
                <input value={form.company_name} onChange={set('company_name')} placeholder="e.g. Ecobank Ghana" className={`input-field ${errors.company_name ? 'border-red-300' : ''}`} />
                {errors.company_name && <p className="text-xs text-red-500 mt-1">{errors.company_name}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Industry / Sector</label>
                <select value={form.industry_type} onChange={set('industry_type')} className={`input-field ${errors.industry_type ? 'border-red-300' : ''}`}>
                  <option value="">Select an industry...</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                {errors.industry_type && <p className="text-xs text-red-500 mt-1">{errors.industry_type}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Contact Person</label>
                <input value={form.contact_person} onChange={set('contact_person')} placeholder="e.g. Kwame Mensah" className={`input-field ${errors.contact_person ? 'border-red-300' : ''}`} />
                {errors.contact_person && <p className="text-xs text-red-500 mt-1">{errors.contact_person}</p>}
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="hr@company.com.gh" className={`input-field ${errors.email ? 'border-red-300' : ''}`} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input value={form.phone_number} onChange={set('phone_number')} placeholder="+233 24 000 0000" className={`input-field ${errors.phone_number ? 'border-red-300' : ''}`} />
                {errors.phone_number && <p className="text-xs text-red-500 mt-1">{errors.phone_number}</p>}
              </div>
              <div>
                <label className="label">Company Address</label>
                <input value={form.company_address} onChange={set('company_address')} placeholder="e.g. 123 Independence Ave, Accra" className={`input-field ${errors.company_address ? 'border-red-300' : ''}`} />
                {errors.company_address && <p className="text-xs text-red-500 mt-1">{errors.company_address}</p>}
              </div>
              <div>
                <label className="label">Region</label>
                <select value={form.region} onChange={set('region')} className={`input-field ${errors.region ? 'border-red-300' : ''}`}>
                  <option value="">Select region...</option>
                  {ghanaRegions.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Website <span className="text-text-secondary font-normal">(optional)</span></label>
                <input value={form.website} onChange={set('website')} placeholder="e.g. https://yourcompany.com.gh" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="label">Company Description</label>
                <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Briefly describe what your company does and what interns can expect..." className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`} />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
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
  const [form, setForm] = useState({
    school_name: '',
    type: '',
    email: '',
    phone_number: '',
    school_address: '',
    region: '',
    contact_person: '',
    description: '',
    website: '',
    password: '',
    confirm: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.school_name) e.school_name = 'School name is required'
    if (!form.type) e.type = 'Please select school type'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone_number) e.phone_number = 'Phone is required'
    if (!form.school_address) e.school_address = 'Address is required'
    if (!form.region) e.region = 'Region is required'
    if (!form.contact_person) e.contact_person = 'Contact person is required'
    if (!form.description) e.description = 'Description is required'
    if (form.password.length < 8) e.password = 'At least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
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
      await registerSchool({
        school_name: form.school_name,
        email: form.email,
        password: form.password,
        school_address: form.school_address,
        region: form.region,
        contact_person: form.contact_person,
        phone_number: form.phone_number,
        description: form.description,
        website: form.website || undefined,
    })
      navigate('/pending-approval')
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

          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="label">School Name</label>
                <input value={form.school_name} onChange={set('school_name')} placeholder="e.g. Achimota Senior High School" className={`input-field ${errors.school_name ? 'border-red-300' : ''}`} />
                {errors.school_name && <p className="text-xs text-red-500 mt-1">{errors.school_name}</p>}
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
              <div className="md:col-span-2">
                <label className="label">Contact Person</label>
                <input value={form.contact_person} onChange={set('contact_person')} placeholder="e.g. Ama Asante" className={`input-field ${errors.contact_person ? 'border-red-300' : ''}`} />
                {errors.contact_person && <p className="text-xs text-red-500 mt-1">{errors.contact_person}</p>}
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="admin@school.edu.gh" className={`input-field ${errors.email ? 'border-red-300' : ''}`} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input value={form.phone_number} onChange={set('phone_number')} placeholder="+233 30 000 0000" className={`input-field ${errors.phone_number ? 'border-red-300' : ''}`} />
                {errors.phone_number && <p className="text-xs text-red-500 mt-1">{errors.phone_number}</p>}
              </div>
              <div>
                <label className="label">School Address</label>
                <input value={form.school_address} onChange={set('school_address')} placeholder="e.g. 123 School Road, Accra" className={`input-field ${errors.school_address ? 'border-red-300' : ''}`} />
                {errors.school_address && <p className="text-xs text-red-500 mt-1">{errors.school_address}</p>}
              </div>
              <div>
                <label className="label">Region</label>
                <select value={form.region} onChange={set('region')} className={`input-field ${errors.region ? 'border-red-300' : ''}`}>
                  <option value="">Select region...</option>
                  {ghanaRegions.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Website <span className="text-text-secondary font-normal">(optional)</span></label>
                <input value={form.website} onChange={set('website')} placeholder="e.g. https://yourschool.edu.gh" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="label">School Description</label>
                <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Briefly describe your school and what students can expect from internships..." className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`} />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>
              <PasswordField value={form.password} onChange={set('password')} label="Password" error={errors.password} />
              <PasswordField value={form.confirm} onChange={set('confirm')} label="Confirm Password" error={errors.confirm} />
            </div>
            <p className="text-xs text-text-secondary mt-5">By registering, you agree that your account will be reviewed and verified by a CuriousMinds administrator before activation.</p>
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