import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {
  getAuthErrorMessage,
  getAuthFieldErrors,
  loginUser,
} from "../../services/authService";

const inputClass =
  "h-14 w-full rounded-lg border border-stone-200 bg-white/85 py-3 pl-14 pr-4 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      login({
        token: response.token,
        user: response.user,
      });

      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (err) {
      const fieldErrors = getAuthFieldErrors(err);

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field, {
          type: "server",
          message,
        });
      });

      toast.error(getAuthErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldError error={errors.email}>
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-rose-500"
            size={18}
          />
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className={inputClass}
          />
        </div>
      </FieldError>

      <FieldError error={errors.password}>
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-rose-500"
            size={18}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-stone-500 transition hover:bg-rose-50 hover:text-rose-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </FieldError>

      <div className="flex flex-col gap-3 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 accent-rose-500" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="font-medium text-rose-600 transition hover:text-stone-900"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:translate-y-0 disabled:opacity-70"
      >
        {isSubmitting ? (
          "Signing In..."
        ) : (
          <>
            Login
            <ArrowRight
              className="transition group-hover:translate-x-1"
              size={18}
            />
          </>
        )}
      </button>
    </form>
  );
}

function FieldError({ error, children }) {
  return (
    <div>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
