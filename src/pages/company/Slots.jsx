import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { CompanyLayout, StatusBadge, PageHeader, EmptyState, Modal, Toast } from "../../components/shared";
import { mockSlots } from "../../data/mockData";

export default function CompanySlots() {
  const [slots, setSlots] = useState(mockSlots.filter(s => [1,2,3].includes(s.id)));
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState(null);

  const handleDelete = () => {
    // TODO: replace with API call DELETE /api/slots/:id
    setSlots(slots.filter(s => s.id !== deleteModal.id));
    setDeleteModal(null);
    setToast({ message: "Slot deleted successfully", type: "success" });
  };

  return (
    <CompanyLayout title="Internship Slots">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Slot">
        <p className="text-text-secondary text-sm mb-6">Are you sure you want to delete <strong className="text-text-primary">"{deleteModal?.title}"</strong>? This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setDeleteModal(null)} className="btn-outline btn-sm">Cancel</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </Modal>

      <PageHeader
        title="My Internship Slots"
        subtitle={`${slots.length} slot${slots.length !== 1 ? "s" : ""} created`}
        action={<Link to="/company/slots/create" className="btn-primary btn-sm"><Plus size={14} /> Create Slot</Link>}
      />

      {slots.length === 0 ? (
        <EmptyState icon={Briefcase} title="No slots yet" description="Create your first internship slot to start receiving school bookings."
          action={<Link to="/company/slots/create" className="btn-primary">Create Your First Slot</Link>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map(slot => {
            const spotsLeft = slot.maxStudents - slot.booked;
            return (
              <div key={slot.id} className="card hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-text-primary text-sm leading-tight">{slot.title}</h3>
                    <p className="text-text-secondary text-xs mt-1">{slot.field}</p>
                  </div>
                  <StatusBadge status={slot.status} />
                </div>
                <div className="space-y-1.5 text-xs text-text-secondary">
                  <div className="flex justify-between"><span>Date</span><span className="font-mono text-text-primary">{slot.date}</span></div>
                  <div className="flex justify-between"><span>Time</span><span className="font-mono text-text-primary">{slot.startTime}–{slot.endTime}</span></div>
                  <div className="flex justify-between"><span>Capacity</span><span className="text-text-primary font-semibold">{slot.booked}/{slot.maxStudents} booked</span></div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${(slot.booked / slot.maxStudents) * 100}%` }} />
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 btn-outline btn-sm text-xs justify-center">
                    <Edit size={12} /> Edit
                  </button>
                  <button onClick={() => setDeleteModal(slot)} className="flex items-center gap-1 px-3 py-2 text-xs text-red-500 border-2 border-red-200 hover:bg-red-50 rounded-lg font-semibold transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      <Link to="/company/slots/create"
        className="fixed bottom-8 right-8 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-accent-dark transition-all hover:scale-105 lg:hidden">
        <Plus size={22} className="text-primary-dark" />
      </Link>
    </CompanyLayout>
  );
}
