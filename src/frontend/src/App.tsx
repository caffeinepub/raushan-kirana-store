import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "./backend.d";
import { useGetAllProducts, useGetStoreInfo } from "./hooks/useQueries";

// Sample fallback products for initial load
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Basmati Chawal",
    description:
      "Premium long-grain basmati rice, perfect for biryani and pulao. 5kg pack.",
    category: "Groceries",
    price: BigInt(450),
    inStock: true,
  },
  {
    id: BigInt(2),
    name: "Amul Doodh",
    description:
      "Fresh full cream milk, 1 litre. Delivered daily, straight from the dairy.",
    category: "Dairy",
    price: BigInt(62),
    inStock: true,
  },
  {
    id: BigInt(3),
    name: "Lay's Magic Masala",
    description:
      "India's favourite masala chips. Crispy and full of desi flavour. 26g pack.",
    category: "Snacks",
    price: BigInt(20),
    inStock: true,
  },
  {
    id: BigInt(4),
    name: "Tata Tea Premium",
    description:
      "Rich, aromatic tea blend for the perfect morning chai. 500g pack.",
    category: "Beverages",
    price: BigInt(280),
    inStock: true,
  },
  {
    id: BigInt(5),
    name: "MDH Sabzi Masala",
    description:
      "Authentic blend of 20+ spices for perfect sabzi every time. 100g.",
    category: "Spices",
    price: BigInt(85),
    inStock: true,
  },
  {
    id: BigInt(6),
    name: "Dove Soap",
    description:
      "Moisturising beauty bar with 1/4 cream. Gentle on skin. Pack of 3.",
    category: "Personal Care",
    price: BigInt(150),
    inStock: true,
  },
  {
    id: BigInt(7),
    name: "Arhar Dal",
    description:
      "Clean, split pigeon peas. Best for dal tadka. 1kg premium quality.",
    category: "Groceries",
    price: BigInt(165),
    inStock: true,
  },
  {
    id: BigInt(8),
    name: "Amul Paneer",
    description:
      "Fresh, soft cottage cheese. 200g vacuum-sealed for maximum freshness.",
    category: "Dairy",
    price: BigInt(95),
    inStock: false,
  },
  {
    id: BigInt(9),
    name: "Haldiram's Bhujia",
    description:
      "Classic Bikaner-style sev bhujia. Crunchy snack for every mood. 400g.",
    category: "Snacks",
    price: BigInt(130),
    inStock: true,
  },
  {
    id: BigInt(10),
    name: "Real Fruit Juice",
    description:
      "100% real fruit juice, no added sugar. Mixed fruit flavour. 1 litre.",
    category: "Beverages",
    price: BigInt(115),
    inStock: true,
  },
  {
    id: BigInt(13),
    name: "Sting Energy Drink",
    description:
      "Sting Energy Drink -- refreshing red berry flavour. Instant energy boost karo. 250ml bottle.",
    category: "Beverages",
    price: BigInt(17),
    inStock: true,
  },
  {
    id: BigInt(11),
    name: "Haldi Powder",
    description:
      "Pure turmeric powder, vibrant yellow. 200g. Great for cooking and health.",
    category: "Spices",
    price: BigInt(55),
    inStock: true,
  },
  {
    id: BigInt(12),
    name: "Clinic Plus Shampoo",
    description:
      "Strengthens hair and prevents breakage. Milk proteins formula. 340ml.",
    category: "Personal Care",
    price: BigInt(195),
    inStock: true,
  },
];

const CATEGORIES = [
  { name: "Sab Kuch", label: "All", emoji: "🛒" },
  { name: "Groceries", label: "Groceries", emoji: "🌾" },
  { name: "Dairy", label: "Dairy", emoji: "🥛" },
  { name: "Snacks", label: "Snacks", emoji: "🍿" },
  { name: "Beverages", label: "Beverages", emoji: "☕" },
  { name: "Spices", label: "Spices", emoji: "🌶️" },
  { name: "Personal Care", label: "Personal Care", emoji: "✨" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: "bg-amber-100 text-amber-800 border-amber-200",
  Dairy: "bg-blue-100 text-blue-800 border-blue-200",
  Snacks: "bg-orange-100 text-orange-800 border-orange-200",
  Beverages: "bg-teal-100 text-teal-800 border-teal-200",
  Spices: "bg-red-100 text-red-800 border-red-200",
  "Personal Care": "bg-purple-100 text-purple-800 border-purple-200",
};

function NavBar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: { mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-kirana-orange/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/kirana-logo-transparent.dim_300x300.png"
            alt="Raushan Kirana Store Logo"
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="font-display font-bold text-lg leading-tight text-kirana-brown">
              Raushan Kirana
            </p>
            <p className="text-xs text-kirana-orange font-body font-medium leading-tight">
              Store
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Home", id: "home" },
            { label: "Products", id: "products" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-kirana-orange transition-colors rounded-lg hover:bg-kirana-orange/5 font-body"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("products")}
            className="ml-2 bg-kirana-orange hover:bg-kirana-orange-deep text-white font-body text-sm"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-1.5" />
            Order Karein
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {[
                { label: "Home", id: "home" },
                { label: "Products", id: "products" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors font-body"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/kirana-hero.dim_1200x500.jpg"
          alt="Raushan Kirana Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kirana-brown/90 via-kirana-brown/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-kirana-brown/60 via-transparent to-transparent" />
      </div>

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Festive badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-kirana-orange/90 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 font-body"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Hamare Yahan Sab Milta Hai!
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          >
            Raushan
            <br />
            <span className="text-kirana-turmeric">Kirana</span>
            <br />
            Store
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl md:text-2xl text-white/90 font-body mb-3 font-light italic"
          >
            "Aapke Ghar Ki Zaroorat,
            <br />
            Hamare Paas"
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-white/70 font-body text-base mb-8"
          >
            Your home's needs, we have them — fresh, affordable, and delivered
            with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-kirana-orange hover:bg-kirana-orange-deep text-white font-body text-base px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Hamare Products Dekhein
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 font-body text-base bg-transparent"
            >
              Hamare Baare Mein
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { number: "500+", label: "Products" },
              { number: "10+ Saal", label: "Ka Bharosa" },
              { number: "1000+", label: "Khush Grahak" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-kirana-turmeric">
                  {stat.number}
                </p>
                <p className="text-white/70 text-sm font-body">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CategorySection({
  selectedCategory,
  onSelectCategory,
}: {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  return (
    <section className="py-12 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl font-bold text-kirana-brown mb-2">
            Category Chunein
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Apni zaroorat ke hisaab se dekhein
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat, index) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                onSelectCategory(cat.name === "Sab Kuch" ? "" : cat.name)
              }
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all border-2 shadow-sm ${
                (selectedCategory === "" && cat.name === "Sab Kuch") ||
                selectedCategory === cat.name
                  ? "bg-kirana-orange text-white border-kirana-orange shadow-md shadow-kirana-orange/20"
                  : "bg-white text-foreground border-border hover:border-kirana-orange/50 hover:bg-kirana-orange/5"
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const categoryColor =
    CATEGORY_COLORS[product.category] ||
    "bg-gray-100 text-gray-800 border-gray-200";
  const priceNum = Number(product.price);

  const PRODUCT_IMAGES: Record<string, string> = {
    "Basmati Chawal":
      "/assets/generated/product-basmati-chawal-transparent.dim_400x400.png",
    "Amul Doodh":
      "/assets/generated/product-amul-doodh-transparent.dim_400x400.png",
    "Lay's Magic Masala":
      "/assets/generated/product-lays-masala-transparent.dim_400x400.png",
    "Tata Tea Premium":
      "/assets/generated/product-tata-tea-transparent.dim_400x400.png",
    "MDH Sabzi Masala":
      "/assets/generated/product-mdh-masala-transparent.dim_400x400.png",
    "Dove Soap":
      "/assets/generated/product-dove-soap-transparent.dim_400x400.png",
    "Arhar Dal":
      "/assets/generated/product-arhar-dal-transparent.dim_400x400.png",
    "Amul Paneer":
      "/assets/generated/product-amul-paneer-transparent.dim_400x400.png",
    "Haldiram's Bhujia":
      "/assets/generated/product-haldirams-bhujia-transparent.dim_400x400.png",
    "Real Fruit Juice":
      "/assets/generated/product-real-juice-transparent.dim_400x400.png",
    "Sting Energy Drink": "/assets/uploads/IMG_20260301_232251-1.jpg",
    "Haldi Powder":
      "/assets/generated/product-haldi-powder-transparent.dim_400x400.png",
    "Clinic Plus Shampoo":
      "/assets/generated/product-clinic-plus-transparent.dim_400x400.png",
  };

  const productImage = PRODUCT_IMAGES[product.name] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full overflow-hidden border border-border hover:border-kirana-orange/40 hover:shadow-lg transition-all duration-300 bg-white group">
        {/* Product image if available */}
        {productImage && (
          <div className="w-full h-36 overflow-hidden bg-gray-50">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        {/* Category color bar at top */}
        <div
          className={`h-1 w-full ${
            product.category === "Groceries"
              ? "bg-amber-400"
              : product.category === "Dairy"
                ? "bg-blue-400"
                : product.category === "Snacks"
                  ? "bg-orange-400"
                  : product.category === "Beverages"
                    ? "bg-teal-400"
                    : product.category === "Spices"
                      ? "bg-red-400"
                      : "bg-purple-400"
          }`}
        />
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-display font-semibold text-base text-kirana-brown leading-snug group-hover:text-kirana-orange transition-colors">
              {product.name}
            </h3>
            <div className="flex flex-col items-end gap-1 shrink-0">
              {product.inStock ? (
                <span className="flex items-center gap-1 text-xs text-green-700 font-medium font-body">
                  <CheckCircle className="h-3 w-3" />
                  In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-red-600 font-medium font-body">
                  <XCircle className="h-3 w-3" />
                  Out
                </span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto mb-3">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border font-body ${categoryColor}`}
            >
              {product.category}
            </span>
            <span className="font-display text-xl font-bold text-kirana-orange">
              ₹{priceNum}
            </span>
          </div>

          {/* WhatsApp Order Button */}
          <a
            href={`https://wa.me/919142172084?text=${encodeURIComponent(`Namaste! Mujhe ${product.name} chahiye. Price: ₹${priceNum}. Please confirm availability.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-medium font-body transition-colors duration-200 shadow-sm hover:shadow-md"
            aria-label={`WhatsApp pe ${product.name} order karein`}
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            WhatsApp pe Order Karein
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProductsSection({ selectedCategory }: { selectedCategory: string }) {
  const { data: products, isLoading } = useGetAllProducts();

  const displayProducts =
    products && products.length > 0 ? products : FALLBACK_PRODUCTS;
  const filtered = selectedCategory
    ? displayProducts.filter((p) => p.category === selectedCategory)
    : displayProducts;

  return (
    <section id="products" className="py-16 bg-background kirana-pattern">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge
            variant="outline"
            className="mb-3 border-kirana-orange/30 text-kirana-orange font-body text-xs px-3 py-1"
          >
            <Star className="h-3 w-3 mr-1.5 fill-kirana-orange" />
            Hamare Products
          </Badge>
          <h2 className="font-display text-4xl font-bold text-kirana-brown mb-3">
            {selectedCategory ? `${selectedCategory}` : "Sabhi Products"}
          </h2>
          <p className="text-muted-foreground font-body">
            {filtered.length} products available
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((key) => (
              <div
                key={key}
                className="bg-white rounded-xl p-4 border border-border"
              >
                <Skeleton className="h-4 w-3/4 mb-3" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🛒</p>
            <p className="font-display text-xl font-semibold text-kirana-brown mb-2">
              Is Category Mein Koi Product Nahi
            </p>
            <p className="text-muted-foreground font-body text-sm">
              Doosri category try karein ya baad mein aayein
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AboutSection() {
  const { data: storeInfo, isLoading } = useGetStoreInfo();

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-kirana-green/30 text-kirana-green font-body text-xs px-3 py-1"
            >
              <Heart className="h-3 w-3 mr-1.5 fill-kirana-green" />
              Hamare Baare Mein
            </Badge>
            <h2 className="font-display text-4xl font-bold text-kirana-brown mb-4 leading-tight">
              {isLoading ? (
                <Skeleton className="h-10 w-3/4" />
              ) : (
                storeInfo?.name || "Raushan Kirana Store"
              )}
            </h2>
            <p className="text-foreground/80 font-body text-base leading-relaxed mb-6">
              Aapka apna Raushan Kirana Store — jahaan quality aur trust dono
              milte hain. Hum paas ke 10 saalon se aapki rojana ki zarooraton ko
              poora karte aa rahe hain. Ghar ki sabziyon se lekar snacks,
              masale, dairy products — sab kuch ek hi jagah.
            </p>
            <p className="text-foreground/70 font-body text-sm leading-relaxed">
              हमारा मानना है कि हर परिवार को ताज़ा, किफ़ायती सामान मिलना चाहिए।
              इसीलिए Raushan Kirana Store में आपको हमेशा बेहतरीन quality और सही दाम
              मिलेंगे।
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "✓ Fresh Products Daily",
                "✓ Best Prices",
                "✓ 10+ Years Trust",
                "✓ Home Delivery",
              ].map((feat) => (
                <span
                  key={feat}
                  className="text-xs font-medium font-body bg-kirana-green/10 text-kirana-green px-3 py-1.5 rounded-full"
                >
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Store details card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-border shadow-lg">
              {/* Card header with gradient */}
              <div className="kirana-gradient p-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/generated/kirana-logo-transparent.dim_300x300.png"
                    alt="Store Logo"
                    className="h-16 w-16 object-contain bg-white/20 rounded-2xl p-2"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {isLoading ? (
                        <Skeleton className="h-6 w-40 bg-white/30" />
                      ) : (
                        storeInfo?.name || "Raushan Kirana Store"
                      )}
                    </h3>
                    <p className="text-white/80 text-sm font-body">
                      Aapka Vishwasniya Store
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-kirana-orange/10 rounded-lg shrink-0">
                    <MapPin className="h-4 w-4 text-kirana-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-0.5">
                      Pata (Address)
                    </p>
                    <p className="font-body text-sm text-foreground font-medium">
                      {isLoading ? (
                        <Skeleton className="h-4 w-full" />
                      ) : (
                        "Kusha Naranpur, Hadna, Hussainabad - 822116, Jharkhand"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-kirana-orange/10 rounded-lg shrink-0">
                    <Clock className="h-4 w-4 text-kirana-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-0.5">
                      Samay (Timings)
                    </p>
                    <p className="font-body text-sm text-foreground font-medium">
                      {isLoading ? (
                        <Skeleton className="h-4 w-full" />
                      ) : (
                        storeInfo?.timings || "Subah 7 baje se Raat 10 baje tak"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-kirana-orange/10 rounded-lg shrink-0">
                    <Phone className="h-4 w-4 text-kirana-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-0.5">
                      Phone
                    </p>
                    <p className="font-body text-sm text-foreground font-medium">
                      +91 91421 72084
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="tel:+919142172084"
                    className="w-full inline-flex items-center justify-center gap-2 bg-kirana-green hover:bg-kirana-green/80 text-white py-2.5 px-4 rounded-lg text-sm font-medium font-body transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Abhi Call Karein
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Owner Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex flex-col items-center"
        >
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full bg-kirana-gradient p-1 scale-110 opacity-30 blur-sm" />
            <div className="relative p-1.5 rounded-full kirana-gradient shadow-xl">
              <img
                src="/assets/uploads/trashed-1774982151-IMG_20260115_193240497_HDR-1-2-1--1.jpg"
                alt="Raushan Singh - Store Owner"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <h3 className="font-display text-2xl font-bold text-kirana-brown">
              Raushan Singh
            </h3>
            <span className="inline-block mt-1.5 text-xs font-medium font-body bg-kirana-orange/15 text-kirana-orange px-4 py-1 rounded-full tracking-wide uppercase">
              Store Owner
            </span>
            <p className="mt-3 text-foreground/70 font-body text-sm max-w-xs text-center leading-relaxed">
              10+ saalon ka anubhav aur aapki seva mein hamesha taiyaar 🙏
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { data: storeInfo } = useGetStoreInfo();

  return (
    <footer id="contact" className="bg-kirana-brown text-white">
      {/* Top wave divider */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          role="img"
          aria-label="Decorative wave"
        >
          <title>Decorative wave</title>
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Store Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/kirana-logo-transparent.dim_300x300.png"
                alt="Logo"
                className="h-12 w-12 object-contain bg-white/10 rounded-xl p-1"
              />
              <div>
                <h3 className="font-display font-bold text-lg">
                  Raushan Kirana
                </h3>
                <p className="text-white/60 text-xs font-body">Store</p>
              </div>
            </div>
            <p className="text-white/70 font-body text-sm leading-relaxed mb-4">
              Aapke ghar ki zaroorat, hamare paas. Hum rozaana fresh aur
              affordable products lekar aate hain.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://instagram.com/raushan.rajput.09",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  href: "https://wa.me/919142172084",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 bg-white/10 hover:bg-kirana-orange transition-colors rounded-lg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base mb-4 text-kirana-turmeric">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", id: "home" },
                { label: "Products", id: "products" },
                { label: "About Us", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white/70 hover:text-kirana-turmeric transition-colors text-sm font-body flex items-center gap-2"
                  >
                    <ChevronRight className="h-3 w-3 text-kirana-orange/60" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-display font-bold text-base mb-4 text-kirana-turmeric">
              Humse Milein
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-kirana-orange mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm font-body">
                  {"Kusha Naranpur, Hadna, Hussainabad - 822116, Jharkhand"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-kirana-orange shrink-0" />
                <span className="text-white/70 text-sm font-body">
                  {storeInfo?.timings || "7 AM – 10 PM, Mon–Sun"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-kirana-orange shrink-0" />
                <a
                  href="tel:+919142172084"
                  className="text-white/70 hover:text-kirana-turmeric transition-colors text-sm font-body"
                >
                  +91 91421 72084
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs font-body">
            © {new Date().getFullYear()} Raushan Kirana Store. Sab haq surakshit
            hain.
          </p>
          <p className="text-white/50 text-xs font-body">
            Built with{" "}
            <Heart className="h-3 w-3 inline text-kirana-orange fill-kirana-orange" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="hover:text-kirana-turmeric transition-colors underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    // Scroll to products after selecting
    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <NavBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <HeroSection />
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <ProductsSection selectedCategory={selectedCategory} />
        <AboutSection />
      </main>
      <ContactSection />

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/919142172084?text=${encodeURIComponent("Namaste! Order karein ya kuch poochein.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp pe order karein ya poochein"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-body font-medium text-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-colors duration-200"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.4,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">WhatsApp Order</span>
      </motion.a>
    </div>
  );
}
