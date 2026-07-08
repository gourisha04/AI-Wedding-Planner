import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FloatingPetals from "../components/auth/FloatingPetals";

// Image Imports
import heroNorthIndian from "../assets/images/hero_north_indian.png";
import heroSouthIndian from "../assets/images/hero_south_indian.png";
import heroBengali from "../assets/images/hero_bengali.png";
import haldiCeremony from "../assets/images/haldi_ceremony.png";
import mandapDesign from "../assets/images/mandap_design.png";
import weddingStationery from "../assets/images/wedding_stationery.png";
import nikaahCouple from "../assets/images/nikaah_couple.png";
import christianBeach from "../assets/images/christian_beach.png";
import galleryGujarati from "../assets/images/gallery_gujarati.png";
import galleryMaharashtrian from "../assets/images/gallery_maharashtrian.png";
import gallerySangeet from "../assets/images/gallery_sangeet.png";
import galleryMehendi from "../assets/images/gallery_mehendi.png";

const FlowerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M18.364 5.636L5.636 18.364M18.364 18.364L5.636 5.636" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-accent/15" />
  </svg>
);

const galleryItems = [
  { img: heroNorthIndian, title: "North Indian Varmala Sunset", category: "ceremonies", aspect: "aspect-[3/4]" },
  { img: galleryGujarati, title: "Gujarati Panetar Bride Portrait", category: "portraits", aspect: "aspect-[4/3]" },
  { img: heroSouthIndian, title: "South Indian Temple Vows", category: "ceremonies", aspect: "aspect-[3/4]" },
  { img: gallerySangeet, title: "High-Energy Sangeet Performance", category: "ceremonies", aspect: "aspect-[4/3]" },
  { img: nikaahCouple, title: "Muslim Nikaah Celebration", category: "ceremonies", aspect: "aspect-[3/4]" },
  { img: galleryMehendi, title: "Intricate Bridal Henna Detail", category: "portraits", aspect: "aspect-[4/3]" },
  { img: heroBengali, title: "Bengali Shubho Drishti Ritual", category: "ceremonies", aspect: "aspect-[3/4]" },
  { img: christianBeach, title: "Goan Christian Seaside Vows", category: "ceremonies", aspect: "aspect-[4/3]" },
  { img: galleryMaharashtrian, title: "Maharashtrian Mundavalya Couple", category: "portraits", aspect: "aspect-[3/4]" },
  { img: haldiCeremony, title: "Joyful Marigold Haldi Laughter", category: "ceremonies", aspect: "aspect-[4/3]" },
  { img: mandapDesign, title: "Premium Floral Mandap Concept", category: "decor", aspect: "aspect-[3/4]" },
  { img: weddingStationery, title: "Luxury Invitation Suit Flatlay", category: "decor", aspect: "aspect-[4/3]" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const openLightbox = (idx) => {
    // Find matching index in filtered list
    const originalItem = filteredItems[idx];
    const indexInOriginal = galleryItems.findIndex(item => item.title === originalItem.title);
    setLightboxIndex(indexInOriginal);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background font-montserrat text-paragraphs selection:bg-accent/20 relative overflow-x-hidden">
      <FloatingPetals />
      <Header />

      {/* ─── TITLE INTRO ─── */}
      <section className="relative px-6 py-16 sm:px-12 sm:py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col items-center">
            <div className="w-12 h-12 text-accent mb-4">
              <FlowerIcon className="w-full h-full" />
            </div>
            
            <span className="font-cursive text-accent text-2xl lowercase tracking-wide mb-3 block">
              celebrating traditions
            </span>

            <h1 className="font-marcellus text-3xl sm:text-5xl tracking-wide text-heading font-normal leading-tight mb-6">
              Our Cultural Showcase
            </h1>

            <p className="text-sm leading-loose max-w-2xl text-paragraphs font-light">
              Immerse yourself in our portfolio. Browse through wedding ceremonies, outfits, mandap decors, and print stationeries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FILTERS ─── */}
      <section className="px-6 pb-8 text-center">
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-heading">
          {["all", "ceremonies", "portraits", "decor"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 border rounded-full transition duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-heading text-background border-heading"
                  : "border-border-sage/40 hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── MASONRY GRID ─── */}
      <section className="px-6 py-12 sm:px-12 max-w-7xl mx-auto border-t border-border-sage/20">
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid relative overflow-hidden group border border-border-sage/40 bg-preload cursor-pointer rounded shadow-sm"
            >
              <div className={`w-full ${item.aspect} overflow-hidden relative`}>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-heading/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase mb-1">{item.category}</span>
                  <h4 className="font-marcellus text-base text-background tracking-wide font-normal leading-tight">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20"></div>

      <Footer />

      {/* ─── LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 px-6 py-6"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition p-2 cursor-pointer z-55"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={30} />
            </button>

            {/* Main Content Area */}
            <div className="relative flex flex-col items-center justify-center max-w-5xl w-full h-[80vh] select-none">
              {/* Left Nav */}
              <button 
                className="absolute left-0 sm:left-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                onClick={prevLightbox}
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Current Image */}
              <img 
                src={galleryItems[lightboxIndex].img} 
                alt={galleryItems[lightboxIndex].title} 
                className="max-h-[70vh] max-w-[85%] sm:max-w-[75%] object-contain border border-white/10 shadow-2xl transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Right Nav */}
              <button 
                className="absolute right-0 sm:right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                onClick={nextLightbox}
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Info Details Footer */}
            <div className="text-center mt-4 text-white z-10 select-none">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase mb-1 block">
                {galleryItems[lightboxIndex].category} Showcase
              </span>
              <h4 className="font-marcellus text-lg tracking-wide font-normal leading-tight">
                {galleryItems[lightboxIndex].title}
              </h4>
              <p className="text-[10px] text-white/50 tracking-widest mt-1.5 uppercase font-semibold">
                {lightboxIndex + 1} of {galleryItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
