import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import SearchModal from '@/components/ui/SearchModal';
import QuickViewModal from '@/components/ui/QuickViewModal';
import ToastContainer from '@/components/ui/ToastContainer';
import SalesNotificationPopup from '@/components/ui/SalesNotificationPopup';
import PetalCanvas from '@/components/3d/PetalCanvas';
import { getOrganizationSchema, getLocalBusinessSchema } from '@/utils/schema';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8B1538',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://flowerdeliverypk.com'),
  title: {
    default: 'FlowerDeliveryPK.com — Online Flowers, Bouquets & Gifts Delivery in Pakistan',
    template: '%s | FlowerDeliveryPK.com'
  },
  description: 'Send fresh flower bouquets, red roses, birthday cakes & luxury gift boxes across Pakistan (Lahore, Karachi, Islamabad, Rawalpindi & more). Same-day delivery with easy WhatsApp ordering.',
  keywords: [
    'flower delivery Pakistan',
    'flowers delivery Pakistan',
    'flower delivery Lahore',
    'flowers delivery Lahore',
    'flower shop Lahore',
    'online flower delivery',
    'send flowers online',
    'send flowers to Pakistan',
    'online flowers Pakistan',
    'flower bouquet Pakistan',
    'flower bouquets Lahore',
    'same day flower delivery',
    'birthday flowers Pakistan',
    'anniversary flowers Pakistan',
    "Valentine's flowers Pakistan",
    'roses delivery Lahore',
    'fresh flowers Pakistan',
    'gift delivery Pakistan',
    'cake and flowers Pakistan',
    'flower delivery Karachi',
    'flower delivery Islamabad',
    'flower delivery Rawalpindi'
  ],
  authors: [{ name: 'FlowerDeliveryPK.com' }],
  creator: 'FlowerDeliveryPK.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowerdeliverypk.com',
    siteName: 'FlowerDeliveryPK.com',
    title: 'FlowerDeliveryPK.com — Online Flowers, Bouquets & Gifts Delivery in Pakistan',
    description: 'Fresh flower bouquets & luxury gifts delivered same-day across Lahore, Karachi, Islamabad & all major cities in Pakistan. Order on WhatsApp: 0348-0735344.',
    images: [
      {
        url: '/images/banners/hero-slide-1.webp',
        width: 1200,
        height: 630,
        alt: 'Fresh Red Roses Bouquet Delivery in Pakistan - FlowerDeliveryPK'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowerDeliveryPK.com — Luxury Flowers & Gifts Pakistan',
    description: 'Send red roses, birthday cakes & gift boxes to Lahore, Karachi, Islamabad. Same day delivery via WhatsApp: 0348-0735344.',
    images: ['/images/banners/hero-slide-1.webp']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const localBizSchema = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF7F2] text-[#222222] selection:bg-[#581825] selection:text-white">
        <CartProvider>
          {/* Subtle Ambient 3D Petal Background */}
          <PetalCanvas />

          <Header />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />

          <FloatingWhatsApp />
          <SearchModal />
          <QuickViewModal />
          <ToastContainer />
          <SalesNotificationPopup />
        </CartProvider>
      </body>
    </html>
  );
}
