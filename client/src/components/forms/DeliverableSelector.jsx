import { Film } from "lucide-react";

const deliverables = [
  {
    title: "Wedding Highlight Video",
    description: "Complete cinematic wedding highlight.",
  },
  {
    title: "Wedding Album",
    description: "AI suggested album page sequence.",
  },
  {
    title: "Instagram Reels",
    description: "Short-form social media reels.",
  },
  {
    title: "Save The Date Video",
    description: "Creative save-the-date video concept.",
  },
];

export default function DeliverableSelector({ selected, onChange }) {
  const toggle = (title) => {
    if (selected.includes(title)) {
      onChange(selected.filter((t) => t !== title));
    } else {
      onChange([...selected, title]);
    }
  };

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-rose-600">
          <Film size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Deliverables
          </h2>

          <p className="mt-1 max-w-3xl text-gray-500">
            Select the outputs you want AI to generate.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {deliverables.map((item) => {
          const isSelected = selected.includes(item.title);

          return (
            <label
              key={item.title}
              className={`group cursor-pointer rounded-lg border p-5 transition-all duration-200 hover:shadow-sm ${
                isSelected
                  ? "border-rose-400 bg-rose-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-rose-300 hover:bg-orange-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(item.title)}
                  className="mt-1 h-5 w-5 shrink-0 accent-rose-500"
                />

                <div>
                  <h3 className={`font-semibold ${isSelected ? "text-rose-700" : "text-gray-800"}`}>
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
