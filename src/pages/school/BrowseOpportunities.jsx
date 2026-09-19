import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ChevronDown, Filter, MapPin, Calendar, CheckCircle } from "lucide-react";
import { DashboardLayout, Toast, EmptyState } from "../../components/Shared";
import { ghanaRegions } from "../../data/mockData";
import { getSchoolAvailableSlots, getSchoolBookings } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function BrowseOpportunities() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [slots, setSlots] = useState([]);
  const [bookedScheduleIds, setBookedScheduleIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ region: "", dateFrom: "", dateTo: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const setF = k => e => setFilters({ ...filters, [k]: e.target.value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch slots and existing bookings at the same time
        const [slotsRes, bookingsRes] = await Promise.all([
          getSchoolAvailableSlots(),
          getSchoolBookings(),
        ]);

        setSlots(slotsRes.data.slots || []);

        // Build a Set of schedule_ids that this school has
        // already booked with a confirmed or pending status
        const existingBookings = bookingsRes.data.bookings || [];
        const bookedIds = new Set(
          existingBookings
            .filter(b => b.status === 'confirmed' || b.status === 'pending')
            .map(b => b.schedule_id)
        );
        setBookedScheduleIds(bookedIds);

      } catch {
        setToast({ message: 'Failed to load slots', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = slots.filter(s => {
    const q = query.toLowerCase();
    const matchQ = !q ||
      s.company_name.toLowerCase().includes(q) ||
      (s.industry_type || '').toLowerCase().includes(q) ||
      (s.region || '').toLowerCase().includes(q);
    const matchRegion = !filters.region || s.region === filters.region;
    const matchFrom = !filters.dateFrom || new Date(s.start_date) >= new Date(filters.dateFrom);
    const matchTo = !filters.dateTo || new Date(s.end_date) <= new Date(filters.dateTo);
    return matchQ && matchRegion && matchFrom && matchTo;
  });

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Browse Opportunities">

      {/* Search */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search by company, industry, or region..."
            value={query} onChange={e => setQuery(e.target.value)} className="input-field pl-9" />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${showFilters ? "border-primary text-primary bg-primary/5" : "border-gray-200 text-text-secondary hover:border-primary"}`}>
          <Filter size={15} /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="card p-5 mb-6 grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Region</label>
            <div className="relative">
              <select value={filters.region} onChange={setF("region")} className="input-field appearance-none text-sm">
                <option value="">All Regions</option>
                {ghanaRegions.map(r => <option key={r}>{r}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="label">Date From</label>
            <input type="date" value={filters.dateFrom} onChange={setF("dateFrom")} className="input-field text-sm" />
          </div>
          <div>
            <label className="label">Date To</label>
            <input type="date" value={filters.dateTo} onChange={setF("dateTo")} className="input-field text-sm" />
          </div>
          <button onClick={() => setFilters({ region: "", dateFrom: "", dateTo: "" })}
            className="text-xs text-text-secondary hover:text-red-500 transition-colors font-semibold flex items-center gap-1">
            <X size={12} /> Clear Filters
          </button>
        </div>
      )}

      <p className="text-text-secondary text-sm mb-6">
        {loading ? 'Loading...' : `${filtered.length} opportunit${filtered.length === 1 ? 'y' : 'ies'} available`}
      </p>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading opportunities...</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Search} title="No slots found" desc="Try adjusting your search or filters." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(slot => {
            const isBooked = bookedScheduleIds.has(slot.schedule_id);
            return (
              <div
                key={slot.schedule_id}
                className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => !isBooked && navigate(`/school/slot/${slot.schedule_id}`)}>

                {/* Colored top strip — green if booked, primary if not */}
                <div className={`h-2 w-full ${isBooked ? 'bg-green-500' : 'bg-primary'}`} />

                <div className="p-6">
                  {/* Company avatar + industry badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-display text-xl font-bold">
                      {slot.company_name.charAt(0)}
                    </div>
                    <span className="text-xs bg-accent/20 text-amber-800 font-semibold px-3 py-1 rounded-full">
                      {slot.industry_type || 'General'}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-text-primary text-lg mb-1 group-hover:text-primary transition-colors">
                    {slot.company_name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-text-secondary mb-4">
                    <MapPin size={12} />
                    <span>{slot.region}</span>
                  </div>

                  {/* Date range pill */}
                  <div className="bg-surface rounded-xl p-3 mb-5">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Calendar size={12} className="text-primary flex-shrink-0" />
                      <span className="font-mono">{new Date(slot.start_date).toLocaleDateString()}</span>
                      <span>→</span>
                      <span className="font-mono">{new Date(slot.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Button — changes based on booking status */}
                  {isBooked ? (
                    <button
                      disabled
                      className="w-full justify-center text-sm py-2.5 inline-flex items-center gap-2 bg-green-50 text-green-700 font-semibold rounded-xl border-2 border-green-200 cursor-not-allowed">
                      <CheckCircle size={16} />
                      Slot Booked
                    </button>
                  ) : (
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/school/book/${slot.schedule_id}`); }}
                      className="btn-secondary w-full justify-center text-sm py-2.5">
                      Book This Slot
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  );
}