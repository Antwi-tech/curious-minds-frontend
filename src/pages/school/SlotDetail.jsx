import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Calendar, CheckCircle } from "lucide-react";
import { DashboardLayout, Toast } from "../../components/Shared";
import { getSchoolAvailableSlots } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SlotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getStoredUser();
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

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

  if (loading) return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Slot Details">
      <div className="text-center py-16 text-text-secondary text-sm">Loading...</div>
    </DashboardLayout>
  );

  if (!slot) return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Slot Details">
      <div className="text-center py-16 text-text-secondary text-sm">Slot not found.</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Slot Details">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Link to="/school/browse" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Browse
      </Link>

      <div className="max-w-2xl grid gap-6">
        {/* Company Card */}
        <div className="card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary font-display text-2xl font-bold">
              {slot.company_name.charAt(0)}
            </div>
            <div>
              <h2 className="font-display font-bold text-text-primary text-xl">{slot.company_name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> Verified
                </span>
                <span className="text-text-secondary text-xs">{slot.industry_type || 'General'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <MapPin size={14} /> {slot.company_address} · {slot.region}
          </div>
        </div>

        {/* Slot Details */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-text-primary text-xl mb-4">Internship Slot</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: Calendar, label: 'Start Date', value: new Date(slot.start_date).toLocaleDateString() },
              { icon: Calendar, label: 'End Date', value: new Date(slot.end_date).toLocaleDateString() },
              { icon: Building2, label: 'Industry', value: slot.industry_type || 'General' },
              { icon: MapPin, label: 'Region', value: slot.region },
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

          <button
            onClick={() => navigate(`/school/book/${slot.schedule_id}`)}
            className="btn-secondary w-full justify-center">
            Book This Slot
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}