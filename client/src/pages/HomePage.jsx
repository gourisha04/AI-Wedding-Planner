import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Film,
  Heart,
  Image,
  Sparkles,
  Star,
  Video,
  Wand2,
  Zap,
} from "lucide-react";
import FloatingPetals from "../components/auth/FloatingPetals";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: Video,
    title: "AI Video Planning",
    description:
      "Get function-wise cinematic video plans with shot lists, mood, music suggestions, and timing for every ceremony.",
    gradient: "from-rose-600 to-orange-500",
  },
  {
    icon: Image,
    title: "Album Design Layout",
    description:
      "AI generates page-by-page album layouts with cover design, typography, and color palette matched to your theme.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Film,
    title: "Highlight Video Structure",
    description:
      "Complete highlight reel structure — from opening drone shots to the closing cinematic montage.",
    gradient: "from-stone-800 to-rose-600",
  },
  {
    icon: Sparkles,
    title: "Social Media Reels",
    description:
      "AI-planned Instagram reels for Haldi, Sangeet, bridal entry, and couple moments with trending concepts.",
    gradient: "from-rose-500 to-pink-500",
  },
];

const steps = [
  {
    step: "01",
    title: "Enter Wedding Details",
    description:
      "Fill in bride & groom names, date, venue, theme, and select the ceremonies you want covered.",
    icon: Heart,
  },
  {
    step: "02",
    title: "AI Generates Your Plan",
    description:
      "Our AI engine analyzes your inputs and creates a complete video plan, album layout, and reel strategy.",
    icon: Wand2,
  },
  {
    step: "03",
    title: "Download & Execute",
    description:
      "Get clear, actionable plans ready for your editors, videographers, and album designers.",
    icon: Zap,
  },
];

const testimonials = [
  {
    name: "Priya & Aman",
    location: "Udaipur Wedding",
    text: "The AI video plan was incredibly detailed. Our videographer said it saved 2 days of pre-production work!",
    rating: 5,
  },
  {
    name: "Neha & Rohan",
    location: "Goa Destination Wedding",
    text: "Album layout suggestions were spot on. The color palette matched our beach theme perfectly.",
    rating: 5,
  },
  {
    name: "Ananya & Rahul",
    location: "Jaipur Royal Wedding",
    text: "The reel concepts were trending-ready. Our Instagram engagement doubled after posting them!",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 border-b border-orange-100/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 shadow-lg shadow-orange-500/20">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">
              AI Wedding<span className="text-rose-600">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-stone-600 transition hover:text-rose-600">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-stone-600 transition hover:text-rose-600">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium text-stone-600 transition hover:text-rose-600">
              Testimonials
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-orange-50 sm:block"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <FloatingPetals />

        {/* Background blobs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700"
            >
              <Sparkles size={14} />
              AI-Powered Wedding Planning
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-6xl lg:text-7xl"
            >
              Plan Your{" "}
              <span className="bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Dream Wedding
              </span>
              <br />
              With AI Precision
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl"
            >
              Generate cinematic video plans, stunning album layouts, and
              social-media-ready reel concepts — all powered by AI. Save days of
              planning in minutes.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                to="/signup"
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-8 text-base font-bold text-white shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-1 hover:shadow-orange-500/40 sm:w-auto"
              >
                Start Planning Free
                <ChevronRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8"
            >
              {[
                { value: "500+", label: "Weddings Planned" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "10x", label: "Faster Planning" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700">
              <Camera size={14} />
              Core Features
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Everything You Need for{" "}
              <span className="text-rose-600">Perfect Content</span>
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              From ceremony-wise video plans to social media reels, our AI
              handles it all.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="group rounded-2xl border border-orange-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/50"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section
        id="how-it-works"
        className="bg-gradient-to-b from-orange-50 to-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700">
              <Zap size={14} />
              Simple Process
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Three Steps to Your{" "}
              <span className="text-rose-600">AI Plan</span>
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              From input to actionable output in under a minute.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="relative rounded-2xl border border-orange-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-6xl font-black text-orange-100">
                  {item.step}
                </span>

                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-orange-500 shadow-lg">
                  <item.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-stone-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-relaxed text-stone-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700">
              <Star size={14} />
              Testimonials
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Loved by{" "}
              <span className="text-rose-600">Couples & Planners</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="rounded-2xl border border-orange-100 bg-gradient-to-b from-white to-orange-50/50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="mt-4 leading-relaxed text-stone-600">
                  "{item.text}"
                </p>

                <div className="mt-5 border-t border-orange-100 pt-4">
                  <p className="font-semibold text-stone-900">{item.name}</p>
                  <p className="text-sm text-stone-500">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-rose-900 to-stone-900 p-10 text-center shadow-2xl sm:p-16"
          >
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-amber-500/20 blur-3xl" />

            <div className="relative">
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                Ready to Plan Your{" "}
                <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
                  Dream Wedding?
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lg text-stone-300">
                Join hundreds of couples and wedding planners who save days of
                work with AI-powered planning.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/signup"
                  className="group flex h-14 items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 px-8 text-base font-bold text-white shadow-xl transition-all hover:-translate-y-1"
                >
                  Create Free Account
                  <ArrowRight
                    size={20}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/login"
                  className="flex h-14 items-center gap-2 rounded-xl border-2 border-white/20 px-8 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  Login to Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-orange-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-orange-500">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-stone-900">
                AI Wedding Planner
              </span>
            </div>

            <div className="flex gap-8 text-sm text-stone-500">
              <a href="#features" className="transition hover:text-rose-600">Features</a>
              <a href="#how-it-works" className="transition hover:text-rose-600">How It Works</a>
              <a href="#testimonials" className="transition hover:text-rose-600">Testimonials</a>
            </div>

            <p className="text-sm text-stone-400">
              © 2026 AI Wedding Planner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
