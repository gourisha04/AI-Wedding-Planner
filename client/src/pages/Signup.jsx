import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Heart } from "lucide-react";

import FloatingPetals from "../components/auth/FloatingPetals";
import SignupForm from "../components/auth/SignupForm";
import loginBg from "../assets/images/loginbg.png";

function Signup() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-center" />

      <img
        src={loginBg}
        alt="Wedding celebration"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/35 via-white/5 to-accent/30" />

      <FloatingPetals />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-[500px]"
        >
          <div className="rounded-lg border border-border-sage bg-background/95 px-6 py-8 shadow-md backdrop-blur-md sm:px-10 sm:py-10 text-left">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-heading text-background shadow-md">
                <Heart className="h-6 w-6 text-accent fill-accent" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="font-marcellus text-2xl sm:text-3xl font-normal text-heading uppercase tracking-[0.2em]">
                Create Account
              </h1>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-subtitle">
                Start your AI wedding workspace
              </p>
            </div>

            <div className="mt-8">
              <SignupForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
