import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNav, Footer, KenteDivider } from '../../components/Shared'
import { ArrowRight, CheckCircle, Building2, GraduationCap, Users, Star, Briefcase } from 'lucide-react'

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
  { v: '200+', l: 'Schools Registered' },
  { v: '150+', l: 'Partner Companies' },
  { v: '5,000+', l: 'Students Placed' },
  { v: '16', l: 'Regions Covered' },
]

const testimonials = [
  { name: 'Mrs. Akosua Bonsu', role: 'Vice Principal, Achimota SHS', text: 'CuriousMinds made it incredibly easy to find quality internship placements for our Form 3 students. The process is seamless.' },
  { name: 'Mr. Emmanuel Sarpong', role: 'HR Manager, Ecobank Ghana', text: 'We host over 20 interns every semester through this platform. It saves us hours of coordination and the students are always well-prepared.' },
]

// Real Unsplash photos — African students and workplace context
const galleryPhotos = [
  { url: 'https://plus.unsplash.com/premium_photo-1707155465598-72c956ca9bae?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Students collaborating' },
  { url: 'https://images.unsplash.com/photo-1617056239820-8ce90ba48193?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Team working together' },
  { url: 'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Classroom learning' },
  { url: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=500&q=80', alt: 'Young professionals' },
  { url: 'https://images.unsplash.com/photo-1573164574511-73c773193279?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Students smiling' },
]

const marqueePhotos = [...galleryPhotos, ...galleryPhotos]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />

      {/* ── Hero ── */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #F4A623 0px, #F4A623 3px, transparent 3px, transparent 30px), repeating-linear-gradient(-45deg, #F4A623 0px, #F4A623 3px, transparent 3px, transparent 30px)'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-mono px-4 py-2 rounded-full mb-6 border border-white/20 animate-fade-in">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Ghana's #1 Student Internship Platform 🇬🇭
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-fade-in-up">
                Connecting Ghana's<br />
                <span className="text-accent">Future Workforce</span>
              </h1>
              <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed animate-fade-in-up delay-100">
                Bridging JHS & SHS students with industry-leading companies across all 16 regions, structured, simple, and impactful internship experiences.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-200">
                <Link to="/register-school" className="btn-primary text-base">
                  Register as a School <ArrowRight size={18} />
                </Link>
                <Link to="/register-company" className="bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-all duration-200 inline-flex items-center gap-2 border border-white/20">
                  Register as a Company <ArrowRight size={18} />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-white/60 text-sm animate-fade-in-up delay-300">
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent" /> Free to join</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent" /> Admin verified</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent" /> Fully digital</div>
              </div>
            </div>

            {/* Right — Photo collage */}
            <div className="hidden lg:block animate-fade-in-up delay-200">
              <div className="relative">
                {/* Main large photo */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1707155465598-72c956ca9bae?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="African students collaborating"
                    className="w-full h-72 object-cover"
                  />
                </div>
                {/* Small photo bottom left */}
                <div className="absolute -bottom-6 -left-6 w-40 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1632215861513-130b66fe97f4?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Students in classroom"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Small photo top right */}
                <div className="absolute -top-6 -right-6 w-36 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1617056239820-8ce90ba48193?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Young professionals"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom kente bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{
          background: 'repeating-linear-gradient(90deg, #F4A623 0px, #F4A623 12px, #1B4332 12px, #1B4332 24px, #F9F6F0 24px, #F9F6F0 36px, #1B4332 36px, #1B4332 48px)'
        }} />
      </section>

      {/* ── Stats bar ── */}
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

      {/* ── Photo Gallery Strip (auto-sliding marquee) ── */}
      <section className="py-14 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Real Impact</p>
          <h2 className="section-title text-3xl">Students. Schools. Companies.</h2>
          <p className="text-text-secondary mt-3 max-w-md mx-auto text-sm">
            Real students gaining real experience across Ghana's industries.
          </p>
        </div>

        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee-scroll 30s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative w-full overflow-hidden">
          <div className="marquee-track flex gap-4 px-4 sm:px-8 w-max">
            {marqueePhotos.map(({ url, alt }, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img src={url} alt={alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Simple Process</p>
          <h2 className="section-title text-4xl">How It Works</h2>
          <p className="text-text-secondary mt-3 max-w-md mx-auto">Three simple steps from opportunity to internship experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30" />
          {steps.map(({ n, title, desc, icon: Icon }, i) => (
            <div key={n} className="relative text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon size={32} className="text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent rounded-full text-xs font-mono font-bold text-primary-dark flex items-center justify-center">{i + 1}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-3">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <KenteDivider />

      {/* ── Benefits ── */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Why CuriousMinds</p>
            <h2 className="section-title text-4xl">Built for Everyone</h2>
          </div>

          {/* Photo + benefits side by side */}
          <div className="grid lg:grid-cols-3 gap-8 items-center mb-8">
            {/* Center photo */}
            <div className="lg:order-2 rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573164574511-73c773193279?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students and professionals"
                className="w-full h-80 object-cover"
              />
            </div>
            {/* Schools — left */}
            <div className={`lg:order-1 rounded-3xl p-8 border-2 border-primary bg-primary/5`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <GraduationCap size={18} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary">For Schools</h3>
              </div>
              <div className="flex flex-col gap-3">
                {benefits[0].items.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/register-school" className="btn-secondary mt-6 w-full justify-center text-sm">
                Register Your School <ArrowRight size={16} />
              </Link>
            </div>
            {/* Companies — right */}
            <div className={`lg:order-3 rounded-3xl p-8 border-2 border-accent bg-accent/5`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Building2 size={18} className="text-primary-dark" />
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary">For Companies</h3>
              </div>
              <div className="flex flex-col gap-3">
                {benefits[1].items.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/register-company" className="btn-primary mt-6 w-full justify-center text-sm">
                Register Your Company <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Testimonials</p>
          <h2 className="section-title text-4xl">What They Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ name, role, text }, i) => (
            <div key={name} className="card p-8 flex gap-6">
              {/* Photo beside testimonial */}
              <div className="flex-shrink-0">
                <img
                  src={i === 0
                    ? 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'}
                  alt={name}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
              </div>
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-accent fill-accent" />)}
                </div>
                <p className="text-text-primary text-sm leading-relaxed mb-4 italic">"{text}"</p>
                <p className="text-text-primary font-semibold text-sm">{name}</p>
                <p className="text-text-secondary text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #F4A623 0px, #F4A623 4px, transparent 4px, transparent 40px)'
        }} />
        {/* Background photo with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1725245222829-87949b74d042?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Students working"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/70 mb-10 text-lg">Join hundreds of schools and companies already shaping Ghana's future.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register-school" className="btn-primary text-base">
              I'm a School 
            </Link>
            <Link to="/register-company" className="bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-all duration-200 inline-flex items-center gap-2 border border-white/20">
              I'm a Company 
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}