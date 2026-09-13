'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import WhatsAppOrderModal from '@/components/ui/WhatsAppOrderModal';

interface WhatsAppOrderButtonProps {
  productName?: string;
  price?: number;
  quantity?: number;
  variant?: 'compact' | 'full' | 'hero' | string;
  label?: string;
  className?: string;
  directOpen?: boolean;
}

export default function WhatsAppOrderButton({
  productName = 'Fresh Flowers',
  price,
  quantity = 1,
  variant = 'full',
  label,
  className = '',
  directOpen = false,
}: WhatsAppOrderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (directOpen) {
      // Fallback direct WhatsApp redirect if explicitly requested
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923200411680';
      const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
      const encodedMessage = encodeURIComponent(
        `Hello FlowerDeliveryPK! I want to order ${productName}. Please share availability.`
      );
      window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
      return;
    }

    // Open Lead Capture Modal before WhatsApp redirect
    setIsModalOpen(true);
  };

  const buttonText = label || (variant === 'compact' ? 'WhatsApp' : 'Order on WhatsApp');

  let variantStyles = 'w-full py-3 sm:py-3.5 px-4 sm:px-5 text-xs sm:text-sm bg-[#075E54] hover:bg-[#054c44] text-white';
  let iconSize = 'w-4 h-4 sm:w-4.5 sm:h-4.5';

  if (variant === 'compact') {
    variantStyles = 'w-full py-2 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs bg-[#075E54] hover:bg-[#054c44] text-white';
    iconSize = 'w-3 h-3 sm:w-3.5 sm:h-3.5';
  } else if (variant === 'hero' || variant === 'luxury') {
    variantStyles = 'w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 text-sm font-semibold bg-[#075E54] hover:bg-[#054c44] text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-emerald-400/40 transition-all';
    iconSize = 'w-5 h-5';
  }

  return (
    <>
      <button
        onClick={handleWhatsAppClick}
        type="button"
        className={`rounded-full font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-500/20 active:scale-95 whitespace-nowrap ${variantStyles} ${className}`}
        title="Order via WhatsApp"
      >
        <MessageCircle className={`${iconSize} fill-white flex-shrink-0`} />
        <span className="truncate">{buttonText}</span>
      </button>

      {/* Smart Pre-WhatsApp Lead Capture Modal */}
      <WhatsAppOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
        price={price}
        quantity={quantity}
      />
    </>
  );
}