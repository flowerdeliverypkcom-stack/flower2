import type { Metadata } from 'next';
import { SITE_URL } from '@/utils/schema';
import HomePage from '@/components/home/HomePage';

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/`
  }
};

export default function Page() {
  return <HomePage />;
}
