import { FileText } from "lucide-react";

export default function SpecialRequirements({ value, onChange }) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-rose-600">
          <FileText size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Special Requirements
          </h2>

          <p className="mt-1 max-w-3xl text-gray-500">
            Mention moments, emotions, shots, or preferences the AI should
            prioritize.
          </p>
        </div>
      </div>

      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Example:\n- Bride entry should feel cinematic.\n- Focus on emotional family moments.\n- Include drone shots.\n- Capture candid moments.`}
        className="min-h-40 w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
      />
    </section>
  );
}
