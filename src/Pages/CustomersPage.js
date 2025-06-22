import React, { useState } from 'react';
import { 
  FiSearch, 
  FiEye, 
  FiEdit2, 
  FiTrash2, 
  FiMail,
  FiPhone
} from 'react-icons/fi';
import Modal from '../components/Modals/Modal';
import CustomerForm from '../components/CustomerForm';
import ViewCustomerModal from '../components/Modals/ViewCustomerModal';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      totalSpent: '$1,250.00',
      lastInvoice: '2024-03-15',
      status: 'Active'
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      totalSpent: '$2,840.00',
      lastInvoice: '2024-03-14',
      status: 'Active'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleViewCustomer = (customer) => {
    setViewingCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
    }
  };

  const handleSaveCustomer = (customerData) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...customerData } : c));
    } else {
      const newCustomer = {
        ...customerData,
        id: `CUST-00${customers.length + 1}`,
        totalSpent: '$0.00',
        lastInvoice: new Date().toISOString().slice(0, 10),
        status: 'Active'
      };
      setCustomers([...customers, newCustomer]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Customers</h1>
        <button className="btn btn-primary" onClick={handleAddCustomer}>+ Add Customer</button>
      </div>

      <div className="filters-container" style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search customers..."
            className="search-input"
          />
        </div>

        <select className="form-input" style={{ width: 'auto' }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" />
              </th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Total Spent</th>
              <th>Last Invoice</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>
                  <div className="contact-info">
                    <span>
                      <FiMail /> {customer.email}
                    </span>
                    <span>
                      <FiPhone /> {customer.phone}
                    </span>
                  </div>
                </td>
                <td>{customer.totalSpent}</td>
                <td>{customer.lastInvoice}</td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button" 
                      title="View"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      <FiEye />
                    </button>
                    <button 
                      className="action-button" 
                      title="Edit"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="action-button" 
                      title="Delete"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal 
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
      >
        <CustomerForm 
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      <ViewCustomerModal
        show={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        customer={viewingCustomer}
      />
    </div>
  );
};

export default CustomersPage; 