/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Product, CartItem } from "./types";
import { CATEGORIES, PRODUCTS } from "./data";

// Component imports
import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import DrawerMenu from "./components/DrawerMenu";
import Footer from "./components/Footer";

export default function App() {
  // Localization state (RTL for Arabic is default)
  const [isArabic, setIsArabic] = useState<boolean>(true);

  // Styling theme state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Menu, Cart, Wishlist Drawers & Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Core app filters and selectors
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOnlyWishlist, setShowOnlyWishlist] = useState<boolean>(false);

  // Persistent States
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("moda_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("moda_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Account demo data states
  const [emailInput, setEmailInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Toast notification alerts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs for navigation scrolling
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // Sync dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Sync RTL/LTR attributes based on language selection
  useEffect(() => {
    const html = document.documentElement;
    if (isArabic) {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    }
  }, [isArabic]);

  // Save Cart and Wishlist state to storage on every state edit
  useEffect(() => {
    localStorage.setItem("moda_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("moda_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Alert handler
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Helper selectors
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleToggleWishlist = (productId: string) => {
    const item = PRODUCTS.find((p) => p.id === productId);
    if (!item) return;

    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      triggerToast(
        isArabic
          ? `تمت إزالة ${item.title.ar} من قائمة الأمنيات`
          : `Removed ${item.title.en} from wishlist`
      );
    } else {
      setWishlist((prev) => [...prev, productId]);
      triggerToast(
        isArabic
          ? `تمت إضافة ${item.title.ar} إلى قائمة الأمنيات`
          : `Added ${item.title.en} to wishlist`
      );
    }
  };

  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    const itemId = `${product.id}-${size}`;
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === itemId);
      if (exists) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { id: itemId, product, quantity, selectedSize: size }];
      }
    });

    triggerToast(
      isArabic
        ? `تم إضافة ${product.title.ar} (مقاس: ${size}) بسلتك!`
        : `Added ${product.title.en} (Size: ${size}) to cart!`
    );
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((ci) => ci.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      triggerToast(
        isArabic
          ? `تمت إزالة ${item.product.title.ar} من السلة`
          : `Removed ${item.product.title.en} from cart`
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsLoggedIn(true);
      setUserEmail(emailInput);
      triggerToast(isArabic ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
      setIsAccountOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setEmailInput("");
    triggerToast(isArabic ? "تم تسجيل الخروج" : "Logged out successfully");
  };

  // Scroll to store section helper
  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filters calculation
  const filteredProducts = PRODUCTS.filter((prod) => {
    // 1. Wishlist filter
    if (showOnlyWishlist && !wishlist.includes(prod.id)) {
      return false;
    }
    // 2. Category selection
    if (selectedCategoryId !== "all" && prod.categoryId !== selectedCategoryId) {
      return false;
    }
    // 3. Search query
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      const matchAr = prod.title.ar.toLowerCase().includes(normalizedQuery) || 
                      prod.description.ar.toLowerCase().includes(normalizedQuery);
      const matchEn = prod.title.en.toLowerCase().includes(normalizedQuery) || 
                      prod.description.en.toLowerCase().includes(normalizedQuery);
      return matchAr || matchEn;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-surface dark:bg-neutral-900 transition-colors duration-300 pb-24 font-tajawal">
      {/* Premium Alert Toaster */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-900 font-bold px-6 py-3.5 shadow-xl text-center text-xs tracking-wide rounded-none border border-brand-gold/50 flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-brand-gold text-lg">
              info
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation bar */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
        onWishlistClick={() => {
          setShowOnlyWishlist(!showOnlyWishlist);
          scrollToProducts();
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            scrollToProducts();
          }
        }}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Large Hero Banner */}
      <section className="relative h-[650px] w-full overflow-hidden flex items-end">
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10" />
        
        {/* Stunning high-fashion editorial imagery */}
        <img
          className="absolute inset-0 w-full h-full object-cover select-none scale-105 animate-pulse-slow"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19bf-n6ScCldDv7UGfl2EdKaDs0D37VvETI1c6P6qHZ1IuMUfyGdizg9lfUBWy6GKPcq8o_kqVN2MsVWtCOQ6ErBJdc6VYKucZXgcPH9Tui12WLUmh0FXM619idZunHadDok5yTqJOIg5pYy5xkopiELjcxYAOsCQ7bolgHD8Vr18OFMZm1wR7SMcxOgYD8exVHpNiksHzUejt4kpamlJ3Yv5okF87iC-Uz75CXj2KeH24y7NrS9Lv3OnqsGJbBPHRswjDjXLfuS-"
          alt="MODA Luxury Winter Collection"
          referrerPolicy="no-referrer"
        />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-xl mr-auto"
          >
            <span className="font-sans text-[11px] font-black tracking-[0.25em] bg-brand-gold text-white px-3 py-1.5 inline-block rounded-none">
              LIMITED EDITION
            </span>
            <h2 className="font-cairo text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {isArabic ? "مجموعة الشتاء" : "The Winter Collection"}
            </h2>
            <p className="text-base sm:text-xl text-neutral-200 font-medium">
              {isArabic
                ? "خصم حتى ٥٠٪ على أرقى الموديلات الحريرية والجلدية"
                : "Up to 50% discount on finest silk and genuine leather models"}
            </p>
            
            <button
              onClick={scrollToProducts}
              className="bg-white text-brand-primary dark:bg-neutral-900 dark:text-white px-8 py-4.5 font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-300 rounded-none cursor-pointer shadow-lg active:scale-95 inline-block"
            >
              {isArabic ? "تسوقي الآن" : "Shop Current Boutique"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main categories scroll selector */}
      <CategoryList
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => {
          setSelectedCategoryId(id);
          setShowOnlyWishlist(false);
          scrollToProducts();
        }}
        isArabic={isArabic}
      />

      {/* Boutique Collection Showcases */}
      <div ref={productsSectionRef} className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center border-b border-outline-variant/60 dark:border-neutral-800 pb-4 mb-8">
          {showOnlyWishlist ? (
            <button
              onClick={() => setShowOnlyWishlist(false)}
              className="text-xs font-bold text-brand-gold flex items-center gap-1.5 hover:underline"
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              {isArabic ? "عرض كل المنتجات" : "View All Products"}
            </button>
          ) : (
            <button
              onClick={() => {
                setShowOnlyWishlist(true);
                scrollToProducts();
              }}
              className="text-xs font-bold text-neutral-500 hover:text-brand-gold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-brand-error">favorite</span>
              {isArabic ? "مشاهدة المفضلة" : "View Wishlist"}
            </button>
          )}

          <h3 className="font-cairo text-2xl font-black text-brand-primary dark:text-white">
            {showOnlyWishlist
              ? (isArabic ? "قائمة الأمنيات الخاصة بك" : "Your Wishlist Items")
              : (isArabic ? "وصلنا حديثاً" : "New In Boutique")}
          </h3>
        </div>

        {/* Dynamic products list */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-neutral-300 dark:text-neutral-700 animate-bounce">
              search_off
            </span>
            <p className="text-base text-neutral-500 font-bold">
              {isArabic
                ? "لا توجد قطع مطابقة لبحثك أو اختيارك حالياً"
                : "No items matching your selection at the moment."}
            </p>
            {(searchQuery || selectedCategoryId !== "all" || showOnlyWishlist) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategoryId("all");
                  setShowOnlyWishlist(false);
                }}
                className="px-5 py-2.5 border border-outline text-xs uppercase font-extrabold tracking-wider text-brand-primary dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none cursor-pointer"
              >
                {isArabic ? "إعادة تعيين الفلاتر" : "Reset Boutique Filter"}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={wishlist.includes(prod.id)}
                onToggleWishlist={() => handleToggleWishlist(prod.id)}
                onQuickView={() => setSelectedProduct(prod)}
                onAddToCart={(size) => handleAddToCart(prod, size, 1)}
                isArabic={isArabic}
              />
            ))}
          </div>
        )}
      </div>

      {/* Editorial banner section */}
      <section className="my-16 mx-4 sm:mx-8 relative aspect-[21/9] max-w-7xl lg:mx-auto overflow-hidden flex items-center justify-center">
        {/* Banner picture */}
        <img
          className="absolute inset-0 w-full h-full object-cover scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWZwL6S_2RdIF01zxaJckla_aRMUAKszUueMqikEPGItYHfsR-6OeymCP1Xk1Ke0WMG3pHxBoDsOyvHQufxlKlaM5EYuxN6vTSNwLLpMTnsx103tEs20UB-rSuhdijaYBxEuRPNldCDdsXJwikX8PMOlVY42dyS5diGIkc-gcdvkPcU_7ADAOw0PgnKSeR0j0jGfnhxiKYqnQ0dkwTo4cwhiAjs3tjkr2mrSh_q4qtNGCxa5Yt2RgaE96o8LM49fA4O-zLzmPbDBp5"
          alt="Luxury Urban Fashion Collection"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <span className="font-sans text-[10px] font-black tracking-[0.25em] text-brand-gold border-b border-brand-gold pb-1.5 uppercase">
            {isArabic ? "شخصي وحصري" : "Tailored & Exclusive"}
          </span>
          <h3 className="font-cairo text-2xl sm:text-4xl font-black text-white leading-tight">
            {isArabic ? "الأكثر مبيعاً هذا الأسبوع" : "This Week's Trending Collection"}
          </h3>
          <p className="text-neutral-200 text-xs sm:text-sm font-medium">
            {isArabic
              ? "اكتشف القطع الخالدة التي اختارها وأحبها الجميع هذا الموسم"
              : "Explore the timeless statements adored by our boutique collectors this season"}
          </p>
          <button
            onClick={() => {
              setSelectedCategoryId("all");
              scrollToProducts();
              triggerToast(isArabic ? "عرض القطع الرائجة" : "Showing boutique favorites");
            }}
            className="border-b-2 border-white text-white font-sans text-xs tracking-[0.2em] pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors font-bold uppercase cursor-pointer"
          >
            {isArabic ? "تسوق المجموعة كاملة" : "Shop Collection Statement"}
          </button>
        </div>
      </section>

      {/* Footer component */}
      <Footer isArabic={isArabic} />

      {/* Navigation Drawer Menu */}
      <DrawerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        onSelectCategory={(catId) => {
          setSelectedCategoryId(catId);
          setShowOnlyWishlist(false);
          scrollToProducts();
        }}
      />

      {/* Dynamic Cart Drawer panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        isArabic={isArabic}
      />

      {/* Product Detail Modal overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(size, qty) => handleAddToCart(selectedProduct, size, qty)}
            isArabic={isArabic}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={() => handleToggleWishlist(selectedProduct.id)}
          />
        )}
      </AnimatePresence>

      {/* Account Modal overlay */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white dark:bg-neutral-900 border border-outline-variant/60 dark:border-neutral-800 p-8 w-full max-w-md rounded-none shadow-2xl z-10 text-right font-tajawal"
            >
              <button
                onClick={() => setIsAccountOpen(false)}
                className="absolute top-4 left-4 text-neutral-400 hover:text-brand-gold"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <h3 className="font-cairo text-xl font-black text-brand-primary dark:text-white mb-6">
                {isArabic ? "حسابك في مودا" : "Your MODA Account"}
              </h3>

              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="p-4 bg-surface dark:bg-neutral-800 border border-outline-variant/30 text-center">
                    <span className="material-symbols-outlined text-3xl text-brand-gold mb-2 block">
                      verified_user
                    </span>
                    <p className="text-xs font-bold text-neutral-400">
                      {isArabic ? "مرحبًا بك مجددًا" : "Welcome back"}
                    </p>
                    <p className="text-sm font-black text-brand-primary dark:text-white truncate">
                      {userEmail}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        triggerToast(isArabic ? "سيتم عرض الطلبات قريباً" : "Your order history will show here soon");
                        setIsAccountOpen(false);
                      }}
                      className="w-full border border-outline text-brand-primary dark:text-white py-3 text-xs font-bold uppercase tracking-wider rounded-none hover:border-brand-gold transition-colors text-center"
                    >
                      {isArabic ? "مشترياتي وطلباتي" : "My Orders"}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-brand-error text-white py-3 text-xs font-bold uppercase tracking-wider rounded-none hover:bg-red-700 transition-colors text-center"
                    >
                      {isArabic ? "تسجيل الخروج" : "Logout"}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <p className="text-xs text-neutral-500">
                    {isArabic
                      ? "سجل دخولك لتتبع مشترياتك الفاخرة وتلقي العروض الاستثنائية الحصرية."
                      : "Login to track your premium purchases and access exclusive invitations."}
                  </p>

                  <div className="space-y-1.5 text-right">
                    <label className="text-xs font-bold text-neutral-400 uppercase">
                      {isArabic ? "البريد الإلكتروني:" : "Email address:"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 border border-outline bg-transparent text-right text-sm placeholder:text-neutral-400 outline-none rounded-none text-brand-primary dark:text-white focus:border-brand-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary dark:bg-brand-gold hover:bg-brand-gold text-white uppercase text-xs font-black py-4 tracking-wider transition-colors rounded-none cursor-pointer"
                  >
                    {isArabic ? "تسجيل الدخول / إنشاء حساب" : "Login / Create Account"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar bar representing the mockup style */}
      <nav className="fixed bottom-0 left-0 w-full z-30 flex justify-around items-center bg-white dark:bg-neutral-950 h-16 border-t border-outline-variant/60 shadow-lg md:hidden font-tajawal">
        <button
          onClick={() => {
            setSelectedCategoryId("all");
            setShowOnlyWishlist(false);
            scrollToProducts();
          }}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-brand-gold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[9px] font-bold mt-1 uppercase">
            {isArabic ? "الرئيسية" : "Home"}
          </span>
        </button>

        <button
          onClick={() => {
            scrollToProducts();
            triggerToast(isArabic ? "اختر تصنيفاً من القائمة" : "Choose a category below");
          }}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-brand-gold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-xl">category</span>
          <span className="text-[9px] font-bold mt-1 uppercase">
            {isArabic ? "الأقسام" : "Categories"}
          </span>
        </button>

        <button
          onClick={() => {
            setShowOnlyWishlist(!showOnlyWishlist);
            scrollToProducts();
          }}
          className={`flex flex-col items-center justify-center active:scale-95 transition-transform ${
            showOnlyWishlist ? "text-brand-gold" : "text-neutral-400"
          }`}
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
          <span className="text-[9px] font-bold mt-1 uppercase">
            {isArabic ? "المفضلة" : "Wishlist"}
          </span>
        </button>

        <button
          onClick={() => setIsAccountOpen(true)}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-brand-gold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="text-[9px] font-bold mt-1 uppercase">
            {isArabic ? "حسابي" : "Account"}
          </span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-brand-gold active:scale-95 transition-transform relative"
        >
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          <span className="text-[9px] font-bold mt-1 uppercase">
            {isArabic ? "الحقيبة" : "Cart"}
          </span>
          {cartItems.length > 0 && (
            <span className="absolute top-1.5 right-1/2 -mr-4 bg-brand-gold text-white text-[8px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}
