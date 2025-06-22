export const generateInvoiceNumber = (prefix: string = 'TS/SL'): string => {
  const currentDate = new Date();
  const financialYear = `${currentDate.getFullYear().toString().slice(-2)}-${(currentDate.getFullYear() + 1).toString().slice(-2)}`;
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}/${financialYear}/${randomNum}`;
};

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

const convertToWords = (num: number): string => {
  if (num === 0) return '';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const remainder = num % 10;
    return tens[Math.floor(num / 10)] + (remainder ? ' ' + ones[remainder] : '');
  }
  if (num < 1000) {
    const remainder = num % 100;
    return ones[Math.floor(num / 100)] + ' Hundred' + (remainder ? ' ' + convertToWords(remainder) : '');
  }
  if (num < 100000) {
    const remainder = num % 1000;
    return convertToWords(Math.floor(num / 1000)) + ' Thousand' + (remainder ? ' ' + convertToWords(remainder) : '');
  }
  if (num < 10000000) {
    const remainder = num % 100000;
    return convertToWords(Math.floor(num / 100000)) + ' Lakh' + (remainder ? ' ' + convertToWords(remainder) : '');
  }
  const remainder = num % 10000000;
  return convertToWords(Math.floor(num / 10000000)) + ' Crore' + (remainder ? ' ' + convertToWords(remainder) : '');
};

export const convertAmountToWords = (amount: number): string => {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  
  let result = convertToWords(rupees) + ' Rupees';
  if (paise > 0) {
    result += ' and ' + convertToWords(paise) + ' Paise';
  }
  return result;
};

export const calculateTaxes = (amount: number, cgstRate: number = 14, sgstRate: number = 14) => {
  const cgst = (amount * cgstRate) / 100;
  const sgst = (amount * sgstRate) / 100;
  return {
    cgst,
    sgst,
    total: amount + cgst + sgst,
    taxableAmount: amount
  };
}; 