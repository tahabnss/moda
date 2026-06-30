/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: (size: string) => void;
  isArabic: boolean;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  isArabic,
}: ProductCardProps) {
  const formattedPrice = isArabic 
    ? `${product.price.toLocaleString("ar-SA")} ر.س`
    : `SAR ${product.price}`;

  const formattedOldPrice = product.oldPrice
    ? (isArabic 
        ? `${product.oldPrice.toLocaleString("ar-SA")} ر.س`
        : `SAR ${product.oldPrice}`)
    : null;

  // Render Arabic review count representation
  const formattedReviews = isArabic
    ? `(${product.reviewsCount.toLocaleString("ar-SA")})`
    : `(${product.reviewsCount})`;

  return (
    <div className="group flex flex-col justify-between h-full bg-white dark:bg-neutral-900 border border-outline-variant/40 dark:border-neutral-800 transition-all duration-300">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-variant/20">
        {/* Product image with sleek scale effect on hover */}
        <img
          src={product.image}
          alt={isArabic ? product.title.ar : product.title.en}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {product.discount && (
            <span className="bg-brand-error text-white text-[10px] font-extrabold px-2 py-1 tracking-wider uppercase rounded-none">
              {product.discount}
            </span>
          )}
          {product.isNewIn && (
            <span className="bg-brand-gold text-white text-[10px] font-extrabold px-2 py-1 tracking-wider uppercase rounded-none">
              {isArabic ? "جديد" : "NEW"}
            </span>
          )}
        </div>

        {/* Hover overlay with CTA actions */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="w-full bg-white text-brand-primary text-xs font-bold py-3 uppercase tracking-wider hover:bg-brand-gold hover:text-white transition-all duration-300 rounded-none cursor-pointer"
          >
            {isArabic ? "عرض سريع" : "Quick View"}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.sizes[0] || "Standard");
            }}
            className="w-full bg-brand-primary text-white text-xs font-bold py-3 uppercase tracking-wider hover:bg-brand-gold transition-all duration-300 rounded-none cursor-pointer"
          >
            {isArabic ? "أضف إلى السلة" : "Add to Cart"}
          </button>
        </div>

        {/* Touch screens tap support for Quickview */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView();
          }}
          className="absolute inset-0 md:hidden z-0"
          aria-label="View product details"
        />

        {/* Elegant Heart Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute bottom-2 left-2 w-10 h-10 bg-white/95 dark:bg-neutral-800/95 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90 hover:scale-105 cursor-pointer z-20"
          aria-label="Toggle wishlist"
        >
          <span
            className={`material-symbols-outlined text-xl transition-colors ${
              isWishlisted ? "text-brand-error fill-current" : "text-brand-primary dark:text-white"
            }`}
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Metadata / Details */}
      <div className="p-4 flex flex-col gap-1 border-t border-outline-variant/30 dark:border-neutral-800/60 bg-white dark:bg-neutral-900">
        <h4 
          onClick={onQuickView}
          className="font-cairo text-sm sm:text-base font-semibold text-brand-primary dark:text-neutral-100 hover:text-brand-gold transition-colors cursor-pointer truncate"
        >
          {isArabic ? product.title.ar : product.title.en}
        </h4>
        
        <div className="flex items-center gap-2">
          <span className="text-brand-gold dark:text-brand-gold font-extrabold text-sm sm:text-base">
            {formattedPrice}
          </span>
          {formattedOldPrice && (
            <span className="text-neutral-400 dark:text-neutral-500 line-through text-xs">
              {formattedOldPrice}
            </span>
          )}
        </div>

        {/* Star Rating Section */}
        <div className="flex items-center gap-1 mt-0.5">
          <span 
            className="material-symbols-outlined text-brand-gold text-sm" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="text-[11px] text-on-surface-variant dark:text-neutral-400 font-semibold">
            {isArabic ? product.rating.toLocaleString("ar-SA") : product.rating} {formattedReviews}
          </span>
        </div>
      </div>
    </div>
  );
}
