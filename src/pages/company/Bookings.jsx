import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Check, X, ArrowRight } from "lucide-react";
import { CompanyLayout, StatusBadge, PageHeader, EmptyState, Modal, Toast } from "../../components/shared";
import { mockBookings } from "../../data/mockData";

const TABS = ["all", "pending", "approved", "rejected", "cancelled"];

export default function CompanyBookings() {
  const [tab, setTab] = useState("all");
  const [bookings, setBookings] = useState(mockBookings);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = tab === "all" ? bookings : bookings.filter(b => b.status === tab);

  const updateStatus = (id, status) => {
    // TODO: replace with API call PATCH /api/bookings/:id
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    setModal(null);
    setToast({ message: `Booking ${status} successfully`, type: status === "approved" ? "success" : "info" });
  };

  return (
    <CompanyLayout title="Incoming Bookings">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.action === "approved" ? "Approve Booking" : "Reject Booking"}>
        <p className="text-text-secondary text-sm mb-4">
          {modal?.action === "approved"
            ? `Approve the booking from ${modal?.booking?.school}?`
            : `Reject the booking from ${modal?.booking?.school}? You can add a note below.`}
        </p>
        {modal?.action === "rejected" && (
          <textarea rows={3} placeholder="Optional: reason for rejection..." className="input-field resize-none mb-4" />
        )}
        <div className="flex gap-3 justify-end">
          <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={() => updateStatus(modal.booking.id, modal.action)}
            className={`btn-sm text-white px-4 py-2 rounded-xl font-semibold transition-colors ${modal?.action === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}>
            {modal?.action === "approved" ? "Approve" : "Reject"}
          </button>
        </div>
      </Modal>

      <PageHeader title="Bookings" subtitle="Manage school booking requests for your internship slots" />

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all ${tab === t ? "bg-primary text-white" : "bg-white text-text-secondary hover:text-primary border border-gray-200"}`}>
            {t}
            {t !== "all" && <span className="ml-1.5 text-xs opacity-60">({bookings.filter(b => b.status === t).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No bookings" description={`No ${tab === "all" ? "" : tab} bookings to display.`} />
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">School</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Slot</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Date</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Students</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Status</th>
                <th className="text-left py-3 text-text-secondary font-semibold text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-text-primary">{b.school}</td>
                  <td className="py-3 pr-4 text-text-secondary text-xs">{b.slot}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-text-secondary">{b.slotDate}</td>
                  <td className="py-3 pr-4 text-text-secondary">{b.students}</td>
                  <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/company/bookings/${b.id}`} className="text-primary text-xs font-semibold hover:underline">
                        View
                      </Link>
                      {b.status === "pending" && (
                        <>
                          <button onClick={() => setModal({ booking: b, action: "approved" })}
                            className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                            <Check size={12} />
                          </button>
                          <button onClick={() => setModal({ booking: b, action: "rejected" })}
                            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <X size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CompanyLayout>
  );
}
