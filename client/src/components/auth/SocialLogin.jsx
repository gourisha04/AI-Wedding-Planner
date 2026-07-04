import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
  {
    icon: <FcGoogle size={24} />,
    label: "Google",
  },
  {
    icon: <FaFacebookF size={20} className="text-blue-600" />,
    label: "Facebook",
  },
  {
    icon: <FaApple size={22} className="text-gray-800" />,
    label: "Apple",
  },
];

export default function SocialLogin() {
  return (
    <div className="flex justify-center gap-4">
      {socials.map((item) => (
        <motion.button
          whileHover={{
            scale: 1.08,
            y: -4,
          }}
          whileTap={{
            scale: 0.95,
          }}
          key={item.label}
          type="button"
          aria-label={`Continue with ${item.label}`}
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-stone-200 bg-white/75 shadow-sm backdrop-blur-xl transition hover:border-rose-200 hover:bg-white"
        >
          {item.icon}
        </motion.button>
      ))}
    </div>
  );
}
