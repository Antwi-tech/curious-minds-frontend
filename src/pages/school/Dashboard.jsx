import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, CheckCircle, Users, Search, ArrowRight } from "lucide-react";
import { DashboardLayout, StatCard, StatusBadge, Toast } from "../../components/Shared";
import { getSchoolBookings, getSchoolProfileData } from "../../api";

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || {} }
  catch { return {} }
}

export default function SchoolDashboard() {
  const user = getStoredUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSchoolBookings();
        setBookings(res.data.bookings || []);
      } catch {
        setToast({ message: 'Failed to load dashboard data', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const recentBookings = bookings.slice(0, 5);

  return (
    <DashboardLayout role="school" userName={user.school_name || 'School'} title="Dashboard">
      {/* Welcome Banner */}
      <div className="gradient-hero rounded-3xl p-8 mb-8 relative overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 2px, transparent 2px, transparent 20px)' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Welcome back </p>
            <h2 className="font-display text-3xl font-bold text-white mb-2">{user.school_name || '...'}</h2>
            <p className="text-white/60 text-sm">{user.region}</p>
          </div>
          <Link to="/school/browse" className="btn-primary whitespace-nowrap">
            <Search size={16} /> Find Internships
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={BookOpen} label="Total Bookings" value={loading ? '...' : bookings.length} color="primary" />
        <StatCard icon={Clock} label="Pending" value={loading ? '...' : pendingBookings.length} color="amber" />
        <StatCard icon={CheckCircle} label="Confirmed" value={loading ? '...' : confirmedBookings.length} color="green" />
        <StatCard icon={Users} label="Cancelled" value={loading ? '...' : cancelledBookings.length} color="blue" />
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="section-title text-lg">Recent Bookings</h3>
          <Link to="/school/bookings" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-text-secondary text-sm">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-10 text-text-secondary text-sm">
            No bookings yet.{' '}
            <Link to="/school/browse" className="text-primary font-semibold hover:underline">Browse opportunities</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentBookings.map(b => (
              <div key={b.booking_id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-surface transition-colors">
                <div>
                  <p className="font-semibold text-text-primary text-sm">{b.company_name}</p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    {new Date(b.start_date).toLocaleDateString()} → {new Date(b.end_date).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </DashboardLayout>
  );
}