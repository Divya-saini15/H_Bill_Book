import React, { useState } from 'react';
import { Box, Container, Paper, Tab, Tabs } from '@mui/material';
import CreateInvoiceForm from '../../components/Invoice/CreateInvoiceForm';
import InvoiceTemplate from '../../components/Invoice/InvoiceTemplate';
import { Invoice } from '../../interfaces/Invoice';

const companyDetails = {
  name: 'TFS TRADERS',
  logo: '/logo.png', // You'll need to add your logo to the public folder
  address: 'shop no.1 achinera road Brij nagar BHARATPUR, bharatpur, Rajasthan, 321001',
  mobile: '9414419941',
  gstin: '08ARQPT1298L1ZS',
  email: 'tfstraders2021@gmail.com',
};

const CreateInvoicePage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleInvoiceGenerate = (invoice: Invoice) => {
    setGeneratedInvoice(invoice);
    setCurrentTab(1); // Switch to preview tab
  };

  const handleEdit = () => {
    setCurrentTab(0); // Switch back to form tab
  };

  const handleDelete = () => {
    setGeneratedInvoice(null);
    setCurrentTab(0);
  };

  const handleSign = (signature: string) => {
    if (generatedInvoice) {
      setGeneratedInvoice({
        ...generatedInvoice,
        signature,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Create Invoice" />
          <Tab label="Preview" disabled={!generatedInvoice} />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {currentTab === 0 ? (
            <CreateInvoiceForm
              onSubmit={handleInvoiceGenerate}
              companyDetails={companyDetails}
            />
          ) : generatedInvoice && (
            <InvoiceTemplate
              invoice={generatedInvoice}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSign={handleSign}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateInvoicePage; 