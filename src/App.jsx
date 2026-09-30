import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Student Pages
import { Dashboard } from './pages/student/Dashboard';
import { Profile } from './pages/student/Profile';
import { Skills } from './pages/student/Skills';
import { Certifications } from './pages/student/Certifications';
import { Projects } from './pages/student/Projects';
import { Opportunities } from './pages/student/Opportunities';
import { Aptitude } from './pages/student/Aptitude';
import { Roadmap } from './pages/student/Roadmap';
import { ResumePage } from './pages/student/ResumePage';
import { NotificationsPage } from './pages/student/NotificationsPage';
import { SettingsPage } from './pages/student/SettingsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminOpportunities } from './pages/admin/AdminOpportunities';
import { AdminAptitude } from './pages/admin/AdminAptitude';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Main Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Student Navigation Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="skills" element={<Skills />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="projects" element={<Projects />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="aptitude" element={<Aptitude />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Admin Navigation Routes */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/students" element={<AdminStudents />} />
        <Route path="admin/opportunities" element={<AdminOpportunities />} />
        <Route path="admin/aptitude" element={<AdminAptitude />} />
        <Route path="admin/announcements" element={<AdminAnnouncements />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
