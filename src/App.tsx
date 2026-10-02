import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Utensils, 
  Heart, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Smile, 
  Navigation, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Menu as MenuIcon, 
  Send, 
  MessageCircle,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  CalendarCheck,
  Calendar,
  Users
} from "lucide-react";
import { 
  businessDetails, 
  menuCategories, 
  sampleMenuItems, 
  whyChooseUs, 
  sampleReviews, 
  galleryImages, 
  MenuItem,
  GalleryImage
} from "./data";
import nightEntranceImg from "./assets/images/am_kitchen_night_1790931337063.jpg";

export default function App() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Menu Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>("Starters");

  // Gallery Lightbox State
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Table Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: new Date().toISOString().split("T")[0],
    time: "19:30",
    seatingPreference: "AC Dining Hall"
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parallax Scroll Tracking
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 40);

      // Active Section Tracker for Smooth Navigation
      const sections = ["home", "about", "menu", "why-us", "gallery", "reviews", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll Helper
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Lightbox Navigation Controls
  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => 
        prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => 
        prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Contact Form Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  // Helper icon renderer for Why Choose Us
  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils":
        return <Utensils className="w-6 h-6 text-mango" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-leaf" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-mango" />;
      case "Smile":
        return <Smile className="w-6 h-6 text-leaf" />;
      default:
        return <Sparkles className="w-6 h-6 text-mango" />;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-espresso selection:bg-mango/30 flex flex-col font-sans">

      {/* ========================================================================= */}
      {/* 1. STICKY HEADER                                                          */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-espresso/95 backdrop-blur-md shadow-lg py-3 text-cream border-b border-mango/20"
            : "bg-gradient-to-b from-espresso/90 to-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <div 
            onClick={() => scrollTo("home")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-mango flex items-center justify-center text-espresso font-black shadow-md group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5 text-espresso" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white block leading-none">
                Am Kitchen
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-mango block mt-1">
                Bhubaneswar
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "menu", label: "Menu" },
              { id: "why-us", label: "Why Us" },
              { id: "gallery", label: "Gallery" },
              { id: "reviews", label: "Reviews" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? "text-mango font-bold bg-white/10"
                    : "text-white/85 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-mango rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Header Action CTA: Call Now */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${businessDetails.phone}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-mango hover:bg-mango-light text-espresso font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4 text-espresso fill-espresso" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 w-full bg-espresso text-cream z-30 shadow-2xl border-b border-mango/20 lg:hidden overflow-y-auto max-h-[calc(100vh-68px)]"
          >
            <div className="px-5 py-6 space-y-2">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Am Kitchen" },
                { id: "menu", label: "Explore Menu" },
                { id: "why-us", label: "Why Choose Us" },
                { id: "gallery", label: "Photo Gallery" },
                { id: "reviews", label: "Customer Reviews" },
                { id: "contact", label: "Location & Contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? "bg-mango text-espresso font-bold"
                      : "text-cream/90 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-xl bg-mango text-espresso font-bold text-base shadow-md active:scale-95 transition-transform cursor-pointer"
                >
                  <CalendarCheck className="w-5 h-5 text-espresso" />
                  <span>Book Table</span>
                </button>
                <a
                  href={`tel:${businessDetails.phone}`}
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm shadow-sm active:scale-95 transition-transform"
                >
                  <Phone className="w-4 h-4 fill-mango text-mango" />
                  <span>Call {businessDetails.phone}</span>
                </a>
                <a
                  href={businessDetails.googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 font-medium text-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-mango" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">

        {/* ========================================================================= */}
        {/* 2. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section
          id="home"
          className="relative min-h-[620px] h-[92vh] flex items-center justify-center overflow-hidden bg-espresso text-white"
        >
          {/* Full-width storefront background image with parallax & dark overlay */}
          <div className="absolute inset-0 z-0">
            <motion.img
              style={{ y: scrollY * 0.2 }}
              src="/am_kitchen_facade.jpg"
              alt="Am Kitchen Restaurant Storefront in Old Town Bhubaneswar"
              className="w-full h-full object-cover object-center opacity-75 scale-105 pointer-events-none"
            />
            {/* Rich gradient overlay with espresso tones keeping text readable while displaying facade */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/65 to-espresso/45" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Google Rating Badge */}
              <a
                href={businessDetails.googleMapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 text-xs sm:text-sm font-medium text-cream shadow-md"
              >
                <span className="flex items-center text-mango font-bold space-x-1">
                  <span>{businessDetails.rating}</span>
                  <Star className="w-4 h-4 fill-mango text-mango" />
                </span>
                <span className="text-white/60">·</span>
                <span>rated on Google</span>
                <span className="text-white/60">·</span>
                <span className="text-mango-light font-medium">{businessDetails.reviewsCount} reviews</span>
              </a>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white leading-tight">
                Fresh. Flavorful. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mango via-mango-light to-yellow-200">
                  Made with Love.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed font-normal">
                {businessDetails.subHeadline} Serving authentic, comforting meals prepared fresh every day for our neighborhood.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-mango hover:bg-mango-light text-espresso font-bold text-base sm:text-lg shadow-xl hover:shadow-mango/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <CalendarCheck className="w-5 h-5 text-espresso" />
                  <span>Book Table</span>
                </button>
                <a
                  href={businessDetails.googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm font-semibold text-base sm:text-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-5 h-5 text-mango" />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom fade into the off-white background */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
        </section>

        {/* ========================================================================= */}
        {/* 3. ABOUT SECTION                                                          */}
        {/* ========================================================================= */}
        <section id="about" className="py-20 sm:py-28 bg-cream relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Story Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-mango-dark inline-flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-mango inline-block" />
                    <span>Our Story</span>
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-espresso tracking-tight leading-tight">
                    A Local Favorite in Old Town, Bhubaneswar
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-espresso/80 leading-relaxed font-normal">
                  Located along Municipal Hospital Road in Lingaraj Nagar, <strong>Am Kitchen</strong> was built with a simple mission: to serve honest, flavorful, and freshly prepared food that feels like home.
                </p>

                <p className="text-base sm:text-lg text-espresso/80 leading-relaxed font-normal">
                  Whether you are dropping by for a quick lunch, picking up a family dinner, or dining in with close friends, our kitchen focuses on clean preparation, carefully balanced spices, and attentive, friendly service every single day.
                </p>

                {/* 3 Highlight Icons as requested */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-cream-soft/80 p-5 rounded-2xl border border-mango/20 space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-leaf/10 text-leaf flex items-center justify-center mb-1">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-espresso">
                      Fresh Ingredients
                    </h3>
                    <p className="text-xs text-espresso/70 leading-relaxed">
                      Handpicked daily produce and quality spices with zero shortcuts.
                    </p>
                  </div>

                  <div className="bg-cream-soft/80 p-5 rounded-2xl border border-mango/20 space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-mango/15 text-mango-dark flex items-center justify-center mb-1">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-espresso">
                      Great Taste
                    </h3>
                    <p className="text-xs text-espresso/70 leading-relaxed">
                      Homely, balanced flavors that keep you coming back for more.
                    </p>
                  </div>

                  <div className="bg-cream-soft/80 p-5 rounded-2xl border border-mango/20 space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-mango/15 text-mango-dark flex items-center justify-center mb-1">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-espresso">
                      Loved by Locals
                    </h3>
                    <p className="text-xs text-espresso/70 leading-relaxed">
                      A trusted neighborhood dining spot with genuine Odia warmth.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => scrollTo("menu")}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-espresso hover:text-mango-dark transition-colors group cursor-pointer"
                  >
                    <span>View our menu offerings</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-mango" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Image with Warm Border */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-mango rounded-3xl rotate-2 group-hover:rotate-1 transition-transform duration-300 pointer-events-none opacity-40" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-espresso">
                  <img
                    src={nightEntranceImg}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/am_kitchen_night.jpg";
                    }}
                    alt="Am Kitchen Restaurant illuminated night entrance and welcoming dining hall in Old Town Bhubaneswar"
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-espresso via-espresso/70 to-transparent text-white">
                    <p className="text-sm font-bold font-serif">Welcoming Evening Ambience</p>
                    <p className="text-xs text-cream/80">Lingaraj Nagar, Old Town, Bhubaneswar</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MENU SECTION (Tabbed with realistic sample items)                      */}
        {/* ========================================================================= */}
        <section id="menu" className="py-20 sm:py-28 bg-cream-soft/50 relative border-y border-mango/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-mango-dark inline-flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-mango inline-block" />
                <span>Our Offerings</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-espresso tracking-tight">
                Explore Our Menu
              </h2>
              <p className="max-w-xl mx-auto text-espresso/70 text-sm sm:text-base leading-relaxed">
                Prepared hot and fresh to order. Browse our popular starters, comforting main curries, aromatic biryanis, and sweet treats.
              </p>
            </div>

            {/* Menu Tabs */}
            <div className="flex justify-center mb-10 overflow-x-auto pb-2 hide-scrollbar">
              <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-mango/20 flex space-x-1">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shrink-0 cursor-pointer flex items-center space-x-1.5 ${
                      selectedCategory === category.id
                        ? "bg-mango text-espresso font-bold shadow-md"
                        : "text-espresso/75 hover:text-espresso hover:bg-cream-soft"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {sampleMenuItems
                  .filter((item) => item.category === selectedCategory)
                  .map((item: MenuItem) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="bg-white p-6 rounded-2xl border border-mango/15 hover:border-mango/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center space-x-2">
                            {/* Veg / Non-Veg Indicator Dot */}
                            <span 
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                item.isVeg ? "border-leaf" : "border-red-600"
                              }`}
                              title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                            >
                              <span className={`w-2 h-2 rounded-full ${
                                item.isVeg ? "bg-leaf" : "bg-red-600"
                              }`} />
                            </span>
                            
                            <h3 className="font-serif font-bold text-lg text-espresso group-hover:text-mango-dark transition-colors">
                              {item.name}
                            </h3>
                          </div>

                          <span className="font-mono font-bold text-lg text-espresso shrink-0">
                            ₹{item.price}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-espresso/70 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-espresso/5 flex items-center justify-between">
                        {item.isBestseller ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-mango/15 text-mango-dark">
                            ⭐ Popular
                          </span>
                        ) : (
                          <span className="text-[10px] text-espresso/40 uppercase font-mono">
                            Am Kitchen Special
                          </span>
                        )}

                        <a
                          href={`https://wa.me/917978901811?text=Hi%20Am%20Kitchen%2C%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(item.name)}!`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-mango-dark hover:text-espresso flex items-center space-x-1 transition-colors"
                        >
                          <span>Order on WhatsApp</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>

            {/* Note about Sample Content */}
            <div className="mt-12 text-center">
              <p className="text-xs text-espresso/60 max-w-lg mx-auto">
                * Prices and seasonal dish availability may vary. Call our team directly at <a href={`tel:${businessDetails.phone}`} className="font-bold underline text-espresso">{businessDetails.phone}</a> for daily specials and party orders.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY CHOOSE US (4 Cards)                                                */}
        {/* ========================================================================= */}
        <section id="why-us" className="py-20 sm:py-28 bg-cream relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-mango-dark inline-flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-mango inline-block" />
                <span>The Am Kitchen Promise</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-espresso tracking-tight">
                Why Diners Choose Us
              </h2>
              <p className="max-w-xl mx-auto text-espresso/70 text-sm sm:text-base leading-relaxed">
                We believe in simple, clean cooking, authentic taste, and treating every guest like family.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white p-7 rounded-3xl border border-mango/15 hover:border-mango/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-cream-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                      {renderFeatureIcon(feature.icon)}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-leaf font-bold block">
                      {feature.highlight}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-espresso">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-espresso/75 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. GALLERY SECTION (Grid of 8 images with Lightbox)                       */}
        {/* ========================================================================= */}
        <section id="gallery" className="py-20 sm:py-28 bg-espresso text-cream relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-mango inline-flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-mango inline-block" />
                <span>Visual Tour</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
                Food & Ambience Gallery
              </h2>
              <p className="max-w-md mx-auto text-cream/70 text-sm sm:text-base">
                Click any image to view in fullscreen with details.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryImages.map((image: GalleryImage, index: number) => (
                <div
                  key={image.id}
                  onClick={() => setActiveImageIndex(index)}
                  className="relative group h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-espresso-light border border-white/10"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-mango">
                      {image.category === "food" ? "Dish" : "Ambience"}
                    </span>
                    <h4 className="font-serif font-bold text-white text-base leading-tight mt-1">
                      {image.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIndex(null)}
              className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-between p-4 sm:p-8 backdrop-blur-md"
            >
              <div className="w-full max-w-4xl flex items-center justify-between text-white py-2">
                <span className="text-xs font-mono opacity-70">
                  {activeImageIndex + 1} of {galleryImages.length}
                </span>
                <button
                  onClick={() => setActiveImageIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-auto">
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:-left-12 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <img
                  src={galleryImages[activeImageIndex].url}
                  alt={galleryImages[activeImageIndex].alt}
                  className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/15"
                />

                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:-right-12 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="w-full max-w-2xl text-center text-white/90 pt-3">
                <h4 className="font-serif font-bold text-lg text-mango">
                  {galleryImages[activeImageIndex].title}
                </h4>
                <p className="text-xs text-white/70 mt-1">
                  {galleryImages[activeImageIndex].alt}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Booking Modal */}
        <AnimatePresence>
          {isBookingModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
              onClick={() => setIsBookingModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-mango/20 my-8 text-espresso relative"
              >
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-espresso/5 text-espresso/70 hover:text-espresso transition-colors cursor-pointer"
                  aria-label="Close booking modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-mango/20 text-espresso flex items-center justify-center">
                    <CalendarCheck className="w-6 h-6 text-espresso" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-espresso">
                      Book a Table
                    </h3>
                    <p className="text-xs text-espresso/70">
                      Am Kitchen · Lingaraj Nagar, Bhubaneswar
                    </p>
                  </div>
                </div>

                {bookingSuccess ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-leaf/15 text-leaf rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-espresso">
                        Table Request Sent!
                      </h4>
                      <p className="text-sm text-espresso/80 mt-1">
                        Thank you, {bookingForm.name || "Guest"}. We have received your booking request for {bookingForm.guests} guests on {bookingForm.date} at {bookingForm.time}.
                      </p>
                    </div>

                    <div className="bg-cream-soft p-4 rounded-2xl text-xs space-y-1 text-espresso/85 border border-mango/15">
                      <p><strong>Seating:</strong> {bookingForm.seatingPreference}</p>
                      <p><strong>Contact:</strong> {bookingForm.phone || businessDetails.phone}</p>
                      <p><strong>Location:</strong> Old Town, Lingaraj Nagar</p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://wa.me/917978901811?text=${encodeURIComponent(
                          `Hi Am Kitchen, I just submitted a table reservation for ${bookingForm.guests} people on ${bookingForm.date} at ${bookingForm.time}. Name: ${bookingForm.name}, Phone: ${bookingForm.phone}. Please confirm.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Confirm on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          setBookingSuccess(false);
                          setIsBookingModalOpen(false);
                        }}
                        className="py-3 px-5 rounded-xl bg-espresso hover:bg-espresso/90 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSuccess(true);
                    }}
                    className="space-y-4"
                  >
                    {/* Number of Guests */}
                    <div>
                      <label className="text-xs font-bold text-espresso block mb-2">
                        Number of Guests
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {["1-2", "3-4", "5-6", "7-8", "8+"].map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setBookingForm({ ...bookingForm, guests: g })}
                            className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              bookingForm.guests === g
                                ? "bg-mango text-espresso border-mango shadow-sm"
                                : "bg-cream/40 text-espresso/80 border-espresso/15 hover:border-mango"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-espresso block mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango text-xs bg-cream/30 text-espresso outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-espresso block mb-1">
                          Preferred Time
                        </label>
                        <select
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango text-xs bg-cream/30 text-espresso outline-none cursor-pointer"
                        >
                          <option value="12:30">12:30 PM (Lunch)</option>
                          <option value="13:30">01:30 PM (Lunch)</option>
                          <option value="14:30">02:30 PM (Lunch)</option>
                          <option value="19:00">07:00 PM (Dinner)</option>
                          <option value="19:30">07:30 PM (Dinner)</option>
                          <option value="20:00">08:00 PM (Dinner)</option>
                          <option value="20:30">08:30 PM (Dinner)</option>
                          <option value="21:00">09:00 PM (Dinner)</option>
                          <option value="21:30">09:30 PM (Dinner)</option>
                        </select>
                      </div>
                    </div>

                    {/* Seating Preference */}
                    <div>
                      <label className="text-xs font-bold text-espresso block mb-1">
                        Seating Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["AC Dining Hall", "Family Section"].map((pref) => (
                          <button
                            type="button"
                            key={pref}
                            onClick={() => setBookingForm({ ...bookingForm, seatingPreference: pref })}
                            className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              bookingForm.seatingPreference === pref
                                ? "bg-espresso text-white border-espresso"
                                : "bg-cream/40 text-espresso/80 border-espresso/15 hover:border-mango"
                            }`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-espresso block mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Subhashree"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango text-xs bg-cream/30 text-espresso outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-espresso block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="07978901811"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango text-xs bg-cream/30 text-espresso outline-none"
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-mango hover:bg-mango-light text-espresso font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        <span>Reserve Table</span>
                      </button>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <a
                          href={`https://wa.me/917978901811?text=${encodeURIComponent(
                            `Hi Am Kitchen, I want to book a table for ${bookingForm.guests} people on ${bookingForm.date} at ${bookingForm.time}. Name: ${bookingForm.name || "Customer"}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-green-600 text-green-600" />
                          <span>WhatsApp Booking</span>
                        </a>

                        <a
                          href={`tel:${businessDetails.phone}`}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-espresso/5 hover:bg-espresso/10 border border-espresso/15 text-espresso text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 fill-espresso" />
                          <span>Direct Call</span>
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 7. REVIEWS SECTION (Highlight 4.6 Stars, 78 Reviews)                      */}
        {/* ========================================================================= */}
        <section id="reviews" className="py-20 sm:py-28 bg-cream relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-4 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-mango-dark inline-flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-mango inline-block" />
                <span>Guest Experiences</span>
              </span>

              {/* Highlight Badge */}
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-soft border border-mango/30 shadow-sm">
                <div className="flex items-center text-mango space-x-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-mango text-mango" />
                  ))}
                </div>
                <span className="font-bold text-espresso text-sm sm:text-base">
                  {businessDetails.rating} ★ on Google ({businessDetails.reviewsCount} reviews)
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-espresso tracking-tight">
                What Diners Are Saying
              </h2>
            </div>

            {/* 3 Sample Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-7 rounded-3xl border border-mango/15 hover:border-mango/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1 text-mango">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <Star
                          key={st}
                          className={`w-4 h-4 ${st <= review.rating ? "fill-mango text-mango" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-espresso/80 leading-relaxed font-normal italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-espresso/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-espresso">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-espresso/50 font-mono mt-0.5">
                        {review.date}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-leaf bg-leaf/10 px-2 py-0.5 rounded">
                      Google Review
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action button: Read our reviews on Google */}
            <div className="mt-12 text-center">
              <a
                href={businessDetails.googleMapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-espresso hover:bg-espresso-light text-white font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <span>Read our reviews on Google</span>
                <ExternalLink className="w-4 h-4 text-mango" />
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CONTACT AND LOCATION SECTION                                           */}
        {/* ========================================================================= */}
        <section id="contact" className="py-20 sm:py-28 bg-cream-soft/40 relative border-t border-mango/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Contact Details, Hours & Form */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-mango-dark inline-flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-mango inline-block" />
                    <span>Get in Touch</span>
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-espresso tracking-tight">
                    Visit or Contact Us
                  </h2>
                  <p className="text-sm sm:text-base text-espresso/75 leading-relaxed">
                    Have questions about our daily dishes, catering, or table availability? We are here to help.
                  </p>
                </div>

                {/* Details Cards */}
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-mango/15 flex items-start space-x-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-mango/15 text-mango-dark flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-espresso">Address</h4>
                      <p className="text-xs sm:text-sm text-espresso/80 mt-1 leading-relaxed">
                        {businessDetails.address}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-mango/15 flex items-start space-x-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-mango/15 text-mango-dark flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-espresso">Phone (Click to call)</h4>
                      <a
                        href={`tel:${businessDetails.phone}`}
                        className="text-base font-bold text-mango-dark hover:underline block mt-1"
                      >
                        {businessDetails.phone}
                      </a>
                      <p className="text-xs text-espresso/60 mt-0.5">Available during business hours</p>
                    </div>
                  </div>

                  {/* Business Hours Block */}
                  <div className="bg-white p-5 rounded-2xl border border-mango/15 flex items-start space-x-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-leaf/10 text-leaf flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="w-full">
                      <h4 className="font-serif font-bold text-base text-espresso">Business Hours</h4>
                      <div className="mt-2 space-y-1 text-xs sm:text-sm text-espresso/80">
                        {businessDetails.hours.map((h, i) => (
                          <div key={i} className="flex justify-between items-center py-0.5 border-b border-espresso/5 last:border-none">
                            <span className="font-medium">{h.days}</span>
                            <span className="font-mono font-bold text-espresso">{h.timing}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simple Contact Form */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mango/20 shadow-md">
                  <h3 className="font-serif font-bold text-xl text-espresso mb-1">
                    Send a Message
                  </h3>
                  <p className="text-xs text-espresso/70 mb-5">
                    We will get back to you promptly over phone or WhatsApp.
                  </p>

                  {formSubmitted ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 bg-leaf/15 text-leaf rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-espresso">
                        Thank You, {contactForm.name}!
                      </h4>
                      <p className="text-xs text-espresso/75 max-w-sm mx-auto">
                        Your message has been received. Our team will reach out to you on {contactForm.phone}.
                      </p>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setContactForm({ name: "", phone: "", message: "" });
                        }}
                        className="text-xs font-bold text-mango-dark underline pt-2 cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="contact-name" className="text-xs font-bold text-espresso block mb-1">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Subhashree Mohapatra"
                          className="w-full px-4 py-3 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango outline-none text-sm bg-cream/30 text-espresso transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="text-xs font-bold text-espresso block mb-1">
                          Phone Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="07978901811"
                          className="w-full px-4 py-3 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango outline-none text-sm bg-cream/30 text-espresso transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="text-xs font-bold text-espresso block mb-1">
                          Your Message or Inquiry
                        </label>
                        <textarea
                          id="contact-message"
                          rows={3}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="I would like to inquire about group dining / take-away orders."
                          className="w-full px-4 py-3 rounded-xl border border-mango/20 focus:border-mango focus:ring-1 focus:ring-mango outline-none text-sm bg-cream/30 text-espresso transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-mango hover:bg-mango-light text-espresso font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Google Maps Embed & Directions Button */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mango/20 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-espresso">
                        Find Us in Old Town
                      </h3>
                      <p className="text-xs text-espresso/70 mt-0.5">
                        Lingaraj Nagar, Bhubaneswar (Coordinates: {businessDetails.coordinates.lat}, {businessDetails.coordinates.lng})
                      </p>
                    </div>
                  </div>

                  {/* Responsive Map Embed */}
                  <div className="relative rounded-2xl h-80 sm:h-96 w-full overflow-hidden shadow-inner border border-espresso/10">
                    <iframe
                      title="Am Kitchen Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.470264849198!2d85.82990757500893!3d20.23932248121972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a70016cea789%3A0xd4f68b6e26573c42!2sAm%20kitchen!5e0!3m2!1sen!2sin!4v1790926980184!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={businessDetails.googleMapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl bg-mango hover:bg-mango-light text-espresso font-bold text-base shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Navigation className="w-5 h-5 text-espresso" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 9. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="bg-espresso text-cream/90 py-14 border-t border-mango/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-mango flex items-center justify-center text-espresso">
                  <Utensils className="w-4 h-4 text-espresso" />
                </div>
                <h3 className="font-serif font-black text-xl text-white">
                  Am Kitchen
                </h3>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-normal">
                Fresh. Flavorful. Made with Love. Your trusted neighborhood restaurant in Lingaraj Nagar, Old Town, Bhubaneswar.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-mango">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-cream/80">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About Us" },
                  { id: "menu", label: "Menu Offerings" },
                  { id: "gallery", label: "Photo Gallery" },
                  { id: "reviews", label: "Guest Reviews" },
                  { id: "contact", label: "Location & Directions" }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="hover:text-mango transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Hours */}
            <div className="space-y-3 text-xs text-cream/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-mango">
                Opening Hours
              </h4>
              <p className="leading-relaxed">
                <strong>Every Day:</strong><br />
                11:00 AM – 11:00 PM
              </p>
              <p className="text-[11px] text-mango-light">
                Dine-in, Takeaway & Delivery
              </p>
            </div>

            {/* Col 4: Location & Phone */}
            <div className="space-y-3 text-xs text-cream/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-mango">
                Contact & Address
              </h4>
              <p className="leading-relaxed">
                {businessDetails.address}
              </p>
              <p>
                <a
                  href={`tel:${businessDetails.phone}`}
                  className="font-bold text-white hover:text-mango text-sm block transition-colors"
                >
                  Call: {businessDetails.phone}
                </a>
              </p>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-3">
            <p>© 2026 Am Kitchen. All rights reserved.</p>
            <div className="flex space-x-4">
              <a
                href={businessDetails.googleMapsLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-mango transition-colors"
              >
                Google Maps Listing
              </a>
              <span>·</span>
              <a
                href={businessDetails.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-mango transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING ACTION BUTTONS (WHATSAPP & MOBILE BOTTOM BAR)                     */}
      {/* ========================================================================= */}

      {/* Floating WhatsApp Button */}
      <a
        href={businessDetails.whatsappLink}
        target="_blank"
        rel="noreferrer"
        title="Chat with Am Kitchen on WhatsApp"
        className="fixed bottom-20 sm:bottom-8 right-5 z-40 p-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>

      {/* Mobile-Only Bottom Fixed "Call Now" Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-espresso/98 backdrop-blur-md border-t border-mango/25 p-3 z-40 flex items-center justify-between shadow-2xl">
        <div className="text-cream pl-1">
          <p className="text-[10px] uppercase font-bold text-mango tracking-wider leading-none">
            Call Am Kitchen
          </p>
          <p className="text-xs font-mono font-bold mt-1 text-white">
            {businessDetails.phone}
          </p>
        </div>
        <a
          href={`tel:${businessDetails.phone}`}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-mango text-espresso font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 fill-espresso" />
          <span>Call Now</span>
        </a>
      </div>

    </div>
  );
}
