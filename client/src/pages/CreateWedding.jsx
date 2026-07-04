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
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Toaster position="top-center" />

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20">
            <Sparkles size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Create Wedding Project
            </h1>

            <p className="mt-2 max-w-3xl text-gray-500">
              Enter wedding details and let AI generate a professional wedding
              video plan, highlight structure and album design.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <WeddingInfoForm values={weddingInfo} onChange={setWeddingInfo} />
        <FunctionSelector selected={selectedFunctions} onChange={setSelectedFunctions} />
        <DeliverableSelector selected={selectedDeliverables} onChange={setSelectedDeliverables} />
        <SpecialRequirements value={specialRequirements} onChange={setSpecialRequirements} />
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Ready to generate?
            </h2>

            <p className="mt-1 text-gray-500">
              AI will generate your complete wedding planning strategy.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-6 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate AI Plan
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
