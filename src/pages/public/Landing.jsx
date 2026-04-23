import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNav, Footer, KenteDivider } from '../../components/Shared'
import { ArrowRight, CheckCircle, Building2, GraduationCap, Users, Star, MapPin, Briefcase } from 'lucide-react'

export default function Landing() {
  const steps = [
    { n: '01', title: 'Companies List Slots', desc: 'Registered companies create internship opportunities with dates, fields, and available spots.', icon: Building2 },
    { n: '02', title: 'Schools Book Slots', desc: 'Schools browse available opportunities and book slots for their students in just a few clicks.', icon: GraduationCap },
    { n: '03', title: 'Students Intern', desc: 'Students gain real-world experience while companies invest in Ghana\'s future workforce.', icon: Users },
  ]
  const benefits = [
    { role: 'For Schools', color: 'border-primary bg-primary/5', items: ['Browse hundreds of internship opportunities', 'One-click booking for multiple students', 'Track internship history & outcomes', 'Get verified status for credibility'] },
    { role: 'For Companies', color: 'border-accent bg-accent/5', items: ['Reach schools across all 16 regions', 'Manage bookings from a simple dashboard', 'Build your employer brand with youth', 'Fulfill CSR obligations meaningfully'] },
  ]
  const stats = [
    { v: '200+', l: 'Schools Registered' }, { v: '150+', l: 'Partner Companies' },
    { v: '5,000+', l: 'Students Placed' }, { v: '16', l: 'Regions Covered' },
  ]
  const testimonials = [
    { name: 'Mrs. Akosua Bonsu', role: 'Vice Principal, Achimota SHS', text: 'CuriousMinds made it incredibly easy to find quality internship placements for our Form 3 students. The process is seamless.' },
    { name: 'Mr. Emmanuel Sarpong', role: 'HR Manager, Ecobank Ghana', text: 'We host over 20 interns every semester through this platform. It saves us hours of coordination and the students are always well-prepared.' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Kente geometric overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 3px, transparent 3px, transparent 30px), repeating-linear-gradient(-45deg, #F4A623 0px, #F4A623 3px, transparent 3px, transparent 30px)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-mono px-4 py-2 rounded-full mb-6 border border-white/20 animate-fade-in">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              Ghana's #1 Student Internship Platform 🇬🇭
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight animate-fade-in-up">
              Connecting Ghana's<br />
              <span className="text-accent">Future Workforce</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-xl max-w-xl leading-relaxed animate-fade-in-up delay-100">
              Bridging JHS & SHS students with industry-leading companies across all 16 regions — structured, simple, and impactful internship experiences.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-200">
              <Link to="/register-school" className="btn-primary text-base">
                Register as a School <ArrowRight size={18} />
              </Link>
              <Link to="/register-company" className="bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-all duration-200 inline-flex items-center gap-2 border border-white/20">
                Register as a Company <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom kente bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{
          background: 'repeating-linear-gradient(90deg, #F4A623 0px, #F4A623 12px, #1B4332 12px, #1B4332 24px, #F9F6F0 24px, #F9F6F0 36px, #1B4332 36px, #1B4332 48px)'
        }} />
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
            {stats.map(({ v, l }) => (
              <div key={l} className="text-center px-4">
                <p className="font-display text-3xl font-bold text-primary">{v}</p>
                <p className="text-text-secondary text-sm mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Simple Process</p>
          <h2 className="section-title text-4xl">How It Works</h2>
          <p className="text-text-secondary mt-3 max-w-md mx-auto">Three simple steps from opportunity to internship experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30" />
          {steps.map(({ n, title, desc, icon: Icon }, i) => (
            <div key={n} className="relative text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon size={32} className="text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent rounded-full text-xs font-mono font-bold text-primary-dark flex items-center justify-center">{i+1}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-3">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <KenteDivider />

      {/* Benefits */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Why CuriousMinds</p>
            <h2 className="section-title text-4xl">Built for Everyone</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map(({ role, color, items }) => (
              <div key={role} className={`rounded-3xl p-8 border-2 ${color}`}>
                <h3 className="font-display text-2xl font-bold text-text-primary mb-6">{role}</h3>
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="section-title text-4xl">What They Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ name, role, text }) => (
            <div key={name} className="card p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-accent fill-accent" />)}
              </div>
              <p className="text-text-primary text-sm leading-relaxed mb-6 italic">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{name.charAt(0)}</div>
                <div>
                  <p className="text-text-primary font-semibold text-sm">{name}</p>
                  <p className="text-text-secondary text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #F4A623 0px, #F4A623 4px, transparent 4px, transparent 40px)'
        }} />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/70 mb-10 text-lg">Join hundreds of schools and companies already shaping Ghana's future.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register-school" className="btn-primary text-base">
              I'm a School <GraduationCap size={18} />
            </Link>
            <Link to="/register-company" className="bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-all duration-200 inline-flex items-center gap-2 border border-white/20">
              I'm a Company <Building2 size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
