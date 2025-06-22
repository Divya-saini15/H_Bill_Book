import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TenantPage from './Pages/TenantPage';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import TransactionsPage from './Pages/TransactionsPage';
import InvoicesPage from './Pages/Invoices/InvoicesPage';
import CreateInvoice from './Pages/Invoices/CreateInvoice';
import InvoiceDetails from './Pages/Invoices/InvoiceDetails';
import CustomersPage from './Pages/CustomersPage';
import ReportsPage from './Pages/ReportsPage';
import SettingsPage from './Pages/SettingsPage';
import './styles/global.css';
import './styles/app.css';
import './styles/sidebar.css';
import './styles/dashboard.css';
import './styles/invoices.css';
import './styles/customers.css';
import './styles/reports.css';
import './styles/settings.css';
import './styles/auth.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const tenantId = localStorage.getItem('tenantId');

  if (!tenantId) {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

// Auth Layout Component
const AuthLayout = ({ children }) => {
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Auth Layout */}
        <Route path="/" element={
          <AuthLayout>
            <TenantPage />
          </AuthLayout>
        } />
        <Route path="/login" element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        } />
        
        {/* Invoice Routes */}
        <Route path="/invoices" element={
          <ProtectedRoute>
            <InvoicesPage />
          </ProtectedRoute>
        } />
        <Route path="/invoices/create" element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        } />
        <Route path="/invoices/:id" element={
          <ProtectedRoute>
            <InvoiceDetails />
          </ProtectedRoute>
        } />
        <Route path="/invoices/:id/edit" element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        } />

        <Route path="/customers" element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;