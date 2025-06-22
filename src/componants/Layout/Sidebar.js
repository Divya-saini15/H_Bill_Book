import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon,
  CreditCard as CreditCardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: CreditCardIcon, path: '/transactions' },
    { id: 'customers', label: 'Customers', icon: PeopleIcon, path: '/customers' },
    { id: 'reports', label: 'Reports', icon: BarChartIcon, path: '/reports' },
    { id: 'invoices', label: 'Invoices', icon: DescriptionIcon, path: '/invoices' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <BusinessIcon fontSize="large" />
          <h1>Bill Book</h1>
        </div>
        <button className="close-button" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <IconComponent fontSize="small" className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Link to="/notifications" className="nav-item">
          <NotificationsIcon fontSize="small" className="nav-icon" />
          <span className="nav-label">Notifications</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <AccountCircleIcon fontSize="small" className="nav-icon" />
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/logout" className="nav-item">
          <LogoutIcon fontSize="small" className="nav-icon" />
          <span className="nav-label">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;