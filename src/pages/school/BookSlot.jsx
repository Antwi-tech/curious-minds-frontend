import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Building2, CheckCircle } from "lucide-react";
import { DashboardLayout, Toast } from "../../components/Shared";
import { getSchoolAvailableSlots, bookSlot } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function BookSlot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getStoredUser();
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const res = await getSchoolAvailableSlots();
        const found = (res.data.slots || []).find(s => String(s.schedule_id) === String(id));
        setSlot(found || null);
      } catch {
        setToast({ message: 'Failed to load slot details', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchSlot();
  }, [id]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    setSubmitting(true);
    try {
      // TODO: POST /school/bookings
      await bookSlot({ schedule_id: parseInt(id) });
      setToast({ message: 'Booking submitted successfully!', type: 'success' });
      setTimeout(() => navigate('/school/bookings'), 1800);
    } catch (err) {
      setServerError(err.response?.data?.error || 'Failed to book slot. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Book Slot">
      <div className="text-center py-16 text-text-secondary text-sm">Loading slot details...</div>
    </DashboardLayout>
  );

  if (!slot) return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Book Slot">
      <div className="text-center py-16 text-text-secondary text-sm">Slot not found.</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Book Slot">
      <Link to="/school/browse" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Browse
      </Link>

      <div className="max-w-2xl grid gap-6">
        {/* Slot Summary */}
        <div className="gradient-hero rounded-2xl p-6 text-white">
          <p className="text-white/60 text-xs font-semibold mb-1">Booking for</p>
          <h3 className="font-display font-bold text-2xl mb-1">{slot.company_name}</h3>
          <p className="text-white/70 text-sm">{slot.industry_type || 'General Internship'}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <MapPin size={14} /> {slot.region}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} /> {new Date(slot.start_date).toLocaleDateString()} → {new Date(slot.end_date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Building2 size={14} /> {slot.company_address}
            </div>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="card p-8">
          <h3 className="font-display font-bold text-text-primary text-xl mb-2">Confirm Booking</h3>
          <p className="text-text-secondary text-sm mb-6">
            You are about to submit a booking request for your school. The company will review and confirm your request.
          </p>

          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {serverError}
            </div>
          )}

          {/* Booking summary */}
          <div className="bg-surface rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">School</span>
              <span className="font-semibold text-text-primary">{user.school_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Company</span>
              <span className="font-semibold text-text-primary">{slot.company_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Start Date</span>
              <span className="font-semibold text-text-primary font-mono">{new Date(slot.start_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">End Date</span>
              <span className="font-semibold text-text-primary font-mono">{new Date(slot.end_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Status after booking</span>
              <span className="text-amber-600 font-semibold">Pending Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <Link to="/school/browse" className="btn-outline flex-1 justify-center">Cancel</Link>
              <button type="submit" disabled={submitting} className="btn-secondary flex-1 justify-center disabled:opacity-60">
                {submitting
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><CheckCircle size={16} /> Confirm Booking</>}
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  );
}