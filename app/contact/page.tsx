import type { Metadata } from 'next';
import { SITE_URL } from '@/utils/schema';
import ContactPage from '@/components/company/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us | FlowerDeliveryPK.com',
  description:
    'Contact FlowerDeliveryPK.com for flower orders, custom bouquets & bulk gifting across Pakistan. WhatsApp: 0348-0735344 — same-day delivery in Lahore, Karachi, Islamabad.',
  alternates: {
    canonical: `${SITE_URL}/contact`
  }
};

export default function Page() {
  return <ContactPage />;
}
