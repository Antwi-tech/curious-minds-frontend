import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, X } from "lucide-react";
import { DashboardLayout, StatusBadge, EmptyState, Modal, Toast, FilterTabs } from "../../components/Shared";
import { getSchoolBookings, cancelSchoolBooking } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SchoolBookings() {
  const user = getStoredUser();
  const [tab, setTab] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getSchoolBookings();
        setBookings(res.data.bookings || []);
      } catch {
        setToast({ message: 'Failed to load bookings', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const tabs = ["All", "pending", "confirmed", "cancelled"];
  const filtered = tab === "All" ? bookings : bookings.filter(b => b.status === tab);

  const handleCancel = async () => {
    try {
      await cancelSchoolBooking(cancelModal.booking_id);
      setBookings(prev => prev.map(b =>
        b.booking_id === cancelModal.booking_id ? { ...b, status: 'cancelled' } : b
      ));
      setToast({ message: 'Booking cancelled successfully', type: 'info' });
    } catch {
      setToast({ message: 'Failed to cancel booking', type: 'error' });
    } finally {
      setCancelModal(null);
    }
  };

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="My Bookings">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <Modal open={!!cancelModal} onClose={() => setCancelModal(null)} title="Cancel Booking">
        <p className="text-text-secondary text-sm mb-6">
          Are you sure you want to cancel the booking with{' '}
          <strong className="text-text-primary">{cancelModal?.company_name}</strong>?
        </p>
        <div className="flex gap-3">
          <button onClick={() => setCancelModal(null)} className="btn-outline flex-1 justify-center">Keep Booking</button>
          <button onClick={handleCancel}
            className="flex-1 justify-center bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2">
            <X size={16} /> Cancel Booking
          </button>
        </div>
      </Modal>

      <div className="mb-6">
        <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary text-sm">Loading bookings...</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No bookings"
          desc={`No ${tab === 'All' ? '' : tab} bookings found.`}
          action={<Link to="/school/browse" className="btn-primary">Browse Opportunities</Link>} />
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div key={b.booking_id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{b.company_name}</h3>
                <p className="text-text-secondary text-sm">{b.industry_type || 'General Internship'}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-secondary">
                  <span className="font-mono">{new Date(b.start_date).toLocaleDateString()}</span>
                  <span>→</span>
                  <span className="font-mono">{new Date(b.end_date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Booked {new Date(b.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={b.status} />
                <Link to={`/school/booking/${b.booking_id}`}
                  className="text-primary text-xs font-semibold hover:underline">View</Link>
                {b.status === 'pending' && (
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
    </DashboardLayout>
  );
}