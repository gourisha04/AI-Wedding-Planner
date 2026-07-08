import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border-sage py-12 px-6 sm:px-12 text-center">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Footer Logo */}
        <Link to="/" className="flex flex-col items-center mb-8">
          <span className="font-marcellus text-xl font-normal tracking-[0.25em] text-heading leading-tight uppercase">
            AI Wedding<span className="text-accent">.</span>
          </span>
          <span className="text-[8px] tracking-[0.4em] font-semibold uppercase text-subtitle mt-0.5">
            Premium Planner
          </span>
        </Link>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 text-xs font-semibold uppercase tracking-widest text-heading mb-8">
          <Link to="/features" className="hover:text-accent transition duration-300">Features</Link>
          <Link to="/about" className="hover:text-accent transition duration-300">About</Link>
          <Link to="/gallery" className="hover:text-accent transition duration-300">Gallery</Link>
          <Link to="/journal" className="hover:text-accent transition duration-300">Journal</Link>
        </div>

        <div className="w-12 h-[1px] bg-border-sage mb-8" />

        {/* Copyright text */}
        <p className="text-[10px] tracking-wider text-subtitle/90 font-light">
          © 2026 AI Wedding Planner. All rights reserved. Designed to emulate Webflow Lovio template guidelines.
        </p>
      </div>
    </footer>
  );
}
