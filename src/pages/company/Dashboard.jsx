import { Link } from "react-router-dom";
import { Briefcase, BookOpen, CheckCircle, Users, Plus, ArrowRight } from "lucide-react";
import { CompanyLayout, StatCard, StatusBadge } from "../../components/shared";
import { mockBookings, mockSlots } from "../../data/mockData";

export default function CompanyDashboard() {
  const recentBookings = mockBookings.slice(0, 5);
  return (
    <CompanyLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="bg-primary rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="kente-border absolute top-0 left-0 right-0" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-semibold mb-1">Welcome back 👋</p>
            <h2 className="font-display font-bold text-white text-2xl">Scancom Ghana (MTN)</h2>
            <p className="text-white/60 text-sm mt-1">Telecommunications • Accra, Greater Accra</p>
          </div>
          <Link to="/company/slots/create" className="btn-accent btn-sm whitespace-nowrap">
            <Plus size={14} /> Create New Slot
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Briefcase} label="Total Slots Created" value="12" color="bg-primary/10" iconColor="text-primary" trend="+2 this month" />
        <StatCard icon={BookOpen} label="Pending Bookings" value="3" color="bg-amber-50" iconColor="text-amber-600" />
        <StatCard icon={CheckCircle} label="Confirmed Bookings" value="8" color="bg-green-50" iconColor="text-green-600" trend="↑ 4 from last month" />
        <StatCard icon={Users} label="Total Students Hosted" value="47" color="bg-blue-50" iconColor="text-blue-600" />
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-text-primary text-lg">Recent Bookings</h3>
          <Link to="/company/bookings" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">School</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Slot</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Date</th>
                <th className="text-left py-3 pr-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Students</th>
                <th className="text-left py-3 text-text-secondary font-semibold text-xs uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-text-primary">{b.school}</td>
                  <td className="py-3 pr-4 text-text-secondary">{b.slot}</td>
                  <td className="py-3 pr-4 text-text-secondary font-mono text-xs">{b.slotDate}</td>
                  <td className="py-3 pr-4 text-text-secondary">{b.students}</td>
                  <td className="py-3"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CompanyLayout>
  );
}
