import { Link } from "react-router-dom";
import { Navbar, KenteDivider } from "../components/shared";
import { ArrowRight, CheckCircle, Building2, School, Users, Briefcase, Calendar, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface font-body">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        {/* Kente pattern top */}
        <div className="kente-border" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #F4A623 0, #F4A623 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star size={14} fill="currentColor" />
                Ghana's #1 Internship Platform for Students
              </div>
              <h1 className="font-display font-extrabold text-white text-5xl lg:text-6xl leading-tight mb-6">
                Connecting Ghana's Future Workforce
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                A digital platform that bridges JHS and SHS schools with companies offering real internship experience — structured, simple, and purposeful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register/school" className="btn-accent text-base justify-center">
                  Register as a School <ArrowRight size={16} />
                </Link>
                <Link to="/register/company" className="btn-outline-white text-base justify-center">
                  Register as a Company
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent" /> Free to join</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent" /> Admin verified</div>
                <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent" /> Fully digital</div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-3xl flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    {[
                      { icon: Building2, label: "50+ Companies", color: "bg-accent" },
                      { icon: School, label: "120+ Schools", color: "bg-white/20" },
                      { icon: Users, label: "2,400+ Students", color: "bg-white/20" },
                      { icon: Briefcase, label: "380+ Slots", color: "bg-accent" },
                    ].map(({ icon: Icon, label, color }) => (
                      <div key={label} className={`${color} rounded-2xl p-4 text-center`}>
                        <Icon size={24} className={color === "bg-accent" ? "text-primary-dark mx-auto mb-2" : "text-white mx-auto mb-2"} />
                        <p className={`text-xs font-bold ${color === "bg-accent" ? "text-primary-dark" : "text-white"}`}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="font-display font-bold text-primary-dark text-2xl">GH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kente-border" />
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-text-primary text-4xl mb-4">How It Works</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Three simple steps to connect students with meaningful internship experiences</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: Building2, title: "Company Lists Slots", desc: "Registered companies create internship slots with dates, fields, and capacity. Each slot is clear and structured.", color: "bg-primary" },
            { step: "02", icon: School, title: "School Books a Slot", desc: "Schools browse available opportunities and submit a booking for their students — just like booking an appointment.", color: "bg-accent" },
            { step: "03", icon: Users, title: "Students Intern", desc: "Once approved, students attend their internship. The company confirms completion and everyone benefits.", color: "bg-primary" },
          ].map(({ step, icon: Icon, title, desc, color }) => (
            <div key={step} className="relative text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon size={22} className="text-white" />
              </div>
              <div className={`absolute top-4 right-4 font-mono font-bold text-4xl ${color === "bg-accent" ? "text-accent/20" : "text-primary/10"}`}>{step}</div>
              <h3 className="font-display font-bold text-text-primary text-xl mb-3">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-text-primary text-4xl mb-4">Built for Everyone</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Schools */}
            <div className="bg-surface rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <School size={20} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-2xl">For Schools</h3>
              </div>
              <ul className="space-y-3">
                {["Browse hundreds of verified company slots", "Book internships for your students digitally", "Track all placements from one dashboard", "Get booking confirmations & company details", "No paperwork — fully digital process"].map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/register/school" className="btn-primary mt-6 w-full justify-center">
                Register Your School <ArrowRight size={16} />
              </Link>
            </div>
            {/* Companies */}
            <div className="bg-primary rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Building2 size={20} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl">For Companies</h3>
              </div>
              <ul className="space-y-3">
                {["Create structured internship slots with ease", "Receive and manage school bookings", "Set capacity limits and requirements", "Build your employer brand with students", "Support Ghana's next generation of talent"].map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/register/company" className="btn-accent mt-6 w-full justify-center">
                Register Your Company <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-dark rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="kente-border absolute top-0 left-0 right-0" />
            <h2 className="font-display font-bold text-white text-4xl mb-4">Ready to get started?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Join hundreds of schools and companies already using Curious Minds to shape Ghana's future workforce.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/school" className="btn-accent text-base">Register as School</Link>
              <Link to="/register/company" className="btn-outline-white text-base">Register as Company</Link>
            </div>
            <div className="kente-border absolute bottom-0 left-0 right-0" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-dark font-bold text-xs">CM</span>
            </div>
            <span className="font-display font-bold text-white">Curious Minds</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/login" className="hover:text-white transition-colors">Log In</Link>
            <Link to="/register/school" className="hover:text-white transition-colors">Schools</Link>
            <Link to="/register/company" className="hover:text-white transition-colors">Companies</Link>
          </div>
          <p className="text-xs">© 2024 Curious Minds. Built for Ghana 🇬🇭</p>
        </div>
      </footer>
    </div>
  );
}
