/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  isArabic: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isArabic,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal like 0.1 for 10%
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Delivery estimation or fee
  const shippingFee = cartItems.length > 0 ? 30 : 0;

  // Totals calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal - discountAmount + shippingFee;

  // Handle promo code submit
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "MODA10") {
      setAppliedDiscount(0.1);
      setPromoSuccess(isArabic ? "تم تطبيق كود الخصم ١٠٪ بنجاح!" : "10% coupon applied successfully!");
      setPromoError("");
    } else if (code === "MODA20" || code === "WINTER20") {
      setAppliedDiscount(0.2);
      setPromoSuccess(isArabic ? "تم تطبيق كود الخصم ٢٠٪ بنجاح!" : "20% coupon applied successfully!");
      setPromoError("");
    } else if (code === "") {
      setPromoError(isArabic ? "يرجى إدخال رمز الخصم" : "Please enter a promo code");
      setPromoSuccess("");
    } else {
      setPromoError(isArabic ? "رمز الخصم غير صالح" : "Invalid promo code");
      setPromoSuccess("");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate order placement
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderCompleted(true);
      onClearCart();
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-tajawal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Sliding Panel */}
            <div className={`absolute inset-y-0 ${isArabic ? "left-0" : "right-0"} max-w-full flex`}>
              <motion.div
                initial={{ x: isArabic ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: isArabic ? "-100%" : "100%" }}
                transition={{ type: "tween", duration: 0.35 }}
                className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-outline-variant/60 dark:border-neutral-800 flex flex-col h-full shadow-2xl"
              >
                {/* Header */}
                <div className="p-6 border-b border-outline-variant/50 dark:border-neutral-800 flex items-center justify-between bg-surface dark:bg-neutral-900">
                  <h2 className="font-cairo text-lg font-black text-brand-primary dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined align-middle text-brand-gold">
                      shopping_bag
                    </span>
                    {isArabic ? "حقيبة التسوق" : "Shopping Bag"}
                    <span className="text-xs bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 font-bold rounded-full">
                      {cartItems.length}
                    </span>
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-on-surface dark:text-neutral-400 hover:text-brand-gold transition-colors p-1"
                    aria-label="Close"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>

                {/* Main Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                      <span className="material-symbols-outlined text-6xl text-neutral-300 dark:text-neutral-700 animate-pulse">
                        shopping_bag
                      </span>
                      <p className="text-base font-bold text-neutral-500 dark:text-neutral-400">
                        {isArabic ? "حقيبة التسوق فارغة تماماً" : "Your shopping bag is completely empty"}
                      </p>
                      <button
                        onClick={onClose}
                        className="bg-brand-primary dark:bg-brand-gold text-white px-6 py-3 text-xs uppercase font-extrabold tracking-widest hover:bg-brand-gold transition-all duration-300 rounded-none cursor-pointer"
                      >
                        {isArabic ? "الذهاب للتسوق" : "Start Shopping"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 border border-outline-variant/30 dark:border-neutral-800/80 bg-surface-container-low dark:bg-neutral-900/40 relative hover:border-brand-gold/40 transition-all rounded-none"
                        >
                          {/* Item Image */}
                          <div className="w-20 h-24 bg-neutral-100 dark:bg-neutral-950 shrink-0 overflow-hidden">
                            <img
                              src={item.product.image}
                              alt={isArabic ? item.product.title.ar : item.product.title.en}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 flex flex-col justify-between text-right">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-neutral-400 hover:text-brand-error transition-colors shrink-0"
                                  aria-label="Remove item"
                                >
                                  <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                                <h3 className="font-cairo text-sm font-bold text-brand-primary dark:text-neutral-100 line-clamp-1">
                                  {isArabic ? item.product.title.ar : item.product.title.en}
                                </h3>
                              </div>

                              <span className="text-[11px] font-bold text-brand-gold bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 inline-block mt-1">
                                {isArabic ? `مقاس: ${item.selectedSize}` : `Size: ${item.selectedSize}`}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs text-neutral-400 font-bold">
                                {isArabic
                                  ? `${(item.product.price * item.quantity).toLocaleString("ar-SA")} ر.س`
                                  : `SAR ${item.product.price * item.quantity}`}
                              </span>

                              {/* Item Quantity Controller */}
                              <div className="flex items-center gap-1 border border-outline/70 bg-white dark:bg-neutral-950 rounded-none h-7">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-full flex items-center justify-center text-brand-primary dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-bold text-xs"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center text-xs font-black dark:text-white">
                                  {isArabic ? item.quantity.toLocaleString("ar-SA") : item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-full flex items-center justify-center text-brand-primary dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-bold text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer Calculations (Only if items exist) */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-outline-variant dark:border-neutral-800 bg-surface-container-low dark:bg-neutral-900/60 flex flex-col gap-4 text-right">
                    {/* Promo Code Input */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleApplyPromo}
                        className="bg-brand-primary dark:bg-neutral-800 text-white dark:text-neutral-200 border border-brand-primary dark:border-neutral-700 hover:bg-brand-gold hover:border-brand-gold px-4 text-xs font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer"
                      >
                        {isArabic ? "تطبيق" : "Apply"}
                      </button>
                      <input
                        type="text"
                        placeholder={isArabic ? "رمز الخصم (MODA20)" : "Promo code (MODA20)"}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 text-right pr-3 pl-3 py-2 border border-outline bg-white dark:bg-neutral-900 placeholder:text-neutral-400 text-on-surface dark:text-white outline-none rounded-none text-xs"
                      />
                    </div>
                    {promoError && (
                      <p className="text-[11px] font-bold text-brand-error leading-none">
                        {promoError}
                      </p>
                    )}
                    {promoSuccess && (
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-none">
                        {promoSuccess}
                      </p>
                    )}

                    {/* Summary lines */}
                    <div className="space-y-1.5 border-t border-b border-outline-variant/40 dark:border-neutral-800/60 py-3 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-on-surface-variant dark:text-neutral-400">
                          {isArabic
                            ? `${subtotal.toLocaleString("ar-SA")} ر.س`
                            : `SAR ${subtotal}`}
                        </span>
                        <span className="text-on-surface-variant dark:text-neutral-400">
                          {isArabic ? "المجموع الفرعي" : "Subtotal"}
                        </span>
                      </div>

                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                          <span>
                            {isArabic
                              ? `-${discountAmount.toLocaleString("ar-SA")} ر.س`
                              : `-SAR ${discountAmount}`}
                          </span>
                          <span>
                            {isArabic ? "خصم الكوبون" : "Coupon Discount"}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-on-surface-variant dark:text-neutral-400">
                          {isArabic
                            ? `${shippingFee.toLocaleString("ar-SA")} ر.س`
                            : `SAR ${shippingFee}`}
                        </span>
                        <span className="text-on-surface-variant dark:text-neutral-400">
                          {isArabic ? "الشحن والتوصيل" : "Shipping & Delivery"}
                        </span>
                      </div>

                      <div className="flex justify-between font-black text-sm pt-2 text-brand-primary dark:text-white">
                        <span className="text-brand-gold">
                          {isArabic ? `${total.toLocaleString("ar-SA")} ر.س` : `SAR ${total}`}
                        </span>
                        <span>{isArabic ? "المجموع الكلي" : "Total Price"}</span>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full bg-brand-primary dark:bg-brand-gold hover:bg-brand-gold dark:hover:bg-brand-gold-dark text-white font-extrabold uppercase py-4 text-xs tracking-widest rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isCheckingOut ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">payments</span>
                          {isArabic ? "إتمام الشراء والدفع" : "Proceed to Checkout"}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Complete Success Modal overlay */}
      <AnimatePresence>
        {orderCompleted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderCompleted(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white dark:bg-neutral-900 border border-outline-variant/60 dark:border-neutral-800 p-8 text-center max-w-md w-full rounded-none shadow-2xl z-10 font-tajawal"
            >
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-5xl">order_approve</span>
              </div>
              <h3 className="font-cairo text-2xl font-black text-brand-primary dark:text-white mb-3">
                {isArabic ? "تهانينا! تم استلام طلبك" : "Thank you! Order Placed"}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                {isArabic
                  ? "لقد تم تسجيل طلبك بنجاح في متجر مودا الفاخر وسوف نقوم بإرسال تفاصيل التتبع إلى بريدك الإلكتروني قريباً."
                  : "Your luxury order has been registered successfully with MODA Store. A tracking confirmation has been sent to your email."}
              </p>
              <button
                onClick={() => setOrderCompleted(false)}
                className="w-full bg-brand-primary dark:bg-brand-gold text-white uppercase text-xs font-black py-4 tracking-wider hover:bg-brand-gold transition-colors rounded-none cursor-pointer"
              >
                {isArabic ? "العودة للتسوق" : "Continue Shopping"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
