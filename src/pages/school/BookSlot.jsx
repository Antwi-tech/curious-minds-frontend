import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, User, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { SchoolLayout, FormField, Toast } from "../../components/shared";
import { mockSlots } from "../../data/mockData";

export default function BookSlot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const slot = mockSlots.find(s => s.id === +id) || mockSlots[0];
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ students: "", contact: "", phone: "", notes: "" });
  const [errors, setErrors] = useState({});
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    const max = slot.maxStudents - slot.booked;
    if (!form.students || isNaN(form.students) || +form.students < 1) e.students = "Enter number of students";
    else if (+form.students > max) e.students = `Max ${max} spots available`;
    if (!form.contact) e.contact = "Contact name required";
    if (!form.phone) e.phone = "Phone number required";
    return e;
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // TODO: replace with API call POST /api/bookings
    setToast({ message: "Booking submitted successfully!", type: "success" });
    setTimeout(() => navigate("/school/bookings"), 1800);
  };

  return (
    <SchoolLayout title="Book a Slot">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Link to={`/school/slots/${slot.id}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Slot
      </Link>

      <div className="max-w-2xl grid gap-6">
        {/* Slot Summary */}
        <div className="bg-primary text-white rounded-2xl p-5">
          <p className="text-white/60 text-xs font-semibold mb-1">Booking for</p>
          <h3 className="font-display font-bold text-xl">{slot.title}</h3>
          <p className="text-white/70 text-sm mt-1">{slot.company} • {slot.date} • {slot.startTime}–{slot.endTime}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
            <span>{slot.maxStudents - slot.booked} spots left</span>
            <span>•</span>
            <span>{slot.location}</span>
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-xl mb-6">Booking Details</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField label="Number of Students" error={errors.students}>
              <div className="relative">
                <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input type="number" min="1" max={slot.maxStudents - slot.booked} value={form.students}
                  onChange={set("students")} placeholder={`Max ${slot.maxStudents - slot.booked}`}
                  className={`input-field pl-9 ${errors.students ? "border-red-400" : ""}`} />
              </div>
            </FormField>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Contact Person at School" error={errors.contact}>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" placeholder="e.g. Mrs. Ama Owusu" value={form.contact}
                    onChange={set("contact")} className={`input-field pl-9 ${errors.contact ? "border-red-400" : ""}`} />
                </div>
              </FormField>
              <FormField label="Contact Phone" error={errors.phone}>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="tel" placeholder="+233 24 000 0000" value={form.phone}
                    onChange={set("phone")} className={`input-field pl-9 ${errors.phone ? "border-red-400" : ""}`} />
                </div>
              </FormField>
            </div>
            <FormField label="Additional Notes (Optional)">
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-text-secondary" />
                <textarea rows={3} value={form.notes} onChange={set("notes")}
                  placeholder="Any special information about the students..." className="input-field pl-9 resize-none" />
              </div>
            </FormField>
            <div className="flex gap-3 justify-end pt-2">
              <Link to={`/school/slots/${slot.id}`} className="btn-outline">Cancel</Link>
              <button type="submit" className="btn-accent">
                <CheckCircle size={16} /> Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </SchoolLayout>
  );
}
