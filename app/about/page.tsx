import type { Metadata } from 'next';
import { SITE_URL } from '@/utils/schema';
import AboutPage from '@/components/company/AboutPage';

export const metadata: Metadata = {
  title: 'About Us | FlowerDeliveryPK.com',
  description:
    "Learn about FlowerDeliveryPK.com — Pakistan's online florist delivering handcrafted fresh bouquets, luxury gift boxes and cakes same-day in Lahore, Karachi, Islamabad & nationwide.",
  alternates: {
    canonical: `${SITE_URL}/about`
  }
};

export default function Page() {
  return <AboutPage />;
}
