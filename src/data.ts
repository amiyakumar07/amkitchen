export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Starters" | "Main Course" | "Breads & Rice" | "Chinese" | "Desserts" | "Beverages";
  isVeg: boolean;
  isBestseller?: boolean;
  spiceLevel?: "Mild" | "Medium" | "Hot";
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
  platform: string;
}

export interface Photo {
  id: string;
  url: string;
  category: "all" | "Food" | "Restaurant" | "Tandoor";
  title: string;
  description: string;
}

export interface SignatureDish {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tagline: string;
  description: string;
  isVeg: boolean;
  chefNote: string;
  keyIngredients: string[];
}

export const businessDetails = {
  name: "Am Kitchen",
  tagline: "Fresh. Flavorful. Made with Love.",
  subHeadline: "Welcome to Am Kitchen, Lingaraj Nagar, Old Town, Bhubaneswar.",
  address: "Municipal Hospital Rd, Lingaraj Nagar, Old Town, Bhubaneswar, Odisha 751002",
  phone: "07978901811",
  displayPhone: "+91 79789 01811",
  whatsapp: "+917978901811",
  whatsappLink: "https://wa.me/917978901811?text=Hi%20Am%20Kitchen%2C%20I%20would%20like%20to%20place%20an%20order%20or%20reserve%20a%20table.",
  mapsLink: "https://maps.app.goo.gl/srEqmJidpMgVQE9t8",
  coordinates: {
    lat: 20.2393,
    lng: 85.8325
  },
  reviewsCount: 78,
  rating: 4.6,
  openingHours: "11:00 AM – 11:00 PM",
  hoursDetail: [
    { days: "Monday – Friday", timing: "11:00 AM – 11:00 PM" },
    { days: "Saturday & Sunday", timing: "11:00 AM – 11:00 PM" }
  ]
};

export const reviews: Review[] = [
  {
    name: "Subhashree Mohapatra",
    rating: 5,
    date: "1 week ago",
    comment: "The food here is simply outstanding! We ordered the Am Kitchen Special Mutton Curry with Butter Naan and Chicken Biryani. Everything tasted authentic, freshly cooked, and comforting. The dining space in Old Town is very clean and welcoming.",
    platform: "Google Reviews"
  },
  {
    name: "Rakesh Ranjan Sahoo",
    rating: 5,
    date: "2 weeks ago",
    comment: "A true hidden culinary gem in Lingaraj Nagar, Old Town. The Paneer Tikka was smoky and fresh straight from the clay tandoor, and the staff treated us with genuine warmth. Must-visit with family and friends!",
    platform: "Google Reviews"
  },
  {
    name: "Priyanka Nayak",
    rating: 5,
    date: "3 weeks ago",
    comment: "Great spot for both dine-in and quick takeaway. Generous portions, reasonable prices, and authentic flavors. Their Hakka noodles and Chicken lollipop were a huge hit with the kids.",
    platform: "Google Reviews"
  },
  {
    name: "Debabrata Mishra",
    rating: 4.5,
    date: "1 month ago",
    comment: "Exceptional tandoori kebabs and rich chicken gravies! The atmosphere is pleasant, air-conditioned, and right by Municipal Hospital Road. Quick service and courteous staff.",
    platform: "Google Reviews"
  },
  {
    name: "Smruti Rekha Das",
    rating: 5,
    date: "1 month ago",
    comment: "Authentic homestyle taste with top-tier hygiene. Dal Makhani and Garlic Butter Naan were melt-in-mouth good. Will definitely become our regular weekend dining destination.",
    platform: "Google Reviews"
  }
];

export const menuCategories = [
  { id: "Starters", name: "Starters & Tandoor" },
  { id: "Main Course", name: "Main Course Curries" },
  { id: "Breads & Rice", name: "Breads & Biryani" },
  { id: "Chinese", name: "Chinese Specials" },
  { id: "Desserts", name: "Sweet Desserts" },
  { id: "Beverages", name: "Beverages & Drinks" }
] as const;

export const signatureDishes: SignatureDish[] = [
  {
    id: "sig-1",
    name: "Am Kitchen Spl Mutton Curry",
    price: 320,
    category: "Main Course",
    image: "/unnamed (28).jpg",
    tagline: "Slow-Cooked Odia Heritage",
    description: "Tender locally-sourced mutton slow-cooked in a rustic, homestyle Odia gravy with freshly ground spices and mustard oil aroma.",
    isVeg: false,
    chefNote: "Simmered on low flame for 3 hours for deep bone-marrow flavor.",
    keyIngredients: ["Tender Local Mutton", "Stone-ground Garam Masala", "Mustard Oil", "Fresh Bay Leaves"]
  },
  {
    id: "sig-2",
    name: "Clay Oven Paneer Tikka",
    price: 220,
    category: "Starters",
    image: "/unnamed (20).jpg",
    tagline: "Smoky Clay Tandoor Char",
    description: "Soft cottage cheese cubes marinated in hung spiced yogurt and crushed ajwain, charred to golden perfection on live coals.",
    isVeg: true,
    chefNote: "Skewered with fresh bell peppers and red onions, served with mint dip.",
    keyIngredients: ["Fresh Cottage Cheese", "Hung Curd", "Degi Mirch", "Ajwain & Kasuri Methi"]
  },
  {
    id: "sig-3",
    name: "Murgh Malai Tikka",
    price: 260,
    category: "Starters",
    image: "/unnamed (27).jpg",
    tagline: "Silky Velvet Marinade",
    description: "Melt-in-mouth boneless chicken bites marinated with cashew paste, cardamom, pure cream, and mild green chillies.",
    isVeg: false,
    chefNote: "Glazed with pure butter right before serving hot to the table.",
    keyIngredients: ["Boneless Chicken", "Cashew Paste", "Heavy Cream", "Green Cardamom"]
  },
  {
    id: "sig-4",
    name: "Royal Chicken Dum Biryani",
    price: 210,
    category: "Breads & Rice",
    image: "/unnamed (28).jpg",
    tagline: "Aromatic Fragrance in Every Grain",
    description: "Aged long-grain Basmati rice layered with spiced marinated chicken, caramelized onions, saffron milk, and pure desi ghee.",
    isVeg: false,
    chefNote: "Sealed with dough on dum to lock in fragrant essences and succulent juices.",
    keyIngredients: ["Aged Basmati Rice", "Tender Chicken", "Saffron Strands", "Desi Ghee", "Biryani Spices"]
  },
  {
    id: "sig-5",
    name: "Classic Butter Chicken",
    price: 270,
    category: "Main Course",
    image: "/unnamed (27).jpg",
    tagline: "Velvety Tomato Cream Glaze",
    description: "Smoky tandoori chicken pieces simmered inside a velvety tomato, honey, and cashew gravy infused with fragrant kasuri methi.",
    isVeg: false,
    chefNote: "Balanced mildly sweet and tangy with generous dollops of butter.",
    keyIngredients: ["Charred Tandoori Chicken", "Ripe Vine Tomatoes", "Cashew Paste", "Farm Butter"]
  },
  {
    id: "sig-6",
    name: "Wok-Tossed Hakka Noodles",
    price: 140,
    category: "Chinese",
    image: "/unnamed (20).jpg",
    tagline: "High Flame Street Wok Style",
    description: "Fresh noodles tossed on roaring flame with crunchy julienned cabbage, capsicum, carrots, spring onions, and savory soy seasoning.",
    isVeg: true,
    chefNote: "Cooked dry and smokey with aromatic minced garlic and white pepper.",
    keyIngredients: ["Handmade Noodles", "Bell Peppers", "Scallions", "Dark Soy & Sesame Oil"]
  }
];

export const menuItems: MenuItem[] = [
  // --- STARTERS & TANDOOR ---
  {
    id: "s1",
    name: "Paneer Tikka (6 pcs)",
    price: 220,
    description: "Tender cottage cheese cubes marinated in spiced hung yogurt, charred to smoky perfection in our clay oven.",
    category: "Starters",
    isVeg: true,
    isBestseller: true,
    spiceLevel: "Medium"
  },
  {
    id: "s2",
    name: "Chicken Malai Tikka",
    price: 260,
    description: "Melt-in-mouth boneless chicken bites marinated with cashew paste, cardamom, and fresh cream.",
    category: "Starters",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Mild"
  },
  {
    id: "s3",
    name: "Crispy Chilli Baby Corn",
    price: 170,
    description: "Golden fried tender baby corn wok-tossed with crunchy bell peppers, spring onions, and light soy sauce.",
    category: "Starters",
    isVeg: true,
    spiceLevel: "Medium"
  },
  {
    id: "s4",
    name: "Chicken Lollipop (6 pcs)",
    price: 240,
    description: "Crisp-fried frenched chicken drumettes coated in a savory batter, served with spicy garlic schezwan dip.",
    category: "Starters",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Hot"
  },
  {
    id: "s5",
    name: "Dahi Ke Kebab",
    price: 190,
    description: "Delicate pan-fried patties with seasoned hung curd, fresh mint, and mild green chillies.",
    category: "Starters",
    isVeg: true,
    spiceLevel: "Mild"
  },
  {
    id: "s6",
    name: "Tandoori Chicken (Half)",
    price: 240,
    description: "Classic bone-in chicken baked with special red tandoori spices and charred over charcoal coals.",
    category: "Starters",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Medium"
  },

  // --- MAIN COURSE CURRIES ---
  {
    id: "m1",
    name: "Am Kitchen Special Mutton Curry",
    price: 320,
    description: "Our signature tender local mutton slow-cooked in a rustic, homestyle Odia gravy infused with whole spices.",
    category: "Main Course",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Hot"
  },
  {
    id: "m2",
    name: "Classic Butter Chicken",
    price: 270,
    description: "Smoky tandoori chicken pieces simmered in a rich, buttery tomato and cashew gravy with aromatic kasuri methi.",
    category: "Main Course",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Mild"
  },
  {
    id: "m3",
    name: "Paneer Butter Masala",
    price: 210,
    description: "Fresh cottage cheese cooked in a silky, mildly spiced tomato cream gravy with butter glaze.",
    category: "Main Course",
    isVeg: true,
    isBestseller: true,
    spiceLevel: "Mild"
  },
  {
    id: "m4",
    name: "Kadhai Paneer",
    price: 195,
    description: "Paneer tossed in a thick gravy of coarsely ground coriander seeds, dry red chillies, and crisp capsicum.",
    category: "Main Course",
    isVeg: true,
    spiceLevel: "Medium"
  },
  {
    id: "m5",
    name: "Kadhai Chicken",
    price: 240,
    description: "Juicy bone-in chicken pieces stir-fried with onion chunks, bell peppers, and fresh tawa spices.",
    category: "Main Course",
    isVeg: false,
    spiceLevel: "Hot"
  },
  {
    id: "m6",
    name: "Dal Makhani",
    price: 170,
    description: "Black lentils slow-simmered overnight over low heat, enriched with dairy butter and a delicate charcoal hint.",
    category: "Main Course",
    isVeg: true,
    isBestseller: true,
    spiceLevel: "Mild"
  },
  {
    id: "m7",
    name: "Dal Tadka",
    price: 130,
    description: "Yellow lentils tempered with ghee, roasted cumin, chopped garlic, fresh tomatoes, and green chillies.",
    category: "Main Course",
    isVeg: true,
    spiceLevel: "Medium"
  },
  {
    id: "m8",
    name: "Homestyle Chicken Curry",
    price: 220,
    description: "Traditional Odisha style comforting chicken curry prepared with potatoes and caramelized onion base.",
    category: "Main Course",
    isVeg: false,
    spiceLevel: "Medium"
  },

  // --- BREADS & BIRYANI ---
  {
    id: "b1",
    name: "Chicken Dum Biryani",
    price: 210,
    description: "Fragrant aged Basmati rice layered with spiced marinated chicken, caramelized onions, and saffron milk.",
    category: "Breads & Rice",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Medium"
  },
  {
    id: "b2",
    name: "Mutton Dum Biryani",
    price: 310,
    description: "Long-grain rice slow-cooked on dum with tender pieces of spiced mutton, boiled egg, and whole spices.",
    category: "Breads & Rice",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Medium"
  },
  {
    id: "b3",
    name: "Butter Naan",
    price: 50,
    description: "Soft and pillowy leavened flatbread freshly slapped on clay tandoor walls and brushed with pure butter.",
    category: "Breads & Rice",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "b4",
    name: "Garlic Butter Naan",
    price: 65,
    description: "Tandoor naan generously topped with crushed fresh garlic, coriander leaves, and golden melted butter.",
    category: "Breads & Rice",
    isVeg: true,
    isBestseller: true
  },
  {
    id: "b5",
    name: "Tandoori Roti / Butter Roti",
    price: 20,
    description: "Traditional whole-wheat flatbread roasted crisp on live charcoal tandoor.",
    category: "Breads & Rice",
    isVeg: true
  },
  {
    id: "b6",
    name: "Laccha Paratha",
    price: 55,
    description: "Flaky, multi-layered wheat bread rolled and griddled with pure desi ghee.",
    category: "Breads & Rice",
    isVeg: true
  },
  {
    id: "b7",
    name: "Jeera Rice",
    price: 120,
    description: "Fluffy steamed Basmati rice tempered with aromatic roasted royal cumin seeds and pure ghee.",
    category: "Breads & Rice",
    isVeg: true
  },

  // --- CHINESE ---
  {
    id: "c1",
    name: "Veg Hakka Noodles",
    price: 140,
    description: "Classic street-style noodles tossed on high flame with julienned cabbage, bell peppers, carrots, and scallions.",
    category: "Chinese",
    isVeg: true,
    isBestseller: true,
    spiceLevel: "Medium"
  },
  {
    id: "c2",
    name: "Chicken Schezwan Noodles",
    price: 190,
    description: "Wok-fried noodles tossed with spiced chicken shreds, garlic Schezwan chili paste, and veggies.",
    category: "Chinese",
    isVeg: false,
    spiceLevel: "Hot"
  },
  {
    id: "c3",
    name: "Chilli Paneer (Dry / Gravy)",
    price: 180,
    description: "Crispy battered paneer cubes wok-tossed in dark soy sauce, hot green chillies, and bell peppers.",
    category: "Chinese",
    isVeg: true,
    spiceLevel: "Hot"
  },
  {
    id: "c4",
    name: "Chilli Chicken (Dry / Gravy)",
    price: 220,
    description: "Boneless chicken bites tossed with ginger, garlic, capsicum, and hot Indo-Chinese sauces.",
    category: "Chinese",
    isVeg: false,
    isBestseller: true,
    spiceLevel: "Hot"
  },
  {
    id: "c5",
    name: "Veg Fried Rice",
    price: 140,
    description: "Fragrant rice stir-fried with fine-chopped vegetables, spring onions, and light soy drizzle.",
    category: "Chinese",
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
    name: "Traditional Odia Rasgulla (2 pcs)",
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
    description: "Freshly squeezed lemon juice with chilled sparkling soda, available sweet, salted, or mixed.",
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

export const photos: Photo[] = [
  {
    id: "photo-facade",
    url: "/am_kitchen_facade.jpg",
    category: "Restaurant",
    title: "Am Kitchen Front Entrance",
    description: "Warm and inviting storefront located in Lingaraj Nagar, Old Town, Bhubaneswar."
  },
  {
    id: "photo-night",
    url: "/am_kitchen_night.jpg",
    category: "Restaurant",
    title: "Evening Ambience",
    description: "Cozy exterior and glowing night ambience welcoming neighborhood diners to Am Kitchen."
  },
  {
    id: "photo-tandoor-1",
    url: "/unnamed (20).jpg",
    category: "Tandoor",
    title: "Clay Oven Paneer Tikka Platter",
    description: "Sizzling charcoal clay oven paneer tikka kebabs served with mint dip and fresh salad."
  },
  {
    id: "photo-tandoor-2",
    url: "/unnamed (27).jpg",
    category: "Tandoor",
    title: "Charcoal Chicken Tikka Skewers",
    description: "Fresh chicken tikka roasted over glowing charcoal embers in the open tandoor."
  },
  {
    id: "photo-curry-1",
    url: "/unnamed (28).jpg",
    category: "Food",
    title: "Rich Odia Gravy Curries",
    description: "Signature homestyle mutton and chicken curries prepared with aromatic local spices."
  },
  {
    id: "photo-dining",
    url: "/unnamed (16).jpg",
    category: "Restaurant",
    title: "Spotless AC Dining Hall",
    description: "Comfortable air-conditioned seating area designed for family get-togethers and celebrations."
  },
  {
    id: "photo-cooler",
    url: "/unnamed (26).jpg",
    category: "Food",
    title: "Fresh Mint & Guava Coolers",
    description: "Chilled hand-crafted beverages and mocktails to complement your spicy curries."
  },
  {
    id: "photo-smoothies",
    url: "/unnamed (29).jpg",
    category: "Food",
    title: "Special Smoothies & Shakes",
    description: "Refreshing thick fruit smoothies prepared fresh to order."
  }
];

export const whyChooseUs = [
  {
    id: "taste",
    title: "Great Taste & Secret Spices",
    description: "Time-tested recipes and aromatic spice blends that bring authentic, memorable flavors to every single plate.",
    icon: "Utensils",
    highlight: "Authentic Recipes"
  },
  {
    id: "quality",
    title: "100% Quality Ingredients",
    description: "Carefully sourced fresh local produce, tender cuts, and pure dairy prepared daily with zero artificial shortcuts.",
    icon: "ShieldCheck",
    highlight: "100% Fresh Daily"
  },
  {
    id: "ambience",
    title: "Clean & Cozy AC Ambience",
    description: "A spotless, air-conditioned dining hall with warm lighting and comfortable seating for families and friends.",
    icon: "Sparkles",
    highlight: "Hygienic Dining"
  },
  {
    id: "service",
    title: "Warm & Friendly Hospitality",
    description: "A friendly and attentive team happy to guide your food choices and ensure your visit is relaxed and enjoyable.",
    icon: "Smile",
    highlight: "Warm Hospitality"
  }
];
