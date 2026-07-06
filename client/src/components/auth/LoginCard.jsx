import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="w-full max-w-[500px]"
    >
      <div className="rounded-lg border border-border-sage bg-background/95 px-6 py-8 shadow-md backdrop-blur-md sm:px-10 sm:py-10 text-left">
        
        {/* Heart Logo Icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-heading text-background shadow-md">
            <Heart className="h-6 w-6 text-accent fill-accent" />
          </div>
        </div>

        {/* Serif Logo & Subtitle */}
        <div className="mt-6 text-center">
          <h1 className="font-marcellus text-2xl sm:text-3xl font-normal text-heading uppercase tracking-[0.2em]">
            AI Wedding<span className="text-accent">.</span>
          </h1>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-subtitle">
            Premium Planner Workspace
          </p>
        </div>

        {/* Login Form component */}
        <div className="mt-8">
          <LoginForm />
        </div>

        <p className="mt-8 text-center text-sm text-paragraphs font-light">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-accent hover:text-heading transition duration-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
