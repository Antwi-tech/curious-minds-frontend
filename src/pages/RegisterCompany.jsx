import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Lock, Eye, EyeOff, ArrowRight, ChevronDown } from "lucide-react";
import { FormField } from "../components/shared";
import { ghanaRegions, industries } from "../data/mockData";

export default function RegisterCompany() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "", email: "", phone: "", city: "", region: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Company name is required";
    if (!form.industry) e.industry = "Industry is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone) e.phone = "Phone number is required";
    if (!form.city) e.city = "City is required";
    if (!form.region) e.region = "Region is required";
    if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    // TODO: replace with API call POST /api/companies/register
    navigate("/pending-approval");
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold">CM</span>
            </div>
            <span className="font-display font-bold text-primary text-xl">Curious Minds</span>
          </Link>
          <h1 className="font-display font-bold text-text-primary text-3xl mb-2">Register Your Company</h1>
          <p className="text-text-secondary text-sm">Join and start offering internship opportunities to Ghana's students</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl mb-6 border border-primary/10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">Company Account</p>
              <p className="text-xs text-text-secondary">Your account will be reviewed by an admin before activation</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Company Name" error={errors.name}>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" placeholder="e.g. Scancom Ghana (MTN)" value={form.name}
                    onChange={set("name")} className={`input-field pl-9 ${errors.name ? "border-red-400" : ""}`} />
                </div>
              </FormField>

              <FormField label="Industry / Sector" error={errors.industry}>
                <div className="relative">
                  <select value={form.industry} onChange={set("industry")}
                    className={`input-field appearance-none ${errors.industry ? "border-red-400" : ""}`}>
                    <option value="">Select industry</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Email Address" error={errors.email}>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="email" placeholder="hr@yourcompany.com" value={form.email}
                    onChange={set("email")} className={`input-field pl-9 ${errors.email ? "border-red-400" : ""}`} />
                </div>
              </FormField>

              <FormField label="Phone Number" error={errors.phone}>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="tel" placeholder="+233 24 000 0000" value={form.phone}
                    onChange={set("phone")} className={`input-field pl-9 ${errors.phone ? "border-red-400" : ""}`} />
                </div>
              </FormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="City" error={errors.city}>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="text" placeholder="e.g. Accra" value={form.city}
                    onChange={set("city")} className={`input-field pl-9 ${errors.city ? "border-red-400" : ""}`} />
                </div>
              </FormField>

              <FormField label="Region" error={errors.region}>
                <div className="relative">
                  <select value={form.region} onChange={set("region")}
                    className={`input-field appearance-none ${errors.region ? "border-red-400" : ""}`}>
                    <option value="">Select region</option>
                    {ghanaRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </FormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Password" error={errors.password}>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" value={form.password}
                    onChange={set("password")} className={`input-field pl-9 pr-10 ${errors.password ? "border-red-400" : ""}`} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </FormField>

              <FormField label="Confirm Password" error={errors.confirmPassword}>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input type="password" placeholder="Re-enter password" value={form.confirmPassword}
                    onChange={set("confirmPassword")} className={`input-field pl-9 ${errors.confirmPassword ? "border-red-400" : ""}`} />
                </div>
              </FormField>
            </div>

            <button type="submit" className="btn-accent w-full justify-center text-base py-3.5 mt-2">
              Create Company Account <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already registered? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Building2, Mail, Phone, MapPin, Lock, Eye, EyeOff, ArrowRight, ChevronDown, User } from "lucide-react";
// import { FormField } from "../components/shared";
// import { ghanaRegions, industries } from "../data/mockData";
// import { registerCompany } from "../api";

// export default function RegisterCompany() {
//   const navigate = useNavigate();
//   const [showPw, setShowPw] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [serverError, setServerError] = useState("");
//   const [form, setForm] = useState({
//     company_name: "",
//     industry_type: "",
//     email: "",
//     phone_number: "",
//     company_address: "",
//     region: "",
//     contact_person: "",
//     description: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});

//   const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

//   const validate = () => {
//     const e = {};
//     if (!form.company_name) e.company_name = "Company name is required";
//     if (!form.industry_type) e.industry_type = "Industry is required";
//     if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
//     if (!form.phone_number) e.phone_number = "Phone number is required";
//     if (!form.company_address) e.company_address = "Address is required";
//     if (!form.region) e.region = "Region is required";
//     if (!form.contact_person) e.contact_person = "Contact person is required";
//     if (!form.description) e.description = "Description is required";
//     if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters";
//     if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
//     return e;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerError("");
//     const e2 = validate();
//     if (Object.keys(e2).length) { setErrors(e2); return; }

//     setLoading(true);
//     try {
//       // TODO: POST /company/register
//       await registerCompany({
//         company_name: form.company_name,
//         email: form.email,
//         password: form.password,
//         contact_person: form.contact_person,
//         phone_number: form.phone_number,
//         company_address: form.company_address,
//         region: form.region,
//         description: form.description,
//         industry_type: form.industry_type,
//       });
//       navigate("/pending-approval");
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.error) {
//         setServerError(err.response.data.error);
//       } else {
//         setServerError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-surface py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center gap-2 mb-6">
//             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
//               <span className="text-white font-display font-bold">CM</span>
//             </div>
//             <span className="font-display font-bold text-primary text-xl">Curious Minds</span>
//           </Link>
//           <h1 className="font-display font-bold text-text-primary text-3xl mb-2">Register Your Company</h1>
//           <p className="text-text-secondary text-sm"> Join and start offering internship opportunities to Ghana's students</p>
//         </div>

//         <div className="card">
//           <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl mb-6 border border-primary/10">
//             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
//               <Building2 size={18} className="text-white" />
//             </div>
//             <div>
//               <p className="font-semibold text-text-primary text-sm">Company Account</p>
//               <p className="text-xs text-text-secondary">Your account will be reviewed by an admin before activation</p>
//             </div>
//           </div>

//           {/* Server error */}
//           {serverError && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
//               {serverError}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="grid sm:grid-cols-2 gap-5">
//               <FormField label="Company Name" error={errors.company_name}>
//                 <div className="relative">
//                   <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                   <input type="text" placeholder="e.g. Scancom Ghana (MTN)" value={form.company_name}
//                     onChange={set("company_name")} className={`input-field pl-9 ${errors.company_name ? "border-red-400" : ""}`} />
//                 </div>
//               </FormField>

//               <FormField label="Industry / Sector" error={errors.industry_type}>
//                 <div className="relative">
//                   <select value={form.industry_type} onChange={set("industry_type")}
//                     className={`input-field appearance-none ${errors.industry_type ? "border-red-400" : ""}`}>
//                     <option value="">Select industry</option>
//                     {industries.map(i => <option key={i} value={i}>{i}</option>)}
//                   </select>
//                   <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
//                 </div>
//               </FormField>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-5">
//               <FormField label="Email Address" error={errors.email}>
//                 <div className="relative">
//                   <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                   <input type="email" placeholder="hr@yourcompany.com" value={form.email}
//                     onChange={set("email")} className={`input-field pl-9 ${errors.email ? "border-red-400" : ""}`} />
//                 </div>
//               </FormField>

//               <FormField label="Phone Number" error={errors.phone_number}>
//                 <div className="relative">
//                   <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                   <input type="tel" placeholder="+233 24 000 0000" value={form.phone_number}
//                     onChange={set("phone_number")} className={`input-field pl-9 ${errors.phone_number ? "border-red-400" : ""}`} />
//                 </div>
//               </FormField>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-5">
//               <FormField label="Company Address" error={errors.company_address}>
//                 <div className="relative">
//                   <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                   <input type="text" placeholder="e.g. 123 Independence Ave, Accra" value={form.company_address}
//                     onChange={set("company_address")} className={`input-field pl-9 ${errors.company_address ? "border-red-400" : ""}`} />
//                 </div>
//               </FormField>

//               <FormField label="Region" error={errors.region}>
//                 <div className="relative">
//                   <select value={form.region} onChange={set("region")}
//                     className={`input-field appearance-none ${errors.region ? "border-red-400" : ""}`}>
//                     <option value="">Select region</option>
//                     {ghanaRegions.map(r => <option key={r} value={r}>{r}</option>)}
//                   </select>
//                   <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
//                 </div>
//               </FormField>
//             </div>

//             <FormField label="Contact Person" error={errors.contact_person}>
//               <div className="relative">
//                 <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                 <input type="text" placeholder="e.g. Kwame Mensah" value={form.contact_person}
//                   onChange={set("contact_person")} className={`input-field pl-9 ${errors.contact_person ? "border-red-400" : ""}`} />
//               </div>
//             </FormField>

//             <FormField label="Company Description" error={errors.description}>
//               <textarea placeholder="Briefly describe what your company does and what interns can expect..."
//                 value={form.description} onChange={set("description")} rows={3}
//                 className={`input-field resize-none ${errors.description ? "border-red-400" : ""}`} />
//             </FormField>

//             <div className="grid sm:grid-cols-2 gap-5">
//               <FormField label="Password" error={errors.password}>
//                 <div className="relative">
//                   <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                   <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" value={form.password}
//                     onChange={set("password")} className={`input-field pl-9 pr-10 ${errors.password ? "border-red-400" : ""}`} />
//                   <button type="button" onClick={() => setShowPw(!showPw)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
//                     {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
//                   </button>
//                 </div>
//               </FormField>

//               <FormField label="Confirm Password" error={errors.confirmPassword}>
//                 <div className="relative">
//                   <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
//                   <input type="password" placeholder="Re-enter password" value={form.confirmPassword}
//                     onChange={set("confirmPassword")} className={`input-field pl-9 ${errors.confirmPassword ? "border-red-400" : ""}`} />
//                 </div>
//               </FormField>
//             </div>

//             <button type="submit" disabled={loading}
//               className="btn-accent w-full justify-center text-base py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
//               {loading ? "Creating Account..." : <> Create Company Account <ArrowRight size={16} /> </>}
//             </button>
//           </form>

//           <p className="text-center text-sm text-text-secondary mt-6">
//             Already registered? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }