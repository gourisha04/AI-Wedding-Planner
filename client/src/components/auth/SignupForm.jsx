import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {
  getAuthErrorMessage,
  getAuthFieldErrors,
  registerUser,
} from "../../services/authService";

const inputClass =
  "h-14 w-full rounded-lg border border-stone-200 bg-white/85 py-3 pl-14 pr-4 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100";

export default function SignupForm() {
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
      const response = await registerUser(data);

      login({
        token: response.token,
        user: response.user,
      });

      toast.success("Account created");
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
      <Field error={errors.name} label="Full Name">
        <User
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-rose-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Enter your name"
          autoComplete="name"
          {...register("name", { required: "Name is required" })}
          className={inputClass}
        />
      </Field>

      <Field error={errors.email} label="Email Address">
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
      </Field>

      <Field error={errors.phone} label="Phone Number">
        <Phone
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-rose-500"
          size={18}
        />
        <input
          type="tel"
          placeholder="Enter phone number"
          autoComplete="tel"
          {...register("phone")}
          className={inputClass}
        />
      </Field>

      <Field error={errors.password} label="Password">
        <Lock
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-rose-500"
          size={18}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          autoComplete="new-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
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
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:translate-y-0 disabled:opacity-70"
      >
        {isSubmitting ? (
          "Creating Account..."
        ) : (
          <>
            Create Account
            <ArrowRight
              className="transition group-hover:translate-x-1"
              size={18}
            />
          </>
        )}
      </button>

      <p className="text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-rose-600 transition hover:text-stone-900"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
