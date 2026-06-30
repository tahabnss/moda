/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category } from "../types";
import { CATEGORIES } from "../data";

interface CategoryListProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  isArabic: boolean;
}

export default function CategoryList({
  selectedCategoryId,
  onSelectCategory,
  isArabic,
}: CategoryListProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h3 className="font-cairo text-xl font-bold mb-6 text-right dark:text-white">
        {isArabic ? "فئات التسوق" : "Shop By Category"}
      </h3>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 justify-items-center">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none transition-transform duration-200 active:scale-95 w-full"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? "bg-brand-gold text-white scale-105 shadow-md shadow-brand-gold/30"
                    : "bg-surface-container dark:bg-neutral-800 text-on-surface dark:text-neutral-300 group-hover:bg-brand-gold/20 group-hover:text-brand-gold"
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {cat.iconName}
                </span>
              </div>
              <span
                className={`font-tajawal text-[11px] sm:text-xs text-center tracking-wide font-bold transition-colors ${
                  isSelected
                    ? "text-brand-gold"
                    : "text-on-surface-variant dark:text-neutral-400 group-hover:text-brand-gold"
                }`}
              >
                {isArabic ? cat.name.ar : cat.name.en}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
