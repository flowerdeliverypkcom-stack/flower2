'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import PetalCanvas from '@/components/3d/PetalCanvas';
import SearchModal from '@/components/ui/SearchModal';
import QuickViewModal from '@/components/ui/QuickViewModal';
import ToastContainer from '@/components/ui/ToastContainer';
import SalesNotificationPopup from '@/components/ui/SalesNotificationPopup';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
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
    </>
  );
}
