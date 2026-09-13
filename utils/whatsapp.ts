import { CartItem, Product } from '@/types';

export const WHATSAPP_NUMBER = '0320-0411680';
export const WHATSAPP_BASE_URL = 'https://wa.me/923200411680';

/**
 * Build direct WhatsApp order link for a single product with delivery address/date prompt.
 */
export function getSingleProductWhatsAppLink(
  productName: string,
  price: number,
  quantity: number = 1
): string {
  const totalPrice = (price * quantity).toLocaleString();

  const text = `🌸 *NEW ORDER - FlowerDeliveryPK.com* 🌸

• *Product:* ${productName}
• *Quantity:* ${quantity}
• *Total Price:* Rs. ${totalPrice}

-----------------------------------
*Please reply with your delivery details:*
📍 *Delivery Address:* 
📅 *Delivery Date:* 
⏰ *Time Slot:* (Morning / Evening / Midnight)
📝 *Card Note:* 
💳 *Payment Method:* (COD / JazzCash / EasyPaisa / Bank Transfer / Wise / Remitly)

Thank you!`;

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
}

/**
 * Build direct WhatsApp order link from a Product object.
 */
export function getProductObjectWhatsAppLink(product: Product, quantity: number = 1): string {
  return getSingleProductWhatsAppLink(product.name, product.price, quantity);
}

/**
 * Build WhatsApp link for the entire shopping cart (if multiple items selected).
 */
export function getCartWhatsAppLink(cartItems: CartItem[], subtotal: number): string {
  if (cartItems.length === 0) return WHATSAPP_BASE_URL;

  const productLines = cartItems
    .map(
      (item) =>
        `• ${item.product.name} (x${item.quantity}) - Rs. ${(
          item.product.price * item.quantity
        ).toLocaleString()}`
    )
    .join('\n');

  const text = `🌸 *MULTI-ITEM ORDER - FlowerDeliveryPK.com* 🌸

*Items Requested:*
${productLines}

*Subtotal:* Rs. ${subtotal.toLocaleString()}

-----------------------------------
*Please reply with your delivery details:*
📍 *Delivery Address:* 
📅 *Delivery Date:* 
⏰ *Preferred Time Slot:* 
📝 *Card Note:* 
💳 *Payment:* (COD / JazzCash / EasyPaisa / Bank Transfer / Wise / Remitly)

Thank you!`;

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
}

/**
 * Build WhatsApp link for checkout form submission.
 */
export function getCheckoutWhatsAppLink(
  cartItems: CartItem[],
  total: number,
  formData: {
    fullName: string;
    whatsappNumber: string;
    city: string;
    address: string;
    landmark?: string;
    deliveryDate: string;
    deliveryTimeSlot: string;
    specialInstructions?: string;
  }
): string {
  const productLines = cartItems
    .map(
      (item) =>
        `• ${item.product.name} (x${item.quantity}) - Rs. ${(
          item.product.price * item.quantity
        ).toLocaleString()}`
    )
    .join('\n');

  const text = `🌸 *NEW ORDER CONFIRMATION - FlowerDeliveryPK.com* 🌸

*Customer Details:*
• *Name:* ${formData.fullName}
• *WhatsApp:* ${formData.whatsappNumber}
• *City:* ${formData.city}
• *Address:* ${formData.address}
${formData.landmark ? `• *Landmark:* ${formData.landmark}\n` : ''}• *Delivery Date:* ${formData.deliveryDate}
• *Time Slot:* ${formData.deliveryTimeSlot}
${formData.specialInstructions ? `• *Notes:* ${formData.specialInstructions}\n` : ''}
*Order Items:*
${productLines}

*Total Amount:* Rs. ${total.toLocaleString()}

Please confirm availability and dispatch video details. Thank you!`;

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
}
