import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── AUTH - COMPANY ───────────────────────────────────────
export const registerCompany = (data) => API.post('/company/register', data);
export const loginCompany = (data) => API.post('/company/login', data);
export const changeCompanyPassword = (id, data) => API.patch(`/company/change_password/${id}`, data);
export const refreshCompanyToken = () => API.post('/company/token/refresh');

// ─── AUTH - SCHOOL ────────────────────────────────────────
export const registerSchool = (data) => API.post('/school/register', data);
export const loginSchool = (data) => API.post('/school/login', data);
export const changeSchoolPassword = (data) => API.patch('/school/change_password', data);
export const getSchoolProfile = () => API.get('/school/school/profile');
export const searchSchool = (q) => API.get(`/school/search_school?q=${q}`);
export const getAllSchools = (params) => API.get('/school/schools', { params });
export const deleteSchool = (id) => API.delete(`/school/delete/${id}`);
export const refreshSchoolToken = () => API.post('/school/token/refresh');

// ─── AUTH - ADMIN ─────────────────────────────────────────
export const loginAdmin = (data) => API.post('/admin/login', data);
export const registerAdmin = (data) => API.post('/admin/register', data);
export const changeAdminPassword = (id, data) => API.patch(`/admin/change_password/${id}`, data);

// ─── ADMIN - COMPANY MANAGEMENT ───────────────────────────
export const adminGetAllCompanies = () => API.get('/admin/companies');
export const adminVerifyCompany = (id) => API.patch(`/admin/${id}/verify`);
export const adminActivateCompany = (id) => API.patch(`/admin/companies/${id}/activate`);
export const adminDeactivateCompany = (id) => API.patch(`/admin/companies/${id}/deactivate`);

// ─── ADMIN - SCHOOL MANAGEMENT ────────────────────────────
export const adminGetAllSchools = () => API.get('/admin/schools');
export const adminVerifySchool = (id) => API.patch(`/admin/schools/${id}/verify`);
export const adminActivateSchool = (id) => API.patch(`/admin/schools/${id}/activate`);
export const adminDeactivateSchool = (id) => API.patch(`/admin/schools/${id}/deactivate`);

// ─── ADMIN - BOOKINGS & SLOTS ─────────────────────────────
export const adminGetAllBookings = () => API.get('/admin/bookings');
export const adminCancelBooking = (id) => API.patch(`/admin/bookings/${id}/cancel`);
export const adminGetAvailableTimes = () => API.get('/admin/available_times');

export default API;


// import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
// });

// // Automatically attach JWT token to every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Automatically handle token expiry
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // ─── AUTH - COMPANY ───────────────────────────────────────
// export const registerCompany = (data) => {
//   return axios.post("/company/register", data);
// };
// export const loginCompany = (data) => API.post('/company/login', data);
// export const changeCompanyPassword = (id, data) => API.patch(`/company/change_password/${id}`, data);

// // ─── AUTH - SCHOOL ────────────────────────────────────────
// export const registerSchool = (data) => API.post('/school/register', data);
// export const loginSchool = (data) => API.post('/school/login', data);
// export const changeSchoolPassword = (data) => API.patch('/school/change_password', data);
// export const getSchoolProfile = () => API.get('/school/profile');
// export const searchSchool = (query) => API.get(`/school/search_school?${query}`);
// export const getSchools = () => API.get('/school/schools');
// export const deleteSchool = (id) => API.delete(`/school/delete/${id}`);

// // ─── ADMIN - COMPANY MANAGEMENT ───────────────────────────────────────
// export const getCompanies = () => API.get('/admin/companies');
// export const verifyCompany = (id) => API.patch(`/admin/company/${id}/verify`);
// export const activateCompany = (id) => API.patch(`/admin/companies/${id}/activate`);
// export const deactivateCompany = (id) => API.patch(`/admin/companies/${id}/deactivate`);

// export default API;