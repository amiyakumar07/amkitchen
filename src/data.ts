export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Starters" | "Main Course" | "Breads and Rice" | "Desserts" | "Beverages";
  isVeg: boolean;
  isBestseller?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "food" | "ambience";
  alt: string;
}

// ============================================================================
// BUSINESS DETAILS (Exact values provided for Am Kitchen)
// ============================================================================
export const businessDetails = {
  name: "Am Kitchen",
  category: "Restaurant",
  headline: "Fresh. Flavorful. Made with Love.",
  subHeadline: "Welcome to Am Kitchen, Lingaraj Nagar, Bhubaneswar.",
  address: "Municipal Hospital Rd, Lingaraj Nagar, Old Town, Bhubaneswar, Odisha 751002",
  phone: "07978901811",
  displayPhone: "+91 79789 01811",
  rating: 4.6,
  reviewsCount: 78,
  googleMapsLink: "https://maps.app.goo.gl/srEqmJidpMgVQE9t8",
  coordinates: {
    lat: 20.2393,
    lng: 85.8325
  },
  whatsappLink: "https://wa.me/917978901811?text=Hi%20Am%20Kitchen%2C%20I%27d%20like%20to%20know%20more.",
  // PLACEHOLDER BUSINESS HOURS (Easy to edit)
  hours: [
    { days: "Monday – Friday", timing: "11:00 AM – 11:00 PM" },
    { days: "Saturday & Sunday", timing: "10:30 AM – 11:30 PM" }
  ]
};

// ============================================================================
// MENU CATEGORIES
// ============================================================================
export const menuCategories = [
  { id: "Starters", label: "Starters", icon: "🍢" },
  { id: "Main Course", label: "Main Course", icon: "🍛" },
  { id: "Breads and Rice", label: "Breads & Rice", icon: "🍚" },
  { id: "Desserts", label: "Desserts", icon: "🍨" },
  { id: "Beverages", label: "Beverages", icon: "🥤" }
] as const;

// ============================================================================
// SAMPLE MENU ITEMS (Realistic placeholder content - easy to update or replace)
// ============================================================================
export const sampleMenuItems: MenuItem[] = [
  // --- STARTERS ---
  {
    id: "s1",
    name: "Paneer Tikka",
    price: 220,
    description: "Tender cottage cheese cubes marinated in spiced hung yogurt, charred to smoky perfection in our clay oven.",
    category: "Starters",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "s2",
    name: "Chicken Malai Tikka",
    price: 260,
    description: "Melt-in-mouth boneless chicken bites marinated with cashew paste, cardamom, and fresh cream.",
    category: "Starters",
    isVeg: false,
    isBestseller: true
  },
  {
    id: "s3",
    name: "Crispy Chilli Baby Corn",
    price: 170,
    description: "Golden fried tender baby corn wok-tossed with crunchy bell peppers, spring onions, and light soy sauce.",
    category: "Starters",
    isVeg: true
  },
  {
    id: "s4",
    name: "Chicken Lollipop (6 pcs)",
    price: 240,
    description: "Crisp-fried frenched chicken drumettes coated in a savory batter, served with spicy garlic schezwan dip.",
    category: "Starters",
    isVeg: false,
    isBestseller: true
  },
  {
    id: "s5",
    name: "Veg Hakka Noodles",
    price: 140,
    description: "Classic street-style noodles tossed on high flame with julienned cabbage, bell peppers, carrots, and scallions.",
    category: "Starters",
    isVeg: true
  },
  {
    id: "s6",
    name: "Dahi Ke Kebab",
    price: 190,
    description: "Delicate pan-fried patties with seasoned hung curd, fresh mint, and mild green chillies.",
    category: "Starters",
    isVeg: true
  },

  // --- MAIN COURSE ---
  {
    id: "m1",
    name: "Am Kitchen Special Mutton Curry",
    price: 320,
    description: "Our signature tender local mutton slow-cooked in a rustic, homestyle Odia gravy infused with whole spices.",
    category: "Main Course",
    isVeg: false,
    isBestseller: true
  },
  {
    id: "m2",
    name: "Classic Butter Chicken",
    price: 270,
    description: "Smoky tandoori chicken pieces simmered in a rich, buttery tomato and cashew gravy with aromatic kasuri methi.",
    category: "Main Course",
    isVeg: false,
    isBestseller: true
  },
  {
    id: "m3",
    name: "Paneer Butter Masala",
    price: 210,
    description: "Fresh cottage cheese cooked in a silky, mildly spiced tomato cream gravy with butter glaze.",
    category: "Main Course",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "m4",
    name: "Kadhai Paneer",
    price: 195,
    description: "Paneer tossed in a thick gravy of coarsely ground coriander seeds, dry red chillies, and crisp capsicum.",
    category: "Main Course",
    isVeg: true
  },
  {
    id: "m5",
    name: "Kadhai Chicken",
    price: 240,
    description: "Juicy bone-in chicken pieces stir-fried with onion chunks, bell peppers, and fresh tawa spices.",
    category: "Main Course",
    isVeg: false
  },
  {
    id: "m6",
    name: "Dal Makhani",
    price: 170,
    description: "Black lentils slow-simmered overnight over low heat, enriched with dairy butter and a delicate charcoal hint.",
    category: "Main Course",
    isVeg: true
  },
  {
    id: "m7",
    name: "Dal Tadka",
    price: 130,
    description: "Yellow lentils tempered with ghee, roasted cumin, chopped garlic, fresh tomatoes, and green chillies.",
    category: "Main Course",
    isVeg: true
  },

  // --- BREADS AND RICE ---
  {
    id: "b1",
    name: "Chicken Dum Biryani",
    price: 210,
    description: "Fragrant aged Basmati rice layered with spiced marinated chicken, caramelized onions, and saffron milk.",
    category: "Breads and Rice",
    isVeg: false,
    isBestseller: true
  },
  {
    id: "b2",
    name: "Mutton Dum Biryani",
    price: 310,
    description: "Long-grain rice slow-cooked on dum with tender pieces of spiced mutton, boiled egg, and whole spices.",
    category: "Breads and Rice",
    isVeg: false,
    isBestseller: true
  },
  {
    id: "b3",
    name: "Butter Naan",
    price: 50,
    description: "Soft and pillowy leavened flatbread freshly slapped on the clay tandoor walls and brushed with pure butter.",
    category: "Breads and Rice",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "b4",
    name: "Garlic Butter Naan",
    price: 65,
    description: "Tandoor naan generously topped with crushed fresh garlic, coriander leaves, and golden melted butter.",
    category: "Breads and Rice",
    isVeg: true
  },
  {
    id: "b5",
    name: "Tandoori Roti / Butter Roti",
    price: 20,
    description: "Traditional whole-wheat flatbread roasted crisp on live charcoal tandoor.",
    category: "Breads and Rice",
    isVeg: true
  },
  {
    id: "b6",
    name: "Laccha Paratha",
    price: 55,
    description: "Flaky, multi-layered wheat bread rolled and griddled with pure ghee.",
    category: "Breads and Rice",
    isVeg: true
  },
  {
    id: "b7",
    name: "Jeera Rice",
    price: 120,
    description: "Fluffy steamed Basmati rice tempered with aromatic roasted royal cumin seeds and pure ghee.",
    category: "Breads and Rice",
    isVeg: true
  },

  // --- DESSERTS ---
  {
    id: "d1",
    name: "Gulab Jamun (2 pcs)",
    price: 70,
    description: "Warm, melt-in-mouth milk dumplings deep-fried and soaked in fragrant rose-cardamom sugar syrup.",
    category: "Desserts",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "d2",
    name: "Traditional Rasgulla (2 pcs)",
    price: 60,
    description: "Soft, spongy cottage cheese spheres soaked in light, pure cardamom syrup, an Odisha classic.",
    category: "Desserts",
    isVeg: true
  },
  {
    id: "d3",
    name: "Matka Kulfi",
    price: 80,
    description: "Slow-reduced rich milk ice cream infused with saffron strands, crushed pistachios, and almonds in a clay pot.",
    category: "Desserts",
    isVeg: true
  },
  {
    id: "d4",
    name: "Sizzling Brownie with Ice Cream",
    price: 140,
    description: "Warm fudge chocolate walnut brownie served on a hot sizzler plate with a scoop of vanilla ice cream.",
    category: "Desserts",
    isVeg: true
  },

  // --- BEVERAGES ---
  {
    id: "v1",
    name: "Masala Chaas (Spiced Buttermilk)",
    price: 50,
    description: "Cooling churned yogurt blended with roasted cumin, rock salt, fresh mint, and coriander leaves.",
    category: "Beverages",
    isVeg: true
  },
  {
    id: "v2",
    name: "Sweet Lassi",
    price: 70,
    description: "Thick, creamy yogurt churned sweet, topped with a dollop of malai and crushed dry fruits.",
    category: "Beverages",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "v3",
    name: "Fresh Lime Soda",
    price: 60,
    description: "Freshly squeezed lemon juice with chilled sparkling soda, available in sweet, salted, or mixed.",
    category: "Beverages",
    isVeg: true
  },
  {
    id: "v4",
    name: "Special Masala Chai",
    price: 30,
    description: "Strong milk tea brewed with crushed ginger, green cardamom, and aromatic cloves.",
    category: "Beverages",
    isVeg: true
  },
  {
    id: "v5",
    name: "Cold Coffee with Ice Cream",
    price: 95,
    description: "Chilled blended coffee served tall with a rich vanilla ice cream scoop and chocolate drizzle.",
    category: "Beverages",
    isVeg: true
  }
];

// ============================================================================
// WHY CHOOSE US (4 Key cards as requested)
// ============================================================================
export const whyChooseUs = [
  {
    id: "taste",
    title: "Great Taste",
    description: "Time-tested recipes and aromatic spice blends that bring authentic, memorable flavors to every single plate.",
    icon: "Utensils",
    highlight: "Authentic Recipes"
  },
  {
    id: "quality",
    title: "Quality Ingredients",
    description: "Carefully sourced fresh local produce, tender cuts, and pure dairy prepared daily with zero artificial shortcuts.",
    icon: "ShieldCheck",
    highlight: "100% Fresh Daily"
  },
  {
    id: "ambience",
    title: "Clean & Cozy Ambience",
    description: "A spotless, air-conditioned dining hall with warm lighting and comfortable seating for families and friends.",
    icon: "Sparkles",
    highlight: "Hygienic Dining"
  },
  {
    id: "service",
    title: "Friendly Service",
    description: "A warm and attentive team happy to guide your food choices and ensure your visit is relaxed and enjoyable.",
    icon: "Smile",
    highlight: "Warm Hospitality"
  }
];

// ============================================================================
// SAMPLE REVIEWS (Clearly marked as sample testimonials to be updated with real ones)
// ============================================================================
export const sampleReviews: Review[] = [
  {
    id: "r1",
    name: "Subhashree Mohapatra",
    rating: 5,
    date: "A week ago",
    comment: "The food here is delicious! We ordered the Mutton Curry with Butter Naan and Chicken Biryani. Everything tasted homely and was cooked to perfection. The dining space is very clean and welcoming."
  },
  {
    id: "r2",
    name: "Rakesh Ranjan Sahoo",
    rating: 5,
    date: "2 weeks ago",
    comment: "A hidden gem in Old Town, Bhubaneswar. The Paneer Tikka was smoky and fresh, and the staff treated us with so much warmth. Highly recommend visiting with family!"
  },
  {
    id: "r3",
    name: "Priyanka Nayak",
    rating: 5,
    date: "A month ago",
    comment: "Great place for lunch or dinner in Lingaraj Nagar. Quick service, reasonable prices, and authentic flavors. Their Hakka noodles and Chicken lollipop were loved by the kids."
  }
];

// ============================================================================
// GALLERY IMAGES (Curated food & restaurant ambience images)
// ============================================================================
export const galleryImages: GalleryImage[] = [
  {
    id: "g2",
    url: "/unnamed (1).jpg",
    title: "Charcoal Tandoori Kebab Platter",
    category: "food",
    alt: "Sizzling charcoal clay oven tandoori chicken and paneer kebabs"
  },
  {
    id: "g4",
    url: "/unnamed (5).jpg",
    title: "Fragrant Dum Biryani & Naan",
    category: "food",
    alt: "Slow-cooked aromatic basmati rice dum biryani with butter naans"
  },
  {
    id: "g5",
    url: "/unnamed (20).jpg",
    title: "Warm Evening Ambience",
    category: "ambience",
    alt: "Inviting evening lights and pleasant atmosphere at Am Kitchen"
  },
  {
    id: "g6",
    url: "/unnamed (3).jpg",
    title: "Homestyle Rich Gravy Curries",
    category: "food",
    alt: "Rich mutton and chicken masala curries with fresh garnishes"
  },
  {
    id: "g7",
    url: "/am_kitchen_facade.jpg",
    title: "Am Kitchen Storefront & Entrance",
    category: "ambience",
    alt: "Storefront and entrance of Am Kitchen restaurant with Indian, Chinese & Tandoori sign"
  },
  {
    id: "g8",
    url: "/unnamed (6).jpg",
    title: "Wok-Tossed Hakka Noodles & Sizzlers",
    category: "food",
    alt: "Stir-fried Hakka noodles with crunchy vegetables and chilli chicken"
  }
];
