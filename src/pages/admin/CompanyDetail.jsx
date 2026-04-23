import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, Mail, Phone, MapPin, Briefcase, CheckCircle, XCircle } from "lucide-react";
import { AdminLayout, StatusBadge, Modal, Toast } from "../../components/shared";
import { mockCompanies, mockSlots } from "../../data/mockData";

export default function AdminCompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(mockCompanies.find(c => c.id === +id) || mockCompanies[0]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const companySlots = mockSlots.filter(s => s.company === company.name);

  const updateStatus = (status) => {
    // TODO: replace with API call PATCH /api/companies/:id
    setCompany({ ...company, status });
    setModal(null);
    setToast({ message: `Company ${status}`, type: "success" });
  };

  return (
    <AdminLayout title="Company Detail">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "verified" ? "Verify Company" : "Deactivate Company"}>
        <p className="text-text-secondary text-sm mb-6">
          {modal === "verified" ? "Verify and activate this company?" : "Deactivate this company? They will lose access."}
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={() => updateStatus(modal)}
            className={`btn-sm text-white px-4 py-2 rounded-xl font-semibold transition-colors ${modal === "verified" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}>
            Confirm
          </button>
        </div>
      </Modal>

      <Link to="/admin/companies" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Companies
      </Link>

      <div className="max-w-3xl grid gap-6">
        {/* Profile Card */}
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-text-primary text-2xl">{company.name}</h2>
                <p className="text-text-secondary text-sm">{company.industry}</p>
              </div>
            </div>
            <StatusBadge status={company.status} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", value: company.email },
              { icon: Phone, label: "Phone", value: company.phone },
              { icon: MapPin, label: "Location", value: company.location },
              { icon: Briefcase, label: "Slots Created", value: `${company.slots} slots` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 p-3 bg-surface rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">{label}</p>
                  <p className="font-semibold text-text-primary text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {company.status !== "verified" && (
            <button onClick={() => setModal("verified")} className="btn-primary">
              <CheckCircle size={16} /> Verify Company
            </button>
          )}
          {company.status !== "deactivated" && (
            <button onClick={() => setModal("deactivated")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors">
              <XCircle size={16} /> Deactivate
            </button>
          )}
        </div>

        {/* Slots */}
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-lg mb-4">Internship Slots ({companySlots.length})</h3>
          {companySlots.length === 0 ? (
            <p className="text-text-secondary text-sm text-center py-6">No slots created yet</p>
          ) : (
            <div className="space-y-3">
              {companySlots.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{s.title}</p>
                    <p className="text-text-secondary text-xs">{s.field} • {s.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary">{s.booked}/{s.maxStudents}</span>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
