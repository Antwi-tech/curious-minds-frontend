import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, X } from "lucide-react";
import { SchoolLayout, StatusBadge, PageHeader, EmptyState, Modal, Toast } from "../../components/shared";
import { mockBookings } from "../../data/mockData";

const TABS = ["all", "pending", "approved", "cancelled", "completed"];

export default function SchoolBookings() {
  const [tab, setTab] = useState("all");
  const [bookings, setBookings] = useState(mockBookings);
  const [cancelModal, setCancelModal] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = tab === "all" ? bookings : bookings.filter(b => b.status === tab);

  const handleCancel = () => {
    // TODO: replace with API call PATCH /api/bookings/:id { status: "cancelled" }
    setBookings(bookings.map(b => b.id === cancelModal.id ? { ...b, status: "cancelled" } : b));
    setCancelModal(null);
    setToast({ message: "Booking cancelled", type: "info" });
  };

  return (
    <SchoolLayout title="My Bookings">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!cancelModal} onClose={() => setCancelModal(null)} title="Cancel Booking">
        <p className="text-text-secondary text-sm mb-6">Are you sure you want to cancel the booking for <strong className="text-text-primary">"{cancelModal?.slot}"</strong>?</p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setCancelModal(null)} className="btn-outline btn-sm">Keep Booking</button>
          <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">Cancel Booking</button>
        </div>
      </Modal>

      <PageHeader title="My Bookings" subtitle="Track all your internship placement requests" />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all ${tab === t ? "bg-primary-dark text-white" : "bg-white text-text-secondary hover:text-primary border border-gray-200"}`}>
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No bookings" description={`No ${tab === "all" ? "" : tab} bookings found.`}
          action={<Link to="/school/browse" className="btn-primary">Browse Opportunities</Link>} />
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div key={b.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{b.slot}</h3>
                <p className="text-text-secondary text-sm">{b.company}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-secondary">
                  <span className="font-mono">{b.slotDate}</span>
                  <span>•</span>
                  <span>{b.students} students</span>
                  <span>•</span>
                  <span>Submitted {b.submittedAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={b.status} />
                <Link to={`/school/bookings/${b.id}`} className="text-primary text-xs font-semibold hover:underline">View</Link>
                {b.status === "pending" && (
                  <button onClick={() => setCancelModal(b)}
                    className="flex items-center gap-1 text-xs text-red-500 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-50 font-semibold transition-colors">
                    <X size={11} /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SchoolLayout>
  );
}
