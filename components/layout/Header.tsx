'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import AnnouncementBar from './AnnouncementBar';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { OCCASIONS } from '@/data/occasions';
import { CITIES } from '@/data/cities';

export default function Header() {
  const { totalItemsCount, wishlist, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 0. Top Luxury Rotating Announcement Ribbon */}
      <AnnouncementBar />

      {/* 1. Main Sticky Luxury Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#C5A880]/30'
            : 'bg-[#FAFAFA]/95 backdrop-blur-sm py-3 border-b border-[#C5A880]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 lg:gap-4">
          {/* Left: Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#8B1538] hover:text-[#748B75] transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="group flex items-center flex-shrink-0">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#8B1538] group-hover:text-[#748B75] transition-colors leading-none">
                FlowerDelivery<span className="text-[#748B75]">PK</span>
                <span className="text-[#C5A880] text-base lg:text-lg font-serif">.com</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-xs xl:text-sm font-semibold text-[#8B1538] flex-shrink min-w-0">
            {/* Flowers Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown('flowers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/red-rose-bouquets"
                className="flex items-center gap-0.5 hover:text-[#748B75] transition-colors whitespace-nowrap"
              >
                <span>Flowers</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
              {activeDropdown === 'flowers' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#C5A880]/30 p-3 grid grid-cols-1 gap-1 z-50">
                  {CATEGORIES.filter((c) => c.group === 'flowers').map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className="px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#FAFAFA] hover:text-[#8B1538] rounded-xl transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Bouquets */}
            <Link href="/mixed-flower-bouquets" className="hover:text-[#748B75] transition-colors whitespace-nowrap">
              Bouquets
            </Link>

            {/* Gifts */}
            <Link href="/gift-boxes" className="hover:text-[#748B75] transition-colors whitespace-nowrap">
              Gifts
            </Link>

            {/* Cakes & Chocolates */}
            <Link href="/cake-and-flower-combos" className="hover:text-[#748B75] transition-colors whitespace-nowrap">
              Cakes
            </Link>

            {/* Occasions Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown('occasions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/birthday-flowers" className="flex items-center gap-0.5 hover:text-[#748B75] transition-colors whitespace-nowrap">
                <span>Occasions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
              {activeDropdown === 'occasions' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#C5A880]/30 p-3 grid grid-cols-1 gap-1 z-50">
                  {OCCASIONS.map((occ) => (
                    <Link
                      key={occ.slug}
                      href={`/${occ.slug}`}
                      className="px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#FAFAFA] hover:text-[#8B1538] rounded-xl transition-colors"
                    >
                      {occ.name} Flowers
                    </Link>
                  ))}
                  <div className="pt-1 mt-1 border-t border-gray-100">
                    <Link
                      href="/#occasion-reminders"
                      className="px-3 py-2 text-xs font-bold text-[#8B1538] bg-[#FAF7F2] hover:bg-[#8B1538] hover:text-white rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>📅 Set Date Reminder (15% Off)</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Same Day Delivery */}
            <Link
              href="/same-day-flower-delivery"
              className="text-[#748B75] font-bold hover:text-[#8B1538] transition-colors flex items-center gap-1 whitespace-nowrap bg-[#748B75]/10 px-2 py-0.5 rounded-full border border-[#748B75]/30 text-[11px] xl:text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Same Day</span>
            </Link>

            {/* By City Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown('cities')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/flower-delivery-lahore" className="flex items-center gap-0.5 hover:text-[#748B75] transition-colors whitespace-nowrap">
                <span>By City</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
              {activeDropdown === 'cities' && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-[#C5A880]/30 p-3 grid grid-cols-1 gap-1 z-50">
                  {CITIES.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#FAFAFA] hover:text-[#8B1538] rounded-xl transition-colors"
                    >
                      Flowers to {city.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog */}
            <Link href="/blog" className="hover:text-[#748B75] transition-colors whitespace-nowrap">
              Blog
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-[#8B1538] transition-colors flex items-center justify-center flex-shrink-0"
              title="Search Flowers"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-[#8B1538] transition-colors hidden sm:flex items-center justify-center flex-shrink-0"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#8B1538] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-[#8B1538] transition-colors flex items-center justify-center flex-shrink-0"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#8B1538] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* WhatsApp VIP Concierge Button */}
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-full bg-[#075E54] hover:bg-[#054c44] text-white font-medium text-xs transition-all shadow-sm hover:shadow-md border border-emerald-400/30 flex-shrink-0 whitespace-nowrap group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
              </span>
              <MessageCircle className="w-3.5 h-3.5 fill-white flex-shrink-0" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#C5A880]/30 shadow-xl px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="font-serif font-bold text-[#8B1538] text-lg">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-black">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 font-medium text-sm text-[#8B1538]">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              Home
            </Link>

            <div className="py-2 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider text-[#8B1538] font-bold block mb-2">Flowers</span>
              <div className="pl-3 space-y-2 text-xs">
                {CATEGORIES.filter((c) => c.group === 'flowers').map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-[#8B1538]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider text-[#8B1538] font-bold block mb-2">Shop By Occasion</span>
              <div className="pl-3 grid grid-cols-2 gap-2 text-xs">
                {OCCASIONS.map((occ) => (
                  <Link
                    key={occ.slug}
                    href={`/${occ.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-[#8B1538]"
                  >
                    {occ.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider text-[#8B1538] font-bold block mb-2">City Delivery</span>
              <div className="pl-3 grid grid-cols-2 gap-2 text-xs">
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-[#8B1538]"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/same-day-flower-delivery" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-100 text-[#748B75] font-bold">
              Same Day Delivery
            </Link>

            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              Blog & Flower Guides
            </Link>

            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              About Us
            </Link>

            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2">
              Contact Support
            </Link>
          </nav>

          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-lg mt-4"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            Order via WhatsApp ({WHATSAPP_NUMBER})
          </a>
        </div>
      )}
    </header>
  );
}
