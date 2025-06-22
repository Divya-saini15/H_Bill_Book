import React from 'react';
import { FiDownload } from 'react-icons/fi';

const ReportsPage = () => {
  const reports = [
    {
      title: 'Revenue Report',
      description: 'Monthly revenue breakdown with detailed analytics',
      period: 'Last 30 days',
      lastGenerated: '2024-03-15'
    },
    {
      title: 'Transaction Summary',
      description: 'Detailed transaction history and patterns',
      period: 'Last 30 days',
      lastGenerated: '2024-03-15'
    },
    {
      title: 'Customer Analytics',
      description: 'Customer behavior and engagement metrics',
      period: 'Last 30 days',
      lastGenerated: '2024-03-15'
    },
    {
      title: 'Invoice Status',
      description: 'Overview of paid, pending, and overdue invoices',
      period: 'Last 30 days',
      lastGenerated: '2024-03-15'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Reports</h1>
      </div>

      <div className="reports-grid">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <div className="report-content">
              <h3>{report.title}</h3>
              <p className="text-muted">{report.description}</p>
              <div className="report-meta">
                <span>Period: {report.period}</span>
                <span>Last Generated: {report.lastGenerated}</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="btn btn-primary">
                <FiDownload /> Download Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage; 