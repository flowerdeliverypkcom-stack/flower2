import type { Metadata } from 'next';
import { SITE_URL } from '@/utils/schema';
import SameDayDeliveryPage from '@/components/company/SameDayDeliveryPage';

export const metadata: Metadata = {
  title: 'Same-Day Flower Delivery Pakistan | 2–3 Hour Express Delivery',
  description:
    'Order fresh flowers online for same-day delivery anywhere in Pakistan. Express 2–3 hour bouquet delivery in Lahore, Karachi, Islamabad, Rawalpindi & more — order before 5 PM.',
  alternates: {
    canonical: `${SITE_URL}/same-day-flower-delivery`
  }
};

export default function Page() {
  return <SameDayDeliveryPage />;
}
