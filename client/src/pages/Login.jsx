import LoginCard from "../components/auth/LoginCard";
import FloatingPetals from "../components/auth/FloatingPetals";
import loginBg from "../assets/images/loginbg.png";
import { Toaster } from "react-hot-toast";

export default function Login() {
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
        <LoginCard />
      </div>
    </div>
  );
}
