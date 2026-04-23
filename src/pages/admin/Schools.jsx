import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, School, CheckCircle, XCircle, Eye } from "lucide-react";
import { AdminLayout, StatusBadge, PageHeader, Modal, Toast } from "../../components/shared";
import { mockSchools } from "../../data/mockData";

export default function AdminSchools() {
  const [schools, setSchools] = useState(mockSchools);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = schools.filter(s => {
    const q = query.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q);
    const matchF = filter === "all" || s.status === filter;
    return matchQ && matchF;
  });

  const updateStatus = (id, status) => {
    // TODO: replace with API call PATCH /api/schools/:id
    setSchools(schools.map(s => s.id === id ? { ...s, status } : s));
    setModal(null);
    setToast({ message: `School ${status}`, type: "success" });
  };

  return (
    <AdminLayout title="Manage Schools">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.action === "verified" ? "Verify School" : "Deactivate School"}>
        <p className="text-text-secondary text-sm mb-6">
          {modal?.action === "verified" ? `Verify ${modal?.school?.name}?` : `Deactivate ${modal?.school?.name}?`}
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={() => updateStatus(modal.school.id, modal.action)}
            className={`btn-sm text-white px-4 py-2 rounded-xl font-semibold transition-colors ${modal?.action === "verified" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}>
            Confirm
          </button>
        </div>
      </Modal>

      <PageHeader title="Schools" subtitle={`${filtered.length} schools registered`} />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search schools..." value={query}
            onChange={e => setQuery(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2">
          {["all", "verified", "pending"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${filter === f ? "bg-primary text-white" : "bg-white text-text-secondary border border-gray-200 hover:border-primary hover:text-primary"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[650px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["School", "Type", "Location", "Status", "Bookings", "Actions"].map(h => (
                <th key={h} className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <School size={13} className="text-accent-dark" />
                    </div>
                    <span className="font-semibold text-text-primary">{s.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4"><span className="badge-open">{s.type}</span></td>
                <td className="py-3 pr-4 text-text-secondary text-xs">{s.location}</td>
                <td className="py-3 pr-4"><StatusBadge status={s.status} /></td>
                <td className="py-3 pr-4 text-text-secondary text-xs">{s.bookings}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/schools/${s.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-text-secondary hover:text-primary transition-colors">
                      <Eye size={14} />
                    </Link>
                    {s.status === "pending" && (
                      <button onClick={() => setModal({ school: s, action: "verified" })}
                        className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        <CheckCircle size={14} />
                      </button>
                    )}
                    {s.status !== "deactivated" && (
                      <button onClick={() => setModal({ school: s, action: "deactivated" })}
                        className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors">
                        <XCircle size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
