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
        <div className="text-center flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-subtitle">
            Synthesizing AI Wedding Plan...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-lg border border-border-sage/40 bg-white p-8 text-center shadow-sm">
          <Sparkles className="mx-auto h-12 w-12 text-accent/50 mb-4" />
          <h2 className="font-marcellus text-2xl text-heading tracking-wide font-normal">
            No AI Plan Found
          </h2>
          <p className="mt-2 text-sm text-paragraphs font-light">{error}</p>
          <button
            onClick={() => navigate("/create-wedding")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent text-white border border-accent px-6 py-2.5 text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300"
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
    <div className="mx-auto w-full max-w-7xl space-y-6 text-left">
      <Toaster position="top-center" />
      
      {/* Header Container */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-heading text-background shadow-md">
              <Sparkles size={20} className="text-accent" />
            </div>

            <div>
              <h1 className="font-marcellus text-2xl sm:text-3xl text-heading tracking-wide font-normal leading-tight">
                AI Wedding Plan
              </h1>

              <p className="mt-1.5 text-xs text-subtitle uppercase tracking-widest font-semibold">
                Tailored video directions, editing structures, and custom album design assets
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border-sage/35 bg-background px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-subtitle">Status:</span>
              <select
                value={weddingStatus}
                onChange={handleStatusChange}
                className="cursor-pointer bg-transparent text-xs font-bold uppercase tracking-wider text-accent outline-none"
              >
                <option value="Planning">Planning</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex h-11 items-center gap-2 rounded-lg border border-border-sage bg-transparent px-4 text-xs uppercase tracking-widest font-semibold text-heading transition hover:bg-background duration-300"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <button
              onClick={() => window.print()}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-heading text-background border border-heading hover:bg-accent hover:border-accent hover:text-white px-5 text-xs uppercase tracking-widest font-semibold shadow-sm transition duration-300 sm:w-auto"
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Wedding Summary section */}
      <Section title="Wedding Summary" icon={<CalendarDays size={20} />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Summary title="Bride" value={wedding.brideName || "—"} />
          <Summary title="Groom" value={wedding.groomName || "—"} />
          <Summary title="Theme" value={wedding.theme || "—"} />
          <Summary title="Location" value={wedding.venue || "—"} />
        </div>
      </Section>

      {/* Function-wise Video Plan */}
      {videoPlan?.functionVideos?.length > 0 && (
        <Section title="Function-wise Video Plan" icon={<Video size={20} />}>
          <div className="space-y-6">
            {videoPlan.functionVideos.map((segment, index) => (
              <div
                key={index}
                className="rounded-lg border border-border-sage/30 bg-background/50 p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-heading text-xs font-bold text-background">
                      {index + 1}
                    </div>
                    <h3 className="font-marcellus text-lg text-heading font-normal tracking-wide">
                      {segment.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center rounded bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent uppercase tracking-wider">
                    {segment.duration}
                  </span>
                </div>

                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-subtitle">
                      Key Shot Directions
                    </p>
                    <ul className="space-y-2">
                      {segment.shots?.map((shot, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-paragraphs font-light">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                          {shot}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-subtitle">
                      Color Mood
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium text-heading">
                      <Palette size={14} className="text-accent" />
                      {segment.mood}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-subtitle">
                      Music suggestion
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium text-heading">
                      <Music size={14} className="text-accent" />
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
        <Section title="Wedding Highlight Structure" icon={<Film size={20} />}>
          <div className="space-y-4">
            {videoPlan.highlightStructure.map((item) => (
              <div key={item.order} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-heading text-xs font-bold text-background">
                  {item.order}
                </div>

                <div className="min-h-8 flex-1 rounded-lg border border-border-sage/30 bg-background/40 px-5 py-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-heading text-sm">{item.title}</p>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">{item.duration}</span>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-xs font-light text-paragraphs leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {videoPlan.totalEstimatedDuration && (
            <div className="mt-6 rounded-lg border border-border-sage/40 bg-white p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-subtitle">Total Estimated Highlight Reels</p>
              <p className="mt-1 font-marcellus text-2xl font-normal text-heading">{videoPlan.totalEstimatedDuration}</p>
            </div>
          )}
        </Section>
      )}

      {/* Reel Plans */}
      {videoPlan?.reelPlans?.length > 0 && (
        <Section title="Social Media Reel Plans" icon={<Film size={20} />}>
          <div className="grid gap-5 md:grid-cols-2">
            {videoPlan.reelPlans.map((reel, index) => (
              <div
                key={index}
                className="rounded-lg border border-border-sage/40 bg-white p-5 transition hover:border-accent duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-marcellus text-base text-heading font-normal tracking-wide">{reel.title}</h3>
                  <span className="rounded bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wider">
                    {reel.duration}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-paragraphs font-light">{reel.concept}</p>

                {reel.hashtags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {reel.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded bg-background border border-border-sage/35 px-2.5 py-0.5 text-[10px] font-medium text-paragraphs"
                      >
                        <Hash size={9} />
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
        <Section title="Album Design Layout" icon={<Image size={20} />}>
          
          {/* Album meta */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border-sage/30 bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">Theme Suggestion</p>
              <p className="mt-1 font-semibold text-heading text-sm">{albumDesign.themeSuggestion}</p>
            </div>
            <div className="rounded-lg border border-border-sage/30 bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">Cover Style Option</p>
              <p className="mt-1 font-semibold text-heading text-sm">{albumDesign.coverDesign?.style}</p>
            </div>
            <div className="rounded-lg border border-border-sage/30 bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">Total Recommended Pages</p>
              <p className="mt-1 font-semibold text-heading text-sm">{albumDesign.totalPages}</p>
            </div>
          </div>

          {/* Color palette */}
          {albumDesign.colorPalette?.length > 0 && (
            <div className="mb-8">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-subtitle">
                <Palette size={14} className="text-accent" />
                Color Palette Selection
              </p>
              <div className="flex flex-wrap gap-3">
                {albumDesign.colorPalette.map((color, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="h-10 w-10 rounded-lg border border-border-sage/40 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <p className="mt-1.5 text-[10px] font-semibold text-paragraphs">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Typography */}
          {albumDesign.typography && (
            <div className="mb-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded bg-background border border-border-sage/30 px-3.5 py-1.5">
                <Type size={14} className="text-accent" />
                <span className="text-xs text-subtitle uppercase tracking-widest font-semibold">Heading:</span>
                <span className="text-xs font-bold text-heading">{albumDesign.typography.headingFont}</span>
              </div>
              <div className="flex items-center gap-2 rounded bg-background border border-border-sage/30 px-3.5 py-1.5">
                <Type size={14} className="text-accent" />
                <span className="text-xs text-subtitle uppercase tracking-widest font-semibold">Body Font:</span>
                <span className="text-xs font-bold text-heading">{albumDesign.typography.bodyFont}</span>
              </div>
            </div>
          )}

          {/* Pages */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {albumDesign.pages?.map((page) => (
              <div
                key={page.pageNumber}
                className="rounded-lg border border-border-sage/40 bg-white p-5 transition hover:border-accent duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">
                    Page {page.pageNumber}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-subtitle">{page.layout}</span>
                </div>

                <h4 className="mt-3 font-marcellus text-base text-heading font-normal tracking-wide">{page.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-paragraphs font-light">{page.description}</p>

                {page.suggestedPhotos?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {page.suggestedPhotos.map((photo, i) => (
                      <span
                        key={i}
                        className="rounded bg-background border border-border-sage/30 px-2 py-0.5 text-[10px] font-medium text-paragraphs"
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
        <Section title="AI Suggestions for Editors" icon={<Sparkles size={20} />}>
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
    <section className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-heading/5 text-accent border border-border-sage/20">
          {icon}
        </div>

        <h2 className="font-marcellus text-xl text-heading tracking-wide font-normal">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function Summary({ title, value }) {
  return (
    <div className="rounded-lg border border-border-sage/30 bg-background p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">{title}</p>
      <h3 className="mt-1 text-sm font-semibold text-heading font-marcellus tracking-wide truncate">{value}</h3>
    </div>
  );
}

function Suggestion({ text, tag }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border-l-4 border-accent bg-background/60 px-4 py-3">
      <span className="shrink-0 rounded bg-accent/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold text-accent">
        {tag}
      </span>
      <p className="text-xs font-light text-paragraphs leading-relaxed">{text}</p>
    </div>
  );
}
