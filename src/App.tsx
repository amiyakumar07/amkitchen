import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Calendar, 
  Users, 
  MessageSquare, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Utensils, 
  Coffee, 
  Navigation, 
  Heart, 
  Clock, 
  ArrowRight, 
  Menu as MenuIcon, 
  Send,
  MessageCircle,
  Smartphone,
  Sparkles,
  Flame,
  ShieldCheck,
  Smile,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Layers,
  Camera,
  Maximize2
} from "lucide-react";
import { 
  businessDetails, 
  reviews, 
  menuCategories, 
  menuItems, 
  photos, 
  signatureDishes,
  whyChooseUs,
  Photo, 
  MenuItem,
  SignatureDish
} from "./data";

export default function App() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Showcase View Mode: 'flip' | 'photos' | 'platters'
  const [showcaseMode, setShowcaseMode] = useState<"flip" | "photos" | "platters">("flip");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Short-size Category Menu State (from NH-16)
  const [selectedCategory, setSelectedCategory] = useState<string>("Starters");

  // Short-size Food Strip above footer (from NH-16)
  const footerFoodStrip = [
    { id: "fs-1", url: "/unnamed (28).jpg", title: "Odia Mutton Curry" },
    { id: "fs-2", url: "/unnamed (20).jpg", title: "Clay Oven Paneer Tikka" },
    { id: "fs-3", url: "/unnamed (27).jpg", title: "Charcoal Chicken Tikka" },
    { id: "fs-4", url: "/am_kitchen_night.jpg", title: "Am Kitchen Dining" },
    { id: "fs-5", url: "/unnamed (29).jpg", title: "Coolers & Beverages" }
  ];

  // Gallery Filter & Lightbox State
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Specials Carousel State
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [carouselAutoplay, setCarouselAutoplay] = useState(true);

  // Table Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: new Date().toISOString().split("T")[0],
    time: "19:30",
    seatingPreference: "AC Dining Hall",
    notes: ""
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    guests: "2",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Scroll Tracking & Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "showcase", "menu", "carousel", "why-us", "gallery", "testimonials", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel auto-advance
  useEffect(() => {
    if (!carouselAutoplay) return;
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % signatureDishes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselAutoplay]);

  // Smooth Scroll Helper
  const scrollIntoView = (id: string) => {
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

  // Flip card toggle helper
  const toggleCardFlip = (dishId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  // Lightbox navigation
  const filteredPhotos = galleryFilter === "all" 
    ? photos 
    : photos.filter(p => p.category.toLowerCase() === galleryFilter.toLowerCase());

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === null || prev === 0 ? filteredPhotos.length - 1 : prev - 1));
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === null || prev === filteredPhotos.length - 1 ? 0 : prev + 1));
    }
  };


  // Handle Booking Form Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert("Please provide your name and contact phone number.");
      return;
    }
    setBookingSubmitted(true);
    const message = `Hello Am Kitchen! I would like to reserve a table.%0A- Name: ${encodeURIComponent(bookingForm.name)}%0A- Phone: ${encodeURIComponent(bookingForm.phone)}%0A- Date: ${bookingForm.date}%0A- Time: ${bookingForm.time}%0A- Guests: ${bookingForm.guests}%0A- Seating: ${encodeURIComponent(bookingForm.seatingPreference)}%0A- Notes: ${encodeURIComponent(bookingForm.notes || "None")}`;
    window.open(`https://wa.me/917978901811?text=${message}`, "_blank");
  };

  // Handle Contact Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert("Please provide your name and phone number.");
      return;
    }
    setContactSubmitted(true);
    const message = `Hello Am Kitchen! Inquiry / Pre-order from website:%0A- Name: ${encodeURIComponent(contactForm.name)}%0A- Phone: ${encodeURIComponent(contactForm.phone)}%0A- Date: ${contactForm.date}%0A- Guests: ${contactForm.guests}%0A- Message: ${encodeURIComponent(contactForm.message || "General inquiry")}`;
    window.open(`https://wa.me/917978901811?text=${message}`, "_blank");
  };

  // Helper WhatsApp Dish Order
  const handleOrderDishWhatsApp = (dishName: string, price: number) => {
    const message = `Hi Am Kitchen, I would like to order *${encodeURIComponent(dishName)}* (₹${price}) for pickup/dining!`;
    window.open(`https://wa.me/917978901811?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1412] font-sans selection:bg-[#E6AF2E]/30 relative overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. STICKY LUXURY NAVBAR (Matching NH-16 Design System)                    */}
      {/* ========================================================================= */}
      <header 
        id="navbar-sticky"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#1B3B2B]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#E6AF2E]/20" 
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Wordmark & Emblem */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollIntoView("home");
            }}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E6AF2E] to-amber-300 flex items-center justify-center text-[#1B3B2B] shadow-md group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white group-hover:text-[#E6AF2E] transition-colors block leading-none">
                Am Kitchen
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#E6AF2E]/90 flex items-center space-x-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Lingaraj Nagar • Old Town</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with spring indicator */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-white/90">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "showcase", label: "Specialties" },
              { id: "menu", label: "Menu" },
              { id: "why-us", label: "Why Us" },
              { id: "gallery", label: "Gallery" },
              { id: "testimonials", label: "Reviews" },
              { id: "contact", label: "Contact & Table" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollIntoView(link.id)}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? "text-[#E6AF2E] font-semibold"
                    : "hover:text-[#E6AF2E]"
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E6AF2E] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Zone */}
          <div className="hidden sm:flex items-center space-x-3.5">
            <a
              href={`tel:${businessDetails.phone}`}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-2 border border-white/15 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#E6AF2E]" />
              <span>{businessDetails.phone}</span>
            </a>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-[#1B3B2B] bg-[#E6AF2E] hover:bg-amber-400 rounded-lg shadow-lg hover:shadow-[#E6AF2E]/30 transition-all flex items-center space-x-1.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#1B3B2B]/98 backdrop-blur-lg border-b border-[#E6AF2E]/30 shadow-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4 text-white">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Our Kitchen" },
                { id: "showcase", label: "Chef Specialties (3D Flip)" },
                { id: "menu", label: "Short-size Menu" },
                { id: "why-us", label: "Why Dine With Us" },
                { id: "gallery", label: "Photo Gallery" },
                { id: "testimonials", label: "Google Reviews" },
                { id: "contact", label: "Reservation & Map" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollIntoView(link.id)}
                  className="text-left py-2 text-base font-medium hover:text-[#E6AF2E] transition-colors border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-3 bg-[#E6AF2E] text-[#1B3B2B] font-bold rounded-xl text-center shadow-md flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table Now</span>
                </button>
                <a
                  href={businessDetails.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (High Impact & Luxury)                                    */}
      {/* ========================================================================= */}
      <section 
        id="home" 
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1B3B2B]"
      >
        {/* Parallax Background Photo with luxury overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y: scrollY * 0.25 }}
            src="/am_kitchen_facade.jpg" 
            alt="Am Kitchen Storefront Exterior" 
            className="w-full h-full object-cover opacity-60 scale-105 pointer-events-none"
          />
          {/* Dark Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B] via-[#1B3B2B]/70 to-black/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1B3B2B]/40 to-black/90" />
        </div>

        {/* Floating Accent Card (Parallax Stat Badge) */}
        <div className="absolute top-1/4 right-[6%] hidden xl:block z-10 w-80 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-2xl">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="p-1 px-2.5 bg-[#E6AF2E] text-[#1B3B2B] rounded-full font-bold text-xs">
              4.6 ⭐
            </div>
            <p className="text-xs uppercase tracking-widest font-semibold text-[#E6AF2E]">Old Town Bhubaneswar</p>
          </div>
          <p className="text-sm italic font-serif opacity-90 leading-relaxed text-zinc-100">
            "Authentic Odia Mutton Curry, soft Butter Naan, and clay tandoor kebabs prepared with love!"
          </p>
          <div className="mt-4 flex items-center justify-between text-xs font-mono opacity-80 border-t border-white/10 pt-2.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Open 11 AM - 11 PM</span>
            </div>
            <span className="text-[#E6AF2E]">Lingaraj Nagar</span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Sparkle Tag Pill */}
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E6AF2E]/20 border border-[#E6AF2E]/40 text-[#E6AF2E] text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E6AF2E]" />
              <span>Bhubaneswar's Neighborhood Kitchen</span>
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white leading-tight">
              Fresh. Flavorful. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6AF2E] via-amber-300 to-yellow-100">
                Made with Love
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#FDFBF7]/90 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Welcome to <span className="text-white font-medium">Am Kitchen</span> in Lingaraj Nagar, Old Town. Enjoy homestyle Odia curries, charcoal clay tandoori kebabs, aromatic dum biryani, and Indo-Chinese favorites.
            </p>

            {/* Social Proof Star Line */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/85 py-1 font-medium">
              <span className="flex items-center space-x-1 text-[#E6AF2E]">
                {[1, 2, 3, 4, 5].map((st) => (
                  <Star key={st} className="w-4 h-4 fill-[#E6AF2E] text-[#E6AF2E]" />
                ))}
              </span>
              <span>•</span>
              <span 
                className="font-bold underline cursor-pointer hover:text-[#E6AF2E] transition-colors"
                onClick={() => scrollIntoView("testimonials")}
              >
                78 Google Reviews (4.6 Rating)
              </span>
              <span>•</span>
              <span>Municipal Hospital Rd, Lingaraj Nagar</span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-[#E6AF2E] hover:bg-amber-400 text-[#1B3B2B] text-base font-bold rounded-xl shadow-xl hover:shadow-[#E6AF2E]/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={() => scrollIntoView("showcase")}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-semibold rounded-xl backdrop-blur-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Utensils className="w-5 h-5 text-[#E6AF2E]" />
                <span>Explore Specialties</span>
              </button>

              <a
                href={businessDetails.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-base font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Bottom 4 Feature Quick Badges */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
              {[
                { title: "Charcoal Tandoor", desc: "Live clay oven rotis & kebabs", icon: "🍢" },
                { title: "Homestyle Odia", desc: "Authentic mutton & fish curries", icon: "🍛" },
                { title: "AC Dining Hall", desc: "Clean, hygienic & cozy seating", icon: "❄️" },
                { title: "Fast Takeaway", desc: "Fresh & piping hot packing", icon: "⚡" }
              ].map((badge, idx) => (
                <div key={idx} className="p-3.5 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl flex items-center space-x-3">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className="text-white text-xs font-bold leading-tight">{badge.title}</h4>
                    <p className="text-[11px] text-white/70 leading-tight mt-0.5">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT SECTION (Our Story & Atmosphere)                                 */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 lg:py-28 bg-[#FDFBF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Photo Mosaic */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Large Image: Real Am Kitchen Night Facade */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                  <img 
                    src="/am_kitchen_night.jpg" 
                    alt="Am Kitchen Restaurant Lingaraj Nagar" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs uppercase tracking-wider font-mono text-[#E6AF2E]">Lingaraj Nagar, Old Town</span>
                    <h4 className="text-lg font-serif font-bold">Am Kitchen Warm Dining</h4>
                  </div>
                </div>

                {/* Overlapping Secondary Card: Signature Homestyle Odia Curry */}
                <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-square hidden sm:block">
                  <img 
                    src="/unnamed (28).jpg" 
                    alt="Am Kitchen Signature Odia Curry" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <p className="text-white text-xs font-semibold">Signature Odia Curries</p>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute -top-6 -left-4 sm:-left-6 bg-[#1B3B2B] text-white p-4 rounded-2xl shadow-xl border border-[#E6AF2E]/40 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E6AF2E] flex items-center justify-center text-[#1B3B2B] font-bold text-lg">
                    4.6★
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#E6AF2E] font-semibold">Google Reviews</div>
                    <div className="text-sm font-bold">Old Town, Bhubaneswar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1B3B2B]/10 text-[#1B3B2B] text-xs font-bold uppercase tracking-wider">
                <Utensils className="w-3.5 h-3.5 text-[#E6AF2E]" />
                <span>Our Heritage & Hospitality</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#1B3B2B] tracking-tight leading-tight">
                Where Fresh Flavor Meets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6AF2E] to-amber-600">
                  Old Town's Warmth
                </span>
              </h2>

              <p className="text-zinc-700 text-base sm:text-lg leading-relaxed">
                Tucked into the historic heart of <strong>Lingaraj Nagar, Old Town</strong>, Am Kitchen was born with a simple promise: to serve comforting, fragrant food made with authentic recipes and heartfelt hospitality.
              </p>

              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                From slow-simmered <em>Odia Mutton Curries</em> infused with stone-ground spices to smoky clay oven <em>Tandoori Kebabs</em>, buttery naans, and fiery Indo-Chinese platters, every dish is prepared to order using wholesome, fresh ingredients.
              </p>

              {/* Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "100% Fresh Daily Local Sourcing",
                  "Authentic Live Charcoal Clay Tandoor",
                  "Spotless Air-Conditioned Dining Space",
                  "Family-Friendly Portions & Fair Pricing",
                  "Quick Takeaway & Swiggy/Zomato Ready",
                  "Pure Desi Ghee & Fresh Dairy Preparations"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-sm text-zinc-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => scrollIntoView("showcase")}
                  className="px-6 py-3 bg-[#1B3B2B] hover:bg-[#2C5E43] text-white font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Specialties</span>
                  <ArrowRight className="w-4 h-4 text-[#E6AF2E]" />
                </button>
                <a
                  href={businessDetails.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#E6AF2E]/15 hover:bg-[#E6AF2E]/25 text-[#1B3B2B] font-semibold rounded-xl border border-[#E6AF2E]/40 transition-all flex items-center space-x-2"
                >
                  <Navigation className="w-4 h-4 text-[#E6AF2E]" />
                  <span>Get Directions on Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE 3-MODE FOOD SHOWCASE (Signature NH-16 Feature)             */}
      {/* ========================================================================= */}
      <section id="showcase" className="py-20 lg:py-28 bg-[#1B3B2B] text-white relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6AF2E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E6AF2E]/20 text-[#E6AF2E] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#E6AF2E]" />
              <span>Interactive Specialties Experience</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Chef's Signature <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6AF2E] via-amber-300 to-yellow-100">
                Culinary Highlights
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Explore our best-sellers through interactive 3D flip cards, culinary photographs, or chef's secret notes. Click any card to flip and view ingredients!
            </p>

            {/* Mode Switcher Tabs (3 Modes) */}
            <div className="pt-4 flex items-center justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                {[
                  { id: "flip", label: "🃏 3D Flip Cards", desc: "Interactive Cards" },
                  { id: "photos", label: "📸 Photo Showcase", desc: "Visual Gallery" },
                  { id: "platters", label: "📜 Chef's Platter Notes", desc: "Recipes & Secrets" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setShowcaseMode(tab.id as any)}
                    className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      showcaseMode === tab.id
                        ? "bg-[#E6AF2E] text-[#1B3B2B] shadow-lg font-bold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SHOWCASE MODE 1: 3D FLIP CARDS */}
          {showcaseMode === "flip" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {signatureDishes.map((dish) => {
                const isFlipped = !!flippedCards[dish.id];
                return (
                  <div
                    key={dish.id}
                    className="perspective-1000 h-[420px] cursor-pointer group"
                    onClick={() => toggleCardFlip(dish.id)}
                  >
                    <div 
                      className={`relative w-full h-full duration-700 transform-style-3d transition-transform rounded-2xl ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* FRONT OF CARD */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-2xl flex flex-col">
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={dish.image} 
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                          
                          {/* Price Tag */}
                          <div className="absolute top-4 right-4 bg-[#E6AF2E] text-[#1B3B2B] px-3 py-1 rounded-full text-xs font-black shadow-lg">
                            ₹{dish.price}
                          </div>

                          {/* Veg/Non-Veg Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              dish.isVeg ? "bg-emerald-700 text-white" : "bg-red-700 text-white"
                            }`}>
                              <span>{dish.isVeg ? "🌱 Pure Veg" : "🍗 Non-Veg"}</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-[#E6AF2E] font-mono">
                              {dish.tagline}
                            </span>
                            <h3 className="text-xl font-serif font-bold text-white mt-1 leading-snug">
                              {dish.name}
                            </h3>
                            <p className="text-zinc-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                              {dish.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs text-[#E6AF2E] font-medium flex items-center space-x-1">
                              <span>🔄 Click card to flip details</span>
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOrderDishWhatsApp(dish.name, dish.price);
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow flex items-center space-x-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Order</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* BACK OF CARD (Flipped) */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 bg-gradient-to-br from-zinc-900 to-[#1B3B2B] border border-[#E6AF2E]/40 shadow-2xl flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <div>
                              <span className="text-[10px] uppercase font-mono text-[#E6AF2E]">Chef's Recipe Card</span>
                              <h4 className="text-lg font-serif font-bold text-white">{dish.name}</h4>
                            </div>
                            <span className="text-lg font-bold text-[#E6AF2E]">₹{dish.price}</span>
                          </div>

                          <div className="mt-4 space-y-3">
                            <div>
                              <span className="text-xs font-semibold text-[#E6AF2E] block uppercase tracking-wider">Chef's Secret:</span>
                              <p className="text-xs text-zinc-200 italic mt-0.5 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/10">
                                "{dish.chefNote}"
                              </p>
                            </div>

                            <div>
                              <span className="text-xs font-semibold text-[#E6AF2E] block uppercase tracking-wider">Key Ingredients:</span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {dish.keyIngredients.map((ing, i) => (
                                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-zinc-200 border border-white/10">
                                    • {ing}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderDishWhatsApp(dish.name, dish.price);
                            }}
                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl text-center flex items-center justify-center space-x-1.5 shadow-lg"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Order on WhatsApp</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardFlip(dish.id);
                            }}
                            className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15"
                          >
                            Flip Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* SHOWCASE MODE 2: HIGH-RES PHOTO SHOWCASE */}
          {showcaseMode === "photos" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {signatureDishes.map((dish) => (
                <div 
                  key={dish.id} 
                  className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-xl aspect-[4/3]"
                >
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <span className="text-xs uppercase tracking-wider text-[#E6AF2E] font-mono">{dish.category}</span>
                    <h3 className="text-lg font-serif font-bold text-white leading-tight">{dish.name}</h3>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">{dish.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-bold text-[#E6AF2E]">₹{dish.price}</span>
                      <button
                        onClick={() => handleOrderDishWhatsApp(dish.name, dish.price)}
                        className="px-3 py-1 bg-[#E6AF2E] text-[#1B3B2B] text-xs font-bold rounded-lg shadow"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* SHOWCASE MODE 3: CHEF'S PLATTER NOTES */}
          {showcaseMode === "platters" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 space-y-6"
            >
              {signatureDishes.map((dish) => (
                <div 
                  key={dish.id}
                  className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 flex flex-col md:flex-row gap-6 items-center"
                >
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full md:w-56 h-44 object-cover rounded-xl shadow-lg border border-white/10"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-serif font-bold text-white">{dish.name}</h3>
                      <span className="text-lg font-bold text-[#E6AF2E]">₹{dish.price}</span>
                    </div>
                    <p className="text-xs text-[#E6AF2E] font-mono">{dish.tagline}</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">{dish.description}</p>
                    <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-xs italic text-zinc-200">
                      <strong>Chef's Note:</strong> {dish.chefNote}
                    </div>
                  </div>
                  <div className="shrink-0 flex md:flex-col gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleOrderDishWhatsApp(dish.name, dish.price)}
                      className="flex-1 md:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow flex items-center justify-center space-x-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHORT-SIZE DIGITAL MENU (Category Tabs - NH-16 Design System)          */}
      {/* ========================================================================= */}
      <section 
        id="menu" 
        className="py-16 sm:py-20 bg-[#1B3B2B] text-white relative overflow-hidden border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6AF2E] px-3.5 py-1 rounded-full bg-[#E6AF2E]/10 border border-[#E6AF2E]/20 inline-flex items-center space-x-1.5">
              <Utensils className="w-3.5 h-3.5" />
              <span>Compact Digital Menu</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight text-white">
              Explore Our Authentic Dishes
            </h2>
            <p className="max-w-md mx-auto text-zinc-300 text-xs sm:text-sm">
              Click a category tab to view prices and dishes. Cooked fresh to order.
            </p>
          </div>

          {/* MENUS CATEGORIES TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-[#E6AF2E] text-[#1B3B2B] shadow-lg scale-105 font-black"
                    : "bg-white/10 hover:bg-white/15 text-zinc-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* ACTIVE CATEGORY DISHES LIST (Short-size 2-column cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
            {menuItems
              .filter((item) => item.category === selectedCategory)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#E6AF2E]/30 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <span className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-sm shrink-0 mt-0.5 ${
                      item.isVeg ? "border-emerald-400" : "border-red-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.isVeg ? "bg-emerald-400" : "bg-red-400"
                      }`} />
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-[#E6AF2E] transition-colors leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-zinc-300 line-clamp-1 font-light mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2.5 shrink-0 ml-3">
                    <span className="text-sm font-bold text-[#E6AF2E] font-mono">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleOrderDishWhatsApp(item.name, item.price)}
                      className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SPECIALS CAROUSEL SPOTLIGHT (Interactive Slider)                       */}
      {/* ========================================================================= */}
      <section id="carousel" className="py-20 bg-zinc-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#E6AF2E]">Dish Spotlight</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black">Featured Masterpieces</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setCarouselAutoplay(false);
                  setCurrentCarouselIndex((prev) => (prev === 0 ? signatureDishes.length - 1 : prev - 1));
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                aria-label="Previous Dish"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setCarouselAutoplay(false);
                  setCurrentCarouselIndex((prev) => (prev + 1) % signatureDishes.length);
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                aria-label="Next Dish"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Carousel Card */}
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
              
              {/* Photo Side */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={signatureDishes[currentCarouselIndex].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    src={signatureDishes[currentCarouselIndex].image}
                    alt={signatureDishes[currentCarouselIndex].name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Description Side */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#E6AF2E]/20 text-[#E6AF2E] text-xs font-mono font-bold">
                      {signatureDishes[currentCarouselIndex].category}
                    </span>
                    <span className="text-xs text-zinc-400">
                      Dish {currentCarouselIndex + 1} of {signatureDishes.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white mt-3 leading-snug">
                    {signatureDishes[currentCarouselIndex].name}
                  </h3>

                  <p className="text-[#E6AF2E] text-xs font-mono mt-1">
                    {signatureDishes[currentCarouselIndex].tagline}
                  </p>

                  <p className="text-zinc-300 text-sm mt-4 leading-relaxed">
                    {signatureDishes[currentCarouselIndex].description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs italic text-zinc-200">
                    "{signatureDishes[currentCarouselIndex].chefNote}"
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-2xl font-black text-[#E6AF2E] font-mono">
                    ₹{signatureDishes[currentCarouselIndex].price}
                  </span>

                  <button
                    onClick={() => handleOrderDishWhatsApp(
                      signatureDishes[currentCarouselIndex].name,
                      signatureDishes[currentCarouselIndex].price
                    )}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {signatureDishes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCarouselAutoplay(false);
                  setCurrentCarouselIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentCarouselIndex === idx ? "w-8 bg-[#E6AF2E]" : "w-2 bg-white/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY CHOOSE US (4 Glassmorphism Feature Cards)                          */}
      {/* ========================================================================= */}
      <section id="why-us" className="py-20 lg:py-28 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1B3B2B]/10 text-[#1B3B2B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E6AF2E]" />
              <span>Our Core Standards</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#1B3B2B] tracking-tight">
              Why Diners Love Am Kitchen
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              We focus on consistency, uncompromising hygiene, and rich authentic taste so you enjoy an exceptional meal every visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((card) => (
              <div
                key={card.id}
                className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-zinc-200/80 transition-all hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#1B3B2B]/10 text-[#1B3B2B] flex items-center justify-center mb-6 group-hover:bg-[#E6AF2E] group-hover:text-[#1B3B2B] transition-colors">
                    {card.icon === "Utensils" && <Utensils className="w-7 h-7" />}
                    {card.icon === "ShieldCheck" && <ShieldCheck className="w-7 h-7" />}
                    {card.icon === "Sparkles" && <Sparkles className="w-7 h-7" />}
                    {card.icon === "Smile" && <Smile className="w-7 h-7" />}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E6AF2E] font-bold">
                    {card.highlight}
                  </span>

                  <h3 className="text-xl font-serif font-bold text-[#1B3B2B] mt-1 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-zinc-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-semibold text-[#1B3B2B] group-hover:text-[#E6AF2E] transition-colors">
                  <span>Guaranteed Standards</span>
                  <CheckCircle2 className="w-4 h-4 ml-1.5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FILTERABLE PHOTO GALLERY WITH LIGHTBOX (Matching NH-16)                */}
      {/* ========================================================================= */}
      <section id="gallery" className="py-20 lg:py-28 bg-[#1B3B2B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E6AF2E]/20 text-[#E6AF2E] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-[#E6AF2E]" />
              <span>Visual Showcase</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">
              Restaurant & Food Gallery
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Step inside our dining room and take a glimpse at our live clay oven, signature curries, and warm evening lighting.
            </p>

            {/* Gallery Category Filter */}
            <div className="pt-4 flex justify-center gap-2">
              {[
                { id: "all", label: "All Photos" },
                { id: "Food", label: "Delicious Food" },
                { id: "Restaurant", label: "Dining & Ambience" },
                { id: "Tandoor", label: "Clay Tandoor" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setGalleryFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    galleryFilter === filter.id
                      ? "bg-[#E6AF2E] text-[#1B3B2B] shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/10 shadow-lg cursor-pointer"
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E6AF2E]">
                    {photo.category}
                  </span>
                  <h4 className="text-base font-serif font-bold text-white mt-0.5">{photo.title}</h4>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{photo.description}</p>
                  <span className="mt-3 text-xs text-[#E6AF2E] flex items-center space-x-1 font-semibold">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click for fullscreen view</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhotoIndex(null)}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <div 
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredPhotos[activePhotoIndex].url} 
                alt={filteredPhotos[activePhotoIndex].title} 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/15"
              />
              <div className="mt-4 text-center text-white space-y-1">
                <span className="text-xs text-[#E6AF2E] font-mono">
                  {activePhotoIndex + 1} of {filteredPhotos.length} • {filteredPhotos[activePhotoIndex].category}
                </span>
                <h3 className="text-xl font-serif font-bold">{filteredPhotos[activePhotoIndex].title}</h3>
                <p className="text-xs text-zinc-300 max-w-xl mx-auto">{filteredPhotos[activePhotoIndex].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9. CUSTOMER REVIEWS / TESTIMONIALS (Google Reviews Branding)              */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-20 lg:py-28 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1B3B2B]/10 text-[#1B3B2B] text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-[#E6AF2E] fill-[#E6AF2E]" />
              <span>Real Customer Feedback</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#1B3B2B] tracking-tight">
              What Diners Say
            </h2>

            {/* Google Rating Big Badge */}
            <div className="pt-2 flex items-center justify-center space-x-2">
              <div className="flex items-center space-x-1 text-[#E6AF2E]">
                {[1, 2, 3, 4, 5].map((st) => (
                  <Star key={st} className="w-5 h-5 fill-[#E6AF2E]" />
                ))}
              </div>
              <span className="text-xl font-black text-[#1B3B2B]">4.6 / 5.0</span>
              <span className="text-zinc-500 text-sm">(78 Verified Google Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl border border-zinc-200/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-[#E6AF2E]">
                      {Array.from({ length: Math.floor(rev.rating) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E6AF2E]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">{rev.date}</span>
                  </div>

                  <p className="text-zinc-700 text-sm leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#1B3B2B]">{rev.name}</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold">✓ Verified Customer</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">{rev.platform}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={businessDetails.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#1B3B2B] hover:bg-[#2C5E43] text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>View All 78 Reviews on Google Maps</span>
              <ExternalLink className="w-4 h-4 text-[#E6AF2E]" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. RESERVATION & CONTACT SECTION (Dual Column + Map Embed)               */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 lg:py-28 bg-[#1B3B2B] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Column 1: Interactive Table Reservation Form */}
            <div className="lg:col-span-7 bg-zinc-900/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#E6AF2E] font-bold">
                Table Booking & Pre-Order
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black mt-1">
                Book a Table at Am Kitchen
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Planning lunch or dinner in Lingaraj Nagar? Reserve your seats in advance for zero wait time. Submitting prepares your instant WhatsApp confirmation.
              </p>

              <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Soumya Ranjan"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07978901811"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Booking Date</label>
                    <input
                      type="date"
                      value={contactForm.date}
                      onChange={(e) => setContactForm({ ...contactForm, date: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Number of Guests</label>
                    <select
                      value={contactForm.guests}
                      onChange={(e) => setContactForm({ ...contactForm, guests: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="4">4 People (Family Table)</option>
                      <option value="6">6 People</option>
                      <option value="8">8+ People (Party Group)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Special Requests / Pre-order Dishes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us if you want special curries pre-cooked, AC dining hall preference, birthday setup, etc."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E6AF2E] hover:bg-amber-400 text-[#1B3B2B] text-sm font-bold rounded-xl shadow-lg hover:shadow-[#E6AF2E]/40 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Send Table Reservation via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Column 2: Location, Google Map & Timings */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Info Card */}
              <div className="p-8 bg-zinc-900/90 backdrop-blur-md rounded-3xl border border-white/15 shadow-2xl space-y-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E6AF2E] font-bold">
                  Location & Hours
                </span>

                <h3 className="text-2xl font-serif font-bold">Visit Am Kitchen</h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#E6AF2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Address:</strong>
                      <span className="text-zinc-300 leading-relaxed">{businessDetails.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#E6AF2E] shrink-0" />
                    <div>
                      <strong className="block text-white">Call for Orders:</strong>
                      <a href={`tel:${businessDetails.phone}`} className="text-[#E6AF2E] hover:underline font-mono">
                        {businessDetails.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[#E6AF2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Business Hours:</strong>
                      <span className="text-zinc-300">11:00 AM – 11:00 PM (Monday to Sunday)</span>
                      <span className="block text-[11px] text-emerald-400 mt-0.5">● Open all 7 days for Dine-In & Takeaway</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <a
                    href={businessDetails.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-[#E6AF2E] text-[#1B3B2B] font-bold rounded-xl text-center text-xs shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>

                  <a
                    href={`tel:${businessDetails.phone}`}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-center text-xs border border-white/15 flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E6AF2E]" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              {/* Map Iframe Embed */}
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-56">
                <iframe
                  title="Am Kitchen Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.085023910974!2d85.8303113!3d20.2393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a778e3845b41%3A0xc3f835cb4659b854!2sAm%20Kitchen!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic strip of short-size food & menu dishes just above the footer (NH-16 design) */}
      <div className="w-full border-t border-[#E6AF2E]/25 bg-[#1B3B2B] overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-5">
          {footerFoodStrip.map((item) => (
            <div 
              key={item.id} 
              className="relative h-28 sm:h-36 overflow-hidden cursor-pointer group"
              onClick={() => {
                const idx = photos.findIndex(p => p.url === item.url);
                if (idx !== -1) setActivePhotoIndex(idx);
                else scrollIntoView("menu");
              }}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#1B3B2B]/40 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-3 py-1 bg-black/85 text-[#E6AF2E] text-xs font-bold rounded-lg backdrop-blur-sm border border-[#E6AF2E]/30 text-center mx-2 shadow-lg">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 11. FOOTER                                                                */}
      {/* ========================================================================= */}
      <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#E6AF2E] flex items-center justify-center text-[#1B3B2B] font-bold">
                  <Utensils className="w-4 h-4" />
                </div>
                <span className="text-xl font-serif font-black">Am Kitchen</span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Fresh. Flavorful. Made with Love. A warm neighborhood restaurant in Lingaraj Nagar, Old Town, Bhubaneswar.
              </p>
              <div className="text-xs text-[#E6AF2E] font-mono">
                Rating: 4.6 ⭐ on Google Reviews
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E6AF2E] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                {["home", "about", "showcase", "menu", "gallery", "testimonials", "contact"].map((sec) => (
                  <li key={sec}>
                    <button 
                      onClick={() => scrollIntoView(sec)}
                      className="hover:text-white capitalize transition-colors"
                    >
                      {sec === "showcase" ? "Chef Specialties" : sec === "menu" ? "Short-size Menu" : sec}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E6AF2E] mb-4">Cuisines Served</h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li>• Authentic Odia Mutton & Chicken</li>
                <li>• Pure Clay Oven Tandoori Kebabs</li>
                <li>• Butter Naans & Laccha Parathas</li>
                <li>• Aromatic Dum Biryani</li>
                <li>• Indo-Chinese Sizzlers & Noodles</li>
                <li>• Traditional Sweets & Chaas</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E6AF2E] mb-4">Visit Us</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                {businessDetails.address}
              </p>
              <p className="text-xs text-zinc-400">
                Phone: <a href={`tel:${businessDetails.phone}`} className="text-[#E6AF2E]">{businessDetails.phone}</a>
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Hours: 11:00 AM – 11:00 PM Daily
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© {new Date().getFullYear()} Am Kitchen, Lingaraj Nagar, Bhubaneswar. All rights reserved.</p>
            <p>Designed with ❤️ matching the NH-16 Design Experience</p>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 12. FLOATING ACTION BUTTONS                                               */}
      {/* ========================================================================= */}
      {/* Floating WhatsApp Button */}
      <a
        href={businessDetails.whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all border-2 border-white/20 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E6AF2E] rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E6AF2E] rounded-full flex items-center justify-center text-[9px] font-black text-[#1B3B2B]">1</span>
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Mobile Floating Call Button */}
      <a
        href={`tel:${businessDetails.phone}`}
        className="fixed bottom-6 left-6 z-40 sm:hidden w-12 h-12 rounded-full bg-[#1B3B2B] hover:bg-[#2C5E43] text-white shadow-2xl flex items-center justify-center border-2 border-[#E6AF2E]/40"
        aria-label="Call Restaurant"
      >
        <Phone className="w-5 h-5 text-[#E6AF2E]" />
      </a>

      {/* ========================================================================= */}
      {/* 13. TABLE BOOKING POPUP MODAL                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsBookingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-[#E6AF2E] text-xs font-mono font-bold mb-1">
                <Calendar className="w-4 h-4" />
                <span>Instant Table Reservation</span>
              </div>
              <h3 className="text-2xl font-serif font-bold">Reserve at Am Kitchen</h3>
              <p className="text-zinc-400 text-xs mt-1">Lingaraj Nagar, Old Town, Bhubaneswar</p>

              <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="07978901811"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Guests</label>
                    <select
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-800 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="4">4 People</option>
                      <option value="6">6 People</option>
                      <option value="8">8+ People</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Time</label>
                    <input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/10 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Seating Area</label>
                  <select
                    value={bookingForm.seatingPreference}
                    onChange={(e) => setBookingForm({ ...bookingForm, seatingPreference: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-800 rounded-xl border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E6AF2E]"
                  >
                    <option value="AC Dining Hall">AC Dining Hall</option>
                    <option value="Family Table">Family Section</option>
                    <option value="Takeaway Pre-Order">Takeaway Pre-Order</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E6AF2E] hover:bg-amber-400 text-[#1B3B2B] text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
