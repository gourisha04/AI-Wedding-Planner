import { motion } from "framer-motion";

const petals = Array.from({ length: 12 });

export default function FloatingPetals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-3 w-3 rounded-full bg-pink-300/40"
          initial={{
            x: `${Math.random() * 100}%`,
            y: "-10%",
            rotate: 0,
            opacity: 0.5,
          }}
          animate={{
            y: "110%",
            rotate: 360,
            x: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}