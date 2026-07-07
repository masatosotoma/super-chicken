// Static Translations Dictionary
export const translations = {
  en: {
    heroBadge: "Crispy • Golden • Delicious",
    heroTitle: "Experience the Ultimate <span>Super Chicken</span> Taste!",
    heroSubtitle: "Premium recipe fried chicken, hand-breaded and cooked to golden perfection. Visit us today for hot, fresh takeout!",
    orderNow: "Explore Menu",
    viewMenuImg: "View Scanned Menu",
    categoriesTitle: "Explore Our Menu",
    categoriesSubtitle: "Freshly prepared chicken cooked in trans-fat free oils. Browse our selections below!",
    catAll: "All Items",
    catChicken: "Chicken",
    catSandwiches: "Sandwiches & Cuts",
    catSides: "Sides & Wings",
    catCombos: "Value Combos",
    originalMenuTitle: "Scanned Menu Sheet",
    originalMenuDesc: "Would you like to cross-reference our prices and items with the original physical menu printed sheet?",
    btnViewSheet: "Open Menu Image",
    locationTitle: "Location & Pickup",
    hoursTitle: "Business Hours",
    contactTitle: "Call for Orders",
    locDesc: "3517 Kennedy Rd #3, Scarborough, ON M1V 4S4",
    hoursDesc: "Monday - Sunday: 11:30 AM - 12:00 AM",
    contactDesc: "+1 (647) 390-9898",
    footerText: "© 2026 Super Chicken Takeout. All rights reserved.",
    customSpicy: "Spice Option:",
    customSpicyMild: "Mild / Spicy",
    customAddons: "Available Add-ons:",
    customPineapple: "Pineapple (+$1.00)",
    customCheese: "Cheese (+$1.50)",
    customUpgradeCombo: "BBQ Sandwich Upgrade (+$1.00)",
    comboNote: "* Pineapple (+$1.00) / Cheese (+$1.50) can be added to any sandwich. Upgrade to BBQ chicken sandwich for +$1.00 in all combos.",
    mildSpicyOption: "Mild or Spicy option available"
  },
  zh: {
    heroBadge: "酥脆 • 金黄 • 美味",
    heroTitle: "体验极致的 <span>超级炸鸡</span> 美味！",
    heroSubtitle: "优质配方炸鸡，手工裹粉，炸至金黄酥脆。欢迎光临选购新鲜美味外卖！",
    orderNow: "浏览菜单",
    viewMenuImg: "查看纸质菜单",
    categoriesTitle: "探索我们的菜单",
    categoriesSubtitle: "使用无反式脂肪油新鲜烹制的炸鸡。请在下方浏览我们的美食选项！",
    catAll: "全部菜单",
    catChicken: "招牌炸鸡",
    catSandwiches: "汉堡与鸡排",
    catSides: "小吃与鸡翅",
    catCombos: "超值套餐",
    originalMenuTitle: "纸质菜单扫描件",
    originalMenuDesc: "想参考店内纸质菜单印刷版的价格与项目吗？",
    btnViewSheet: "打开菜单图片",
    locationTitle: "取餐地址",
    hoursTitle: "营业时间",
    contactTitle: "电话订餐",
    locDesc: "士嘉堡肯尼迪路3517号3号铺，邮编 M1V 4S4",
    hoursDesc: "周一至周日：上午 11:30 - 凌晨 12:00",
    contactDesc: "+1 (647) 390-9898",
    footerText: "© 2026 超级炸鸡外卖。版权所有。",
    customSpicy: "辣度选项：",
    customSpicyMild: "可选不辣 / 辣",
    customAddons: "可选配料：",
    customPineapple: "加菠萝 (+$1.00)",
    customCheese: "加芝士 (+$1.50)",
    customUpgradeCombo: "升级为BBQ鸡肉汉堡 (+$1.00)",
    comboNote: "* 任何汉堡可加菠萝 (+$1.00) / 芝士 (+$1.50)。所有套餐可加 +$1.00 升级为BBQ鸡肉汉堡。",
    mildSpicyOption: "可选不辣/辣口味"
  }
};

// Menu Items Database
export const menuData = [
  // --- CHICKEN CATEGORY ---
  {
    id: "chicken-boom-2pc",
    category: "chicken",
    cal: "835 cal",
    basePrice: 7.99,
    badge: { en: "Best Seller", zh: "畅销" },
    names: { en: "Chicken Boom (2PC)", zh: "招牌爆破炸鸡 (2块)" },
    descriptions: { en: "2 pieces of crispy, juicy signature chicken.", zh: "2块酥脆多汁的招牌炸鸡。" },
    customType: "spiciness"
  },
  {
    id: "chicken-boom-4pc",
    category: "chicken",
    cal: "1670 cal",
    basePrice: 14.49,
    badge: null,
    names: { en: "Chicken Boom (4PC)", zh: "招牌爆破炸鸡 (4块)" },
    descriptions: { en: "4 pieces of crispy golden fried chicken.", zh: "4块金黄酥脆的招牌炸鸡。" },
    customType: "spiciness"
  },
  {
    id: "chicken-boom-8pc",
    category: "chicken",
    cal: "3340 cal",
    basePrice: 26.99,
    badge: { en: "Party Size", zh: "聚会装" },
    names: { en: "Chicken Boom (8PC)", zh: "招牌爆破炸鸡 (8块)" },
    descriptions: { en: "8 pieces of signature family-sharing crispy chicken.", zh: "8块招牌家庭共享酥脆炸鸡。" },
    customType: "spiciness"
  },

  // --- SANDWICHES CATEGORY ---
  {
    id: "spicy-chicken-sandwich",
    category: "sandwich",
    cal: "550 cal",
    basePrice: 8.99,
    badge: { en: "Popular", zh: "热门" },
    names: { en: "Spicy Chicken Sandwich", zh: "香辣鸡肉汉堡" },
    descriptions: { en: "Spicy breast filet, crunchy lettuce, and premium dressing on a toasted bun.", zh: "香辣鸡胸肉排、清脆生菜与特制沙拉酱配烤面包。" },
    customType: "sandwich"
  },
  {
    id: "chicken-sandwich",
    category: "sandwich",
    cal: "550 cal",
    basePrice: 8.99,
    badge: null,
    names: { en: "Chicken Sandwich", zh: "经典鸡肉汉堡" },
    descriptions: { en: "Classic crispy chicken breast filet, fresh lettuce, and savory dressing.", zh: "经典酥脆鸡胸肉排、新鲜生菜与美味酱汁。" },
    customType: "sandwich"
  },
  {
    id: "bbq-chicken-sandwich",
    category: "sandwich",
    cal: "530 cal",
    basePrice: 9.99,
    badge: { en: "New", zh: "新品" },
    names: { en: "BBQ Chicken Sandwich", zh: "BBQ烧烤酱鸡肉汉堡" },
    descriptions: { en: "Crispy chicken dripping with rich smokey BBQ sauce, topped with crunchy lettuce.", zh: "金黄炸鸡淋上浓郁烟熏BBQ烧烤酱，搭配爽口生菜。" },
    customType: "sandwich"
  },
  {
    id: "smash-chicken-cut",
    category: "sandwich",
    cal: "575 cal",
    basePrice: 8.49,
    badge: null,
    names: { en: "Smash Chicken Cut", zh: "轰炸大鸡排" },
    descriptions: { en: "Tenderized and flattened crispy giant chicken breast cutlet.", zh: "鲜嫩多汁的压扁超大黄金酥脆鸡排。" },
    customType: "spiciness"
  },

  // --- SIDES & WINGS CATEGORY ---
  {
    id: "chicken-fries",
    category: "sides",
    cal: "360 cal",
    basePrice: 8.99,
    badge: null,
    names: { en: "Chicken Fries", zh: "鸡肉薯条" },
    descriptions: { en: "Lightly breaded tender chicken pieces shaped like fries.", zh: "裹上面包糠的嫩鸡肉条，形状酷似薯条。" },
    customType: null
  },
  {
    id: "new-orleans-roasted-wing-2pc",
    category: "sides",
    cal: "420 cal",
    basePrice: 6.99,
    badge: null,
    names: { en: "New Orleans Roasted Wings (2PC)", zh: "新奥尔良烤翅 (2块)" },
    descriptions: { en: "Sweet and spicy marinated baked wings, New Orleans style.", zh: "经典新奥尔良风味甜辣腌制烤翅。" },
    customType: null
  },
  {
    id: "spicy-chicken-wings-2pc",
    category: "sides",
    cal: "190 cal",
    basePrice: 3.99,
    badge: null,
    names: { en: "Spicy Chicken Wings (2PC)", zh: "香辣鸡翅 (2块)" },
    descriptions: { en: "Crispy and hot breaded wings with a fiery punch.", zh: "酥脆香辣的裹粉鸡翅，带给你火热快感。" },
    customType: null
  },
  {
    id: "onion-ring",
    category: "sides",
    cal: "240 cal",
    basePrice: 5.99,
    badge: null,
    names: { en: "Onion Rings", zh: "洋葱圈" },
    descriptions: { en: "Golden crispy battered onion ring snacks.", zh: "金黄酥脆的裹糊炸洋葱圈。" },
    customType: null
  },
  {
    id: "fresh-crunchy-fries-m",
    category: "sides",
    cal: "310 cal",
    basePrice: 3.99,
    badge: null,
    names: { en: "Fresh Crunchy Fries (Medium)", zh: "清脆薯条 (中份)" },
    descriptions: { en: "Crispy potato fries salted to perfection.", zh: "金黄爽脆的现炸马铃薯条，咸度适中。" },
    customType: null
  },
  {
    id: "fresh-crunchy-fries-l",
    category: "sides",
    cal: "400 cal",
    basePrice: 5.99,
    badge: null,
    names: { en: "Fresh Crunchy Fries (Large)", zh: "清脆薯条 (大份)" },
    descriptions: { en: "Crispy potato fries salted to perfection - family size.", zh: "大份量现炸马铃薯条，金黄酥爽。" },
    customType: null
  },
  {
    id: "pop-chicken-m",
    category: "sides",
    cal: "280 cal",
    basePrice: 5.99,
    badge: null,
    names: { en: "Pop Chicken (Medium)", zh: "爆米花鸡 (中份)" },
    descriptions: { en: "Bite-sized pop chicken chunks, golden and tender.", zh: "一口一个的爆米花小鸡块，金黄鲜嫩。" },
    customType: null
  },
  {
    id: "pop-chicken-l",
    category: "sides",
    cal: "370 cal",
    basePrice: 8.49,
    badge: null,
    names: { en: "Pop Chicken (Large)", zh: "爆米花鸡 (大份)" },
    descriptions: { en: "Bite-sized pop chicken chunks, perfect for sharing.", zh: "大份爆米花小鸡排，适合分享。" },
    customType: null
  },
  {
    id: "flame-fries-m",
    category: "sides",
    cal: "280 cal",
    basePrice: 2.99,
    badge: null,
    names: { en: "Flame Fries (Medium)", zh: "火焰辣薯条 (中份)" },
    descriptions: { en: "Crunchy golden fries seasoned with hot fiery spices.", zh: "现炸酥脆薯条，撒上热辣的火焰辣椒香料。" },
    customType: null
  },
  {
    id: "flame-fries-l",
    category: "sides",
    cal: "370 cal",
    basePrice: 4.99,
    badge: null,
    names: { en: "Flame Fries (Large)", zh: "火焰辣薯条 (大份)" },
    descriptions: { en: "Large portion of crunchy golden fries seasoned with hot fiery spices.", zh: "大份量火焰香辣配料薯条，爽口带劲。" },
    customType: null
  },

  // --- COMBOS CATEGORY ---
  {
    id: "combo-a",
    category: "combos",
    cal: "935-965 cal",
    basePrice: 13.59,
    comboLetter: "A",
    badge: { en: "Value Combo", zh: "超值套餐" },
    names: { en: "Combo A: Sandwich Combo", zh: "套餐 A：经典汉堡套餐" },
    descriptions: { 
      en: "Chicken Sandwich + Flame Fries + soft Drink.", 
      zh: "经典鸡肉汉堡 + 火焰辣薯条 + 软饮。" 
    },
    customType: "combo-sandwich"
  },
  {
    id: "combo-b",
    category: "combos",
    cal: "745-775 cal",
    basePrice: 13.59,
    comboLetter: "B",
    badge: null,
    names: { en: "Combo B: Chicken Fries Combo", zh: "套餐 B：鸡肉薯条套餐" },
    descriptions: { 
      en: "Chicken Fries + Flame Fries + soft Drink.", 
      zh: "鸡肉薯条 + 火焰辣薯条 + 软饮。" 
    },
    customType: null
  },
  {
    id: "combo-c",
    category: "combos",
    cal: "1590-1620 cal",
    basePrice: 18.59,
    comboLetter: "C",
    badge: { en: "Feast", zh: "双拼大餐" },
    names: { en: "Combo C: Chicken & Pop Combo", zh: "套餐 C：爆鸡炸鸡双拼" },
    descriptions: { 
      en: "2PC Chicken + 1 Pop Chicken (M) + 1 Flame Fries (M) + 1 Drink.", 
      zh: "2块炸鸡 + 1份爆米花鸡 (中) + 1份火焰薯条 (中) + 1杯饮料。" 
    },
    customType: "spiciness"
  },
  {
    id: "combo-d",
    category: "combos",
    cal: "935-965 cal",
    basePrice: 18.59,
    comboLetter: "D",
    badge: null,
    names: { en: "Combo D: Wings & Fries Combo", zh: "套餐 D：辣翅拼盘套餐" },
    descriptions: { 
      en: "4PC Spicy Chicken Wings + Chicken Fries + Flame Fries + soft Drink.", 
      zh: "4块香辣鸡翅 + 鸡肉薯条 + 火焰辣薯条 + 软饮。" 
    },
    customType: null
  },
  {
    id: "combo-e",
    category: "combos",
    cal: "1465-1495 cal",
    basePrice: 22.59,
    comboLetter: "E",
    badge: { en: "For 2", zh: "双人套餐" },
    names: { en: "Combo E: Wings Party Combo", zh: "套餐 E：鸡翅狂欢套餐" },
    descriptions: { 
      en: "10PC Spicy Chicken Wings + 1 Flame Fries (M) + 2 soft Drinks.", 
      zh: "10块香辣鸡翅 + 1份火焰辣薯条 (中) + 2杯软饮。" 
    },
    customType: null
  },
  {
    id: "combo-f",
    category: "combos",
    cal: "1720-1750 cal",
    basePrice: 25.99,
    comboLetter: "F",
    badge: { en: "For 2", zh: "双人套餐" },
    names: { en: "Combo F: Double Sandwich Combo", zh: "套餐 F：双人汉堡套餐" },
    descriptions: { 
      en: "2 Chicken Sandwiches + 1 Chicken Fries + 2 soft Drinks.", 
      zh: "2个经典鸡肉汉堡 + 1份鸡肉薯条 + 2杯软饮。" 
    },
    customType: "combo-sandwich"
  },
  {
    id: "combo-g",
    category: "combos",
    cal: "2260-2290 cal",
    basePrice: 34.59,
    comboLetter: "G",
    badge: { en: "Family Feast", zh: "家庭狂欢宴" },
    names: { en: "Combo G: Super Family Feast", zh: "套餐 G：超级家庭大餐" },
    descriptions: { 
      en: "2 Chicken Sandwiches + 1 Smash Chicken Cut + 1 Pop Chicken (M) + 1 Flame Fries (M) + 2 Drinks.", 
      zh: "2个经典鸡肉汉堡 + 1个轰炸大鸡排 + 1份爆米花鸡 (中) + 1份火焰薯条 (中) + 2杯饮料。" 
    },
    customType: "combo-sandwich"
  },
  {
    id: "combo-h",
    category: "combos",
    cal: "2495-2525 cal",
    basePrice: 38.59,
    comboLetter: "H",
    badge: { en: "Big Sharing", zh: "大容量聚会餐" },
    names: { en: "Combo H: Mega Chicken Bucket Combo", zh: "套餐 H：巨无霸炸鸡桶餐" },
    descriptions: { 
      en: "4PC Chicken + 12PC Spicy Chicken Wings + 1 Flame Fries (M) + 2 Drinks.", 
      zh: "4块炸鸡 + 12块香辣鸡翅 + 1份火焰辣薯条 (中) + 2杯饮料。" 
    },
    customType: "spiciness"
  }
];
