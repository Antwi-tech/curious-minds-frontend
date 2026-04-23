import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import { RegisterCompany, RegisterSchool } from './pages/public/Register'
import { PendingApproval, NotFound, Unauthorized } from './pages/public/Misc'
import { CompanyDashboard, CompanyProfile, CompanySlots, CreateSlot, CompanyBookings, CompanyBookingDetail, ChangePassword } from './pages/company/CompanyPages'
import { SchoolDashboard, SchoolProfile, BrowseOpportunities, SlotDetail, BookSlot, SchoolBookings, SchoolBookingDetail } from './pages/school/SchoolPages'
import { AdminDashboard, AdminCompanies, AdminCompanyDetail, AdminSchools, AdminSchoolDetail, AdminBookings } from './pages/admin/AdminPages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/register-school" element={<RegisterSchool />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/slots" element={<CompanySlots />} />
        <Route path="/company/create-slot" element={<CreateSlot />} />
        <Route path="/company/bookings" element={<CompanyBookings />} />
        <Route path="/company/booking/:id" element={<CompanyBookingDetail />} />
        <Route path="/company/settings" element={<ChangePassword role="company" />} />
        <Route path="/school/dashboard" element={<SchoolDashboard />} />
        <Route path="/school/profile" element={<SchoolProfile />} />
        <Route path="/school/browse" element={<BrowseOpportunities />} />
        <Route path="/school/slot/:id" element={<SlotDetail />} />
        <Route path="/school/book/:id" element={<BookSlot />} />
        <Route path="/school/bookings" element={<SchoolBookings />} />
        <Route path="/school/booking/:id" element={<SchoolBookingDetail />} />
        <Route path="/school/settings" element={<ChangePassword role="school" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/company/:id" element={<AdminCompanyDetail />} />
        <Route path="/admin/schools" element={<AdminSchools />} />
        <Route path="/admin/school/:id" element={<AdminSchoolDetail />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
