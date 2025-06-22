import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TransactionManager from '../components/TransactionManager'; // Import the TransactionManager
import DashboardCard from '../components/DashboardCard'; // Assuming you have this
import { 
  CreditCard as CreditCardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon 
} from '@mui/icons-material';

const Dashboard = ({ tenantId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setMobileOpen(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'transactions':
        return <TransactionManager />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-content">
            <h1>Welcome back!</h1>
            <div className="dashboard-stats">
              <DashboardCard 
                title="TOTAL REVENUE" 
                value="$24,563" 
                icon={<CreditCardIcon fontSize="medium" />}
                trend="up"
                trendValue="12.5% from last month"
                color="blue"
              />
              <DashboardCard 
                title="GROWTH RATE" 
                value="18.6%" 
                icon={<TrendingUpIcon fontSize="medium" />}
                color="green"
              />
              <DashboardCard 
                title="TOTAL ORDERS" 
                value="1,429" 
                icon={<CreditCardIcon fontSize="medium" />}
                trend="up"
                trendValue="8.2% from last month"
                color="purple"
              />
              <DashboardCard 
                title="ACTIVE USERS" 
                value="892" 
                icon={<PersonIcon fontSize="medium" />}
                trend="down"
                trendValue="2.4% from last month"
                color="orange"
              />
            </div>
            <div className="account-info">
              <p>ACCOUNTS: {tenantId || 'billbookdev'}</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        activeMenu={activeMenu}
        onToggle={handleToggle}
        onMenuClick={handleMenuClick}
      />
      
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;