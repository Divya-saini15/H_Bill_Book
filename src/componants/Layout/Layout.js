import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app-container">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={handleMobileMenuToggle}
      >
        <MenuIcon fontSize="small" />
      </button>

      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        activeMenu={location.pathname.split('/')[1] || 'dashboard'}
        onToggle={handleToggleSidebar}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 