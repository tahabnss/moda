/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onWishlistClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({
  cartCount,
  onCartClick,
  onMenuClick,
  onWishlistClick,
  searchQuery,
  onSearchChange,
  isArabic,
  setIsArabic,
  darkMode,
  toggleDarkMode,
}: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-outline-variant dark:border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Right Section (or Left depending on RTL): Menu and Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            id="nav-menu-btn"
            onClick={onMenuClick}
            className="text-on-surface dark:text-white p-2 hover:bg-surface-container dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Open Menu"
          >
            <span className="material-symbols-outlined align-middle">menu</span>
          </button>
          
          <button
            id="lang-toggle-btn"
            onClick={() => setIsArabic(!isArabic)}
            className="font-cairo font-bold text-xs px-2 py-1 border border-outline hover:border-brand-gold hover:text-brand-gold dark:text-neutral-300 transition-all uppercase rounded-none"
          >
            {isArabic ? "EN" : "عربي"}
          </button>
        </div>

        {/* Center Section: Logo */}
        <div className="flex flex-col items-center">
          <h1 className="font-cairo text-2xl sm:text-3xl font-extrabold tracking-widest text-brand-primary dark:text-white select-none">
            {isArabic ? "مـودا" : "MODA"}
          </h1>
          <span className="text-[9px] font-tajawal tracking-[0.2em] uppercase text-brand-secondary dark:text-brand-gold leading-none">
            {isArabic ? "ستور الفخامة" : "STORE LUXURY"}
          </span>
        </div>

        {/* Left Section (or Right depending on RTL): Dark Mode, Search, Wishlist, Cart */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            id="dark-mode-toggle"
            onClick={toggleDarkMode}
            className="text-on-surface dark:text-white p-2 hover:bg-surface-container dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined align-middle">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button
            id="search-toggle-btn"
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 transition-colors cursor-pointer ${
              showSearch 
                ? "text-brand-gold hover:bg-surface-container-low" 
                : "text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-neutral-800"
            }`}
            aria-label="Search"
          >
            <span className="material-symbols-outlined align-middle">search</span>
          </button>

          <button
            id="wishlist-btn"
            onClick={onWishlistClick}
            className="text-on-surface dark:text-white p-2 hover:bg-surface-container dark:hover:bg-neutral-800 transition-colors cursor-pointer relative"
            aria-label="Wishlist"
          >
            <span className="material-symbols-outlined align-middle">favorite</span>
          </button>

          <button
            id="cart-btn"
            onClick={onCartClick}
            className="text-on-surface dark:text-white p-2 hover:bg-surface-container dark:hover:bg-neutral-800 transition-colors cursor-pointer relative"
            aria-label="Shopping Bag"
          >
            <span className="material-symbols-outlined align-middle">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Dynamic Search Area */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-surface-container-low dark:bg-neutral-800/90 border-t border-outline-variant dark:border-neutral-800"
          >
            <div className="max-w-4xl mx-auto p-4 flex gap-2">
              <div className="relative flex-1">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined">
                  search
                </span>
                <input
                  type="text"
                  placeholder={isArabic ? "ابحث عن الفساتين، الحقائب، الأحذية..." : "Search dresses, bags, shoes..."}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 bg-white dark:bg-neutral-900 border border-outline focus:border-brand-gold dark:focus:border-brand-gold text-on-surface dark:text-white placeholder:text-outline-variant outline-none rounded-none text-sm font-tajawal"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-outline hover:text-brand-primary"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  onSearchChange("");
                }}
                className="px-4 py-2 border border-outline text-xs uppercase font-bold text-on-surface dark:text-white hover:bg-surface dark:hover:bg-neutral-900 rounded-none transition-all"
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
