'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, MapPin, User, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  price?: number;
  quantity?: number;
}

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Other'];

export default function WhatsAppOrderModal({
  isOpen,
  onClose,
  productName = 'Fresh Flowers Bouquet',
  price,
  quantity = 1,
}: WhatsAppOrderModalProps) {
  const baseId = useId();
  const nameInputId = `${baseId}-customer-name`;
  const citySelectId = `${baseId}-delivery-city`;
  const customCityInputId = `${baseId}-custom-city`;

  const [customerName, setCustomerName] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [errorMessage, setErrorMessage] = useState('');

  const targetCity = deliveryCity === 'Other' ? (customCity.trim() || 'Pakistan') : deliveryCity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    const calculatedPrice = price ? price * quantity : undefined;
    const finalCity = targetCity;

    // Asynchronously log lead to Next.js API / Google Sheets
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName.trim(),
          city: finalCity,
          productName,
          price: calculatedPrice,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error('Failed logging lead async:', err));
    } catch (e) {
      console.error('Async lead submit error:', e);
    }

    // Build the exact WhatsApp prefilled message as specified
    // "Hello FlowerDeliveryPK! My name is [Name] from [City]. I want to order [Product Title] for Rs. [Price]. Please share delivery availability."
    let message = `Hello FlowerDeliveryPK! My name is ${customerName.trim()} from ${finalCity}. I want to order ${productName}`;
    if (quantity > 1) {
      message += ` (Qty: ${quantity})`;
    }
    if (calculatedPrice) {
      message += ` for Rs. ${calculatedPrice.toLocaleString()}`;
    }
    message += `. Please share delivery availability.`;

    const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923200411680';
    const cleanNumber = rawPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    // Advance to step 2 briefly or open instantly
    setStep(2);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      // Reset & close after slight delay
      setTimeout(() => {
        onClose();
        setStep(1);
        setCustomerName('');
      }, 500);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#C5A880]/30 z-10 my-auto"
          >
            {/* Top Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-[#8B1538] via-[#C5A880] to-[#25D366]" />

            {/* Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-[#FAF7F2] to-white border-b border-gray-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center font-bold shadow-inner flex-shrink-0">
                  <MessageCircle className="w-6 h-6 fill-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1F1F] flex items-center gap-2">
                    Quick Details Before WhatsApp
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Connect directly with our flower delivery team
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6">
              {/* Product Info Card Preview */}
              <div className="mb-5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#C5A880]/20 flex items-center justify-between">
                <div className="space-y-0.5 max-w-[75%]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1538] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C5A880]" /> Selected Item
                  </span>
                  <h4 className="font-serif text-sm font-bold text-gray-800 truncate">
                    {productName}
                  </h4>
                </div>
                {price && (
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Total</span>
                    <span className="font-bold text-sm text-[#8B1538]">
                      Rs. {(price * quantity).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  {/* Customer Full Name */}
                  <div>
                    <label htmlFor={nameInputId} className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#8B1538]" /> Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={nameInputId}
                      aria-label="Your full name"
                      type="text"
                      required
                      placeholder="e.g. Ali Ahmed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all bg-white"
                    />
                  </div>

                  {/* Delivery City Dropdown */}
                  <div>
                    <label htmlFor={citySelectId} className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8B1538]" /> Delivery City <span className="text-red-500">*</span>
                    </label>
                    <select
                      id={citySelectId}
                      aria-label="Select delivery city"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all bg-white cursor-pointer"
                    >
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {deliveryCity === 'Other' && (
                    <div>
                      <label htmlFor={customCityInputId} className="sr-only">
                        Type your city name
                      </label>
                      <input
                        id={customCityInputId}
                        aria-label="Type your city name"
                        type="text"
                        placeholder="Type your city name"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-3 py-4 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting to WhatsApp...
                      </span>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 fill-white" />
                        <span>Continue to WhatsApp Chat</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-gray-400 mt-2">
                    🔒 Direct inquiry with official FlowerDeliveryPK WhatsApp team
                  </p>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-gray-800">
                    Opening WhatsApp...
                  </h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Your details are saved. Redirecting to our instant WhatsApp support window...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
