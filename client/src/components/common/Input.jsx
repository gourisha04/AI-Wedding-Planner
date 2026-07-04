function Input({
  label,
  icon: Icon,
  error,
  className = "",
  inputClassName = "",
  labelClassName = "",
  iconClassName = "",
  rightElement,
  id,
  ...props
}) {
  const inputId = id ?? props.name;

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? (
        <label
          htmlFor={inputId}
          className={`block text-sm font-semibold text-stone-700 ${labelClassName}`}
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        {Icon ? (
          <span className={`pointer-events-none absolute inset-y-0 left-4 flex items-center text-rose-500 ${iconClassName}`}>
            <Icon className="h-[18px] w-[18px]" />
          </span>
        ) : null}

        <input
          id={inputId}
          className={`h-12 w-full rounded-lg border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 ${Icon ? "pl-11" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"} ${inputClassName}`}
          {...props}
        />

        {rightElement ? (
          <span className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </span>
        ) : null}
      </div>

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

export default Input;
