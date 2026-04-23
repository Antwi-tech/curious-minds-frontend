import { useState } from "react";
import { Search, Download, ChevronDown } from "lucide-react";
import { AdminLayout, StatusBadge, PageHeader } from "../../components/shared";
import { mockBookings } from "../../data/mockData";

export default function AdminBookings() {
  const [bookings] = useState(mockBookings);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = bookings.filter(b => {
    const q = query.toLowerCase();
    const matchQ = !q || b.school.toLowerCase().includes(q) || b.company.toLowerCase().includes(q) || b.slot.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || b.status === statusFilter;
    return matchQ && matchS;
  });

  const exportCSV = () => {
    // TODO: replace with API call GET /api/bookings/export
    const rows = [
      ["ID", "School", "Company", "Slot", "Date", "Students", "Status", "Submitted"],
      ...filtered.map(b => [b.id, b.school, b.company, b.slot, b.slotDate, b.students, b.status, b.submittedAt])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bookings.csv";
    a.click();
  };

  return (
    <AdminLayout title="All Bookings">
      <PageHeader
        title="All Bookings"
        subtitle={`${filtered.length} bookings across the platform`}
        action={
          <button onClick={exportCSV} className="btn-outline btn-sm">
            <Download size={14} /> Export CSV
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search by school, company, or slot..." value={query}
            onChange={e => setQuery(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="input-field appearance-none pr-9 min-w-[140px]">
            <option value="all">All Statuses</option>
            {["pending", "approved", "rejected", "cancelled", "completed"].map(s => (
              <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["#", "School", "Company", "Slot", "Date", "Students", "Status", "Submitted"].map(h => (
                <th key={h} className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-4 font-mono text-xs text-text-secondary">#{b.id.toString().padStart(4, "0")}</td>
                <td className="py-3 pr-4 font-semibold text-text-primary text-xs">{b.school}</td>
                <td className="py-3 pr-4 text-text-secondary text-xs">{b.company}</td>
                <td className="py-3 pr-4 text-text-secondary text-xs max-w-[140px] truncate">{b.slot}</td>
                <td className="py-3 pr-4 font-mono text-xs text-text-secondary">{b.slotDate}</td>
                <td className="py-3 pr-4 text-text-secondary text-xs">{b.students}</td>
                <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                <td className="py-3 font-mono text-xs text-text-secondary">{b.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-text-secondary text-sm">No bookings found for the selected filters.</div>
        )}
      </div>
    </AdminLayout>
  );
}
