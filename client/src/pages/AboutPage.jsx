import { motion } from "framer-motion";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FloatingPetals from "../components/auth/FloatingPetals";

// Image Imports
import nikaahCouple from "../assets/images/nikaah_couple.png";

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

export default function AboutPage() {
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
              our signature story
            </span>

            <h1 className="font-marcellus text-3xl sm:text-5xl tracking-wide text-heading font-normal leading-tight mb-6">
              About AI Wedding System
            </h1>

            <p className="text-sm leading-loose max-w-2xl text-paragraphs font-light">
              We weave traditional heritage values with machine-generated workflows, saving you weeks of manual event planning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── BODY DETAILS (Postcard look) ─── */}
      <section className="px-6 py-12 sm:px-12 sm:py-16 max-w-7xl mx-auto border-t border-border-sage/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col items-start text-left lg:pr-12">
            <h2 className="font-marcellus text-2xl sm:text-3xl text-heading tracking-wide leading-snug font-normal mb-6">
              Our Vision: Elevating Traditional Celebrations
            </h2>
            <p className="text-sm leading-loose font-light text-paragraphs/90 mb-6">
              Planning an Indian wedding can be overwhelming. The multiple customs, ceremonies (like Haldi, Mehendi, Sangeet, Nikaah, Pheras), and deliverables require extensive coordination.
            </p>
            <p className="text-sm leading-loose font-light text-paragraphs/90 mb-6">
              AI Wedding System acts as an intelligent workspace. By configuring details, our algorithms synthesize cinematic video structures, layout configurations, and custom design boards that respect cultural values.
            </p>
            <div className="w-24 h-[1px] bg-border-sage my-4" />
            <span className="font-cursive text-accent text-2xl lowercase mt-2">
              DeepMind Pairing Session, 2026
            </span>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
            <div className="w-full h-full overflow-hidden bg-preload border border-border-sage/40 relative rounded shadow-sm">
              <img 
                src={nikaahCouple} 
                alt="Heritage Wedding Couple" 
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
      </section>

      {/* ─── THREE VALUES COLUMN ─── */}
      <section className="px-6 py-16 sm:px-12 sm:py-24 bg-white border-t border-border-sage/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-marcellus text-2xl sm:text-3xl text-heading tracking-wide font-normal">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 text-accent mb-4">
                <FlowerIcon className="w-full h-full" />
              </div>
              <h3 className="font-marcellus text-lg text-heading mb-3">Cultural Integrity</h3>
              <p className="text-xs leading-relaxed text-paragraphs font-light max-w-xs">
                We understand the nuances of wedding rituals. Our AI plans respect regional traditions, details, and schedules.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 text-accent mb-4">
                <FlowerIcon className="w-full h-full" />
              </div>
              <h3 className="font-marcellus text-lg text-heading mb-3">Cinematic Precision</h3>
              <p className="text-xs leading-relaxed text-paragraphs font-light max-w-xs">
                Every camera shot suggestion, mood choice, and musical recommendation matches elite standards of premium wedding filmmaking.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 text-accent mb-4">
                <FlowerIcon className="w-full h-full" />
              </div>
              <h3 className="font-marcellus text-lg text-heading mb-3">Effortless Automation</h3>
              <p className="text-xs leading-relaxed text-paragraphs font-light max-w-xs">
                Save hours of brainstorming with structured outlines generated within seconds, leaving you free to enjoy the romance of your union.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
