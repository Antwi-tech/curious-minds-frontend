import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Calendar, Users, CheckCircle, X, AlertCircle } from "lucide-react";
import { CompanyLayout, StatusBadge, Modal, Toast } from "../../components/shared";
import { mockBookings } from "../../data/mockData";

export default function CompanyBookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(mockBookings.find(b => b.id === +id) || mockBookings[0]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [note, setNote] = useState("");

  const updateStatus = (status) => {
    // TODO: replace with API call PATCH /api/bookings/:id
    setBooking({ ...booking, status, notes: note || booking.notes });
    setModal(null);
    setToast({ message: `Booking ${status}`, type: "success" });
  };

  return (
    <CompanyLayout title="Booking Detail">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal === "approved" ? "Approve Booking" : modal === "rejected" ? "Reject Booking" : "Cancel Booking"}>
        <p className="text-text-secondary text-sm mb-4">
          {modal === "approved" ? "Confirm approval of this booking?" : "Add an optional note:"}
        </p>
        <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
          placeholder="Optional note..." className="input-field resize-none mb-4" />
        <div className="flex gap-3 justify-end">
          <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={() => updateStatus(modal)}
            className={`btn-sm text-white px-4 py-2 rounded-xl font-semibold ${modal === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"} transition-colors`}>
            Confirm
          </button>
        </div>
      </Modal>

      <Link to="/company/bookings" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Bookings
      </Link>

      <div className="max-w-2xl grid gap-6">
        {/* Header */}
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display font-bold text-text-primary text-2xl">{booking.slot}</h2>
              <p className="text-text-secondary text-sm mt-1">Booking #{booking.id.toString().padStart(4, "0")}</p>
            </div>
            <StatusBadge status={booking.status} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <User size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">School</p>
                <p className="font-semibold text-text-primary text-sm">{booking.school}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Contact</p>
                <p className="font-semibold text-text-primary text-sm">{booking.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Slot Date</p>
                <p className="font-semibold text-text-primary text-sm font-mono">{booking.slotDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Students</p>
                <p className="font-semibold text-text-primary text-sm">{booking.students} students</p>
              </div>
            </div>
          </div>
          {booking.notes && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-xs font-semibold text-amber-700 mb-1">Notes</p>
              <p className="text-sm text-amber-800">{booking.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {booking.status === "pending" && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setModal("approved")} className="btn-primary flex-1 justify-center">
              <CheckCircle size={16} /> Approve Booking
            </button>
            <button onClick={() => setModal("rejected")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors">
              <X size={16} /> Reject Booking
            </button>
          </div>
        )}
        {booking.status === "approved" && (
          <button onClick={() => setModal("cancelled")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-text-secondary font-semibold hover:bg-gray-50 transition-colors">
            <AlertCircle size={16} /> Cancel Booking
          </button>
        )}
      </div>
    </CompanyLayout>
  );
}
