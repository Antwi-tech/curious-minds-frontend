import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Calendar, Clock, Users, CheckCircle, Briefcase } from "lucide-react";
import { SchoolLayout } from "../../components/shared";
import { mockSlots } from "../../data/mockData";

export default function SlotDetail() {
  const { id } = useParams();
  const slot = mockSlots.find(s => s.id === +id) || mockSlots[0];
  const spotsLeft = slot.maxStudents - slot.booked;

  return (
    <SchoolLayout title="Slot Details">
      <Link to="/school/browse" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Browse
      </Link>
      <div className="max-w-2xl grid gap-6">
        {/* Company Card */}
        <div className="card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-text-primary text-xl">{slot.company}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-approved text-xs"><CheckCircle size={10} /> Verified</span>
                <span className="text-text-secondary text-xs">{slot.field}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <MapPin size={14} />{slot.location}
          </div>
        </div>

        {/* Slot Details */}
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-2xl mb-2">{slot.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">{slot.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: Calendar, label: "Date", value: slot.date },
              { icon: Clock, label: "Time", value: `${slot.startTime} – ${slot.endTime}` },
              { icon: Users, label: "Capacity", value: `${slot.maxStudents} students max` },
              { icon: Briefcase, label: "Field", value: slot.field },
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

          {slot.requirements && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mb-6">
              <p className="text-xs font-semibold text-amber-700 mb-1">Requirements</p>
              <p className="text-sm text-amber-800">{slot.requirements}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className={`text-2xl font-display font-bold ${spotsLeft === 0 ? "text-red-500" : "text-primary"}`}>{spotsLeft}</span>
              <span className="text-text-secondary text-sm"> spots remaining</span>
            </div>
            {spotsLeft > 0 && slot.status === "open" ? (
              <Link to={`/school/slots/${slot.id}/book`} className="btn-accent text-base">
                Book This Slot
              </Link>
            ) : (
              <div className="badge-rejected px-4 py-2">Slot Full / Closed</div>
            )}
          </div>
        </div>
      </div>
    </SchoolLayout>
  );
}
