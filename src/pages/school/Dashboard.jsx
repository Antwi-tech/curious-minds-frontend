import { Link } from "react-router-dom";
import { BookOpen, Clock, CheckCircle, Users, Search, ArrowRight } from "lucide-react";
import { SchoolLayout, StatCard, StatusBadge } from "../../components/shared";
import { mockBookings } from "../../data/mockData";

export default function SchoolDashboard() {
  const myBookings = mockBookings.filter(b => b.school === "Achimota Senior High School");
  return (
    <SchoolLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="kente-border absolute top-0 left-0 right-0" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-semibold mb-1">Welcome back 👋</p>
            <h2 className="font-display font-bold text-white text-2xl">Achimota Senior High School</h2>
            <p className="text-white/60 text-sm mt-1">SHS • Accra Metro, Greater Accra</p>
          </div>
          <Link to="/school/browse" className="btn-accent btn-sm whitespace-nowrap">
            <Search size={14} /> Find Internships
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={BookOpen} label="Active Bookings" value="2" color="bg-primary/10" iconColor="text-primary" />
        <StatCard icon={Clock} label="Pending Bookings" value="1" color="bg-amber-50" iconColor="text-amber-600" />
        <StatCard icon={CheckCircle} label="Completed Internships" value="4" color="bg-green-50" iconColor="text-green-600" trend="This year" />
        <StatCard icon={Users} label="Total Students Sent" value="18" color="bg-blue-50" iconColor="text-blue-600" />
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-text-primary text-lg">My Recent Bookings</h3>
          <Link to="/school/bookings" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {myBookings.length === 0 ? (
          <div className="text-center py-8 text-text-secondary text-sm">
            No bookings yet. <Link to="/school/browse" className="text-primary font-semibold hover:underline">Browse opportunities</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {myBookings.map(b => (
              <Link key={b.id} to={`/school/bookings/${b.id}`}
                className="flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-text-primary text-sm">{b.slot}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{b.company} • {b.slotDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary">{b.students} students</span>
                  <StatusBadge status={b.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SchoolLayout>
  );
}
