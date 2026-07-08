import { useState } from "react";
import { Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { createWedding, uploadMedia } from "../services/weddingService";
import { createEvent } from "../services/eventService";
import { generateAIPlan } from "../services/aiService";
import { getSampleVideoUrl } from "../utils/sampleVideoLibrary";

import WeddingInfoForm from "../components/forms/WeddingInfoForm";
import FunctionSelector from "../components/forms/FunctionSelector";
import DeliverableSelector from "../components/forms/DeliverableSelector";
import SpecialRequirements from "../components/forms/SpecialRequirements";

export default function CreateWedding() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form state
  const [weddingInfo, setWeddingInfo] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    venue: "",
    theme: "Traditional",
    videoStyle: "Cinematic",
    budget: "",
  });

  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [selectedDeliverables, setSelectedDeliverables] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState("");
  
  // Media Files state: { "Haldi": [{file, previewUrl, name, type}, ...] }
  const [mediaFiles, setMediaFiles] = useState({});

  const handleMediaChange = (functionName, files) => {
    setMediaFiles((prev) => ({
      ...prev,
      [functionName]: files,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!weddingInfo.brideName || !weddingInfo.groomName || !weddingInfo.weddingDate || !weddingInfo.venue) {
      toast.error("Please fill in all required wedding details.");
      return;
    }

    if (selectedFunctions.length === 0) {
      toast.error("Please select at least one wedding function.");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload media files for each ceremony (if any)
      const uploadedMediaFiles = [];
      for (const fn of selectedFunctions) {
        const fnFiles = (mediaFiles[fn] || []).map((f) => f.file);
        if (fnFiles.length > 0) {
          toast.loading(`Uploading files for ${fn}...`, { id: `upload-${fn}` });
          try {
            const uploadRes = await uploadMedia(token, fnFiles);
            toast.success(`Uploaded ${fn} media!`, { id: `upload-${fn}` });
            
            const fileMeta = uploadRes.data.map((item) => ({
              functionName: fn,
              filename: item.filename,
              originalName: item.originalName,
              mimetype: item.mimetype,
              url: item.url,
            }));
            uploadedMediaFiles.push(...fileMeta);
          } catch (uploadErr) {
            console.error(`Failed to upload media for ${fn}:`, uploadErr);
            toast.error(`Media upload failed for ${fn}. Details will be saved without files.`, { id: `upload-${fn}` });
          }
        }
      }

      // 2. Create wedding
      const weddingRes = await createWedding(token, {
        brideName: weddingInfo.brideName,
        groomName: weddingInfo.groomName,
        weddingDate: weddingInfo.weddingDate,
        venue: weddingInfo.venue,
        theme: weddingInfo.theme,
        budget: Number(weddingInfo.budget) || 0,
        mediaFiles: uploadedMediaFiles,
      });

      const weddingId = weddingRes.data._id;

      // 3. Create events for each selected function
      for (const fn of selectedFunctions) {
        await createEvent(token, {
          wedding: weddingId,
          eventName: fn,
          eventDate: weddingInfo.weddingDate,
          eventTime: "10:00 AM",
          venue: weddingInfo.venue,
          description: specialRequirements || "",
        });
      }

      // 4. Generate AI plan
      toast.loading("AI is generating your wedding plan...", { id: "ai-gen" });

      await generateAIPlan(token, weddingId);

      toast.success("AI plan generated successfully!", { id: "ai-gen" });

      // 5. Navigate to AI output
      navigate(`/ai-output/${weddingId}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again.",
        { id: "ai-gen" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 text-left">
      <Toaster position="top-center" />

      {/* Header card */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-heading text-background shadow-md">
            <Sparkles size={20} className="text-accent" />
          </div>

          <div>
            <h1 className="font-marcellus text-2xl sm:text-3xl text-heading tracking-wide font-normal leading-tight">
              Create Wedding Project
            </h1>

            <p className="mt-1.5 text-xs text-subtitle uppercase tracking-widest font-semibold">
              Fill details to configure AI-powered shot structures and color-match designs
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, Sample Showcase on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <WeddingInfoForm values={weddingInfo} onChange={setWeddingInfo} />
          <FunctionSelector
            selected={selectedFunctions}
            onChange={setSelectedFunctions}
            mediaFiles={mediaFiles}
            onMediaChange={handleMediaChange}
          />
          <DeliverableSelector selected={selectedDeliverables} onChange={setSelectedDeliverables} />
          <SpecialRequirements value={specialRequirements} onChange={setSpecialRequirements} />
        </div>
        
        {/* Right side: Samples Showcase */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border-sage/40 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 max-h-[80vh] overflow-y-auto">
            <h2 className="font-marcellus text-lg text-heading tracking-wide font-normal mb-1">
              Function Previews & Inspiration
            </h2>
            <p className="text-[10px] text-subtitle uppercase tracking-widest font-semibold mb-6">
              Preview ceremony templates and your uploads
            </p>

            {selectedFunctions.length === 0 ? (
              <div className="border border-dashed border-border-sage/50 rounded-lg p-8 text-center bg-background/30">
                <Sparkles className="mx-auto text-accent/50 mb-3" size={24} />
                <h4 className="font-marcellus text-sm text-heading font-medium">No Functions Selected</h4>
                <p className="text-[10px] font-light text-paragraphs mt-1 leading-relaxed">
                  Select functions on the left to preview sample cinematic guides and upload reference files.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {selectedFunctions.map((fn) => {
                  const videoUrl = getSampleVideoUrl(fn);
                  const files = mediaFiles[fn] || [];
                  return (
                    <div key={fn} className="group border border-border-sage/20 rounded bg-background/50 p-4 transition duration-300 hover:border-accent">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-accent">{fn} Template</span>
                        {files.length > 0 && (
                          <span className="bg-heading text-background text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded">
                            {files.length} custom file{files.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <h4 className="font-marcellus text-sm text-heading mt-1">{fn} Shot Inspiration</h4>
                      <div className="mt-3 aspect-video overflow-hidden rounded bg-preload relative">
                        <video
                          key={videoUrl}
                          src={videoUrl}
                          muted
                          loop
                          playsInline
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {files.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-1.5">
                          {files.map((fileObj, idx) => (
                            <div key={idx} className="aspect-square border border-border-sage/30 rounded overflow-hidden relative flex items-center justify-center bg-preload">
                              {fileObj.type.startsWith("video") ? (
                                <div className="w-full h-full flex items-center justify-center bg-heading text-background text-[8px]">
                                  Vid
                                </div>
                              ) : (
                                <img src={fileObj.previewUrl} className="w-full h-full object-cover" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="mt-2 text-[10px] font-light text-paragraphs">
                        {files.length > 0 
                          ? "Reference files uploaded successfully. The AI plan will analyze these details."
                          : `Shows typical shots and color mood settings configured for ${fn} ceremonies.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom prompt panel */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-marcellus text-lg text-heading tracking-wide font-normal">
              Ready to generate?
            </h2>

            <p className="mt-1 text-xs text-subtitle uppercase tracking-widest font-semibold">
              Our AI engine will synthesize shot sequences & style suggestions
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent text-white border border-accent px-6 text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300 disabled:opacity-75 sm:w-auto cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                Generate AI Plan
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
