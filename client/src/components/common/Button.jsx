function Button({
  children,
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

export default Button;
