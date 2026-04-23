// TODO: Replace all with API calls to your Python backend

export const mockCompany = {
  id: 'c1', name: 'Ecobank Ghana', industry: 'Banking & Finance',
  email: 'internships@ecobank.com.gh', phone: '+233 30 277 1234',
  city: 'Accra', region: 'Greater Accra',
  about: 'Ecobank Ghana is a leading pan-African bank committed to investing in the next generation of financial professionals.',
  status: 'verified', joinedDate: '2024-11-03',
}

export const mockSchool = {
  id: 's1', name: 'Achimota Senior High School', type: 'SHS',
  email: 'admin@achimotashs.edu.gh', phone: '+233 30 250 1000',
  district: 'Ayawaso West', region: 'Greater Accra',
  status: 'verified', joinedDate: '2024-12-01',
}

export const mockSlots = [
  { id: 'sl1', title: 'IT & Software Development', company: 'Ecobank Ghana', companyId: 'c1', date: '2025-07-14', time: '8:00 AM – 3:00 PM', maxStudents: 10, bookedCount: 7, department: 'Information Technology', location: 'Accra', region: 'Greater Accra', description: 'Students will work alongside our software team building internal banking tools.', requirements: 'Basic knowledge of computers preferred.', status: 'open' },
  { id: 'sl2', title: 'Marketing & Communications', company: 'MTN Ghana', companyId: 'c2', date: '2025-07-21', time: '9:00 AM – 4:00 PM', maxStudents: 8, bookedCount: 8, department: 'Marketing', location: 'Accra', region: 'Greater Accra', description: 'Join our marketing team to learn about digital campaigns and brand communication.', requirements: 'Creativity and passion for communications.', status: 'open' },
  { id: 'sl3', title: 'Finance & Accounting Internship', company: 'GCB Bank', companyId: 'c3', date: '2025-08-04', time: '8:30 AM – 2:30 PM', maxStudents: 6, bookedCount: 2, department: 'Finance', location: 'Kumasi', region: 'Ashanti', description: 'Hands-on experience with financial records, reporting and budgeting processes.', requirements: 'Interest in numbers and business.', status: 'open' },
  { id: 'sl4', title: 'Human Resources & Administration', company: 'Vodafone Ghana', companyId: 'c4', date: '2025-08-11', time: '9:00 AM – 3:00 PM', maxStudents: 5, bookedCount: 5, department: 'HR', location: 'Accra', region: 'Greater Accra', description: 'Learn HR processes, employee onboarding, and office administration.', requirements: 'Strong interpersonal skills.', status: 'open' },
  { id: 'sl5', title: 'Supply Chain & Logistics', company: 'Unilever Ghana', companyId: 'c5', date: '2025-09-01', time: '8:00 AM – 4:00 PM', maxStudents: 12, bookedCount: 4, department: 'Operations', location: 'Tema', region: 'Greater Accra', description: 'Understand how goods move from production to shelves across Ghana.', requirements: 'None — open to all SHS students.', status: 'open' },
  { id: 'sl6', title: 'Journalism & Media Production', company: 'Joy FM / Multimedia Group', companyId: 'c6', date: '2025-07-28', time: '10:00 AM – 2:00 PM', maxStudents: 4, bookedCount: 1, department: 'Media', location: 'Accra', region: 'Greater Accra', description: 'Shadow our journalists and radio producers as they prepare live shows.', requirements: 'Confident communicator.', status: 'open' },
]

export const mockBookings = [
  { id: 'b1', school: 'Achimota SHS', schoolId: 's1', slotId: 'sl1', slotTitle: 'IT & Software Development', company: 'Ecobank Ghana', date: '2025-07-14', students: 5, contact: 'Mr. Kofi Asante', phone: '+233 24 111 2222', notes: 'Our students are passionate about tech.', status: 'approved', submittedAt: '2025-06-01' },
  { id: 'b2', school: 'Mfantsipim School', schoolId: 's2', slotId: 'sl3', slotTitle: 'Finance & Accounting', company: 'GCB Bank', date: '2025-08-04', students: 3, contact: 'Mrs. Abena Mensah', phone: '+233 20 333 4444', notes: '', status: 'pending', submittedAt: '2025-06-10' },
  { id: 'b3', school: 'Wesley Girls SHS', schoolId: 's3', slotId: 'sl5', slotTitle: 'Supply Chain & Logistics', company: 'Unilever Ghana', date: '2025-09-01', students: 8, contact: 'Mr. Kweku Boateng', phone: '+233 27 555 6666', notes: 'Students are looking forward.', status: 'pending', submittedAt: '2025-06-15' },
  { id: 'b4', school: 'Presec Legon', schoolId: 's4', slotId: 'sl6', slotTitle: 'Journalism & Media Production', company: 'Joy FM', date: '2025-07-28', students: 2, contact: 'Ms. Ama Darko', phone: '+233 26 777 8888', notes: '', status: 'rejected', submittedAt: '2025-06-05' },
  { id: 'b5', school: 'Achimota SHS', schoolId: 's1', slotId: 'sl2', slotTitle: 'Marketing & Communications', company: 'MTN Ghana', date: '2025-07-21', students: 4, contact: 'Mr. Yaw Osei', phone: '+233 24 999 0000', notes: 'First time at MTN.', status: 'completed', submittedAt: '2025-05-20' },
]

export const mockCompanies = [
  { id: 'c1', name: 'Ecobank Ghana', industry: 'Banking & Finance', location: 'Accra, Greater Accra', status: 'verified', slots: 3, joined: '2024-11-03', email: 'hr@ecobank.com.gh' },
  { id: 'c2', name: 'MTN Ghana', industry: 'Telecommunications', location: 'Accra, Greater Accra', status: 'verified', slots: 5, joined: '2024-10-15', email: 'internships@mtn.com.gh' },
  { id: 'c3', name: 'GCB Bank', industry: 'Banking & Finance', location: 'Kumasi, Ashanti', status: 'verified', slots: 2, joined: '2024-12-01', email: 'hr@gcb.com.gh' },
  { id: 'c4', name: 'Vodafone Ghana', industry: 'Telecommunications', location: 'Accra, Greater Accra', status: 'pending', slots: 0, joined: '2025-01-10', email: 'internships@vodafone.com.gh' },
  { id: 'c5', name: 'Unilever Ghana', industry: 'Manufacturing / FMCG', location: 'Tema, Greater Accra', status: 'verified', slots: 4, joined: '2024-09-20', email: 'hr@unilever.com.gh' },
  { id: 'c6', name: 'Joy FM / Multimedia Group', industry: 'Media & Communications', location: 'Accra, Greater Accra', status: 'pending', slots: 1, joined: '2025-02-01', email: 'info@multimedia.com.gh' },
]

export const mockSchools = [
  { id: 's1', name: 'Achimota Senior High School', type: 'SHS', district: 'Ayawaso West', region: 'Greater Accra', status: 'verified', bookings: 12, joined: '2024-12-01' },
  { id: 's2', name: 'Mfantsipim School', type: 'SHS', district: 'Cape Coast Metro', region: 'Central', status: 'verified', bookings: 7, joined: '2024-11-15' },
  { id: 's3', name: 'Wesley Girls SHS', type: 'SHS', district: 'Cape Coast Metro', region: 'Central', status: 'verified', bookings: 5, joined: '2025-01-05' },
  { id: 's4', name: 'Presec Legon', type: 'SHS', district: 'Ayawaso West', region: 'Greater Accra', status: 'verified', bookings: 9, joined: '2024-10-20' },
  { id: 's5', name: 'Kumasi Academy', type: 'SHS', district: 'Kumasi Metro', region: 'Ashanti', status: 'pending', bookings: 0, joined: '2025-02-14' },
  { id: 's6', name: 'Labone JHS', type: 'JHS', district: 'Osu Klottey', region: 'Greater Accra', status: 'pending', bookings: 0, joined: '2025-03-01' },
]

export const ghanaRegions = ['Greater Accra','Ashanti','Central','Western','Eastern','Northern','Upper East','Upper West','Volta','Brong-Ahafo','Oti','Bono East','Ahafo','Western North','Savannah','North East']
export const departments = ['Information Technology','Finance & Accounting','Marketing & Communications','Human Resources','Operations & Logistics','Engineering','Healthcare','Media & Journalism','Legal','Customer Service','Sales','Research & Development']
