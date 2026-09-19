import { useState, useEffect } from 'react'
import { DashboardLayout, Toast, EmptyState } from '../../components/Shared'
import { Search, X, MapPin, Phone, Mail, GraduationCap, ChevronDown } from 'lucide-react'
import { getStoredUser } from './companyHelpers'
import { getSchoolsDirectory } from '../../api'
import { ghanaRegions } from '../../data/mockData'

export default function SchoolsDirectory() {
  const user = getStoredUser()
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const [selectedSchool, setSelectedSchool] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await getSchoolsDirectory()
        setSchools(res.data.schools || [])
      } catch {
        setToast({ message: 'Failed to load schools', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchSchools()
  }, [])

  const filtered = schools.filter(s => {
    const q = query.toLowerCase()
    const matchQ = !q ||
      s.school_name.toLowerCase().includes(q) ||
      (s.region || '').toLowerCase().includes(q) ||
      (s.school_address || '').toLowerCase().includes(q)
    const matchRegion = !region || s.region === region
    return matchQ && matchRegion
  })

  return (
    <DashboardLayout role="company" userName={user.company_name || 'Company'} title="Schools Directory">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Search and filter row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by school name, region, or address..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field pl-9"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="relative">
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="input-field appearance-none pr-9 min-w-[180px]">
            <option value="">All Regions</option>
            {ghanaRegions.map(r => <option key={r}>{r}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        </div>
      </div>

      <p className="text-text-secondary text-sm mb-6">
        {loading ? 'Loading...' : `${filtered.length} verified school${filtered.length !== 1 ? 's' : ''} found`}
      </p>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading schools...</div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No schools found"
          desc="Try adjusting your search or region filter."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(school => (
            <div
              key={school.school_id}
              className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedSchool(school)}>

              {/* Colored top strip */}
              <div className="h-2 bg-primary w-full" />

              <div className="p-6">
                {/* Avatar and region */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0">
                    {school.school_name.charAt(0)}
                  </div>
                  <span className="text-xs bg-accent/20 text-amber-800 font-semibold px-3 py-1 rounded-full">
                    {school.region}
                  </span>
                </div>

                <h3 className="font-display font-bold text-text-primary text-base mb-1 group-hover:text-primary transition-colors">
                  {school.school_name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
                  <MapPin size={12} />
                  <span>{school.school_address || school.region}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-text-secondary mb-4">
                  <Phone size={12} />
                  <span>{school.phone_number}</span>
                </div>

                <button
                  onClick={e => { e.stopPropagation(); setSelectedSchool(school); }}
                  className="btn-outline w-full justify-center text-sm py-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* School Detail Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedSchool(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in-up max-h-[90vh] overflow-y-auto">

            {/* Close button */}
            <button
              onClick={() => setSelectedSchool(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary">
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-display text-2xl font-bold flex-shrink-0">
                {selectedSchool.school_name.charAt(0)}
              </div>
              <div>
                <h2 className="font-display font-bold text-text-primary text-xl">
                  {selectedSchool.school_name}
                </h2>
                <div className="flex items-center gap-1 text-text-secondary text-sm mt-0.5">
                  <MapPin size={13} />
                  <span>{selectedSchool.region}</span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: Mail, label: 'Email', value: selectedSchool.email },
                { icon: Phone, label: 'Phone', value: selectedSchool.phone_number },
                { icon: MapPin, label: 'Address', value: selectedSchool.school_address || '—' },
                { icon: GraduationCap, label: 'Contact Person', value: selectedSchool.contact_person },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-surface rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} className="text-primary" />
                    <p className="text-xs text-text-secondary font-medium">{label}</p>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {selectedSchool.description && (
              <div className="bg-surface rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  About
                </p>
                <p className="text-sm text-text-primary leading-relaxed">
                  {selectedSchool.description}
                </p>
              </div>
            )}

                {selectedSchool.website && (
        <a href={selectedSchool.website} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 mb-6">
          Visit Website →
        </a>
      )}

            <button
              onClick={() => setSelectedSchool(null)}
              className="btn-secondary w-full justify-center">
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}