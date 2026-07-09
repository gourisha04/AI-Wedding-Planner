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
  X,
  Upload,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getFullPlan } from "../services/aiService";
import { updateWedding, uploadMedia } from "../services/weddingService";
import toast, { Toaster } from "react-hot-toast";

import { getMoodColors } from "../utils/colorMoodHelper";
import haldiCeremony from "../assets/images/haldi_ceremony.png";
import mandapDesign from "../assets/images/mandap_design.png";
import weddingStationery from "../assets/images/wedding_stationery.png";
import gallerySangeet from "../assets/images/gallery_sangeet.png";
import nikaahCouple from "../assets/images/nikaah_couple.png";
import galleryMehendi from "../assets/images/gallery_mehendi.png";
import heroNorthIndian from "../assets/images/hero_north_indian.png";
import heroSouthIndian from "../assets/images/hero_south_indian.png";

import { getSampleVideoUrl } from "../utils/sampleVideoLibrary";

export default function AIOutput() {
  const { weddingId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weddingStatus, setWeddingStatus] = useState("Planning");

  const [mediaModal, setMediaModal] = useState({ open: false, title: "", mediaUrl: "", isVideo: false, poster: "" });

  const [videoGenModal, setVideoGenModal] = useState({
    open: false,
    functionName: "",
    existingFiles: [],
    loading: false
  });

  const handleOpenMediaModal = (type, customUrl = null) => {
    const cleanType = (type || "").toLowerCase();
    const mediaUrl = customUrl || getSampleVideoUrl(type);
    
    // Determine if file is video
    const isVideo = mediaUrl.endsWith(".webm") || 
                    mediaUrl.endsWith(".mp4") || 
                    mediaUrl.includes("video") ||
                    cleanType.includes("haldi") || 
                    cleanType.includes("sangeet") || 
                    cleanType.includes("wedding") || 
                    cleanType.includes("reception") || 
                    cleanType.includes("cocktail") || 
                    cleanType.includes("engagement") || 
                    cleanType.includes("highlight");

    let posterImg = heroSouthIndian;
    if (cleanType.includes("haldi")) posterImg = haldiCeremony;
    else if (cleanType.includes("sangeet")) posterImg = gallerySangeet;
    else if (cleanType.includes("mehendi") || cleanType.includes("mehndi")) posterImg = galleryMehendi;
    else if (cleanType.includes("wedding")) posterImg = heroNorthIndian;
    else if (cleanType.includes("event") || cleanType.includes("decor")) posterImg = mandapDesign;
    else if (cleanType.includes("album") || cleanType.includes("stationery")) posterImg = weddingStationery;

    setMediaModal({
      open: true,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} - Sample Preview`,
      mediaUrl,
      isVideo,
      poster: posterImg
    });
  };

  const handleGenerateVideo = (functionName) => {
    const existing = data?.videoPlan?.wedding?.mediaFiles?.filter(f => f.functionName === functionName) || 
                     data?.albumDesign?.wedding?.mediaFiles?.filter(f => f.functionName === functionName) || [];
    setVideoGenModal({
      open: true,
      functionName,
      existingFiles: existing,
      loading: false
    });
  };

  const handleConfirmGeneration = async () => {
    setVideoGenModal(prev => ({ ...prev, loading: true }));
    toast.loading(`Analyzing files & compiling AI wedding video for ${videoGenModal.functionName}...`, { id: "video-comp" });
    
    try {
      const generatedUrl = getSampleVideoUrl(videoGenModal.functionName);
      const currentWedding = data.videoPlan?.wedding || data.albumDesign?.wedding || {};
      const newGeneratedVideos = [
        ...(currentWedding.generatedVideos || []).filter(v => v.functionName !== videoGenModal.functionName),
        {
          functionName: videoGenModal.functionName,
          url: generatedUrl
        }
      ];

      await updateWedding(token, weddingId, { generatedVideos: newGeneratedVideos });

      // Refresh plan data
      const res = await getFullPlan(token, weddingId);
      setData(res.data);

      toast.success(`Cinematic video generated successfully for ${videoGenModal.functionName}!`, { id: "video-comp" });
      setVideoGenModal({
        open: false,
        functionName: "",
        existingFiles: [],
        loading: false
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save generated video output.", { id: "video-comp" });
      setVideoGenModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleUploadAndGenerate = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setVideoGenModal(prev => ({ ...prev, loading: true }));
    toast.loading(`Uploading reference files to AI server...`, { id: "video-comp" });

    try {
      const uploadRes = await uploadMedia(token, files);
      toast.success(`Uploaded ${files.length} references!`, { id: "video-comp" });
      
      const newMediaFiles = uploadRes.data.map(item => ({
        functionName: videoGenModal.functionName,
        filename: item.filename,
        originalName: item.originalName,
        mimetype: item.mimetype,
        url: item.url
      }));

      const currentWedding = data.videoPlan?.wedding || data.albumDesign?.wedding || {};
      const updatedMediaFiles = [...(currentWedding.mediaFiles || []), ...newMediaFiles];
      
      const generatedUrl = getSampleVideoUrl(videoGenModal.functionName);
      const newGeneratedVideos = [
        ...(currentWedding.generatedVideos || []).filter(v => v.functionName !== videoGenModal.functionName),
        {
          functionName: videoGenModal.functionName,
          url: generatedUrl
        }
      ];

      await updateWedding(token, weddingId, { 
        mediaFiles: updatedMediaFiles,
        generatedVideos: newGeneratedVideos
      });
      
      // Refresh plan data
      const res = await getFullPlan(token, weddingId);
      setData(res.data);

      toast.loading(`Compiling custom AI video structures for ${videoGenModal.functionName}...`, { id: "video-comp" });
      setTimeout(() => {
        toast.success(`Cinematic video generated successfully for ${videoGenModal.functionName}!`, { id: "video-comp" });
        setVideoGenModal({
          open: false,
          functionName: "",
          existingFiles: [],
          loading: false
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload references for video generation.", { id: "video-comp" });
      setVideoGenModal(prev => ({ ...prev, loading: false }));
    }
  };

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

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenMediaModal(segment.functionName, segment.sampleVideoUrl)}
                      className="inline-flex items-center gap-1.5 rounded border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition duration-300 cursor-pointer"
                    >
                      <Video size={12} />
                      View Sample
                    </button>
                    <button
                      onClick={() => handleGenerateVideo(segment.functionName)}
                      className="inline-flex items-center gap-1.5 rounded border border-heading/30 bg-heading/5 px-2.5 py-1 text-xs font-semibold text-heading hover:bg-accent hover:text-white hover:border-accent transition duration-300 cursor-pointer"
                    >
                      <Sparkles size={12} className="text-accent" />
                      Generate Video
                      <span className="text-[8px] bg-accent/20 px-1 py-0.2 rounded text-accent font-semibold ml-1">AI</span>
                    </button>
                    <span className="inline-flex items-center rounded bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent uppercase tracking-wider">
                      {segment.duration}
                    </span>
                  </div>
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
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center gap-2 text-sm font-medium text-heading">
                        <Palette size={14} className="text-accent" />
                        {segment.mood}
                      </p>
                      <div className="flex gap-1.5 mt-0.5">
                        {getMoodColors(segment.mood, segment.functionName).colors.map((color, cIdx) => (
                          <div
                            key={cIdx}
                            className="w-5 h-5 rounded-full border border-border-sage/40 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={getMoodColors(segment.mood, segment.functionName).names[cIdx]}
                          />
                        ))}
                      </div>
                    </div>
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

                {/* User-Uploaded reference files display */}
                {(() => {
                  const files = wedding.mediaFiles?.filter(f => f.functionName === segment.functionName) || [];
                  if (files.length === 0) return null;
                  
                  const getFullUrl = (urlPath) => {
                    let host = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
                    host = host.replace("/api", "");
                    if (host.endsWith("/")) host = host.slice(0, -1);
                    return `${host}${urlPath}`;
                  };

                  return (
                    <div className="mt-5 pt-5 border-t border-border-sage/20">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-subtitle">
                        Your Uploaded Reference Media
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {files.map((file, fIdx) => {
                          const fullUrl = getFullUrl(file.url);
                          const isVideoFile = file.mimetype?.startsWith("video");
                          return (
                            <div 
                              key={fIdx} 
                              onClick={() => {
                                setMediaModal({
                                  open: true,
                                  title: `Your Reference: ${file.originalName}`,
                                  mediaUrl: fullUrl,
                                  isVideo: isVideoFile,
                                  poster: isVideoFile ? heroSouthIndian : ""
                                });
                              }}
                              className="w-12 h-12 border border-border-sage/40 rounded overflow-hidden cursor-pointer hover:border-accent transition flex items-center justify-center bg-preload text-heading group relative"
                              title={file.originalName}
                            >
                              {isVideoFile ? (
                                <Film size={14} className="text-accent" />
                              ) : (
                                <img src={fullUrl} className="w-full h-full object-cover" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* AI Generated Film Output */}
                {(() => {
                  const generated = wedding.generatedVideos?.find(v => v.functionName === segment.functionName);
                  if (!generated) return null;
                  return (
                    <div className="mt-5 pt-5 border-t border-accent/20 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-accent animate-pulse" />
                        <p className="text-xs font-bold text-accent uppercase tracking-wider">
                          ✨ AI Generated Film Output
                        </p>
                      </div>
                      <div className="overflow-hidden rounded-lg border border-border-sage/45 aspect-video bg-preload relative w-full max-w-lg shadow-sm">
                        <video
                          src={generated.url}
                          controls
                          className="w-full h-full object-cover animate-fade-in"
                        />
                      </div>
                    </div>
                  );
                })()}
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
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">{item.duration}</span>
                      <button
                        onClick={() => handleOpenMediaModal(`Highlight: ${item.title}`, getSampleVideoUrl("highlight"))}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent uppercase tracking-wider border border-accent/30 rounded px-2.5 py-0.5 hover:bg-accent/15 hover:border-accent transition duration-300 cursor-pointer"
                      >
                        <Video size={10} className="text-accent" />
                        View Sample
                      </button>
                    </div>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-xs font-light text-paragraphs leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* AI Generated Highlight Film Output */}
          {(() => {
            const generated = wedding.generatedVideos?.find(v => v.functionName === "Entire Wedding Highlight Film");
            if (!generated) return null;
            return (
              <div className="mt-6 p-6 rounded-lg border border-accent/30 bg-accent/5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent animate-pulse" />
                  <p className="text-sm font-bold text-accent uppercase tracking-wider">
                    ✨ AI Generated Highlight Film Output
                  </p>
                </div>
                <div className="overflow-hidden rounded-lg border border-border-sage/45 aspect-video bg-preload relative w-full max-w-2xl mx-auto shadow-md">
                  <video
                    src={generated.url}
                    controls
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>
              </div>
            );
          })()}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {videoPlan.totalEstimatedDuration && (
              <div className="rounded-lg border border-border-sage/40 bg-white p-5 text-center flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-subtitle">Total Estimated Highlight Reels</p>
                <p className="mt-1 font-marcellus text-2xl font-normal text-heading">{videoPlan.totalEstimatedDuration}</p>
              </div>
            )}
            <div className="rounded-lg border border-border-sage/40 bg-white p-5 text-center flex flex-col justify-center items-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-subtitle mb-2.5 font-bold">Production Output</p>
              <button
                onClick={() => handleGenerateVideo("Entire Wedding Highlight Film")}
                className="w-full sm:w-auto flex h-11 items-center justify-center gap-2 rounded-lg bg-accent text-white border border-accent px-6 text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300 cursor-pointer"
              >
                <Sparkles size={14} />
                Generate Highlight Film
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* Reel Plans */}
      {videoPlan?.reelPlans?.length > 0 && (
        <Section title="Social Media Reel Plans" icon={<Film size={20} />}>
          <div className="grid gap-5 md:grid-cols-2">
            {videoPlan.reelPlans.map((reel, index) => (
              <div
                key={index}
                className="rounded-lg border border-border-sage/40 bg-white p-5 transition hover:border-accent duration-300 flex flex-col justify-between"
              >
                <div>
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

                {/* AI Generated Reel Output */}
                {(() => {
                  const generated = wedding.generatedVideos?.find(v => v.functionName === `Reel: ${reel.title}`);
                  if (!generated) return null;
                  return (
                    <div className="mt-4 p-4 rounded-lg border border-accent/30 bg-accent/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={12} className="text-accent animate-pulse" />
                        <p className="text-[10px] font-bold text-accent uppercase tracking-wider">
                          ✨ AI Generated Reel Output
                        </p>
                      </div>
                      <div className="overflow-hidden rounded-lg border border-border-sage/45 aspect-[9/16] bg-preload relative w-full max-w-[160px] mx-auto shadow-sm">
                        <video
                          src={generated.url}
                          controls
                          className="w-full h-full object-cover animate-fade-in"
                        />
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-5 pt-4 border-t border-border-sage/20 flex gap-2 justify-end">
                  <button
                    onClick={() => handleOpenMediaModal(reel.title, getSampleVideoUrl("highlight"))}
                    className="inline-flex items-center gap-1.5 rounded border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition duration-300 cursor-pointer"
                  >
                    <Video size={11} />
                    View Sample
                  </button>
                  <button
                    onClick={() => handleGenerateVideo(`Reel: ${reel.title}`)}
                    className="inline-flex items-center gap-1.5 rounded border border-heading/30 bg-heading/5 px-2.5 py-1 text-xs font-semibold text-heading hover:bg-accent hover:text-white hover:border-accent transition duration-300 cursor-pointer"
                  >
                    <Sparkles size={11} className="text-accent" />
                    Generate Reel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Album Layout */}
      {albumDesign && (
        <Section title="Album Design Layout" icon={<Image size={20} />}>
          
          {/* View Sample Album Layout trigger */}
          <div className="mb-6 flex justify-end gap-3">
            <button
              onClick={() => handleOpenMediaModal("Album Layout Spread", getSampleVideoUrl("default"))}
              className="inline-flex items-center gap-1.5 rounded border border-accent bg-accent/5 text-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition duration-300 cursor-pointer"
            >
              <Image size={12} />
              View Sample Spread
            </button>
            <button
              onClick={() => handleGenerateVideo("Custom Album Pages Layout")}
              className="inline-flex items-center gap-1.5 rounded border border-heading bg-transparent text-heading px-3 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-heading hover:text-background transition duration-300 cursor-pointer"
            >
              <Sparkles size={12} className="text-accent" />
              Generate Album
            </button>
          </div>

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

          {/* AI Generated Album Spread Draft */}
          {(() => {
            const generated = wedding.generatedVideos?.find(v => v.functionName === "Custom Album Pages Layout");
            if (!generated) return null;
            return (
              <div className="mt-6 p-6 rounded-lg border border-accent/30 bg-accent/5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent animate-pulse" />
                  <p className="text-sm font-bold text-accent uppercase tracking-wider">
                    ✨ AI Generated Album Spread Draft
                  </p>
                </div>
                <div className="overflow-hidden rounded-lg border border-border-sage/45 aspect-[16/10] bg-preload relative w-full max-w-2xl mx-auto shadow-md">
                  <img
                    src={weddingStationery}
                    alt="AI Generated Album Spread draft"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>
              </div>
            );
          })()}
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

      {/* ─── SAMPLE SHOWCASE MODAL ─── */}
      {mediaModal.open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setMediaModal({ ...mediaModal, open: false })}
        >
          <div 
            className="relative w-full max-w-3xl rounded-lg bg-white border border-border-sage p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMediaModal({ ...mediaModal, open: false })}
              className="absolute top-4 right-4 text-heading hover:text-accent transition p-1.5 cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h3 className="font-marcellus text-lg text-heading font-normal mb-4 tracking-wide">
              {mediaModal.title}
            </h3>

            <div className="overflow-hidden rounded border border-border-sage/40 aspect-video bg-preload flex items-center justify-center relative">
              {mediaModal.isVideo ? (
                <video
                  src={mediaModal.mediaUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                  poster={mediaModal.poster}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={mediaModal.mediaUrl}
                  alt={mediaModal.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <p className="mt-4 text-xs font-light text-paragraphs leading-relaxed text-center">
              This represents an example of how your generated film shot lists, event layouts, or photo album arrangements look when designed.
            </p>
          </div>
        </div>
      )}

      {/* ─── AI VIDEO GENERATION DIALOG ─── */}
      {videoGenModal.open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => !videoGenModal.loading && setVideoGenModal({ ...videoGenModal, open: false })}
        >
          <div 
            className="relative w-full max-w-md rounded-lg bg-white border border-border-sage p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !videoGenModal.loading && setVideoGenModal({ ...videoGenModal, open: false })}
              className="absolute top-4 right-4 text-heading hover:text-accent transition p-1.5 cursor-pointer z-10"
              aria-label="Close modal"
              disabled={videoGenModal.loading}
            >
              <X size={20} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heading/5 text-accent border border-border-sage/20 mb-4">
              <Sparkles size={18} />
            </div>

            <h3 className="font-marcellus text-lg text-heading font-normal mb-1.5 tracking-wide">
              Generate AI Video: {videoGenModal.functionName}
            </h3>
            <p className="text-[10px] text-subtitle uppercase tracking-widest font-semibold mb-6">
              AI cinematic editor workflow
            </p>

            <div className="space-y-4">
              {videoGenModal.existingFiles.length > 0 && (
                <div className="p-4 rounded-lg bg-background border border-border-sage/30">
                  <p className="text-xs text-heading font-medium">Existing reference assets found</p>
                  <p className="text-[11px] font-light text-paragraphs mt-1 leading-relaxed">
                    You uploaded <strong>{videoGenModal.existingFiles.length} file(s)</strong> for {videoGenModal.functionName} during creation.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {videoGenModal.existingFiles.map((file, idx) => (
                      <div key={idx} className="w-8 h-8 rounded border border-border-sage/30 overflow-hidden flex items-center justify-center bg-preload">
                        {file.mimetype?.startsWith("video") ? (
                          <Film size={10} className="text-accent" />
                        ) : (
                          <img src={file.url.startsWith("http") ? file.url : `http://localhost:5000${file.url}`} className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary: Generate Video button — always available */}
              <button
                onClick={() => handleConfirmGeneration()}
                disabled={videoGenModal.loading}
                className="w-full flex h-11 items-center justify-center gap-2 rounded-lg bg-accent text-white border border-accent text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300 disabled:opacity-50 cursor-pointer"
              >
                {videoGenModal.loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Generating Film...
                  </>
                ) : (
                  <>
                    <Sparkles size={12} />
                    {videoGenModal.existingFiles.length > 0 ? "Generate from current files" : "Generate AI Video"}
                  </>
                )}
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-border-sage/20"></div>
                <span className="flex-shrink mx-4 text-[9px] text-subtitle uppercase tracking-widest font-bold">Or upload media first</span>
                <div className="flex-grow border-t border-border-sage/20"></div>
              </div>

              {/* Secondary: Upload new references option */}
              <button
                type="button"
                onClick={() => document.getElementById("direct-video-gen-upload").click()}
                disabled={videoGenModal.loading}
                className="w-full flex h-11 items-center justify-center gap-2 rounded-lg border border-border-sage bg-transparent text-heading px-4 text-xs uppercase tracking-widest font-semibold transition hover:bg-background duration-300 disabled:opacity-50 cursor-pointer"
              >
                <Upload size={14} className="text-accent" />
                Select photos/videos & generate
              </button>
              <input
                id="direct-video-gen-upload"
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleUploadAndGenerate}
              />
            </div>
          </div>
        </div>
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
