import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX size={40} className="text-red-500" />
        </div>
        <h1 className="font-display font-bold text-text-primary text-3xl mb-3">Access Denied</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">You don't have permission to view this page. Please log in with the correct account type.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/login" className="btn-primary">Sign In</Link>
          <Link to="/" className="btn-outline">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
