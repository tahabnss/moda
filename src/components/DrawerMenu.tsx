/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
  onSelectCategory: (catId: string) => void;
}

export default function DrawerMenu({
  isOpen,
  onClose,
  isArabic,
  setIsArabic,
  onSelectCategory,
}: DrawerMenuProps) {
  const collections = [
    { id: "dresses", ar: "فساتين السهرة الحريرية", en: "Evening Silk Dresses", icon: "female" },
    { id: "bags", ar: "حقائب جلدية كلاسيكية", en: "Classic Leather Bags", icon: "work" },
    { id: "watches", ar: "ساعات وكماليات فاخرة", en: "Luxury Watches & Accs", icon: "watch" },
    { id: "jewelry", ar: "مجوهرات وألماس ملكي", en: "Royal Jewelry & Diamonds", icon: "diamond" },
  ];

  const handleCollectionClick = (id: string) => {
    onSelectCategory(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-tajawal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Slide container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="w-80 bg-surface dark:bg-neutral-900 border-r border-outline-variant/60 dark:border-neutral-800 p-6 flex flex-col h-full shadow-2xl text-right"
            >
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-outline-variant/50">
                <button
                  onClick={onClose}
                  className="text-on-surface dark:text-neutral-400 hover:text-brand-gold"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
                <h2 className="font-cairo text-lg font-black text-brand-primary dark:text-white">
                  {isArabic ? "المجموعات الحصرية" : "Collections"}
                </h2>
              </div>

              {/* Collections Links */}
              <nav className="space-y-2 flex-1">
                {collections.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleCollectionClick(col.id)}
                    className="w-full flex items-center justify-between p-4 font-bold text-xs uppercase tracking-wider text-on-surface dark:text-neutral-300 hover:bg-surface-container dark:hover:bg-neutral-800 transition-colors rounded-none text-right cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-brand-gold text-lg">
                      arrow_back
                    </span>
                    <div className="flex items-center gap-4">
                      <span>{isArabic ? col.ar : col.en}</span>
                      <span className="material-symbols-outlined text-neutral-400">
                        {col.icon}
                      </span>
                    </div>
                  </button>
                ))}

                <button
                  onClick={() => {
                    setIsArabic(!isArabic);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-4 font-bold text-xs uppercase tracking-wider bg-brand-gold/15 text-brand-gold hover:bg-brand-gold/25 transition-colors rounded-none text-right cursor-pointer mt-4"
                >
                  <span className="material-symbols-outlined text-lg">translate</span>
                  <div className="flex items-center gap-4">
                    <span>{isArabic ? "English (EN)" : "العربية (AR)"}</span>
                    <span className="material-symbols-outlined text-brand-gold">language</span>
                  </div>
                </button>
              </nav>

              {/* Customer support guidelines */}
              <div className="pt-8 border-t border-outline-variant dark:border-neutral-800">
                <p className="text-[11px] font-bold text-brand-gold tracking-[0.15em] mb-4 uppercase">
                  {isArabic ? "خدمة العملاء" : "CUSTOMER SERVICE"}
                </p>
                <div className="space-y-3 text-sm">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block text-neutral-500 hover:text-brand-gold transition-colors"
                  >
                    {isArabic ? "الشحن والتوصيل المجاني" : "Free Shipping & Delivery"}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block text-neutral-500 hover:text-brand-gold transition-colors"
                  >
                    {isArabic ? "سياسة الاسترجاع المرنة" : "Flexible Returns Policy"}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block text-neutral-500 hover:text-brand-gold transition-colors"
                  >
                    {isArabic ? "تواصل معنا" : "Contact Us"}
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
