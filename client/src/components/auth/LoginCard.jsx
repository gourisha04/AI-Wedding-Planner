import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WandSparkles } from "lucide-react";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

export default function LoginCard() {
  return (
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
          <h1 className="bg-gradient-to-r from-rose-600 via-orange-500 to-stone-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            AI Wedding Planner
          </h1>

          <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-600">
            Plan. Organize. Capture. Celebrate.
          </p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="mx-4 text-sm text-stone-500">Continue with</span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        <SocialLogin />

        <p className="mt-8 text-center text-sm text-stone-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-rose-600 transition hover:text-stone-900"
          >
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
