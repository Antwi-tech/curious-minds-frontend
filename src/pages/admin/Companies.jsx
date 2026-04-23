import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, CheckCircle, XCircle, Eye } from "lucide-react";
import { AdminLayout, StatusBadge, PageHeader, Modal, Toast } from "../../components/shared";
import { mockCompanies } from "../../data/mockData";

export default function AdminCompanies() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = companies.filter(c => {
    const q = query.toLowerCase();
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
    const matchF = filter === "all" || c.status === filter;
    return matchQ && matchF;
  });

  const updateStatus = (id, status) => {
    // TODO: replace with API call PATCH /api/companies/:id
    setCompanies(companies.map(c => c.id === id ? { ...c, status } : c));
    setModal(null);
    setToast({ message: `Company ${status}`, type: "success" });
  };

  return (
    <AdminLayout title="Manage Companies">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.action === "verified" ? "Verify Company" : "Deactivate Company"}>
        <p className="text-text-secondary text-sm mb-6">
          {modal?.action === "verified"
            ? `Verify and activate ${modal?.company?.name}?`
            : `Deactivate ${modal?.company?.name}? They will lose access.`}
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={() => updateStatus(modal.company.id, modal.action)}
            className={`btn-sm text-white px-4 py-2 rounded-xl font-semibold transition-colors ${modal?.action === "verified" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}>
            Confirm
          </button>
        </div>
      </Modal>

      <PageHeader title="Companies" subtitle={`${filtered.length} companies`} />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search companies..." value={query}
            onChange={e => setQuery(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2">
          {["all", "verified", "pending", "deactivated"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${filter === f ? "bg-primary text-white" : "bg-white text-text-secondary border border-gray-200 hover:border-primary hover:text-primary"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Company", "Industry", "Location", "Status", "Date Joined", "Actions"].map(h => (
                <th key={h} className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 size={13} className="text-primary" />
                    </div>
                    <span className="font-semibold text-text-primary">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-text-secondary text-xs">{c.industry}</td>
                <td className="py-3 pr-4 text-text-secondary text-xs">{c.location}</td>
                <td className="py-3 pr-4"><StatusBadge status={c.status} /></td>
                <td className="py-3 pr-4 font-mono text-xs text-text-secondary">{c.joined}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/companies/${c.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-text-secondary hover:text-primary transition-colors">
                      <Eye size={14} />
                    </Link>
                    {c.status === "pending" && (
                      <button onClick={() => setModal({ company: c, action: "verified" })}
                        className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        <CheckCircle size={14} />
                      </button>
                    )}
                    {c.status !== "deactivated" && (
                      <button onClick={() => setModal({ company: c, action: "deactivated" })}
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
