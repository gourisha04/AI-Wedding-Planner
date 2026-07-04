import { useState } from "react";
import MapPicker from "./MapPicker";
import {
  CalendarDays,
  ChevronDown,
  IndianRupee,
  MapPin,
  Palette,
  Users,
  Video,
} from "lucide-react";

const inputStyle =
  "h-12 w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100";

export default function WeddingInfoForm({ values, onChange }) {
  const [showMap, setShowMap] = useState(false);
  const update = (field, value) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Wedding Information
        </h2>
        <p className="mt-2 max-w-3xl text-gray-500">
          Basic details used to generate a cinematic AI wedding plan.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Bride Name"
          icon={<Users size={18} />}
          placeholder="Enter bride name"
          value={values.brideName}
          onInput={(v) => update("brideName", v)}
        />
        <Input
          label="Groom Name"
          icon={<Users size={18} />}
          placeholder="Enter groom name"
          value={values.groomName}
          onInput={(v) => update("groomName", v)}
        />
        <Input
          label="Wedding Date"
          type="date"
          icon={<CalendarDays size={18} />}
          value={values.weddingDate}
          onInput={(v) => update("weddingDate", v)}
        />
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Wedding Location</label>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="text-xs font-bold text-rose-600 hover:text-stone-900 transition flex items-center gap-1 cursor-pointer"
            >
              <MapPin size={12} />
              {showMap ? "Hide Map Picker" : "📍 Choose from Map"}
            </button>
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-500">
              <MapPin size={18} />
            </span>
            <input
              type="text"
              placeholder="Enter location or choose from map"
              value={values.venue}
              onChange={(e) => update("venue", e.target.value)}
              className={inputStyle}
            />
          </div>
          {showMap && (
            <div className="mt-3">
              <MapPicker
                value={values.venue}
                onChange={(v) => update("venue", v)}
              />
            </div>
          )}
        </div>
        <Select
          label="Wedding Theme"
          icon={<Palette size={18} />}
          options={["Royal", "Traditional", "Modern", "Minimal", "Destination"]}
          value={values.theme}
          onSelect={(v) => update("theme", v)}
        />
        <Select
          label="Preferred Video Style"
          icon={<Video size={18} />}
          options={["Cinematic", "Classic", "Luxury", "Documentary", "Emotional"]}
          value={values.videoStyle}
          onSelect={(v) => update("videoStyle", v)}
        />
        <Input
          label="Budget (₹)"
          type="number"
          icon={<IndianRupee size={18} />}
          placeholder="Estimated budget"
          value={values.budget}
          onInput={(v) => update("budget", v)}
        />
      </div>
    </section>
  );
}

function Input({ label, icon, placeholder, type = "text", value, onInput }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-500">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className={inputStyle}
        />
      </div>
    </div>
  );
}

function Select({ label, icon, options, value, onSelect }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-500">
          {icon}
        </span>
        <select
          className={`${inputStyle} cursor-pointer appearance-none pr-11`}
          value={value}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
