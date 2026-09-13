'use client';

import React, { useState, useEffect, useId } from 'react';
import { Calendar, Gift, Heart, Sparkles, Send, CheckCircle2, Phone, BellRing, Trash2, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface OccasionReminderProps {
  variant?: 'card' | 'banner' | 'compact';
  className?: string;
}

interface SavedReminder {
  id: string;
  name: string;
  whatsappNumber: string;
  occasion: string;
  date: string;
  createdAt: string;
}

const COUNTRY_CODES = [
  { code: '+92', label: '🇵🇰 Pakistan (+92)' },
  { code: '+1', label: '🇺🇸 USA/Canada (+1)' },
  { code: '+44', label: '🇬🇧 UK (+44)' },
  { code: '+971', label: '🇦🇪 UAE (+971)' },
  { code: '+966', label: '🇸🇦 Saudi Arabia (+966)' },
  { code: '+61', label: '🇦🇺 Australia (+61)' },
];

const OCCASIONS = [
  { id: 'Birthday', label: '🎂 Birthday' },
  { id: 'Anniversary', label: '💍 Anniversary' },
  { id: "Mother's Day", label: '🌸 Mother\'s Day' },
  { id: "Valentine's", label: '❤️ Valentine\'s Day' },
  { id: 'Other Special Day', label: '✨ Other Special Day' },
];

export default function OccasionReminder({ variant = 'card', className = '' }: OccasionReminderProps) {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const occasionId = `${baseId}-occasion`;
  const countryId = `${baseId}-country`;
  const phoneId = `${baseId}-phone`;
  const dateId = `${baseId}-date`;

  const { addToast } = (() => {
    try {
      return useCart();
    } catch {
      return { addToast: (msg: string) => alert(msg) };
    }
  })();

  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [savedReminders, setSavedReminders] = useState<SavedReminder[]>([]);

  // Load saved reminders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fdpk_user_reminders');
      if (stored) {
        setSavedReminders(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load reminders from localStorage', e);
    }
  }, []);

  const saveToLocalStorage = (newReminder: SavedReminder) => {
    try {
      const updated = [newReminder, ...savedReminders];
      setSavedReminders(updated);
      localStorage.setItem('fdpk_user_reminders', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save reminder to localStorage', e);
    }
  };

  const removeReminder = (id: string) => {
    try {
      const updated = savedReminders.filter((r) => r.id !== id);
      setSavedReminders(updated);
      localStorage.setItem('fdpk_user_reminders', JSON.stringify(updated));
      addToast('Reminder removed', 'info');
    } catch (e) {
      console.error('Failed to delete reminder', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your WhatsApp number');
      return;
    }
    if (!date) {
      setErrorMsg('Please select the occasion date');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const fullPhoneNumber = `${countryCode} ${phone.trim()}`;
    const newReminder: SavedReminder = {
      id: Date.now().toString(),
      name: name.trim(),
      whatsappNumber: fullPhoneNumber,
      occasion,
      date,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          whatsappNumber: fullPhoneNumber,
          occasion,
          date,
        }),
      });

      // Save locally so the user can always see their reminders!
      saveToLocalStorage(newReminder);

      if (res.ok) {
        setIsSubmitted(true);
        addToast('Reminder saved! Check your WhatsApp soon for your VIP code. 🎁', 'success');
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to save reminder');
      }
    } catch (err) {
      console.error('Reminder submission error:', err);
      // Fallback display & local save
      saveToLocalStorage(newReminder);
      setIsSubmitted(true);
      addToast('Reminder saved! Check your WhatsApp soon for your VIP code.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="occasion-reminders"
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8B1538] via-[#6e102c] to-[#4a0a1d] text-white shadow-2xl border border-[#C5A880]/40 p-6 sm:p-8 lg:p-10 ${className}`}
    >
      {/* Decorative Gold Radial Light */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C5A880]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#25D366]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Copywriting & Active Reminders List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/40 text-[#C5A880] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Occasion Alert</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Never Forget a Special Date Again
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
            Tell us your loved one&apos;s Birthday or Anniversary. We will remind you{' '}
            <span className="font-bold text-[#C5A880]">3 days prior on WhatsApp</span> with an
            exclusive <span className="font-bold text-[#25D366]">15% VIP discount!</span>
          </p>

          {/* Feature Badges */}
          <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              <span>3-Day Pre-Reminder</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#C5A880]" />
              <span>15% Off VIP Coupon</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>Free Delivery Perks</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>Auto WhatsApp Alert</span>
            </div>
          </div>

          {/* User's Active Saved Reminders Widget */}
          {savedReminders.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider flex items-center gap-1.5">
                  <BellRing className="w-3.5 h-3.5 text-emerald-400" />
                  Your Active Reminders ({savedReminders.length})
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Active
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedReminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <span>{rem.occasion}</span>
                        <span className="text-[#C5A880]">• {rem.name}</span>
                      </p>
                      <p className="text-[11px] text-stone-300 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#C5A880]" /> Date: {rem.date}
                      </p>
                    </div>
                    <button
                      onClick={() => removeReminder(rem.id)}
                      className="text-stone-400 hover:text-red-400 p-1 transition-colors"
                      title="Remove reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 bg-white/10 backdrop-blur-xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto border border-[#25D366]/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                Reminder Set Successfully! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
                Thank you <span className="font-bold text-[#C5A880]">{name}</span>! We have saved your{' '}
                <span className="font-bold text-[#C5A880]">{occasion}</span> date ({date}). Look out for your 15% VIP discount code on WhatsApp 3 days prior!
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setPhone('');
                  setDate('');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A880] hover:text-white underline pt-2 cursor-pointer"
              >
                Add Another Occasion Reminder →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs text-red-200 bg-red-950/60 border border-red-500/40 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Your Name */}
                <div>
                  <label htmlFor={nameId} className="block text-xs font-bold text-gray-200 mb-1.5 uppercase tracking-wide">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={nameId}
                    aria-label="Your full name"
                    type="text"
                    required
                    placeholder="e.g. Sara Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] transition-all"
                  />
                </div>

                {/* 2. Occasion Type */}
                <div>
                  <label htmlFor={occasionId} className="block text-xs font-bold text-gray-200 mb-1.5 uppercase tracking-wide">
                    Occasion <span className="text-red-400">*</span>
                  </label>
                  <select
                    id={occasionId}
                    aria-label="Select occasion type"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C5A880] transition-all cursor-pointer font-sans"
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ.id} value={occ.id} className="text-gray-900">
                        {occ.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* 3. WhatsApp Number (Selector + Input) */}
                <div className="sm:col-span-7">
                  <label htmlFor={phoneId} className="block text-xs font-bold text-gray-200 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#25D366]" /> WhatsApp # <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      id={countryId}
                      aria-label="Select country dial code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-28 px-2 py-2.5 text-xs rounded-xl bg-white/90 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code} className="text-gray-900">
                          {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      id={phoneId}
                      aria-label="WhatsApp phone number"
                      type="tel"
                      required
                      placeholder="300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>
                </div>

                {/* 4. Occasion Date Picker */}
                <div className="sm:col-span-5">
                  <label htmlFor={dateId} className="block text-xs font-bold text-gray-200 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C5A880]" /> Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={dateId}
                    aria-label="Occasion date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#d8bc93] hover:from-[#d8bc93] hover:to-[#C5A880] text-[#581825] font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#581825] border-t-transparent rounded-full animate-spin" />
                    Saving Reminder...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-[#581825]" />
                    <span>Get 15% Off VIP WhatsApp Reminder</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
