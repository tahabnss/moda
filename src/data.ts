/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "dresses",
    name: {
      ar: "فساتين",
      en: "Dresses",
    },
    iconName: "styler",
    count: 14,
  },
  {
    id: "shoes",
    name: {
      ar: "أحذية",
      en: "Shoes",
    },
    iconName: "ice_skating",
    count: 18,
  },
  {
    id: "bags",
    name: {
      ar: "حقائب",
      en: "Bags",
    },
    iconName: "work",
    count: 12,
  },
  {
    id: "watches",
    name: {
      ar: "ساعات",
      en: "Watches",
    },
    iconName: "watch",
    count: 8,
  },
  {
    id: "jewelry",
    name: {
      ar: "مجوهرات",
      en: "Jewelry",
    },
    iconName: "diamond",
    count: 22,
  },
  {
    id: "men",
    name: {
      ar: "رجالي",
      en: "Men",
    },
    iconName: "checkroom",
    count: 29,
  },
  {
    id: "kids",
    name: {
      ar: "أطفال",
      en: "Kids",
    },
    iconName: "child_care",
    count: 16,
  },
  {
    id: "all",
    name: {
      ar: "الكل",
      en: "All",
    },
    iconName: "grid_view",
    count: 99,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "emerald-silk-dress",
    title: {
      ar: "فستان حرير زمردي",
      en: "Emerald Silk Dress",
    },
    description: {
      ar: "فستان سهرة مصنوع من الحرير الطبيعي الفاخر باللون الأخضر الزمردي البراق. يتميز بفتحة ساق جانبية وخصر محدد بشكل أنيق ليضفي حضوراً لافتاً في مناسباتك الراقية.",
      en: "Evening gown crafted from luxurious natural silk in radiant emerald green. Features an elegant side leg slit and a tailored waistline for an unforgettable presence.",
    },
    price: 450,
    oldPrice: 650,
    rating: 4.8,
    reviewsCount: 120,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnpDo6o_3XtoItnsa0zbsfdGTlHyTIAxg-LrTHTN7yguX9rddBWTOyZU8FjxPnHHR86S6_I4gYOgv-ogJVMkkRl2HV1vxPym_qd5vnfw4iOLAbXVfNbcEBh6xTIOvuF6WsaKXTQsr2UTsa0ts34y3nKwEdBAwDBgscGySvPczhfKvk82ATQql86KehZqikcsNVHw5S3obt0gbsFeyo60xoTaF21Z1B_SYWTidhiBovafQor-DrHI4d8snfNZAvIo0R0NVO4ArIwZE4",
    categoryId: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    isNewIn: true,
    discount: "-30%",
  },
  {
    id: "classic-leather-bag",
    title: {
      ar: "حقيبة جلد كلاسيكية",
      en: "Classic Leather Bag",
    },
    description: {
      ar: "حقيبة يد كلاسيكية مصنوعة يدوياً من جلد البقر الطبيعي المحبب باللون الفحمي الداكن. مزودة بقطع معدنية مطلية بالذهب الفاخر وتصميم داخلي واسع ومثالي لكل الأوقات.",
      en: "A hand-crafted classic handbag made of genuine grain cow leather in deep charcoal black. Trimmed with premium gold-plated hardware and optimized with a spacious interior.",
    },
    price: 1200,
    rating: 5.0,
    reviewsCount: 45,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXPx3ucJKet_f-fUorCYxVd--ddqvPxhyE6--T3waQ--XObD9qui2Z2wEeh-2Vp-K0tm6gTUnwsUJV5Ftw3Bs0nnKe4PzLqcCe4MgMxOdMJffAxg2RJrNCa9e8ayNtcGTYNTTVxiI2_GyNoFyVCcPV8jTTDgd4BtOwFAf3WkAPi4hwQJ9bZys3TtkWeoUtgCJJ_-EZosWYfqlxhTNnO2aN3tMet-Wrrg12RInhRd6dhLHzKm00Xlz2rGhOJOVE1jSJ8QMhQC6bHL-f",
    categoryId: "bags",
    sizes: ["Standard"],
    isNewIn: true,
  },
  {
    id: "modern-sneakers",
    title: {
      ar: "حذاء رياضي عصري",
      en: "Modern Sports Sneakers",
    },
    description: {
      ar: "حذاء رياضي مريح يتميز بتصميمه العصري البسيط وجلده الأبيض الفاخر مع لمسات مذهبة دقيقة. نعل مبطن لراحة فائقة في المشي ومظهر يومي أنيق.",
      en: "Comfortable sneakers designed with a modern minimalist look in premium white leather and subtle gold accents. Cushioned sole ensures supreme comfort for daily elegance.",
    },
    price: 850,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXJRE8uvDQaUOKCq8hWKQj9iGVsPz1CmAAPlerNtOZ_9BRGVRW9eUGKD4-t0jKRKwMb3BXlllZdDvaQ2soojyxQJdURiVqz9H3ERS-AGOeBvebS8U72EPDkuyE1hUWPzNs1SJYsCgbCcp00i8yofj8qCCdYNihuc9VcwuA5nNtZ6z6GbSRBf73npLTRwFvBpCq8wIc1k4ffHx3722Iq8tOyHsVLqq7DYr3gs5fO936DQ9XyHI4gaUob6WuxiMHsYAs3kyd5WsujgOZ",
    categoryId: "shoes",
    sizes: ["38", "39", "40", "41", "42", "43"],
    isNewIn: true,
  },
  {
    id: "luxury-gold-watch",
    title: {
      ar: "ساعة ذهبية ملكية",
      en: "Royal Gold Watch",
    },
    description: {
      ar: "ساعة يد فاخرة مطلية بالذهب عيار 18 قيراطاً، تتميز بمينا أسود ملكي متباين وعقارب مصقولة بدقة. مقاومة للماء وتضفي رقياً لا يضاهى على معصمك.",
      en: "A luxurious wrist watch plated with 18k gold, featuring a contrasting royal black dial and precisely polished hands. Water resistant, giving unmatched elegance.",
    },
    price: 3400,
    oldPrice: 4200,
    rating: 4.9,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    categoryId: "watches",
    sizes: ["Standard"],
    isTrending: true,
    discount: "-19%",
  },
  {
    id: "diamond-necklace",
    title: {
      ar: "قلادة ألماس راقية",
      en: "Exquisite Diamond Necklace",
    },
    description: {
      ar: "قلادة كلاسيكية مصممة من الذهب الأبيض عيار 18 قيراط ومزينة بقطع مستديرة من الألماس البراق بوزن إجمالي 1.5 قيراط. تصميم يجسد الفخامة والخلود.",
      en: "A classic necklace designed in 18k white gold and embellished with brilliant round-cut diamonds totaling 1.5 carats. A design embodying true eternity.",
    },
    price: 5900,
    rating: 5.0,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    categoryId: "jewelry",
    sizes: ["Standard"],
    isTrending: true,
  },
  {
    id: "premium-wool-coat",
    title: {
      ar: "معطف صوف فاخر",
      en: "Premium Wool Coat",
    },
    description: {
      ar: "معطف شتوي طويل مصنوع يدوياً من أجود أنواع صوف المارينو الإيطالي. قصة فضفاضة عصرية بلون بني دافئ، يمنحك الدفء والجاذبية في الأيام الباردة.",
      en: "A long winter coat hand-crafted from the finest Italian Merino wool. Contemporary oversized fit in warm chocolate brown, giving warmth and high-fashion appeal.",
    },
    price: 1850,
    oldPrice: 2400,
    rating: 4.9,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",
    categoryId: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isTrending: true,
    discount: "-22%",
  },
  {
    id: "kid-knitted-sweater",
    title: {
      ar: "سترة صوفية للأطفال",
      en: "Kids Knitted Woolen Sweater",
    },
    description: {
      ar: "سترة صوفية للأطفال محاكة بنقوش دافئة مريحة وناعمة على بشرة طفلك الحساسة. مصنوعة من خيوط قطنية وصوفية هجينة ومقاومة لجميع مغامرات اللعب.",
      en: "An adorable kids sweater knitted with cozy patterns, soft and gentle on sensitive skin. Made of cotton-wool hybrid yarn, ready for all playtime adventures.",
    },
    price: 320,
    rating: 4.6,
    reviewsCount: 24,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&auto=format&fit=crop",
    categoryId: "kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: "silk-satin-scarf",
    title: {
      ar: "وشاح حرير ساتان",
      en: "Silk Satin Scarf",
    },
    description: {
      ar: "وشاح ناعم كالحرير بنقوش هندسية كلاسيكية مستوحاة من الفنون العربية العريقة. يمكن ارتداؤه حول العنق أو كإكسسوار رائع لحقيبة اليد الخاصة بكِ.",
      en: "A silky smooth satin scarf featuring classic geometric prints inspired by ancient Arabic arts. Perfect around the neck or draped over your favorite handbag.",
    },
    price: 250,
    rating: 4.8,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    categoryId: "dresses",
    sizes: ["Standard"],
  },
];
