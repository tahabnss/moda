/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Product } from "../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (size: string, quantity: number) => void;
  isArabic: boolean;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isArabic,
  isWishlisted,
  onToggleWishlist,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || "Standard"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const formattedPrice = isArabic
    ? `${product.price.toLocaleString("ar-SA")} ر.س`
    : `SAR ${product.price}`;

  const formattedOldPrice = product.oldPrice
    ? (isArabic
        ? `${product.oldPrice.toLocaleString("ar-SA")} ر.س`
        : `SAR ${product.oldPrice}`)
    : null;

  const handleAddToCart = () => {
    onAddToCart(selectedSize, quantity);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Black ambient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-neutral-900 border border-outline-variant/60 dark:border-neutral-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none flex flex-col md:flex-row shadow-2xl z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/90 dark:bg-neutral-800/90 hover:bg-brand-gold hover:text-white dark:text-white rounded-full flex items-center justify-center shadow transition-colors cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:h-auto overflow-hidden bg-neutral-100 dark:bg-neutral-950">
          <img
            src={product.image}
            alt={isArabic ? product.title.ar : product.title.en}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.discount && (
            <span className="absolute top-4 right-4 bg-brand-error text-white text-xs font-black px-3 py-1.5 tracking-wider uppercase rounded-none z-10">
              {product.discount}
            </span>
          )}
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-right font-tajawal">
          <div>
            {/* Category Tag */}
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-gold mb-2 block font-sans">
              {product.categoryId.toUpperCase()}
            </span>

            {/* Title */}
            <h2 className="font-cairo text-xl sm:text-2xl font-black text-brand-primary dark:text-white mb-2 leading-snug">
              {isArabic ? product.title.ar : product.title.en}
            </h2>

            {/* Stars & Reviews */}
            <div className="flex items-center gap-1 justify-start mb-4">
              <span
                className="material-symbols-outlined text-brand-gold text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-xs text-on-surface-variant dark:text-neutral-400 font-bold">
                {isArabic ? product.rating.toLocaleString("ar-SA") : product.rating} / 5.0 (
                {isArabic ? `${product.reviewsCount.toLocaleString("ar-SA")} تقييم` : `${product.reviewsCount} reviews`})
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 justify-start mb-6">
              <span className="text-2xl font-black text-brand-gold">
                {formattedPrice}
              </span>
              {formattedOldPrice && (
                <span className="text-neutral-400 dark:text-neutral-500 line-through text-sm">
                  {formattedOldPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              {isArabic ? product.description.ar : product.description.en}
            </p>

            {/* Sizes selector (if any sizes exist) */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-bold text-brand-primary dark:text-neutral-300 block mb-3 uppercase">
                  {isArabic ? "اختر المقاس:" : "Select Size:"}
                </span>
                <div className="flex gap-2 flex-wrap justify-start">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 text-xs font-bold border rounded-none transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand-primary dark:bg-white text-white dark:text-brand-primary border-brand-primary dark:border-white scale-105"
                            : "bg-transparent border-outline text-brand-primary dark:text-neutral-300 hover:border-brand-gold"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-primary dark:text-neutral-300 block mb-3 uppercase">
                {isArabic ? "الكمية:" : "Quantity:"}
              </span>
              <div className="flex items-center gap-2 border border-outline w-28 rounded-none">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-9 h-9 flex items-center justify-center text-brand-primary dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm font-black text-brand-primary dark:text-white">
                  {isArabic ? quantity.toLocaleString("ar-SA") : quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-brand-primary dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Call To Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={isSuccess}
              className={`flex-1 py-4 text-xs font-extrabold uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2 ${
                isSuccess
                  ? "bg-brand-gold text-white"
                  : "bg-brand-primary dark:bg-brand-gold hover:bg-brand-gold dark:hover:bg-brand-gold-dark text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isSuccess ? "check_circle" : "shopping_bag"}
              </span>
              {isSuccess
                ? (isArabic ? "تم الإضافة بنجاح!" : "Added successfully!")
                : (isArabic ? "أضف إلى حقيبة التسوق" : "Add to Shopping Bag")}
            </button>

            <button
              onClick={onToggleWishlist}
              className={`w-14 py-4 border rounded-none flex items-center justify-center cursor-pointer transition-colors ${
                isWishlisted
                  ? "border-brand-error text-brand-error bg-brand-error/5 hover:bg-brand-error/10"
                  : "border-outline text-brand-primary dark:text-white hover:border-brand-gold hover:text-brand-gold"
              }`}
              aria-label="Wishlist"
            >
              <span
                className={`material-symbols-outlined text-lg ${isWishlisted ? "fill-current" : ""}`}
                style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
