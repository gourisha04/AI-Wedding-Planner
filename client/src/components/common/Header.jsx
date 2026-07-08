import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// Vintage line art style floral icons
const FlowerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M18.364 5.636L5.636 18.364M18.364 18.364L5.636 5.636" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-accent/15" />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border-sage bg-background/90 backdrop-blur-md py-5 transition-all">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 flex items-center justify-between">
        
        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-heading hover:text-accent transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Left Navigation Grid (Desktop) */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-widest text-heading">
          <Link 
            to="/features" 
            className={`hover:text-accent transition duration-300 ${isActive("/features") ? "text-accent border-b border-accent pb-1" : ""}`}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className={`hover:text-accent transition duration-300 ${isActive("/about") ? "text-accent border-b border-accent pb-1" : ""}`}
          >
            About
          </Link>
          <Link 
            to="/gallery" 
            className={`hover:text-accent transition duration-300 ${isActive("/gallery") ? "text-accent border-b border-accent pb-1" : ""}`}
          >
            Gallery
          </Link>
        </div>

        {/* Centered Elegant Brand Name */}
        <Link to="/" className="text-center flex flex-col items-center">
          <span className="font-marcellus text-2xl font-normal tracking-[0.25em] text-heading leading-tight uppercase">
            AI Wedding<span className="text-accent">.</span>
          </span>
          <span className="text-[9px] tracking-[0.4em] font-semibold uppercase text-subtitle mt-0.5">
            Premium Planner
          </span>
        </Link>

        {/* Right Navigation Grid (Desktop) */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-widest text-heading">
          <Link 
            to="/journal" 
            className={`hover:text-accent transition duration-300 ${isActive("/journal") ? "text-accent border-b border-accent pb-1" : ""}`}
          >
            Journal
          </Link>
          <Link to="/login" className="hover:text-accent transition duration-300">Sign In</Link>
          <Link 
            to="/signup" 
            className="border border-border-sage px-5 py-2 hover:bg-heading hover:text-background hover:border-heading transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Sign In Trigger */}
        <div className="md:hidden">
          <Link to="/login" className="text-xs uppercase font-semibold tracking-widest text-heading hover:text-accent transition">
            Sign In
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-border-sage bg-background px-6 py-6 space-y-4 flex flex-col text-sm uppercase tracking-widest font-semibold text-heading"
        >
          <Link to="/features" onClick={() => setMobileMenuOpen(false)} className={`hover:text-accent transition ${isActive("/features") ? "text-accent" : ""}`}>Features</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`hover:text-accent transition ${isActive("/about") ? "text-accent" : ""}`}>About</Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className={`hover:text-accent transition ${isActive("/gallery") ? "text-accent" : ""}`}>Gallery</Link>
          <Link to="/journal" onClick={() => setMobileMenuOpen(false)} className={`hover:text-accent transition ${isActive("/journal") ? "text-accent" : ""}`}>Journal</Link>
          <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-center block border border-border-sage py-2.5 hover:bg-heading hover:text-background transition">Get Started</Link>
        </motion.div>
      )}
    </nav>
  );
}
