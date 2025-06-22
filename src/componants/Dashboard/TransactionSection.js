import React from 'react';

const TransactionTable = ({ transactions }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'failed': return 'var(--accent-color)';
      default: return 'var(--text-light)';
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Recent Transactions</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          backgroundColor: 'var(--secondary-color)'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                color: 'var(--text-dark)',
                fontWeight: '600'
              }}>
                Transaction ID
              </th>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                color: 'var(--text-dark)',
                fontWeight: '600'
              }}>
                Customer
              </th>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                color: 'var(--text-dark)',
                fontWeight: '600'
              }}>
                Amount
              </th>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                color: 'var(--text-dark)',
                fontWeight: '600'
              }}>
                Status
              </th>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                color: 'var(--text-dark)',
                fontWeight: '600'
              }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr 
                key={transaction.id} 
                style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--light-gray)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '15px', color: 'var(--text-dark)' }}>
                  #{transaction.id}
                </td>
                <td style={{ padding: '15px', color: 'var(--text-dark)' }}>
                  {transaction.customer}
                </td>
                <td style={{ 
                  padding: '15px', 
                  color: 'var(--text-dark)',
                  fontWeight: '600'
                }}>
                  {transaction.amount}
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: getStatusColor(transaction.status) + '20',
                    color: getStatusColor(transaction.status)
                  }}>
                    {transaction.status}
                  </span>
                </td>
                <td style={{ padding: '15px', color: 'var(--text-light)' }}>
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;