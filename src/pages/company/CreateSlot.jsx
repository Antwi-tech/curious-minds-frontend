import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyLayout, FormField, Toast } from "../../components/shared";
import { fields } from "../../data/mockData";

export default function CreateSlot() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: "", field: "", date: "", startTime: "", endTime: "",
    maxStudents: "", requirements: "", description: ""
  });
  const [errors, setErrors] = useState({});
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.title) e.title = "Title is required";
    if (!form.field) e.field = "Field/Department is required";
    if (!form.date) e.date = "Date is required";
    if (!form.startTime) e.startTime = "Start time required";
    if (!form.endTime) e.endTime = "End time required";
    if (!form.maxStudents || isNaN(form.maxStudents) || +form.maxStudents < 1) e.maxStudents = "Enter a valid number";
    if (!form.description) e.description = "Description is required";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    // TODO: replace with API call POST /api/slots
    setToast({ message: "Internship slot created!", type: "success" });
    setTimeout(() => navigate("/company/slots"), 1500);
  };

  return (
    <CompanyLayout title="Create Internship Slot">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-2xl">
        <Link to="/company/slots" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-semibold mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Slots
        </Link>
        <div className="card">
          <h3 className="font-display font-bold text-text-primary text-xl mb-6">New Internship Slot</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField label="Slot Title" error={errors.title}>
              <input type="text" placeholder="e.g. Software Engineering Internship" value={form.title}
                onChange={set("title")} className={`input-field ${errors.title ? "border-red-400" : ""}`} />
            </FormField>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Department / Field" error={errors.field}>
                <div className="relative">
                  <select value={form.field} onChange={set("field")}
                    className={`input-field appearance-none ${errors.field ? "border-red-400" : ""}`}>
                    <option value="">Select field</option>
                    {fields.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>

              <FormField label="Date" error={errors.date}>
                <input type="date" value={form.date} onChange={set("date")}
                  className={`input-field ${errors.date ? "border-red-400" : ""}`} />
              </FormField>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <FormField label="Start Time" error={errors.startTime}>
                <input type="time" value={form.startTime} onChange={set("startTime")}
                  className={`input-field ${errors.startTime ? "border-red-400" : ""}`} />
              </FormField>
              <FormField label="End Time" error={errors.endTime}>
                <input type="time" value={form.endTime} onChange={set("endTime")}
                  className={`input-field ${errors.endTime ? "border-red-400" : ""}`} />
              </FormField>
              <FormField label="Max. Students" error={errors.maxStudents}>
                <input type="number" min="1" placeholder="e.g. 10" value={form.maxStudents}
                  onChange={set("maxStudents")} className={`input-field ${errors.maxStudents ? "border-red-400" : ""}`} />
              </FormField>
            </div>

            <FormField label="Slot Description" error={errors.description}>
              <textarea rows={4} value={form.description} onChange={set("description")}
                placeholder="Describe what students will learn and experience during the internship..."
                className={`input-field resize-none ${errors.description ? "border-red-400" : ""}`} />
            </FormField>

            <FormField label="Special Requirements (Optional)">
              <input type="text" placeholder="e.g. Basic programming knowledge, Interest in finance..." value={form.requirements}
                onChange={set("requirements")} className="input-field" />
            </FormField>

            <div className="flex gap-3 justify-end pt-2">
              <Link to="/company/slots" className="btn-outline">Cancel</Link>
              <button type="submit" className="btn-accent">Create Slot</button>
            </div>
          </form>
        </div>
      </div>
    </CompanyLayout>
  );
}
