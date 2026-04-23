import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { SchoolLayout, SlotCard, EmptyState, PageHeader } from "../../components/shared";
import { mockSlots, fields, ghanaRegions } from "../../data/mockData";

export default function BrowseOpportunities() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ field: "", region: "", dateFrom: "", dateTo: "" });
  const [showFilters, setShowFilters] = useState(false);
  const setF = k => e => setFilters({ ...filters, [k]: e.target.value });

  const filtered = mockSlots.filter(s => {
    const q = query.toLowerCase();
    const matchQ = !q || s.title.toLowerCase().includes(q) || s.company.toLowerCase().includes(q) || s.field.toLowerCase().includes(q);
    const matchField = !filters.field || s.field === filters.field;
    return matchQ && matchField;
  });

  return (
    <SchoolLayout title="Browse Opportunities">
      <PageHeader title="Browse Internship Slots" subtitle={`${filtered.length} opportunities available`} />

      {/* Search */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search by company, field, or keyword..." value={query}
            onChange={e => setQuery(e.target.value)} className="input-field pl-9" />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${showFilters ? "border-primary text-primary bg-primary/5" : "border-gray-200 text-text-secondary hover:border-primary hover:text-primary"}`}>
          <Filter size={15} /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="card mb-6 grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Field / Department</label>
            <div className="relative">
              <select value={filters.field} onChange={setF("field")} className="input-field appearance-none text-sm">
                <option value="">All Fields</option>
                {fields.map(f => <option key={f}>{f}</option>)}
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
          <button onClick={() => setFilters({ field: "", region: "", dateFrom: "", dateTo: "" })}
            className="text-xs text-text-secondary hover:text-red-500 transition-colors font-semibold flex items-center gap-1">
            <X size={12} /> Clear Filters
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No slots found" description="Try adjusting your search or filters to find more opportunities." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(slot => (
            <SlotCard key={slot.id} slot={slot} onAction={s => navigate(`/school/slots/${s.id}`)} />
          ))}
        </div>
      )}
    </SchoolLayout>
  );
}
