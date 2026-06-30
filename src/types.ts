/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  categoryId: string;
  sizes: string[];
  isTrending?: boolean;
  isNewIn?: boolean;
  discount?: string;
}

export interface Category {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  iconName: string; // Material Symbol Outlined name
  count?: number;
}

export interface CartItem {
  id: string; // unique item id = product.id + '-' + size
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface WishlistItem {
  product: Product;
}
