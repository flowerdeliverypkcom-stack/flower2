'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getCartWhatsAppLink } from '@/utils/whatsapp';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, MessageCircle, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItemsCount } = useCart();

  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + deliveryFee;

  const cartWhatsappUrl = getCartWhatsAppLink(cart, subtotal);

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#FDF0ED] text-[#581825] flex items-center justify-center mx-auto text-4xl shadow-inner border border-[#D4AF37]/30">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#1E392A]">Your Shopping Cart is Empty</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          You haven&apos;t added any fresh flower bouquets or gift items to your cart yet. Explore our handcrafted collections!
        </p>
        <Link
          href="/red-rose-bouquets"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-[#1E392A] text-white font-bold text-sm hover:bg-[#14291E] transition-all shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Flower Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-[#D4AF37]/30 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E392A]">Shopping Cart</h1>
          <p className="text-xs text-gray-500 mt-1">Review your selected floral items before WhatsApp ordering</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 sm:p-6 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md flex flex-col sm:flex-row items-center gap-6 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#581825] font-bold">
                    {item.product.category}
                  </span>
                  <Link href={`/product/${item.product.slug}`} className="block font-serif font-bold text-lg text-[#1E392A] hover:text-[#581825]">
                    {item.product.name}
                  </Link>
                  <p className="text-sm font-bold text-[#581825] mt-1">
                    Rs. {item.product.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="flex items-center bg-[#FAF7F2] border border-gray-200 rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-[#1E392A]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-[#1E392A] block">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-between">
            <Link
              href="/red-rose-bouquets"
              className="text-xs font-bold text-[#1E392A] hover:text-[#581825] flex items-center gap-1"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#1E392A] border-b pb-4">Order Summary</h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items ({totalItemsCount}):</span>
              <span className="font-semibold text-[#1E392A]">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-[#1E392A]">
                {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE Delivery</span> : `Rs. ${deliveryFee}`}
              </span>
            </div>

            {subtotal < 5000 && (
              <p className="text-[11px] text-amber-700 bg-[#FDF0ED] p-2.5 rounded-xl border border-amber-200">
                Add Rs. {(5000 - subtotal).toLocaleString()} more to unlock <strong>FREE Delivery</strong> across Pakistan!
              </p>
            )}

            <div className="flex justify-between border-t pt-4 text-lg font-bold text-[#581825]">
              <span>Total:</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/checkout"
              className="w-full py-4 px-6 rounded-full bg-[#1E392A] text-white hover:bg-[#14291E] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </Link>

            <a
              href={cartWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" /> Order Cart on WhatsApp
            </a>
          </div>

          <div className="pt-4 border-t text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#581825]" />
              <span>Same-Day Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#581825]" />
              <span>Direct Bank Transfer / JazzCash / EasyPaisa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
