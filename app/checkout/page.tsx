'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getCheckoutWhatsAppLink } from '@/utils/whatsapp';
import { MessageCircle, ShieldCheck, Truck, CheckCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, totalItemsCount } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    city: 'Lahore',
    address: '',
    landmark: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTimeSlot: 'Afternoon (12 PM - 4 PM)',
    specialInstructions: ''
  });

  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const whatsappCheckoutUrl = getCheckoutWhatsAppLink(cart, grandTotal, formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappCheckoutUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-serif font-bold text-[#1E392A]">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/red-rose-bouquets" className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#1E392A] text-white text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Shop Flowers Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-[#D4AF37]/30 pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E392A]">Complete Your Order</h1>
        <p className="text-xs text-gray-500 mt-1">Fill in your delivery details below to finalize your order on WhatsApp</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1E392A] border-b pb-3">Delivery Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ali Ahmed"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  required
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="e.g. 0300-1234567"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Delivery City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Gujranwala">Gujranwala</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Other City in Pakistan">Other City in Pakistan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="e.g. Near Shaukat Khanum Hospital"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Complete Shipping Address *
              </label>
              <textarea
                name="address"
                required
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="House #, Street #, Sector/Phase, Colony"
                className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
              />
            </div>

            <h3 className="font-serif font-bold text-xl text-[#1E392A] border-b pb-3 pt-4">
              Schedule & Custom Note
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Preferred Delivery Date *
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  required
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Preferred Time Slot *
                </label>
                <select
                  name="deliveryTimeSlot"
                  value={formData.deliveryTimeSlot}
                  onChange={handleChange}
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                >
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                  <option value="Midnight (11:30 PM - 12:00 AM)">Midnight (11:30 PM - 12 AM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Greeting Card Message / Special Instructions
              </label>
              <textarea
                name="specialInstructions"
                rows={3}
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Write your custom birthday or anniversary note card message here..."
                className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#25D366] text-white font-bold text-base hover:bg-[#20bd5a] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                Place Order on WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#1E392A] border-b pb-4">
            Order Breakdown ({totalItemsCount} Items)
          </h3>

          <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                </div>
                <div className="flex-grow min-w-0 text-xs">
                  <p className="font-bold text-[#1E392A] truncate">{item.product.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-[#581825]">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#1E392A]">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-[#1E392A]">
                {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE Delivery</span> : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold text-[#581825]">
              <span>Grand Total:</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20 text-xs text-gray-600 space-y-2">
            <p className="font-bold text-[#1E392A] flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Easy 1-Click WhatsApp Order
            </p>
            <p className="text-gray-500 leading-relaxed">
              No online payment card needed. Your order details are sent straight to our WhatsApp manager for immediate verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
