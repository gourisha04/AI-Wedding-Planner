import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { WandSparkles } from "lucide-react";

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
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/35 via-white/5 to-amber-100/30" />

      <FloatingPetals />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-[520px]"
        >
          <div className="rounded-lg border border-white/60 bg-white/75 px-6 py-8 shadow-[0_24px_70px_rgba(127,29,29,0.16)] backdrop-blur-3xl sm:px-10 sm:py-10">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 shadow-lg">
                <WandSparkles className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                Create Account
              </h1>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-600">
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
