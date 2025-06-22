import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';

export const generateInvoicePDF = async (invoice) => {
  try {
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Add company logo (you'll need to replace with actual logo path)
    // doc.addImage('/logo.png', 'PNG', 15, 15, 30, 30);
    
    // Company header
    doc.setFontSize(20);
    doc.setTextColor(139, 69, 19); // Brown color for company name
    doc.text(invoice.companyInfo.name, 15, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text([
      invoice.companyInfo.address,
      `Mobile: ${invoice.companyInfo.mobile}    GSTIN: ${invoice.companyInfo.gstin}`,
      `Email: ${invoice.companyInfo.email}`
    ], 15, 40);

    // Invoice details
    doc.setFontSize(12);
    doc.text('TAX INVOICE', 15, 65);
    doc.setFontSize(10);
    doc.text(`Invoice No.: ${invoice.invoiceDetails.number}`, 15, 75);
    doc.text(`Date: ${new Date(invoice.invoiceDetails.date).toLocaleDateString()}`, 15, 82);

    // Original for recipient
    doc.rect(140, 65, 55, 10);
    doc.text('ORIGINAL FOR', 142, 71);
    doc.text(invoice.invoiceDetails.originalFor || 'RECIPIENT', 142, 76);

    // Bill To section
    doc.text('BILL TO', 15, 95);
    doc.setFontSize(10);
    doc.text([
      invoice.billTo.name,
      invoice.billTo.address,
      `Mobile: ${invoice.billTo.mobile}`,
      `State: ${invoice.billTo.state}`
    ], 15, 102);

    // Ship To section
    doc.text('SHIP TO', 110, 95);
    doc.text([
      invoice.shipTo.name,
      invoice.shipTo.address
    ], 110, 102);

    // Items table
    const tableColumns = ['ITEMS', 'QTY.', 'RATE', 'TAX', 'AMOUNT'];
    const tableRows = (invoice.items || []).map(item => [
      item.description || '',
      (item.qty ?? 0).toString(),
      `₹${(item.rate ?? 0).toFixed(2)}`,
      `${item.tax ?? 0}%`,
      `₹${(item.amount ?? 0).toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 130,
      head: [tableColumns],
      body: tableRows,
      theme: 'grid',
      headStyles: { 
        fillColor: [245, 245, 245], 
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 9,
        cellPadding: 5
      }
    });

    // Calculate Y position after table
    const finalY = doc.lastAutoTable.finalY + 10;

    // Totals section
    doc.text('SUBTOTAL:', 120, finalY + 10);
    doc.text(`₹${(invoice.subtotal ?? 0).toFixed(2)}`, 170, finalY + 10);
    
    doc.text('CGST @14%:', 120, finalY + 17);
    doc.text(`₹${(invoice.cgst ?? 0).toFixed(2)}`, 170, finalY + 17);
    
    doc.text('SGST @14%:', 120, finalY + 24);
    doc.text(`₹${(invoice.sgst ?? 0).toFixed(2)}`, 170, finalY + 24);
    
    doc.setFontSize(11);
    doc.text('TOTAL AMOUNT:', 120, finalY + 31);
    doc.text(`₹${(invoice.total ?? 0).toFixed(2)}`, 170, finalY + 31);

    // Bank details
    doc.setFontSize(10);
    doc.text('BANK DETAILS', 15, finalY + 10);
    doc.text([
      `Name: ${invoice.bankDetails.name}`,
      `IFSC Code: ${invoice.bankDetails.ifscCode}`,
      `Account No: ${invoice.bankDetails.accountNo}`,
      `Bank: ${invoice.bankDetails.bank}`
    ], 15, finalY + 17);

    // Payment QR Code
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(
        invoice.paymentQRCode.upiId,
        {
          errorCorrectionLevel: 'M',
          margin: 2,
          width: 150
        }
      );
      doc.addImage(qrCodeDataUrl, 'PNG', 15, finalY + 45, 50, 50);
    } catch (error) {
      console.warn('QR code generation failed:', error);
      // Continue without QR code
    }

    // Terms and conditions
    doc.setFontSize(9);
    doc.text('TERMS AND CONDITIONS', 15, finalY + 105);
    doc.text(invoice.termsAndConditions, 15, finalY + 112);

    // Authorized Signatory
    doc.text('Authorized Signatory', 150, finalY + 105);
    doc.text('For TFS TRADERS', 150, finalY + 112);

    // Save the PDF
    const filename = `Invoice-${invoice.invoiceDetails.number}.pdf`;
    doc.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}; 