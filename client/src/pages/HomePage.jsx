import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import FloatingPetals from "../components/auth/FloatingPetals";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

// Image Imports (8 original + 4 new gallery additions)
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

// Floral SVGs for Decoration (Detailed Vintage Line Art Drawing Styles)
const FlowerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M18.364 5.636L5.636 18.364M18.364 18.364L5.636 5.636" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-accent/15" />
  </svg>
);

const FloralBranch = ({ className }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
    <path d="M10,110 C35,95 55,60 110,10" />
    <path d="M60,50 C70,36 82,26 95,20 C85,28 72,42 60,50 Z" fill="currentColor" className="text-accent/10" />
    <path d="M42,68 C50,56 60,46 72,40 C62,46 52,58 42,68 Z" fill="currentColor" className="text-accent/10" />
    <path d="M28,84 C34,74 44,66 54,60 C44,64 34,74 28,84 Z" fill="currentColor" className="text-accent/10" />
    <path d="M78,32 C90,20 100,15 105,15 C100,20 88,32 78,32 Z" fill="currentColor" className="text-accent/10" />
  </svg>
);

const LeafDecoration = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M50,95 Q50,55 75,30" />
    <path d="M50,75 Q60,70 58,62 Q52,65 50,75" fill="currentColor" className="text-accent/10" />
    <path d="M50,55 Q38,50 42,42 Q48,45 50,55" fill="currentColor" className="text-accent/10" />
    <path d="M62,45 Q72,38 68,30 Q60,35 62,45" fill="currentColor" className="text-accent/10" />
  </svg>
);

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1.0] },
  }),
};

const imageFade = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const services = [
  {
    image: haldiCeremony,
    title: "AI Video Planning",
    description: "Get function-wise cinematic video plans, custom shot lists, and music cues tailored to cultural ceremonies.",
    linkText: "Explore Planning",
  },
  {
    image: mandapDesign,
    title: "Mandap & Event Design",
    description: "Generate stunning pastel templates, floral themes, and symmetrical arrangements for royal and modern backdrops.",
    linkText: "Explore Design",
  },
  {
    image: weddingStationery,
    title: "Wedding Album Layouts",
    description: "Create premium page-by-page album configurations, luxury monograms, and invitation suites matched to your wedding theme.",
    linkText: "Explore Albums",
  },
];

// Rich, diverse list of 12 cultural wedding showcases
const galleryItems = [
  { img: heroNorthIndian, title: "North Indian Varmala Sunset", aspect: "aspect-[3/4]" },
  { img: galleryGujarati, title: "Gujarati Panetar Bride Portrait", aspect: "aspect-[4/3]" },
  { img: heroSouthIndian, title: "South Indian Temple Vows", aspect: "aspect-[3/4]" },
  { img: gallerySangeet, title: "High-Energy Sangeet Performance", aspect: "aspect-[4/3]" },
  { img: nikaahCouple, title: "Muslim Nikaah Celebration", aspect: "aspect-[3/4]" },
  { img: galleryMehendi, title: "Intricate Bridal Henna Detail", aspect: "aspect-[4/3]" },
  { img: heroBengali, title: "Bengali Shubho Drishti Ritual", aspect: "aspect-[3/4]" },
  { img: christianBeach, title: "Goan Christian Seaside Vows", aspect: "aspect-[4/3]" },
  { img: galleryMaharashtrian, title: "Maharashtrian Mundavalya Couple", aspect: "aspect-[3/4]" },
  { img: haldiCeremony, title: "Joyful Marigold Haldi Laughter", aspect: "aspect-[4/3]" },
  { img: mandapDesign, title: "Premium Floral Mandap Concept", aspect: "aspect-[3/4]" },
  { img: weddingStationery, title: "Luxury Invitation Suit Flatlay", aspect: "aspect-[4/3]" },
];

const testimonials = [
  {
    text: "“The AI video plan was incredibly detailed. Our videographer said it captured the distinct details of our Punjabi ceremonies perfectly and saved days of script-writing work!”",
    author: "Aarav & Ishani",
    detail: "Delhi Palace Wedding",
  },
  {
    text: "“The mandap styling recommendations perfectly merged our traditional South Indian temple elements with modern pastel florals. It looked absolutely breathtaking!”",
    author: "Meera & Siddharth",
    detail: "Kerala Backwaters Wedding",
  },
  {
    text: "“From the Nikaah floral canopy design to the custom invitation branding, the AI unified our Hyderabad heritage wedding beautifully. Everyone was in awe.”",
    author: "Zoya & Kabir",
    detail: "Hyderabad Heritage Wedding",
  },
];

const portfolios = [
  { img: mandapDesign, couple: "Aarav & Ishani", location: "Royal Rajasthan Palace" },
  { img: heroSouthIndian, couple: "Meera & Siddharth", location: "Kerala Backwaters" },
  { img: nikaahCouple, couple: "Zoya & Kabir", location: "Hyderabad Heritage Palace" },
  { img: christianBeach, couple: "Rhea & Joshua", location: "Goan Seaside Chapel" },
];

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
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

  return (
    <div className="min-h-screen bg-background font-montserrat text-paragraphs selection:bg-accent/20 selection:text-heading relative overflow-x-hidden">
      {/* Cursive Floating Petals Background */}
      <FloatingPetals />

      {/* ─── NAVBAR ─── */}
      <Header />

      {/* ─── HERO SECTION (Lovio Home A Style) ─── */}
      <section className="relative px-6 py-12 sm:px-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex flex-col items-center">
            
            {/* The 3-Image Grid (representing North, South, East cultures) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 min-h-[400px] sm:min-h-[500px]">
              
              <motion.div 
                variants={imageFade} 
                initial="hidden" 
                animate="visible"
                className="overflow-hidden bg-preload border border-border-sage/40 aspect-[4/5] sm:aspect-auto"
              >
                <img 
                  src={heroNorthIndian} 
                  alt="North Indian Varmala Wedding" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" 
                />
              </motion.div>

              <motion.div 
                variants={imageFade} 
                initial="hidden" 
                animate="visible"
                className="overflow-hidden bg-preload border border-border-sage/40 aspect-[4/5] sm:aspect-auto hidden sm:block"
              >
                <img 
                  src={heroSouthIndian} 
                  alt="South Indian Temple Wedding" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" 
                />
              </motion.div>

              <motion.div 
                variants={imageFade} 
                initial="hidden" 
                animate="visible"
                className="overflow-hidden bg-preload border border-border-sage/40 aspect-[4/5] sm:aspect-auto hidden sm:block"
              >
                <img 
                  src={heroBengali} 
                  alt="Bengali Bride Shubho Drishti" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" 
                />
              </motion.div>

            </div>

            {/* Overlapping Center Card (block-hero---a) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="w-full max-w-[760px] bg-background border border-border-sage p-8 sm:p-14 text-center mt-8 sm:absolute sm:bottom-[-60px] z-20 shadow-sm relative"
            >
              <div className="flex flex-col items-center">
                {/* Small Subtitle Icon */}
                <div className="w-12 h-12 text-accent mb-4">
                  <FlowerIcon className="w-full h-full" />
                </div>
                
                {/* Handwritten Cursive Note */}
                <span className="font-cursive text-accent text-2xl lowercase tracking-wide mb-3 block">
                  Legendary celebrations
                </span>

                {/* Main Serif Header */}
                <h1 className="font-marcellus text-3xl sm:text-5xl tracking-wide text-heading font-normal leading-[1.2] mb-6">
                  Luxury Weddings <br className="hidden sm:inline" />&amp; AI Planning
                </h1>

                {/* Underlined Elegant Link */}
                <Link 
                  to="/signup" 
                  className="text-xs uppercase font-semibold tracking-[0.2em] text-heading hover:text-accent transition duration-300 border-b border-heading hover:border-accent pb-1 block"
                >
                  Start Planning
                </Link>
              </div>

              {/* Decorative Corner Foliage */}
              <LeafDecoration className="absolute -top-6 -right-6 w-16 h-16 text-subtitle/30 hidden sm:block" />
              <LeafDecoration className="absolute -bottom-6 -left-6 w-16 h-16 text-subtitle/30 transform rotate-180 hidden sm:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacer for Absolute card layout on desktop */}
      <div className="h-0 sm:h-20 lg:h-24"></div>

      {/* ─── EXTRA QUOTE SECTION (block-extra) ─── */}
      <section className="px-6 py-20 sm:py-28 bg-background border-t border-border-sage/30">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            {/* Elegant Vector Vine */}
            <FloralBranch className="w-16 h-16 text-subtitle mb-6" />
            
            {/* Serif Quote Header */}
            <h2 className="font-marcellus text-2xl sm:text-3xl lg:text-4xl text-heading font-normal leading-relaxed tracking-wide italic max-w-3xl">
              "Your wedding should be utterly unforgettable, deeply romantic, exquisitely beautiful and entirely 'you'."
            </h2>
            
            {/* Serif Divider Line */}
            <div className="w-24 h-[1px] bg-border-sage my-8" />
            
            {/* Details Paragraph */}
            <p className="text-sm leading-loose max-w-2xl text-paragraphs/90 font-light mb-6">
              AI Wedding Planner combines your unique cultural heritage with intelligent planning algorithms. Whether coordinating vibrant North Indian Sangeets, peaceful South Indian rituals, or intimate beach vows, we craft seamless, bespoke guides to save you days of research and preparation.
            </p>

            {/* Cursive Signature */}
            <span className="font-cursive text-accent text-2xl lowercase mt-2">
              AI Wedding System
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── 3-COLUMN SERVICES SECTION ─── */}
      <section id="features" className="px-6 py-12 sm:px-12 bg-background border-t border-border-sage/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Card Image Container with Zoom Effect */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-preload border border-border-sage/40 mb-6 relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                  />
                  {/* Subtle Elegant Overlay */}
                  <div className="absolute inset-0 bg-heading/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Service Text details */}
                <h3 className="font-marcellus text-xl tracking-wide text-heading font-normal mb-3">
                  {service.title}
                </h3>
                
                <p className="text-xs leading-relaxed text-paragraphs font-light max-w-xs mb-5">
                  {service.description}
                </p>

                {/* Cursive or clean underlined link */}
                <Link 
                  to="/features" 
                  className="text-xs uppercase font-semibold tracking-widest text-heading hover:text-accent transition duration-300 border-b border-heading/30 hover:border-accent pb-0.5"
                >
                  {service.linkText}
                </Link>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ─── POSTCARD SECTION (Who We Are / Story) ─── */}
      <section id="about" className="px-6 py-20 sm:px-12 sm:py-28 bg-background border-t border-border-sage/30 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
            
            {/* Left Block Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-start text-left lg:pr-12"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FlowerIcon className="w-5 h-5 text-accent" />
                <span className="text-xs uppercase tracking-widest font-semibold text-subtitle">
                  our vision
                </span>
              </div>

              <h2 className="font-marcellus text-3xl sm:text-4xl text-heading tracking-wide leading-tight font-normal mb-6">
                Weave heritage into every thread of your event
              </h2>

              <p className="text-sm leading-loose font-light text-paragraphs/90 mb-8">
                Your wedding is more than a ceremony; it is a tapestry of cultural traditions, colors, and memories. Our AI planning tool helps you seamlessly map traditional guidelines across various Indian wedding backgrounds. From traditional music lists to ceremony shot configurations, we orchestrate the technical complexity of planning so you can focus entirely on celebrating the romance of your union.
              </p>

              <Link 
                to="/about" 
                className="border border-heading px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-heading hover:bg-heading hover:text-background transition duration-300"
              >
                Explore Our Story
              </Link>
            </motion.div>

            {/* Right Block Image (Postcard Image with overlapping flora) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden sm:overflow-visible"
            >
              <div className="w-full h-full overflow-hidden bg-preload border border-border-sage/40 relative">
                <img 
                  src={nikaahCouple} 
                  alt="Muslim Nikaah Bride & Groom" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-103" 
                />
              </div>

              {/* Overlapping Floral SVGs */}
              <div className="absolute -top-10 -left-10 w-28 h-28 text-accent/80 hidden sm:block">
                <FloralBranch className="w-full h-full transform scale-x-[-1]" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-28 h-28 text-accent/80 hidden sm:block">
                <FloralBranch className="w-full h-full transform rotate-180" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── GALLERIES (Vision Made Real with Lightbox) ─── */}
      <section id="gallery" className="px-6 py-20 sm:px-12 sm:py-28 bg-background border-t border-border-sage/30">
        <div className="mx-auto max-w-7xl">
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <FlowerIcon className="w-5 h-5 text-accent" />
              <span className="text-xs uppercase tracking-widest font-semibold text-subtitle">
                Galleries
              </span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl text-heading tracking-wide font-normal mb-4">
              Your Vision Made Real
            </h2>
            <p className="text-xs leading-relaxed text-paragraphs font-light max-w-md mx-auto">
              A curated look into the unique visual signatures of different Indian cultural wedding celebrations. Click any image to view details in full-screen.
            </p>
          </div>

          {/* Staggered Masonry Gallery Grid (expanded to 12 items) */}
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={idx % 4}
                onClick={() => openLightbox(idx)}
                className="break-inside-avoid relative overflow-hidden group border border-border-sage/40 bg-preload cursor-pointer"
              >
                <div className={`w-full ${item.aspect} overflow-hidden relative`}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                  />
                  {/* Subtle Text Hover Overlay */}
                  <div className="absolute inset-0 bg-heading/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                    <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase mb-1">Culture Showcase</span>
                    <h4 className="font-marcellus text-base text-background tracking-wide font-normal leading-tight">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link 
              to="/gallery" 
              className="border border-heading px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-heading hover:bg-heading hover:text-background transition duration-300"
            >
              View Full Gallery
            </Link>
          </div>

        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─── */}
      <section id="testimonials" className="px-6 py-20 sm:px-12 bg-background border-t border-border-sage/30 relative">
        <div className="mx-auto max-w-4xl text-center">
          
          <div className="flex justify-center items-center space-x-3 mb-6">
            <FlowerIcon className="w-5 h-5 text-accent" />
            <span className="text-xs uppercase tracking-widest font-semibold text-subtitle">
              testimonials
            </span>
          </div>

          <h2 className="font-marcellus text-3xl text-heading tracking-wide font-normal mb-12">
            What our clients say
          </h2>

          {/* Testimonial Slider Panel */}
          <div className="min-h-[220px] flex flex-col justify-center items-center px-4 sm:px-12">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Quote text */}
              <p className="font-marcellus text-lg sm:text-xl lg:text-2xl leading-relaxed text-heading font-light italic max-w-2xl mb-8">
                {testimonials[testimonialIndex].text}
              </p>

              {/* Author cursive signature */}
              <span className="font-cursive text-accent text-2xl lowercase mb-1">
                {testimonials[testimonialIndex].author}
              </span>
              
              <span className="text-[10px] uppercase tracking-widest font-semibold text-subtitle">
                {testimonials[testimonialIndex].detail}
              </span>
            </motion.div>
          </div>

          {/* Slider navigation triggers */}
          <div className="flex justify-center items-center space-x-6 mt-10">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 border border-border-sage/60 rounded-full flex items-center justify-center text-heading hover:bg-heading hover:text-background hover:border-heading transition duration-300 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs font-semibold tracking-widest text-subtitle">
              {testimonialIndex + 1} / {testimonials.length}
            </span>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 border border-border-sage/60 rounded-full flex items-center justify-center text-heading hover:bg-heading hover:text-background hover:border-heading transition duration-300 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-12 flex justify-center">
            <Link 
              to="/journal" 
              className="border border-heading px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-heading hover:bg-heading hover:text-background transition duration-300"
            >
              Read Full Journal Stories
            </Link>
          </div>

          {/* Floating background foliage decoration */}
          <div className="absolute right-10 bottom-10 w-24 h-24 text-accent/20 hidden lg:block">
            <FloralBranch className="w-full h-full transform scale-y-[-1]" />
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO GRID SECTION ─── */}
      <section className="px-6 py-20 sm:px-12 bg-background border-t border-border-sage/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <FlowerIcon className="w-5 h-5 text-accent" />
              <span className="text-xs uppercase tracking-widest font-semibold text-subtitle">
                portfolio
              </span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl text-heading tracking-wide font-normal mb-4">
              Events to make your heart skip a beat
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {portfolios.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={idx}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-full aspect-[3/4] overflow-hidden bg-preload border border-border-sage/40 mb-5 relative">
                  <img 
                    src={item.img} 
                    alt={item.couple} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-heading/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h4 className="font-marcellus text-lg text-heading font-normal mb-1">
                  {item.couple}
                </h4>
                
                <span className="text-[10px] uppercase tracking-widest font-semibold text-subtitle mb-4">
                  {item.location}
                </span>

                <Link 
                  to="/signup" 
                  className="text-xs uppercase font-semibold tracking-widest text-heading hover:text-accent transition duration-300 border-b border-heading/30 hover:border-accent pb-0.5"
                >
                  view details
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── CALL TO ACTION SECTION (CTA) ─── */}
      <section className="px-6 py-20 sm:px-12 sm:py-28 bg-background border-t border-border-sage/30 relative">
        <div className="mx-auto max-w-4xl text-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="border border-border-sage p-8 sm:p-16 relative overflow-hidden bg-background"
          >
            {/* Floating Background Foliage */}
            <div className="absolute -top-6 -right-6 w-16 h-16 text-subtitle/30 hidden sm:block">
              <LeafDecoration className="w-full h-full" />
            </div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-10 h-10 text-accent mb-4">
                <FlowerIcon className="w-full h-full" />
              </div>

              <h2 className="font-marcellus text-3xl sm:text-5xl text-heading tracking-wide font-normal leading-tight mb-4">
                Ready to Plan Your <br className="hidden sm:inline" />
                <span className="text-accent italic font-light">Dream Celebration?</span>
              </h2>

              <p className="text-sm leading-loose max-w-lg font-light text-paragraphs mb-8">
                Sign up today to create your customized cultural schedule, design elegant album layouts, and structures with precision AI templates.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto text-center border border-heading bg-heading text-background px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-background hover:text-heading transition duration-300"
                >
                  Create Free Account
                </Link>
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto text-center border border-border-sage px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-heading hover:bg-heading hover:text-background hover:border-heading transition duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 text-subtitle/30 transform rotate-180 hidden sm:block">
              <LeafDecoration className="w-full h-full" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />

      {/* ─── LIGHTBOX MODAL ─── */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-6 py-6 transition-all duration-300"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition p-2 cursor-pointer z-50"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={30} />
          </button>

          {/* Main Content Area */}
          <div className="relative flex flex-col items-center justify-center max-w-5xl w-full h-[80vh] select-none">
            {/* Left Nav trigger */}
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

            {/* Right Nav trigger */}
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
            <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase mb-1 block">Culture Showcase</span>
            <h4 className="font-marcellus text-lg tracking-wide font-normal leading-tight">{galleryItems[lightboxIndex].title}</h4>
            <p className="text-[10px] text-white/50 tracking-widest mt-1.5 uppercase font-semibold">
              {lightboxIndex + 1} of {galleryItems.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
