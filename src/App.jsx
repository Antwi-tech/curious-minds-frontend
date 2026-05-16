import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import { RegisterCompany, RegisterSchool } from './pages/public/Register'
import { PendingApproval, NotFound, Unauthorized } from './pages/public/Misc'

// Company pages
import CompanyDashboard from './pages/company/Dashboard'
import CompanyProfile from './pages/company/Profile'
import CompanySlots from './pages/company/Slots'
import CreateSlot from './pages/company/CreateSlot'
import CompanyBookings from './pages/company/Bookings'
import CompanyBookingDetail from './pages/company/BookingDetail'
import ChangePassword from './pages/company/ChangePassword'

// School pages
import SchoolDashboard from './pages/school/Dashboard'
import SchoolBookings from './pages/school/Bookings'
import BrowseOpportunities from './pages/school/BrowseOpportunities'
import BookSlot from './pages/school/BookSlot'
import SchoolProfile from './pages/school/Profile'
import SchoolChangePassword from './pages/school/ChangePassword'
import SlotDetail from './pages/school/SlotDetail'
import SchoolBookingDetail from './pages/school/BookingDetail'

// Admin pages
import { AdminDashboard, AdminCompanies, AdminCompanyDetail, AdminSchools, AdminSchoolDetail, AdminBookings, AdminSettings } from './pages/admin/AdminPages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/register-school" element={<RegisterSchool />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Company - protected */}
        <Route path="/company/dashboard" element={<ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>} />
        <Route path="/company/profile" element={<ProtectedRoute allowedRole="company"><CompanyProfile /></ProtectedRoute>} />
        <Route path="/company/slots" element={<ProtectedRoute allowedRole="company"><CompanySlots /></ProtectedRoute>} />
        <Route path="/company/create-slot" element={<ProtectedRoute allowedRole="company"><CreateSlot /></ProtectedRoute>} />
        <Route path="/company/bookings" element={<ProtectedRoute allowedRole="company"><CompanyBookings /></ProtectedRoute>} />
        <Route path="/company/booking/:id" element={<ProtectedRoute allowedRole="company"><CompanyBookingDetail /></ProtectedRoute>} />
        <Route path="/company/settings" element={<ProtectedRoute allowedRole="company"><ChangePassword role="company" /></ProtectedRoute>} />

        {/* School - protected */}
        <Route path="/school/dashboard" element={<ProtectedRoute allowedRole="school"><SchoolDashboard /></ProtectedRoute>} />
        <Route path="/school/profile" element={<ProtectedRoute allowedRole="school"><SchoolProfile /></ProtectedRoute>} />
        <Route path="/school/browse" element={<ProtectedRoute allowedRole="school"><BrowseOpportunities /></ProtectedRoute>} />
        <Route path="/school/slot/:id" element={<ProtectedRoute allowedRole="school"><SlotDetail /></ProtectedRoute>} />
        <Route path="/school/book/:id" element={<ProtectedRoute allowedRole="school"><BookSlot /></ProtectedRoute>} />
        <Route path="/school/bookings" element={<ProtectedRoute allowedRole="school"><SchoolBookings /></ProtectedRoute>} />
        <Route path="/school/booking/:id" element={<ProtectedRoute allowedRole="school"><SchoolBookingDetail /></ProtectedRoute>} />
        <Route path="/school/settings" element={<ProtectedRoute allowedRole="school"><SchoolChangePassword /></ProtectedRoute>} />
        
        {/* Admin - protected */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/companies" element={<ProtectedRoute allowedRole="admin"><AdminCompanies /></ProtectedRoute>} />
        <Route path="/admin/company/:id" element={<ProtectedRoute allowedRole="admin"><AdminCompanyDetail /></ProtectedRoute>} />
        <Route path="/admin/schools" element={<ProtectedRoute allowedRole="admin"><AdminSchools /></ProtectedRoute>} />
        <Route path="/admin/school/:id" element={<ProtectedRoute allowedRole="admin"><AdminSchoolDetail /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute allowedRole="admin"><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><AdminSettings /></ProtectedRoute>} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}