import { useState } from "react";
import { Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { createWedding } from "../services/weddingService";
import { createEvent } from "../services/eventService";
import { generateAIPlan } from "../services/aiService";

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
      // 1. Create wedding
      const weddingRes = await createWedding(token, {
        brideName: weddingInfo.brideName,
        groomName: weddingInfo.groomName,
        weddingDate: weddingInfo.weddingDate,
        venue: weddingInfo.venue,
        theme: weddingInfo.theme,
        budget: Number(weddingInfo.budget) || 0,
      });

      const weddingId = weddingRes.data._id;

      // 2. Create events for each selected function
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

      // 3. Generate AI plan
      toast.loading("AI is generating your wedding plan...", { id: "ai-gen" });

      await generateAIPlan(token, weddingId);

      toast.success("AI plan generated successfully!", { id: "ai-gen" });

      // 4. Navigate to AI output
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

      {/* Form sections */}
      <div className="space-y-6">
        <WeddingInfoForm values={weddingInfo} onChange={setWeddingInfo} />
        <FunctionSelector selected={selectedFunctions} onChange={setSelectedFunctions} />
        <DeliverableSelector selected={selectedDeliverables} onChange={setSelectedDeliverables} />
        <SpecialRequirements value={specialRequirements} onChange={setSpecialRequirements} />
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
