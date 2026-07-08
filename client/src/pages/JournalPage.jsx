import { motion } from "framer-motion";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FloatingPetals from "../components/auth/FloatingPetals";

// Image Imports
import heroSouthIndian from "../assets/images/hero_south_indian.png";
import mandapDesign from "../assets/images/mandap_design.png";
import nikaahCouple from "../assets/images/nikaah_couple.png";
import christianBeach from "../assets/images/christian_beach.png";

const FlowerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M18.364 5.636L5.636 18.364M18.364 18.364L5.636 5.636" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-accent/15" />
  </svg>
);

const stories = [
  {
    image: mandapDesign,
    title: "A Royal Rajasthan Palace Ceremony",
    couple: "Aarav & Ishani",
    date: "November 2025",
    content: "Our Punjabi wedding was a grand affair. The AI video planner formulated cinematic camera guides that captured every Baraat dance and the emotional Vidaai tears. Our wedding video looks straight out of a Bollywood trailer!",
    quote: "“The detail in the AI shotlist was incredible. Our production team didn't miss a single crucial ritual.”"
  },
  {
    image: heroSouthIndian,
    title: "Tranquil Kerala Backwaters Vows",
    couple: "Meera & Siddharth",
    date: "December 2025",
    content: "For our traditional South Indian ceremony, the event design system recommended a beautiful mandap of pastel roses and yellow marigold. The album layouts aligned perfectly with our sage and gold heritage accents.",
    quote: "“The system beautifully merged classical South Indian elements with contemporary pastel accents.”"
  },
  {
    image: nikaahCouple,
    title: "Heritage Hyderabad Palace Nikaah",
    couple: "Zoya & Kabir",
    date: "January 2026",
    content: "The custom typography and gold foil embossing ideas gave our invitations an elite branding. The platform created a synchronized plan from the Sangeet playlist to the grand entry reception.",
    quote: "“Everyone praised the visual consistency of the invitation suite and our venue branding.”"
  },
  {
    image: christianBeach,
    title: "Sunset Goan Seaside Chapel Vows",
    couple: "Rhea & Joshua",
    date: "February 2026",
    content: "We planned a destination beach wedding. The AI suggested a minimal white and ocean-teal color palette. The vertical reels generated for Instagram were clean, modern, and high-energy.",
    quote: "“Our social media feeds are gorgeous. The reel plan was extremely fun to shoot!”"
  }
];

export default function JournalPage() {
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
              real client journals
            </span>

            <h1 className="font-marcellus text-3xl sm:text-5xl tracking-wide text-heading font-normal leading-tight mb-6">
              The Wedding Journal
            </h1>

            <p className="text-sm leading-loose max-w-2xl text-paragraphs font-light">
              Read the stories of couples who designed and filmed their dream weddings using AI planning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── JOURNALS LIST ─── */}
      <section className="px-6 py-12 sm:px-12 max-w-7xl mx-auto border-t border-border-sage/20 space-y-20">
        {stories.map((story, idx) => (
          <motion.div
            key={story.couple}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Story Image */}
            <div className={`overflow-hidden rounded border border-border-sage/40 bg-preload aspect-[4/3] ${
              idx % 2 === 1 ? "lg:order-last" : ""
            }`}>
              <img 
                src={story.image} 
                alt={story.title} 
                className="w-full h-full object-cover hover:scale-103 transition duration-[1500ms]" 
              />
            </div>

            {/* Story Details */}
            <div className="text-left space-y-5">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase">
                {story.couple} &bull; {story.date}
              </span>

              <h3 className="font-marcellus text-2xl text-heading tracking-wide leading-tight">
                {story.title}
              </h3>

              <p className="text-sm leading-relaxed font-light text-paragraphs/90">
                {story.content}
              </p>

              <blockquote className="border-l-2 border-accent pl-4 py-1 italic text-heading font-marcellus text-base">
                {story.quote}
              </blockquote>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Spacer */}
      <div className="h-20"></div>

      <Footer />
    </div>
  );
}
