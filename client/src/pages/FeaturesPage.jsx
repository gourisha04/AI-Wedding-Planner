import { motion } from "framer-motion";
import { Sparkles, Video, Image, FileText, CheckCircle2, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FloatingPetals from "../components/auth/FloatingPetals";

// Image Imports
import haldiCeremony from "../assets/images/haldi_ceremony.png";
import mandapDesign from "../assets/images/mandap_design.png";
import weddingStationery from "../assets/images/wedding_stationery.png";

import { getSampleVideoUrl } from "../utils/sampleVideoLibrary";

const sampleVideos = {
  videoPlanning: getSampleVideoUrl("haldi"),
  eventDesign: getSampleVideoUrl("mehendi"),
  albumLayouts: getSampleVideoUrl("highlight")
};

const FlowerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M18.364 5.636L5.636 18.364M18.364 18.364L5.636 5.636" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-accent/15" />
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

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("video");
  const [playingVideo, setPlayingVideo] = useState(null);

  const videoRefs = {
    video: useRef(null),
    event: useRef(null),
    album: useRef(null)
  };

  const handlePlayPause = (key) => {
    const video = videoRefs[key].current;
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideo(key);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background font-montserrat text-paragraphs selection:bg-accent/20 relative overflow-x-hidden">
      <FloatingPetals />
      <Header />

      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 py-16 sm:px-12 sm:py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col items-center">
            <div className="w-12 h-12 text-accent mb-4">
              <FlowerIcon className="w-full h-full" />
            </div>
            
            <span className="font-cursive text-accent text-2xl lowercase tracking-wide mb-3 block">
              Curated capabilities
            </span>

            <h1 className="font-marcellus text-3xl sm:text-5xl tracking-wide text-heading font-normal leading-tight mb-6">
              AI Wedding Features Showcase
            </h1>

            <p className="text-sm leading-loose max-w-2xl text-paragraphs font-light">
              Explore how our intelligent system creates detailed schedules, video plans, and coordinates visual elements like theme palettes and album sheets for your memorable day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── INTERACTIVE SELECTOR TAB ─── */}
      <section className="px-6 py-4 max-w-7xl mx-auto">
        <div className="flex justify-center border-b border-border-sage/40 mb-12">
          <button
            onClick={() => setActiveTab("video")}
            className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition duration-300 cursor-pointer ${
              activeTab === "video"
                ? "border-accent text-accent"
                : "border-transparent text-paragraphs hover:text-heading"
            }`}
          >
            Cinematic Videography
          </button>
          <button
            onClick={() => setActiveTab("event")}
            className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition duration-300 cursor-pointer ${
              activeTab === "event"
                ? "border-accent text-accent"
                : "border-transparent text-paragraphs hover:text-heading"
            }`}
          >
            Scenic Venue Design
          </button>
          <button
            onClick={() => setActiveTab("album")}
            className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition duration-300 cursor-pointer ${
              activeTab === "album"
                ? "border-accent text-accent"
                : "border-transparent text-paragraphs hover:text-heading"
            }`}
          >
            Luxury Print Suites
          </button>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[500px]">
          {activeTab === "video" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Details */}
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-heading text-background">
                    <Video size={20} />
                  </div>
                  <h3 className="font-marcellus text-2xl text-heading tracking-wide">AI Cinematic Video Planning</h3>
                </div>

                <p className="text-sm leading-relaxed font-light">
                  Our planning system synthesizes function-wise filming directions, customized shot lists, and music cues tailored to distinct rituals. Whether capturing the vibrant colors of a Haldi ceremony or the deep emotions of a Vidaai, you receive a precise schedule.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Event-Specific Shot Guides</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Provides custom angles, camera motions, and highlights details for wedding videographers.</p>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Curation of Music Beats & Rhythms</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Suggests music style matches (from traditional shehnai to fast Punjabi dhol) based on ceremony pace.</p>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Highlight Sequence Outline</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Pre-calculated timecodes and duration tags for a polished 15-25 minute cinema wedding film.</p>
                </div>
              </div>

              {/* Right Media Cards (Image + Video) */}
              <div className="space-y-6">
                <div className="relative group overflow-hidden border border-border-sage/40 rounded bg-preload aspect-video shadow-md">
                  <video
                    ref={videoRefs.video}
                    src={sampleVideos.videoPlanning}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-100 group-hover:bg-black/45 transition-all">
                    <button
                      onClick={() => handlePlayPause("video")}
                      className="h-14 w-14 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:scale-105 transition"
                      aria-label="Play sample video"
                    >
                      {playingVideo === "video" ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white rounded">
                    Sample Video Plan Preview
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border-sage/40 overflow-hidden rounded bg-preload aspect-[4/3]">
                    <img src={haldiCeremony} alt="Haldi Video Setup" className="w-full h-full object-cover hover:scale-103 transition duration-700" />
                  </div>
                  <div className="border border-border-sage/40 p-4 rounded bg-white text-left flex flex-col justify-between">
                    <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase">AI Plan Output snippet</span>
                    <h4 className="font-marcellus text-sm text-heading font-medium leading-snug">"Haldi Paste Close-Ups & Flower Shower Slow-Mo"</h4>
                    <p className="text-[10px] font-light text-paragraphs mt-1">Recommended Duration: 3-5 mins | BGM: Traditional Folk Fusion</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "event" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Details */}
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-heading text-background">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-marcellus text-2xl text-heading tracking-wide">Mandap & Event Design</h3>
                </div>

                <p className="text-sm leading-relaxed font-light">
                  Align themes across royal backdrops, pastels, and floral arrangements. We generate layout guides, canopy suggestions, and design instructions matching your heritage.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Floral & Symmetrical Backdrop Planning</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Creates balanced structures using marigold, pastel roses, or classic carnations.</p>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Theme Color Palette Matching</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Harmonizes your chosen wedding theme color (e.g., Royal Gold, Sage Green) with venue aesthetics.</p>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Cultural Integrity Layouts</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Tailored structures for Mandaps, Nikaah stages, Goan seaside canopies, or temple arrangements.</p>
                </div>
              </div>

              {/* Right Media Cards (Image + Video) */}
              <div className="space-y-6">
                <div className="relative group overflow-hidden border border-border-sage/40 rounded bg-preload aspect-video shadow-md">
                  <video
                    ref={videoRefs.event}
                    src={sampleVideos.eventDesign}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-100 group-hover:bg-black/45 transition-all">
                    <button
                      onClick={() => handlePlayPause("event")}
                      className="h-14 w-14 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:scale-105 transition"
                      aria-label="Play sample event video"
                    >
                      {playingVideo === "event" ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white rounded">
                    Sample Venue Design Preview
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border-sage/40 overflow-hidden rounded bg-preload aspect-[4/3]">
                    <img src={mandapDesign} alt="Mandap Setup" className="w-full h-full object-cover hover:scale-103 transition duration-700" />
                  </div>
                  <div className="border border-border-sage/40 p-4 rounded bg-white text-left flex flex-col justify-between">
                    <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase">AI Design suggestion</span>
                    <h4 className="font-marcellus text-sm text-heading font-medium leading-snug">"Symmetrical Marigold Canopy with Warm Golden Backdrop"</h4>
                    <p className="text-[10px] font-light text-paragraphs mt-1">Arrangement: Traditional Circular | Flowers: Golden Tagetes & White Lilies</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "album" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Details */}
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-heading text-background">
                    <Image size={20} />
                  </div>
                  <h3 className="font-marcellus text-2xl text-heading tracking-wide">Album Design & Stationery Spreads</h3>
                </div>

                <p className="text-sm leading-relaxed font-light">
                  Formulates modern, elegant layouts page-by-page. Creates matching stationery, monogram styles, cover structures, and typography pairs to preserve memories.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Page-by-Page Spread Details</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Recommends full-bleed layouts, grid configurations (e.g. 2x2), and image slots for each ceremony page.</p>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Premium Cover Finish Planning</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Suggests luxury textures: matte black with silver typography, gold-foil embossing on ivory leather, etc.</p>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold text-heading">Typography & Stationery Pairing</p>
                  </div>
                  <p className="text-xs font-light pl-6 -mt-2">Suggests font pairs (e.g. Playfair Display headings with Lato body text) and monogram designs.</p>
                </div>
              </div>

              {/* Right Media Cards (Image + Video) */}
              <div className="space-y-6">
                <div className="relative group overflow-hidden border border-border-sage/40 rounded bg-preload aspect-video shadow-md">
                  <video
                    ref={videoRefs.album}
                    src={sampleVideos.albumLayouts}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-100 group-hover:bg-black/45 transition-all">
                    <button
                      onClick={() => handlePlayPause("album")}
                      className="h-14 w-14 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:scale-105 transition"
                      aria-label="Play sample album video"
                    >
                      {playingVideo === "album" ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white rounded">
                    Sample Album layout Preview
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border-sage/40 overflow-hidden rounded bg-preload aspect-[4/3]">
                    <img src={weddingStationery} alt="Wedding Stationery" className="w-full h-full object-cover hover:scale-103 transition duration-700" />
                  </div>
                  <div className="border border-border-sage/40 p-4 rounded bg-white text-left flex flex-col justify-between">
                    <span className="text-[10px] tracking-[0.2em] font-semibold text-accent uppercase">AI Album template</span>
                    <h4 className="font-marcellus text-sm text-heading font-medium leading-snug">"Luxury Invitation Flatlay & Double-Page Bleed Spreads"</h4>
                    <p className="text-[10px] font-light text-paragraphs mt-1">Heading Font: Playfair Display | Paper: Matte fine-texture 250gsm</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Decorative leaf vine bottom spacing */}
      <div className="h-20"></div>

      <Footer />
    </div>
  );
}
