import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (invoice) => {
  if (!invoice) {
    console.error("generateInvoicePDF was called with no invoice.");
    return;
  }

  const doc = new jsPDF();
  
  // Get data with fallbacks
  const company = invoice.company || {};
  const invoiceDetails = invoice.invoiceDetails || {};
  const billTo = invoice.billTo || {};
  const shipTo = invoice.shipTo || {};
  const items = invoice.items || [];
  const bankDetails = invoice.bankDetails || {};

  const invoiceId = invoiceDetails.number || invoice.id || 'N/A';
  const invoiceDate = invoiceDetails.date || invoice.date || new Date().toISOString().split('T')[0];
  const clientName = billTo.name || invoice.client || 'N/A';
  const totalAmount = invoice.totalAmount || invoice.total || 0;

  // Colors
  const primaryColor = [255, 140, 0]; // Orange
  const darkColor = [0, 0, 0];
  const lightGray = [245, 245, 245];
  
  let yPosition = 20;
  
  // Header with company logo and info
  doc.setFillColor(...lightGray);
  doc.rect(0, 0, 210, 35, 'F');
  
  // Company circle logo
  doc.setFillColor(...darkColor);
  doc.circle(25, 20, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('TFS', 21.5, 23);
  
  // Company name
  doc.setTextColor(...primaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(company.name || 'Your Company', 40, 18);
  
  // Company details
  doc.setTextColor(...darkColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(company.address || 'Your Company Address', 40, 23);
  doc.text(`Mobile: ${company.mobile || 'N/A'}     GSTIN: ${company.gstin || 'N/A'}`, 40, 27);
  doc.text(`Email: ${company.email || 'N/A'}`, 40, 31);
  
  // Tax Invoice label
  doc.setFillColor(249, 249, 249);
  doc.rect(150, 10, 50, 15, 'F');
  doc.rect(150, 10, 50, 15, 'S');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('TAX INVOICE', 163, 16);
  doc.text('ORIGINAL FOR', 158, 20);
  doc.text('RECIPIENT', 162, 23);
  
  yPosition = 45;
  
  // Invoice details bar
  doc.setFillColor(...lightGray);
  doc.rect(10, yPosition, 190, 10, 'F');
  doc.setTextColor(...darkColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice No.: ${invoiceId}`, 15, yPosition + 7);
  doc.text(`Invoice Date: ${new Date(invoiceDate).toLocaleDateString()}`, 130, yPosition + 7);
  
  yPosition += 20;
  
  // Bill To and Ship To sections
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO', 15, yPosition);
  doc.text('SHIP TO', 110, yPosition);
  
  // Draw lines under headers
  doc.setLineWidth(0.5);
  doc.line(15, yPosition + 2, 90, yPosition + 2);
  doc.line(110, yPosition + 2, 185, yPosition + 2);
  
  yPosition += 8;
  
  // Bill To details
  doc.setFont('helvetica', 'bold');
  doc.text(clientName, 15, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(billTo.address || '', 15, yPosition + 5);
  doc.text(`Mobile: ${billTo.mobile || ''}`, 15, yPosition + 10);
  doc.text(`State: ${billTo.state || ''}`, 15, yPosition + 15);
  
  // Ship To details
  doc.setFont('helvetica', 'bold');
  doc.text(shipTo.name || clientName, 110, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(shipTo.address || billTo.address || '', 110, yPosition + 5);
  
  yPosition += 30;
  
  // Items table
  const tableColumns = [
    { header: 'ITEMS', dataKey: 'items' },
    { header: 'QTY.', dataKey: 'qty' },
    { header: 'RATE', dataKey: 'rate' },
    { header: 'TAX', dataKey: 'tax' },
    { header: 'AMOUNT', dataKey: 'amount' }
  ];
  
  const tableRows = items.map(item => ({
    items: `${item.description || 'N/A'}\n${item.serialNumber || ''}`,
    qty: `${item.quantity || 0} PCS`,
    rate: (item.rate || 0).toFixed(2),
    tax: `${(item.tax || 0).toFixed(2)}\n(${(item.taxRate || 0)}%)`,
    amount: (item.amount || 0).toFixed(2)
  }));
  
  doc.autoTable({
    startY: yPosition,
    columns: tableColumns,
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: lightGray,
      textColor: darkColor,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 60 }, // Items
      1: { cellWidth: 20, halign: 'center' }, // Qty
      2: { cellWidth: 30, halign: 'right' }, // Rate
      3: { cellWidth: 30, halign: 'right' }, // Tax
      4: { cellWidth: 30, halign: 'right' } // Amount
    },
    margin: { left: 15, right: 15 }
  });
  
  yPosition = doc.lastAutoTable.finalY + 15;
  
  // Bottom section with bank details and totals
  const bottomSectionY = yPosition;
  
  // Bank Details section (left side)
  doc.setFillColor(249, 249, 249);
  doc.rect(15, bottomSectionY, 85, 60, 'F');
  doc.rect(15, bottomSectionY, 85, 60, 'S');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BANK DETAILS', 20, bottomSectionY + 8);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${bankDetails.name || ''}`, 20, bottomSectionY + 15);
  doc.text(`IFSC Code: ${bankDetails.ifsc || ''}`, 20, bottomSectionY + 20);
  doc.text(`Account No: ${bankDetails.accountNo || ''}`, 20, bottomSectionY + 25);
  doc.text(`Bank: ${bankDetails.bank || ''}`, 20, bottomSectionY + 30);
  
  // QR Code placeholder
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT QR CODE', 35, bottomSectionY + 38);
  doc.rect(40, bottomSectionY + 40, 15, 15, 'S');
  doc.setFontSize(6);
  doc.text('QR CODE', 44, bottomSectionY + 48);
  doc.setFontSize(7);
  doc.text(`UPI ID: ${bankDetails.accountNo || ''}@paytm`, 20, bottomSectionY + 58);
  
  // Totals section (right side)
  const totalsX = 110;
  const totalsData = [
    ['SUBTOTAL', '1', `₹ ${(invoice.subtotal || 0).toFixed(2)}`, `₹ ${(totalAmount).toFixed(2)}`],
    ['TAXABLE AMOUNT', '', '', `₹ ${(invoice.taxableAmount || 0).toFixed(2)}`],
    ['CGST @14%', '', '', `₹ ${(invoice.cgst || 0).toFixed(2)}`],
    ['SGST @14%', '', '', `₹ ${(invoice.sgst || 0).toFixed(2)}`],
    ['TOTAL AMOUNT', '', '', `₹ ${(totalAmount).toFixed(2)}`],
    ['Received Amount', '', '', `₹ ${(totalAmount).toFixed(2)}`],
    ['Balance', '', '', '₹ 0']
  ];
  
  doc.autoTable({
    startY: bottomSectionY,
    body: totalsData,
    theme: 'grid',
    margin: { left: totalsX },
    tableWidth: 85,
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 10, halign: 'center' },
      2: { cellWidth: 20, halign: 'right' },
      3: { cellWidth: 20, halign: 'right' }
    },
    didParseCell: function(data) {
      if (data.row.index === 4) { // Total Amount row
        data.cell.styles.fillColor = lightGray;
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  // Amount in words
  const amountWordsY = doc.lastAutoTable.finalY + 5;
  doc.setFillColor(249, 249, 249);
  doc.rect(totalsX, amountWordsY, 85, 15, 'F');
  doc.rect(totalsX, amountWordsY, 85, 15, 'S');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount (in words)', totalsX + 25, amountWordsY + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.amountInWords || 'N/A', totalsX + 5, amountWordsY + 10, { maxWidth: 75 });
  
  // Terms and Conditions
  const termsY = Math.max(bottomSectionY + 70, amountWordsY + 25);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('TERMS AND CONDITIONS', 15, termsY);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.terms || '', 15, termsY + 8, { maxWidth: 180 });
  
  // Signature section
  const signatureY = termsY + 25;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('AUTHORISED SIGNATORY FOR', 140, signatureY);
  doc.text(company.name || 'Your Company', 150, signatureY + 5);
  
  // Signature line
  doc.setLineWidth(0.5);
  doc.line(140, signatureY + 15, 190, signatureY + 15);
  
  // Footer message
  const footerY = signatureY + 25;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text("I'm stand with you, just chill 😎 jai shyam ji bagheshwar dham Balaji sarkar", 15, footerY);
  
  // Save the PDF
  doc.save(`invoice-${invoiceId}.pdf`);
};