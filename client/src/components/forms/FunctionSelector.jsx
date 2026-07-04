import { Camera } from "lucide-react";

const functions = [
  "Engagement",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Wedding",
  "Reception",
  "Cocktail",
];

export default function FunctionSelector({ selected, onChange }) {
  const toggle = (fn) => {
    if (selected.includes(fn)) {
      onChange(selected.filter((f) => f !== fn));
    } else {
      onChange([...selected, fn]);
    }
  };

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-rose-600">
          <Camera size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Wedding Functions
          </h2>

          <p className="mt-1 max-w-3xl text-gray-500">
            Select the functions for which you want an AI video and album plan.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {functions.map((item) => {
          const isSelected = selected.includes(item);

          return (
            <label
              key={item}
              className={`group flex min-h-16 cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm ${
                isSelected
                  ? "border-rose-400 bg-rose-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-rose-300 hover:bg-orange-50"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(item)}
                className="h-5 w-5 shrink-0 accent-rose-500"
              />

              <span className={`font-medium ${isSelected ? "text-rose-700" : "text-gray-700"}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
