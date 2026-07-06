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
  "h-14 w-full rounded-lg border border-border-sage bg-white/60 py-3 pl-14 pr-4 text-sm text-heading shadow-sm outline-none transition placeholder:text-subtitle/85 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <Field error={errors.name} label="Full Name">
        <User
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-accent"
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
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-accent"
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
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-accent"
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
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-accent"
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
          className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-subtitle transition hover:bg-accent/10 hover:text-accent"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-accent text-white border border-accent px-5 text-xs uppercase tracking-widest font-bold shadow-sm transition hover:bg-heading hover:border-heading duration-300 disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? (
          "Creating Account..."
        ) : (
          <>
            Create Account
            <ArrowRight
              className="transition group-hover:translate-x-1"
              size={14}
            />
          </>
        )}
      </button>

      <p className="text-center text-sm text-paragraphs font-light">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-accent hover:text-heading transition duration-300"
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
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-subtitle">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error ? (
        <p className="mt-2 text-xs font-semibold text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
