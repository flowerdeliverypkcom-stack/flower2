'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER, WHATSAPP_CHANNEL_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/utils/whatsapp';
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
  ExternalLink,
} from 'lucide-react';
import { Instagram } from '@/components/icons/InstagramIcon';
import { MapPin, Globe, Video } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const localCities = CITIES.filter(
    (c) => !c.slug.startsWith('send-flowers-to-pakistan-') && c.slug !== 'flowers-to-usa-overseas'
  );
  const overseasCorridors = CITIES.filter(
    (c) => c.slug.startsWith('send-flowers-to-pakistan-') || c.slug === 'flowers-to-usa-overseas'
  );

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 0. Rotating Top Announcement Ribbon */}
      <AnnouncementBar />

      {/* 1. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-[#C5A880]/30'
            : 'bg-[#FAFAFA]/95 backdrop-blur-sm py-2.5 sm:py-3 border-b border-[#C5A880]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 lg:gap-3">
          {/* Left: Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#8B1538] hover:text-[#748B75] hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <Link href="/" className="group flex items-center flex-shrink-0">
              <span className="font-serif text-lg xs:text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-[#8B1538] group-hover:text-[#748B75] transition-colors leading-none">
                FlowerDelivery<span className="text-[#748B75]">PK</span>
                <span className="text-[#C5A880] text-sm sm:text-base font-serif">.com</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Visible on lg and up) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[12px] xl:text-[13px] font-semibold text-[#8B1538] flex-shrink min-w-0">
            {/* 1. Flowers Mega Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setActiveDropdown('flowers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/red-rose-bouquets"
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-[#748B75] hover:bg-stone-100/60 transition-colors whitespace-nowrap"
              >
                <span>Flowers</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              {activeDropdown === 'flowers' && (
                <div className="absolute top-full left-0 mt-1 w-[420px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C5A880]/30 p-4 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1538] block mb-2 px-2">
                        Fresh Bouquets
                      </span>
                      <div className="space-y-0.5">
                        {CATEGORIES.filter(
                          (c) => c.group === 'flowers' && !['budget-bouquets', 'floral-jewelry'].includes(c.slug)
                        ).map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/${cat.slug}`}
                            className="px-2.5 py-1.5 text-xs text-stone-700 hover:text-[#8B1538] hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-between"
                          >
                            <span>{cat.name}</span>
                            <span className="text-[10px] text-stone-400">({cat.itemCount})</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="border-l border-stone-100 pl-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1538] block mb-2 px-1">
                        Specialty &amp; Bridal
                      </span>
                      <div className="space-y-1">
                        <Link
                          href="/budget-bouquets"
                          className="p-2 text-xs bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 font-semibold rounded-xl transition-colors block border border-amber-200/50"
                        >
                          <div className="flex items-center justify-between">
                            <span>Budget Bouquets</span>
                            <span className="text-[9px] bg-amber-200 text-amber-950 px-1 rounded font-bold">Under Rs.2,999</span>
                          </div>
                          <span className="text-[10px] text-stone-500 font-normal block mt-0.5">Pocket-friendly fresh blooms</span>
                        </Link>

                        <Link
                          href="/floral-jewelry"
                          className="p-2 text-xs bg-rose-50/70 hover:bg-rose-100/70 text-rose-950 font-semibold rounded-xl transition-colors block border border-rose-200/50"
                        >
                          <div className="flex items-center justify-between">
                            <span>Floral Jewelry &amp; Gajray</span>
                            <span className="text-[9px] bg-rose-200 text-rose-950 px-1 rounded font-bold">Bridal</span>
                          </div>
                          <span className="text-[10px] text-stone-500 font-normal block mt-0.5">Fresh Motia &amp; Rose Petal Sets</span>
                        </Link>

                        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 mt-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B1538]">
                            <Video className="w-3.5 h-3.5 text-[#25D366]" /> Live Video Proof
                          </div>
                          <p className="text-[10px] text-stone-600 leading-tight mt-1">
                            HD WhatsApp video recorded in studio before courier dispatch.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Cakes & Gifts Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setActiveDropdown('gifts')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/cake-and-flower-combos"
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-[#748B75] hover:bg-stone-100/60 transition-colors whitespace-nowrap"
              >
                <span>Cakes &amp; Gifts</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              {activeDropdown === 'gifts' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C5A880]/30 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1538] block mb-2 px-2">
                    Gifts, Cakes &amp; Hampers
                  </span>
                  <div className="space-y-0.5">
                    {CATEGORIES.filter((c) => c.group === 'gifts' || c.group === 'cakes').map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/${cat.slug}`}
                        className="px-2.5 py-1.5 text-xs text-stone-700 hover:text-[#8B1538] hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-stone-400">({cat.itemCount})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Event & Wedding Decor Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setActiveDropdown('decor')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/wedding-decor"
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-[#748B75] hover:bg-stone-100/60 transition-colors whitespace-nowrap"
              >
                <span>Event Decor</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              {activeDropdown === 'decor' && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C5A880]/30 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1538] block mb-2 px-2">
                    On-Site Floral Styling
                  </span>
                  <div className="space-y-1">
                    {CATEGORIES.filter((c) => c.group === 'decor').map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/${cat.slug}`}
                        className="px-2.5 py-2 text-xs text-stone-800 hover:text-[#8B1538] hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-between border border-transparent hover:border-[#C5A880]/20"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-bold">On-Site</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-100">
                    <a
                      href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Hi! I want to consult for event floral decoration.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center block text-[11px] font-bold text-white bg-[#25D366] hover:bg-[#1faa53] py-2 rounded-xl transition-colors"
                    >
                      Book Free Decor Consultation
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Occasions Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setActiveDropdown('occasions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/birthday-flowers"
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-[#748B75] hover:bg-stone-100/60 transition-colors whitespace-nowrap"
              >
                <span>Occasions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              {activeDropdown === 'occasions' && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C5A880]/30 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1538] block mb-2 px-2">
                    Shop by Milestone
                  </span>
                  <div className="space-y-0.5">
                    {OCCASIONS.map((occ) => (
                      <Link
                        key={occ.slug}
                        href={`/${occ.slug}`}
                        className="px-2.5 py-1.5 text-xs text-stone-700 hover:text-[#8B1538] hover:bg-stone-50 rounded-lg transition-colors block"
                      >
                        {occ.name} Flowers
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 mt-2 border-t border-stone-100">
                    <Link
                      href="/#occasion-reminders"
                      className="px-2.5 py-2 text-[11px] font-bold text-[#8B1538] bg-[#FAF7F2] hover:bg-[#8B1538] hover:text-white rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#C5A880]" />
                      <span>📅 Date Reminder (15% Off)</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 5. By City Dropdown (2-column layout to save vertical space) */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setActiveDropdown('cities')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/flower-delivery-lahore"
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-[#748B75] hover:bg-stone-100/60 transition-colors whitespace-nowrap"
              >
                <span>Cities</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              {activeDropdown === 'cities' && (
                <div className="absolute top-full left-0 mt-1 w-[380px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C5A880]/30 p-4 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1538] block mb-2 px-1">
                    2–3 Hours Express Delivery Zones
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    {localCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className="px-2.5 py-1.5 text-xs text-stone-700 hover:text-[#8B1538] hover:bg-stone-50 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <MapPin className="w-3 h-3 text-[#C5A880] flex-shrink-0" />
                        <span className="truncate">{city.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>⚡ Chilled Express Vans</span>
                    <span className="text-emerald-700 font-bold">Same-Day Available</span>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Send from Overseas Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => setActiveDropdown('overseas')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/send-flowers-to-pakistan-from-uk"
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-emerald-800 hover:text-[#8B1538] hover:bg-emerald-50/60 font-bold transition-colors whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Overseas</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              {activeDropdown === 'overseas' && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C5A880]/30 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 block mb-2 px-2">
                    Send to Pakistan (GBP / USD / AED)
                  </span>
                  <div className="space-y-1">
                    {overseasCorridors.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className="px-2.5 py-2 text-xs text-stone-800 hover:text-[#8B1538] hover:bg-stone-50 rounded-xl transition-colors flex items-center justify-between border border-transparent hover:border-emerald-200"
                      >
                        <span className="font-semibold">{city.name}</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Wise/Cards</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 p-2 rounded-xl bg-emerald-50/60 text-[10px] text-emerald-900 leading-tight">
                    Pay securely in foreign currency. Live video proof sent before dispatch.
                  </div>
                </div>
              )}
            </div>

            {/* 7. Same Day Delivery Highlight Badge */}
            <Link
              href="/same-day-flower-delivery"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#748B75]/10 hover:bg-[#748B75]/20 text-[#748B75] hover:text-[#8B1538] border border-[#748B75]/30 text-[11px] font-bold transition-colors whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Same Day</span>
            </Link>
          </nav>

          {/* Right: Actions Toolbar */}
          <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 flex-shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-stone-100 text-[#8B1538] transition-colors flex items-center justify-center flex-shrink-0"
              title="Search Catalog"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-stone-100 text-[#8B1538] transition-colors hidden sm:flex items-center justify-center flex-shrink-0"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#8B1538] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-stone-100 text-[#8B1538] transition-colors flex items-center justify-center flex-shrink-0"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#8B1538] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Instagram Link (Hidden on smallest mobile) */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-pink-50 text-[#8B1538] hover:text-pink-600 transition-colors hidden md:flex items-center justify-center flex-shrink-0"
              title={`Follow @${INSTAGRAM_HANDLE} on Instagram`}
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* Compact WhatsApp Order CTA */}
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-full bg-[#25D366] hover:bg-[#1faa53] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex-shrink-0 whitespace-nowrap"
              title={`WhatsApp: ${WHATSAPP_NUMBER}`}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white flex-shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="hidden xl:inline">Order</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Mobile Navigation Drawer (Clean, Structured & Scrollable) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-[#C5A880]/30 shadow-2xl px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-top duration-200">
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="font-serif font-bold text-[#8B1538] text-lg">Menu &amp; Categories</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-stone-500 hover:text-black rounded-lg hover:bg-stone-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Trigger Inside Drawer */}
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="cursor-pointer p-2.5 rounded-xl bg-stone-100/80 hover:bg-stone-200/80 text-stone-500 text-xs flex items-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4 text-[#8B1538]" />
            <span>Search bouquets, roses, cakes, gifts...</span>
          </div>

          <nav className="flex flex-col gap-3 font-medium text-sm text-[#8B1538]">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Home</span>
              <span className="text-xs text-stone-400">Main</span>
            </Link>

            {/* Flowers Section */}
            <div className="py-2 border-b border-stone-100">
              <span className="text-[11px] uppercase tracking-wider text-[#8B1538] font-bold block mb-2">
                Fresh Flowers &amp; Bouquets
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {CATEGORIES.filter((c) => c.group === 'flowers').map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-stone-50 text-stone-700 hover:text-[#8B1538] hover:bg-stone-100 truncate"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cakes & Gifts Section */}
            <div className="py-2 border-b border-stone-100">
              <span className="text-[11px] uppercase tracking-wider text-[#8B1538] font-bold block mb-2">
                Cakes, Hampers &amp; Gifts
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {CATEGORIES.filter((c) => c.group === 'gifts' || c.group === 'cakes').map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-stone-50 text-stone-700 hover:text-[#8B1538] hover:bg-stone-100 truncate"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Event & Wedding Decor */}
            <div className="py-2 border-b border-stone-100">
              <span className="text-[11px] uppercase tracking-wider text-[#8B1538] font-bold block mb-2">
                Event &amp; Wedding Decor
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {CATEGORIES.filter((c) => c.group === 'decor').map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-amber-50/60 text-amber-950 font-medium hover:bg-amber-100/60 truncate"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Deliver to City */}
            <div className="py-2 border-b border-stone-100">
              <span className="text-[11px] uppercase tracking-wider text-[#8B1538] font-bold block mb-2">
                Express Delivery Cities
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {localCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-stone-50 text-stone-700 hover:text-[#8B1538] hover:bg-stone-100 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    <span className="truncate">{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Send from Overseas Card */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-emerald-900 font-bold block">
                ✈️ Send from Overseas (UK, USA, UAE)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {overseasCorridors.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-white text-emerald-900 font-semibold hover:text-[#8B1538] shadow-xs truncate"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Occasions */}
            <div className="py-2 border-b border-stone-100">
              <span className="text-[11px] uppercase tracking-wider text-[#8B1538] font-bold block mb-2">
                Occasions
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {OCCASIONS.map((occ) => (
                  <Link
                    key={occ.slug}
                    href={`/${occ.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-stone-700 hover:text-[#8B1538]"
                  >
                    {occ.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold py-1">
              <Link
                href="/same-day-flower-delivery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#748B75] flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>Same Day 2–3h</span>
              </Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-700 hover:text-[#8B1538]">
                Flower Guides &amp; Blog
              </Link>
            </div>
          </nav>

          {/* Social Channels & WhatsApp Support */}
          <div className="pt-3 space-y-2 border-t border-stone-100">
            {/* Instagram Profile */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-gradient-to-r from-[#833ab4] via-[#dc2743] to-[#f09433] text-white font-bold text-xs rounded-xl flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-white" />
                <span>Instagram: @{INSTAGRAM_HANDLE}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* WhatsApp VIP Channel */}
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-[#075E54] text-white font-bold text-xs rounded-xl flex items-center justify-between shadow-sm border border-emerald-400/30"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>VIP WhatsApp Channel (20% Off)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* WhatsApp Direct Chat Order */}
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp ({WHATSAPP_NUMBER})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
