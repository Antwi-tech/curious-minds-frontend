import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, Calendar, CheckCircle, Clock, X } from "lucide-react";
import { DashboardLayout, StatusBadge, Toast } from "../../components/Shared";
import { getSchoolBookings, cancelSchoolBooking } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SchoolBookingDetail() {
  const { id } = useParams();
  const user = getStoredUser();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getSchoolBookings();
        const found = (res.data.bookings || []).find(b => String(b.booking_id) === String(id));
        setBooking(found || null);
      } catch {
        setToast({ message: 'Failed to load booking', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await cancelSchoolBooking(booking.booking_id);
      setBooking(prev => ({ ...prev, status: 'cancelled' }));
      setToast({ message: 'Booking cancelled successfully', type: 'info' });
    } catch {
      setToast({ message: 'Failed to cancel booking', type: 'error' });
    } finally {
      setCancelling(false);
    }
  };

  const timeline = booking ? [
    { label: 'Submitted', done: true, date: new Date(booking.created_at).toLocaleDateString() },
    { label: 'Under Review', done: booking.status !== 'pending' },
    { label: 'Confirmed', done: booking.status === 'confirmed', active: booking.status === 'confirmed' },
    { label: 'Cancelled', done: booking.status === 'cancelled', active: booking.status === 'cancelled' },
  ] : [];

  if (loading) return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Booking Detail">
      <div className="text-center py-16 text-text-secondary text-sm">Loading...</div>
    </DashboardLayout>
  );

  if (!booking) return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Booking Detail">
      <div className="text-center py-16 text-text-secondary text-sm">Booking not found.</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Booking Detail">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Link to="/school/bookings" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Bookings
      </Link>

      <div className="max-w-2xl grid gap-6">
        {/* Header */}
        <div className="card p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display font-bold text-text-primary text-2xl">{booking.company_name}</h2>
              <p className="text-text-secondary text-sm mt-1">
                Booking #{String(booking.booking_id).padStart(4, '0')} · Submitted {new Date(booking.created_at).toLocaleDateString()}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Building2, label: 'Company', value: booking.company_name },
              { icon: Building2, label: 'Industry', value: booking.industry_type || 'General' },
              { icon: Calendar, label: 'Start Date', value: new Date(booking.start_date).toLocaleDateString() },
              { icon: Calendar, label: 'End Date', value: new Date(booking.end_date).toLocaleDateString() },
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

        {/* Timeline */}
        <div className="card p-8">
          <h3 className="font-display font-bold text-text-primary text-lg mb-6">Booking Status</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {timeline.map(({ label, done, active, date }) => (
                <div key={label} className="flex items-center gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 ${done ? 'bg-primary border-primary' : active ? 'bg-white border-primary' : 'bg-white border-gray-200'}`}>
                    {done ? <CheckCircle size={14} className="text-white" /> : <Clock size={14} className={active ? 'text-primary' : 'text-gray-300'} />}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${done || active ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</p>
                    {date && <p className="text-xs text-text-secondary font-mono">{date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {booking.status === 'pending' && (
          <button onClick={handleCancel} disabled={cancelling}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors disabled:opacity-60">
            {cancelling
              ? <span className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
              : <><X size={16} /> Cancel This Booking</>}
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}