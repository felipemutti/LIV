import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';


// A layout component to wrap pages with Header and Footer
const AppLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// A component to protect routes that require authentication
const ProtectedRoute: React.FC<{ adminOnly?: boolean }> = ({ adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly) {
    // This is an admin-only route.
    // If the user is an admin, allow access. Otherwise, redirect to the user dashboard.
    return user.isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
  } else {
    // This is a regular user route.
    // If the user is a regular user, allow access. Otherwise, redirect to the admin dashboard.
    return !user.isAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
  }
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected User Route */}
              <Route element={<ProtectedRoute />}>
                 <Route path="/dashboard" element={<DashboardPage />} />
              </Route>

              {/* Protected Admin Route */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                 <Route path="/admin" element={<AdminDashboardPage />} />
              </Route>

              {/* Fallback route to redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;