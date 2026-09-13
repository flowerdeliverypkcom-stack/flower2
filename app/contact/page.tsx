'use client';

import React, { useState } from 'react';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#581825] font-bold block">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E392A]">
          Contact FlowerDeliveryPK.com
        </h1>
        <p className="text-sm text-gray-600">
          Our customer support team is available 24/7 on WhatsApp to assist with orders, customization, and city delivery queries.
        </p>
        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-8">
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#1E392A] mb-4">Direct Contact Info</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              For instant response and order dispatch, we recommend contacting us directly on WhatsApp.
            </p>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF0ED] border border-[#D4AF37]/30">
                <div className="p-3 rounded-full bg-[#25D366] text-white flex-shrink-0">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-bold">WhatsApp Order Line</span>
                  <a
                    href={WHATSAPP_BASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1E392A] hover:underline"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-gray-200">
                <div className="p-3 rounded-full bg-[#1E392A] text-[#D4AF37] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-bold">Phone Support</span>
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="font-bold text-[#1E392A] hover:underline">
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-gray-200">
                <div className="p-3 rounded-full bg-[#581825] text-white flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-bold">Email Care Desk</span>
                  <span className="font-bold text-[#1E392A]">support@flowerdeliverypk.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-gray-200">
                <div className="p-3 rounded-full bg-[#1E392A] text-[#D4AF37] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-bold">Main Floral Dispatch Hub</span>
                  <span className="font-semibold text-[#1E392A]">Gulberg III & DHA Phase 5, Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#1E392A] uppercase tracking-wider mb-2">
              Primary Delivery Cities:
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full">Lahore</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Karachi</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Islamabad</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Rawalpindi</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Faisalabad</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Multan</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Peshawar</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Gujranwala</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Sialkot</span>
            </div>
          </div>

          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-white" /> Chat on WhatsApp Now
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-6">
          <h3 className="font-serif font-bold text-2xl text-[#1E392A]">Send Us a Message</h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-emerald-900">Message Received!</h4>
              <p className="text-xs text-emerald-800">
                Thank you for contacting FlowerDeliveryPK.com. Our support team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 0320-1234567"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Message / Special Request *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with your flower order?"
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#581825]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#1E392A] text-white hover:bg-[#14291E] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}

          {/* Google Maps Placeholder */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
              Lahore Dispatch Office Map:
            </h4>
            <div className="w-full h-40 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500 overflow-hidden relative">
              <iframe
                title="FlowerDeliveryPK Lahore Hub Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54406.87948332152!2d74.31418290000001!3d31.5203696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sGulberg%20III%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
