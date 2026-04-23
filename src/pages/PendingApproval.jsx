import { Link } from "react-router-dom";
import { Clock, Home, ShieldX, Mail } from "lucide-react";

export function PendingApproval() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-display font-bold">CM</span>
          </div>
          <span className="font-display font-bold text-primary text-xl">Curious Minds</span>
        </Link>
        <div className="card text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock size={36} className="text-amber-600" />
          </div>
          <h1 className="font-display font-bold text-text-primary text-3xl mb-3">Account Pending Approval</h1>
          <p className="text-text-secondary leading-relaxed mb-6">
            Thank you for registering! Your account is currently under review by our admin team. We verify all schools and companies to ensure platform integrity.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-amber-800 text-sm font-semibold mb-1">What happens next?</p>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Our team will review your registration details</li>
              <li>• You'll receive an email notification once verified</li>
              <li>• This typically takes 1–2 business days</li>
            </ul>
          </div>
          <a href="mailto:support@curiousminds.edu.gh" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
            <Mail size={15} /> Contact Support
          </a>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link to="/" className="btn-outline w-full justify-center">
              <Home size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-display font-extrabold text-primary/10 text-[10rem] leading-none mb-4">404</div>
        <div className="-mt-16 relative z-10">
          <h1 className="font-display font-bold text-text-primary text-4xl mb-4">Page Not Found</h1>
          <p className="text-text-secondary text-lg mb-8">Oops! This page got lost somewhere between Accra and Kumasi. Let's get you back on track.</p>
          <Link to="/" className="btn-primary text-base">
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Unauthorized() {
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

export default PendingApproval;
