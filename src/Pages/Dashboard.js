import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccessTime as AccessTimeIcon,
  AccountBalanceWallet as WalletIcon,
  ReceiptLong as InvoiceIcon,
  Payment as PaymentIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <WalletIcon />
            BillBook
          </Link>
        </div>

        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                <DashboardIcon />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/invoices" className="nav-link">
                <DescriptionIcon />
                Invoices
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/transactions" className="nav-link">
                <ReceiptIcon />
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link">
                <PeopleIcon />
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <SettingsIcon />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <div className="welcome-text">
            <h1>Welcome back, John!</h1>
            <p>Here's what's happening with your business today.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">
              <DescriptionIcon />
              New Invoice
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Revenue</span>
              <div className="stat-card-icon revenue">
                <WalletIcon />
              </div>
            </div>
            <div className="stat-card-value">$24,780</div>
            <div className="stat-card-change positive">
              <TrendingUpIcon />
              +12.5% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Invoices</span>
              <div className="stat-card-icon invoices">
                <DescriptionIcon />
              </div>
            </div>
            <div className="stat-card-value">156</div>
            <div className="stat-card-change positive">
              <TrendingUpIcon />
              +8.2% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Transactions</span>
              <div className="stat-card-icon transactions">
                <ReceiptIcon />
              </div>
            </div>
            <div className="stat-card-value">284</div>
            <div className="stat-card-change negative">
              <TrendingDownIcon />
              -2.4% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Active Customers</span>
              <div className="stat-card-icon customers">
                <PeopleIcon />
              </div>
            </div>
            <div className="stat-card-value">48</div>
            <div className="stat-card-change positive">
              <TrendingUpIcon />
              +4.8% from last month
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
            <Link to="/transactions" className="btn btn-secondary">View All</Link>
          </div>

          <ul className="activity-list">
            <li className="activity-item">
              <div className="activity-icon invoice">
                <InvoiceIcon />
              </div>
              <div className="activity-content">
                <div className="activity-title">New invoice created</div>
                <div className="activity-meta">
                  <span className="activity-time">
                    <AccessTimeIcon fontSize="small" />
                    2 hours ago
                  </span>
                  <span className="activity-amount">$1,200.00</span>
                </div>
              </div>
            </li>

            <li className="activity-item">
              <div className="activity-icon payment">
                <PaymentIcon />
              </div>
              <div className="activity-content">
                <div className="activity-title">Payment received</div>
                <div className="activity-meta">
                  <span className="activity-time">
                    <AccessTimeIcon fontSize="small" />
                    5 hours ago
                  </span>
                  <span className="activity-amount">$850.00</span>
                </div>
              </div>
            </li>

            <li className="activity-item">
              <div className="activity-icon customer">
                <PersonIcon />
              </div>
              <div className="activity-content">
                <div className="activity-title">New customer added</div>
                <div className="activity-meta">
                  <span className="activity-time">
                    <AccessTimeIcon fontSize="small" />
                    1 day ago
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;