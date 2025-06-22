import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiGrid, 
  FiFileText, 
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiBell,
  FiUser,
  FiLogOut
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => {
    if (path === '/invoices') {
      return location.pathname.startsWith('/invoices');
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard',
      icon: <FiGrid size={20} />,
      label: 'Dashboard'
    },
    {
      path: '/transactions',
      icon: <FiDollarSign size={20} />,
      label: 'Transactions'
    },
    {
      path: '/customers',
      icon: <FiUsers size={20} />,
      label: 'Customers'
    },
    {
      path: '/reports',
      icon: <FiPieChart size={20} />,
      label: 'Reports'
    },
    {
      path: '/invoices',
      icon: <FiFileText size={20} />,
      label: 'Invoices'
    },
    {
      path: '/settings',
      icon: <FiSettings size={20} />,
      label: 'Settings'
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <FiGrid size={24} />
          <span>Bill Book</span>
        </div>
        <button className="close-btn">×</button>
      </div>

      <div className="main-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="bottom-nav">
        <Link to="/notifications" className="nav-item">
          <FiBell size={20} />
          <span>Notifications</span>
        </Link>

        <Link to="/profile" className="nav-item">
          <FiUser />
          <span>Profile</span>
        </Link>

        <button onClick={handleLogout} className="nav-item">
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 