import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Phone, Building2, CheckCircle, Clock, X } from "lucide-react";
import { SchoolLayout, StatusBadge } from "../../components/shared";
import { mockBookings } from "../../data/mockData";

export default function SchoolBookingDetail() {
  const { id } = useParams();
  const booking = mockBookings.find(b => b.id === +id) || mockBookings[0];

  const timeline = [
    { label: "Submitted", done: true, date: booking.submittedAt },
    { label: "Under Review", done: booking.status !== "pending" },
    { label: "Approved", done: booking.status === "approved" || booking.status === "completed", active: booking.status === "approved" },
    { label: "Completed", done: booking.status === "completed" },
  ];

  return (
    <SchoolLayout title="Booking Detail">
      <Link to="/school/bookings" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Bookings
      </Link>

      <div className="max-w-2xl grid gap-6">
        {/* Header */}
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display font-bold text-text-primary text-2xl">{booking.slot}</h2>
              <p className="text-text-secondary text-sm mt-1">Booking #{booking.id.toString().padStart(4, "0")} • Submitted {booking.submittedAt}</p>
            </div>
            <StatusBadge status={booking.status} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Building2, label: "Company", value: booking.company },
              { icon: Calendar, label: "Slot Date", value: booking.slotDate },
              { icon: Users, label: "Students", value: `${booking.students} students` },
              { icon: Phone, label: "Your Contact", value: booking.contact },
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
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-lg mb-6">Booking Status</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {timeline.map(({ label, done, active, date }) => (
                <div key={label} className="flex items-center gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 transition-all ${done ? "bg-primary border-primary" : active ? "bg-white border-primary" : "bg-white border-gray-200"}`}>
                    {done ? <CheckCircle size={14} className="text-white" /> : <Clock size={14} className={active ? "text-primary" : "text-gray-300"} />}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${done || active ? "text-text-primary" : "text-text-secondary"}`}>{label}</p>
                    {date && <p className="text-xs text-text-secondary font-mono">{date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {booking.status === "pending" && (
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors">
            <X size={16} /> Cancel This Booking
          </button>
        )}
      </div>
    </SchoolLayout>
  );
}
