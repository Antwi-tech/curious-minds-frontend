import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, School, Mail, Phone, MapPin, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { AdminLayout, StatusBadge, Modal, Toast } from "../../components/shared";
import { mockSchools, mockBookings } from "../../data/mockData";

export default function AdminSchoolDetail() {
  const { id } = useParams();
  const [school, setSchool] = useState(mockSchools.find(s => s.id === +id) || mockSchools[0]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const schoolBookings = mockBookings.filter(b => b.school === school.name);

  const updateStatus = (status) => {
    // TODO: replace with API call PATCH /api/schools/:id
    setSchool({ ...school, status });
    setModal(null);
    setToast({ message: `School ${status}`, type: "success" });
  };

  return (
    <AdminLayout title="School Detail">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "verified" ? "Verify School" : "Deactivate School"}>
        <p className="text-text-secondary text-sm mb-6">
          {modal === "verified" ? "Verify and activate this school?" : "Deactivate this school?"}
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={() => updateStatus(modal)}
            className={`btn-sm text-white px-4 py-2 rounded-xl font-semibold transition-colors ${modal === "verified" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}>
            Confirm
          </button>
        </div>
      </Modal>

      <Link to="/admin/schools" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Schools
      </Link>

      <div className="max-w-3xl grid gap-6">
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                <School size={24} className="text-primary-dark" />
              </div>
              <div>
                <h2 className="font-display font-bold text-text-primary text-2xl">{school.name}</h2>
                <span className="badge-open">{school.type}</span>
              </div>
            </div>
            <StatusBadge status={school.status} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", value: school.email },
              { icon: Phone, label: "Phone", value: school.phone },
              { icon: MapPin, label: "Location", value: school.location },
              { icon: BookOpen, label: "Total Bookings", value: `${school.bookings} bookings` },
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

        <div className="flex gap-3">
          {school.status !== "verified" && (
            <button onClick={() => setModal("verified")} className="btn-primary">
              <CheckCircle size={16} /> Verify School
            </button>
          )}
          {school.status !== "deactivated" && (
            <button onClick={() => setModal("deactivated")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors">
              <XCircle size={16} /> Deactivate
            </button>
          )}
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-lg mb-4">Booking History ({schoolBookings.length})</h3>
          {schoolBookings.length === 0 ? (
            <p className="text-text-secondary text-sm text-center py-6">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {schoolBookings.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{b.slot}</p>
                    <p className="text-text-secondary text-xs">{b.company} • {b.slotDate}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
