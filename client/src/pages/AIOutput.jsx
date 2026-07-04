import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Download,
  Film,
  Hash,
  Image,
  Loader2,
  Music,
  Palette,
  Sparkles,
  Type,
  Video,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getFullPlan } from "../services/aiService";
import { updateWedding } from "../services/weddingService";
import toast, { Toaster } from "react-hot-toast";

export default function AIOutput() {
  const { weddingId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weddingStatus, setWeddingStatus] = useState("Planning");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getFullPlan(token, weddingId);
        setData(res.data);
        const w = res.data.videoPlan?.wedding || res.data.albumDesign?.wedding || {};
        if (w.status) setWeddingStatus(w.status);
      } catch (err) {
        console.error("Failed to fetch plan:", err);
        setError(err?.response?.data?.message || "Failed to load AI plan.");
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) fetchPlan();
  }, [token, weddingId]);

  const handleStatusChange = async (e) => {
    const nextStatus = e.target.value;
    setWeddingStatus(nextStatus);

    try {
      await updateWedding(token, weddingId, { status: nextStatus });
      toast.success(`Wedding status updated to ${nextStatus}!`);
    } catch (err) {
      console.error("Failed to update wedding status:", err);
      toast.error("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-rose-500" />
          <p className="mt-4 text-lg font-medium text-gray-600">
            Loading AI Wedding Plan...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-sm ring-1 ring-orange-100">
          <Sparkles className="mx-auto h-12 w-12 text-orange-300" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            No AI Plan Found
          </h2>
          <p className="mt-2 text-gray-500">{error}</p>
          <button
            onClick={() => navigate("/create-wedding")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
          >
            Create New Project
          </button>
        </div>
      </div>
    );
  }

  const { videoPlan, albumDesign } = data;
  const wedding = videoPlan?.wedding || albumDesign?.wedding || {};

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Toaster position="top-center" />
      {/* Header */}
      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20">
              <Sparkles size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                AI Wedding Plan
              </h1>

              <p className="mt-2 max-w-3xl text-gray-500">
                AI-generated wedding video planning, social-ready reels, and
                album design recommendations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50/50 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Status:</span>
              <select
                value={weddingStatus}
                onChange={handleStatusChange}
                className="cursor-pointer bg-transparent text-sm font-bold text-rose-700 outline-none"
              >
                <option value="Planning">Planning</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={() => window.print()}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 sm:w-auto"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Wedding Summary */}
      <Section title="Wedding Summary" icon={<CalendarDays size={22} />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Summary title="Bride" value={wedding.brideName || "—"} />
          <Summary title="Groom" value={wedding.groomName || "—"} />
          <Summary title="Theme" value={wedding.theme || "—"} />
          <Summary title="Location" value={wedding.venue || "—"} />
        </div>
      </Section>

      {/* Function-wise Video Plan */}
      {videoPlan?.functionVideos?.length > 0 && (
        <Section title="Function-wise Video Plan" icon={<Video size={22} />}>
          <div className="space-y-5">
            {videoPlan.functionVideos.map((segment, index) => (
              <div
                key={index}
                className="rounded-lg border border-orange-100 bg-orange-50/50 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-600 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {segment.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
                    {segment.duration}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Key Shots
                    </p>
                    <ul className="space-y-1">
                      {segment.shots?.map((shot, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-rose-500" />
                          {shot}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Mood
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Palette size={14} className="text-rose-500" />
                      {segment.mood}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Music
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Music size={14} className="text-rose-500" />
                      {segment.musicSuggestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Highlight Video Structure */}
      {videoPlan?.highlightStructure?.length > 0 && (
        <Section title="Wedding Highlight Structure" icon={<Film size={22} />}>
          <div className="space-y-4">
            {videoPlan.highlightStructure.map((item) => (
              <div key={item.order} className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-600 text-sm font-semibold text-white">
                  {item.order}
                </div>

                <div className="min-h-9 flex-1 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <span className="text-sm font-medium text-rose-600">{item.duration}</span>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {videoPlan.totalEstimatedDuration && (
            <div className="mt-5 rounded-lg bg-stone-900 p-4 text-center">
              <p className="text-sm font-medium text-stone-400">Total Estimated Duration</p>
              <p className="mt-1 text-2xl font-bold text-white">{videoPlan.totalEstimatedDuration}</p>
            </div>
          )}
        </Section>
      )}

      {/* Reel Plans */}
      {videoPlan?.reelPlans?.length > 0 && (
        <Section title="Social Media Reel Plans" icon={<Film size={22} />}>
          <div className="grid gap-4 md:grid-cols-2">
            {videoPlan.reelPlans.map((reel, index) => (
              <div
                key={index}
                className="rounded-lg border border-orange-100 bg-orange-50/50 p-5 transition hover:border-rose-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{reel.title}</h3>
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                    {reel.duration}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-600">{reel.concept}</p>

                {reel.hashtags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {reel.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600"
                      >
                        <Hash size={10} />
                        {tag.replace("#", "")}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Album Layout */}
      {albumDesign && (
        <Section title="Album Design Layout" icon={<Image size={22} />}>
          {/* Album meta */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Theme</p>
              <p className="mt-1 font-semibold text-gray-800">{albumDesign.themeSuggestion}</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cover Style</p>
              <p className="mt-1 font-semibold text-gray-800">{albumDesign.coverDesign?.style}</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Pages</p>
              <p className="mt-1 font-semibold text-gray-800">{albumDesign.totalPages}</p>
            </div>
          </div>

          {/* Color palette */}
          {albumDesign.colorPalette?.length > 0 && (
            <div className="mb-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Palette size={16} className="text-rose-500" />
                Color Palette
              </p>
              <div className="flex gap-3">
                {albumDesign.colorPalette.map((color, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="h-12 w-12 rounded-lg border border-gray-200 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <p className="mt-1 text-xs font-medium text-gray-500">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Typography */}
          {albumDesign.typography && (
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2">
                <Type size={16} className="text-rose-500" />
                <span className="text-sm text-gray-600">Heading:</span>
                <span className="text-sm font-semibold text-gray-800">{albumDesign.typography.headingFont}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2">
                <Type size={16} className="text-rose-500" />
                <span className="text-sm text-gray-600">Body:</span>
                <span className="text-sm font-semibold text-gray-800">{albumDesign.typography.bodyFont}</span>
              </div>
            </div>
          )}

          {/* Pages */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {albumDesign.pages?.map((page) => (
              <div
                key={page.pageNumber}
                className="rounded-lg border border-orange-100 bg-white p-4 transition hover:border-rose-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                    Page {page.pageNumber}
                  </span>
                  <span className="text-xs font-medium text-gray-500">{page.layout}</span>
                </div>

                <h4 className="mt-3 font-semibold text-gray-800">{page.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{page.description}</p>

                {page.suggestedPhotos?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {page.suggestedPhotos.map((photo, i) => (
                      <span
                        key={i}
                        className="rounded bg-orange-50 px-2 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {photo}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* AI Suggestions */}
      {(videoPlan?.suggestions?.length > 0 || albumDesign?.suggestions?.length > 0) && (
        <Section title="AI Suggestions for Editors" icon={<Sparkles size={22} />}>
          <div className="space-y-3">
            {videoPlan?.suggestions?.map((text, i) => (
              <Suggestion key={`v-${i}`} text={text} tag="Video" />
            ))}
            {albumDesign?.suggestions?.map((text, i) => (
              <Suggestion key={`a-${i}`} text={text} tag="Album" />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-rose-600">
          {icon}
        </div>

        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function Summary({ title, value }) {
  return (
    <div className="rounded-lg bg-orange-50 p-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">{value}</h3>
    </div>
  );
}

function Suggestion({ text, tag }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border-l-4 border-rose-600 bg-orange-50 px-4 py-3">
      <span className="shrink-0 rounded bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
        {tag}
      </span>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
