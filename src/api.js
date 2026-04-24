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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── AUTH - COMPANY ───────────────────────────────────────
export const registerCompany = (data) => {
  return axios.post("http://127.0.0.1:5000/company/register", data);
};
export const loginCompany = (data) => API.post('/company/login', data);
export const changeCompanyPassword = (id, data) => API.patch(`/company/change_password/${id}`, data);

// ─── AUTH - SCHOOL ────────────────────────────────────────
export const registerSchool = (data) => API.post('/school/register', data);
export const loginSchool = (data) => API.post('/school/login', data);
export const changeSchoolPassword = (data) => API.patch('/school/change_password', data);
export const getSchoolProfile = () => API.get('/school/profile');
export const searchSchool = (query) => API.get(`/school/search_school?${query}`);
export const getSchools = () => API.get('/school/schools');
export const deleteSchool = (id) => API.delete(`/school/delete/${id}`);

export default API;