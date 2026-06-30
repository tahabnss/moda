/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from "react";

interface FooterProps {
  isArabic: boolean;
}

export default function Footer({ isArabic }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 2500);
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-neutral-950 border-t border-outline-variant dark:border-neutral-800 py-12 px-4 sm:px-6 lg:px-8 mt-12 text-right font-tajawal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {/* Newsletter Column */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="font-cairo text-lg font-black text-brand-primary dark:text-white">
            {isArabic ? "انضم إلى عالمنا" : "Join Our Newsletter"}
          </h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {isArabic
              ? "احصل على آخر التحديثات والعروض الحصرية مباشرة في بريدك الإلكتروني."
              : "Receive immediate updates and exclusive offers directly in your inbox."}
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <button
              type="submit"
              className="bg-brand-primary dark:bg-brand-gold hover:bg-brand-gold text-white font-extrabold text-xs uppercase px-6 py-3 tracking-wider rounded-none transition-colors shrink-0 cursor-pointer"
            >
              {isArabic ? "اشتراك" : "Subscribe"}
            </button>
            <input
              type="email"
              required
              placeholder={isArabic ? "البريد الإلكتروني" : "Email address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-right pr-4 pl-4 py-3 border border-outline bg-transparent dark:text-white focus:border-brand-gold placeholder:text-neutral-400 outline-none rounded-none text-xs"
            />
          </form>
          {subscribed && (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {isArabic ? "شكرًا لاشتراكك في مجلة مودا الحصرية!" : "Thank you for joining MODA boutique!"}
            </p>
          )}
        </div>

        {/* Navigation links Columns */}
        <div className="grid grid-cols-2 gap-8 md:col-span-2">
          {/* Support */}
          <div className="space-y-4">
            <h5 className="font-cairo text-sm font-bold text-brand-gold uppercase tracking-wider">
              {isArabic ? "خدمة العملاء" : "Customer Support"}
            </h5>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "تتبع طلبك" : "Track Order"}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "الشحن والتوصيل" : "Shipping & Delivery"}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "سياسة الاسترجاع" : "Returns Policy"}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "الأسئلة الشائعة" : "FAQs"}
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h5 className="font-cairo text-sm font-bold text-brand-gold uppercase tracking-wider">
              {isArabic ? "عن مودا" : "About MODA"}
            </h5>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "قصتنا وعالمنا" : "Our Story"}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "الوظائف والفرص" : "Careers"}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "فروعنا وصالات العرض" : "Boutique Locations"}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">
                  {isArabic ? "الاستدامة والبيئة" : "Sustainability"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand values and social handles */}
      <div className="border-t border-outline-variant/60 dark:border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex gap-6 text-neutral-400 dark:text-neutral-500">
          <span className="material-symbols-outlined cursor-pointer hover:text-brand-gold transition-colors" title="Instagram">
            photo_camera
          </span>
          <span className="material-symbols-outlined cursor-pointer hover:text-brand-gold transition-colors" title="Facebook">
            share
          </span>
          <span className="material-symbols-outlined cursor-pointer hover:text-brand-gold transition-colors" title="Pinterest">
            face_nod
          </span>
        </div>

        <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} MODA STORE. {isArabic ? "جميع الحقوق محفوظة لشركة مودا." : "All Rights Reserved."}
        </p>
      </div>
    </footer>
  );
}
