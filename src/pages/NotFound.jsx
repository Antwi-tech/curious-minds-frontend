import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-display font-extrabold text-primary/10 text-[10rem] leading-none">404</div>
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
