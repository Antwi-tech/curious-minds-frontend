import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../../components/Shared'
import { Clock, Home, Lock, Mail, ArrowLeft } from 'lucide-react'

export function PendingApproval() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <nav className="bg-white border-b border-gray-100 px-6 py-4"><Logo /></nav>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-amber-50 flex items-center justify-center mx-auto mb-6 border-2 border-amber-200">
            <Clock size={40} className="text-amber-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary mb-3">Account Pending Review</h1>
          <p className="text-text-secondary leading-relaxed mb-6">
            Your registration has been submitted successfully! A CuriousMinds administrator will verify your account details, usually within <strong className="text-text-primary">1–2 business days</strong>.
          </p>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8 text-left">
            <h3 className="font-semibold text-text-primary mb-3 text-sm">What happens next?</h3>
            {['Your information is being reviewed by our admin team.', 'You\'ll receive an email notification once your account is approved.', 'After approval, you can log in and access the full platform.'].map((s, i) => (
              <div key={i} className="flex items-start gap-3 mt-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                <p className="text-text-secondary text-sm">{s}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-outline">
              <Home size={16} /> Back to Home
            </Link>
            <a href="mailto:support@curiousminds.com.gh" className="btn-secondary">
              <Mail size={16} /> Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <nav className="bg-white border-b border-gray-100 px-6 py-4"><Logo /></nav>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="font-display text-9xl font-extrabold text-primary/10 leading-none mb-4">404</div>
          <div className="relative -mt-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary mb-3">Page Not Found</h1>
          <p className="text-text-secondary mb-8">This page doesn't exist or may have been moved. Let's get you back on track.</p>
          <Link to="/" className="btn-primary">
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <nav className="bg-white border-b border-gray-100 px-6 py-4"><Logo /></nav>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center mx-auto mb-6 border-2 border-red-200">
            <Lock size={40} className="text-red-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary mb-3">Access Denied</h1>
          <p className="text-text-secondary mb-8">You don't have permission to view this page. Please log in with the correct account to continue.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="btn-secondary">
              <ArrowLeft size={16} /> Back to Login
            </Link>
            <Link to="/" className="btn-outline">
              <Home size={16} /> Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
