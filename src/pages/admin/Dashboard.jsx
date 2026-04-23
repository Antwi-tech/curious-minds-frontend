import { Building2, School, BookOpen, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { AdminLayout, StatCard } from "../../components/shared";
import { mockCompanies, mockSchools, mockBookings } from "../../data/mockData";

const lineData = [
  { month: "Jan", bookings: 4 }, { month: "Feb", bookings: 8 }, { month: "Mar", bookings: 12 },
  { month: "Apr", bookings: 7 }, { month: "May", bookings: 18 }, { month: "Jun", bookings: 15 },
  { month: "Jul", bookings: 22 }, { month: "Aug", bookings: 19 },
];

const pieData = [
  { name: "Approved", value: 8, color: "#22C55E" },
  { name: "Pending", value: 5, color: "#F59E0B" },
  { name: "Rejected", value: 2, color: "#EF4444" },
  { name: "Cancelled", value: 3, color: "#9CA3AF" },
];

export default function AdminDashboard() {
  const pendingCompanies = mockCompanies.filter(c => c.status === "pending");
  const pendingSchools = mockSchools.filter(s => s.status === "pending");

  return (
    <AdminLayout title="Dashboard">
      {/* Alert */}
      {(pendingCompanies.length + pendingSchools.length) > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
          <p className="text-amber-800 text-sm font-semibold">
            {pendingCompanies.length + pendingSchools.length} accounts awaiting verification —
            <Link to="/admin/companies" className="underline ml-1">Review now</Link>
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Total Companies" value={mockCompanies.length} color="bg-primary/10" iconColor="text-primary" trend="+2 this month" />
        <StatCard icon={School} label="Total Schools" value={mockSchools.length} color="bg-accent/20" iconColor="text-accent-dark" trend="+1 this month" />
        <StatCard icon={BookOpen} label="Total Bookings" value={mockBookings.length} color="bg-blue-50" iconColor="text-blue-600" />
        <StatCard icon={Clock} label="Pending Verifications" value={pendingCompanies.length + pendingSchools.length} color="bg-amber-50" iconColor="text-amber-600" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="card lg:col-span-2">
          <h3 className="font-display font-bold text-text-primary text-lg mb-4">Bookings Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "12px" }} />
              <Line type="monotone" dataKey="bookings" stroke="#1B4332" strokeWidth={2.5} dot={{ fill: "#1B4332", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-lg mb-4">Bookings by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: 12, color: "#6B7280" }}>{value}</span>} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-text-primary text-lg">Recent Activity</h3>
          <Link to="/admin/bookings" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            All bookings <ArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {mockBookings.slice(0, 4).map(b => (
            <div key={b.id} className="flex items-center justify-between p-3 bg-surface rounded-xl">
              <div>
                <p className="font-semibold text-text-primary text-sm">{b.school}</p>
                <p className="text-text-secondary text-xs">{b.slot} → {b.company}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-secondary">{b.submittedAt}</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                  b.status === "approved" ? "bg-green-100 text-green-700" :
                  b.status === "pending" ? "bg-amber-100 text-amber-700" :
                  b.status === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                }`}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
