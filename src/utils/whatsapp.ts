export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface CustomerDetails {
  fullName: string;
  contactNumber: string;
  deliveryAddress: string;
  city: string;
  district: string;
  postalCode?: string;
  deliveryInstructions?: string;
  notes?: string;
}

/**
 * Validates Sri Lankan mobile phone numbers
 * Accepts formats: 0712345678, +94712345678, 94712345678, 712345678
 */
export function validateSriLankanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Format check:
  // Starts with 07 and 10 digits total: 07XXXXXXXX
  // Or starts with 947 and 11 digits total: 947XXXXXXXX
  // Or starts with 7 and 9 digits: 7XXXXXXXX
  return /^(?:07\d{8}|947\d{8}|7\d{8})$/.test(cleaned);
}

/**
 * Normalizes phone number to standard display or international format
 */
export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '94' + cleaned.slice(1);
  } else if (cleaned.startsWith('7') && cleaned.length === 9) {
    cleaned = '94' + cleaned;
  }
  return cleaned;
}

/**
 * Generates the formatted WhatsApp message specified in requirements
 */
export function generateWhatsAppMessage(
  items: OrderItem[],
  customer: CustomerDetails
): string {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const merchandiseSubtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const formattedSubtotal = new Intl.NumberFormat('en-LK').format(merchandiseSubtotal);

  let message = `Hello AMORA VOGUE! 🌸\n`;
  message += `I would like to place an order for the following items.\n\n`;
  message += `ORDER DETAILS\n`;

  items.forEach((item, index) => {
    const itemNum = String(index + 1).padStart(2, '0');
    const lineTotal = item.quantity * item.unitPrice;
    const formattedUnitPrice = new Intl.NumberFormat('en-LK').format(item.unitPrice);
    const formattedLineTotal = new Intl.NumberFormat('en-LK').format(lineTotal);

    message += `\nItem ${itemNum}\n`;
    message += `Product: ${item.name}\n`;
    message += `Code: ${item.sku}\n`;
    message += `Size: ${item.size}\n`;
    message += `Color: ${item.color}\n`;
    message += `Quantity: ${item.quantity}\n`;
    message += `Unit Price: Rs. ${formattedUnitPrice}\n`;
    message += `Subtotal: Rs. ${formattedLineTotal}\n`;
  });

  message += `\nTOTAL ITEMS: ${totalItems}\n`;
  message += `MERCHANDISE SUBTOTAL: Rs. ${formattedSubtotal}\n`;
  message += `Delivery Charges: To be confirmed\n\n`;

  message += `CUSTOMER DETAILS\n`;
  message += `Name: ${customer.fullName.trim()}\n`;
  message += `Contact: ${customer.contactNumber.trim()}\n`;
  message += `Address: ${customer.deliveryAddress.trim()}\n`;
  message += `City: ${customer.city.trim()}\n`;
  message += `District: ${customer.district.trim()}\n`;
  message += `Postal Code: ${customer.postalCode ? customer.postalCode.trim() : 'Not provided'}\n`;

  if (customer.deliveryInstructions?.trim()) {
    message += `Delivery Instructions: ${customer.deliveryInstructions.trim()}\n`;
  }
  if (customer.notes?.trim()) {
    message += `Notes: ${customer.notes.trim()}\n`;
  }

  message += `\nPlease confirm availability, delivery charges, and order details.\n`;
  message += `Thank you!`;

  return message;
}

/**
 * Gets configured WhatsApp business phone number from environment
 */
export function getWhatsAppNumber(): string {
  const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  return rawNumber.replace(/[^0-9]/g, '');
}

/**
 * Builds the WhatsApp web / mobile deep link URL
 */
export function buildWhatsAppLink(
  items: OrderItem[],
  customer: CustomerDetails
): { url: string; error?: string } {
  const number = getWhatsAppNumber();

  if (!number || number.length < 9) {
    return {
      url: '',
      error: 'WhatsApp business number is not configured. Please set VITE_WHATSAPP_NUMBER.',
    };
  }

  const message = generateWhatsAppMessage(items, customer);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedMessage}`;

  return { url };
}

/**
 * Builds a direct WhatsApp chat link with arbitrary pre-filled message text
 */
export function buildDirectWhatsAppMessageLink(text: string): string {
  const number = getWhatsAppNumber() || '94770000000';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

