import { useEffect, useState } from "react";
import { ArrowRight, FolderOpen, Image, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllWeddings, deleteWedding } from "../services/weddingService";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();
  const { token, user } = useAuth();
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredWeddings = weddings.filter((w) => {
    const query = searchQuery?.toLowerCase() || "";
    return (
      w.brideName?.toLowerCase().includes(query) ||
      w.groomName?.toLowerCase().includes(query) ||
      w.theme?.toLowerCase().includes(query) ||
      w.venue?.toLowerCase().includes(query)
    );
  });

  const handleDeleteWedding = async (id) => {
    if (!window.confirm("Are you sure you want to delete this wedding project? This will permanently delete all related events, video plans, and album layouts.")) {
      return;
    }

    try {
      await deleteWedding(token, id);
      setWeddings(weddings.filter((w) => w._id !== id));
      toast.success("Wedding project deleted successfully!");
    } catch (err) {
      console.error("Failed to delete wedding:", err);
      toast.error(err?.response?.data?.message || "Failed to delete wedding project.");
    }
  };

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await getAllWeddings(token);
        setWeddings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch weddings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddings();
  }, [token]);

  const stats = [
    {
      title: "Wedding Projects",
      value: String(weddings.length).padStart(2, "0"),
      subtitle: "Active projects",
      icon: FolderOpen,
    },
    {
      title: "AI Plans",
      value: String(weddings.filter((w) => w.status === "Ongoing" || w.status === "Completed").length).padStart(2, "0"),
      subtitle: "Generated plans",
      icon: Sparkles,
    },
    {
      title: "Designed Albums",
      value: String(weddings.filter((w) => w.status === "Completed").length).padStart(2, "0"),
      subtitle: "Finished layouts",
      icon: Image,
    },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 text-left">
      <Toaster position="top-center" />

      {/* Welcome Banner Card */}
      <div className="flex flex-col gap-5 rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="font-marcellus text-2xl sm:text-3xl font-normal text-heading tracking-wide leading-tight">
            Welcome back, {user?.name || "User"}
          </h2>
          <p className="mt-1.5 text-xs text-subtitle uppercase tracking-widest font-semibold">
            Create cinematic plans, highlights, and custom album layouts
          </p>
        </div>

        <button
          onClick={() => navigate("/create-wedding")}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-white border border-accent px-5 text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300 sm:w-auto cursor-pointer"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-heading/5 text-heading border border-border-sage/25 shadow-inner">
              <item.icon size={20} className="text-accent" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-subtitle">{item.title}</p>

            <h2 className="mt-2 font-marcellus text-4xl font-normal text-heading">
              {loading ? "—" : item.value}
            </h2>

            <p className="mt-1 text-xs font-semibold text-accent uppercase tracking-wider">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Projects Table Card */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-marcellus text-xl text-heading font-normal tracking-wide">
              Recent Wedding Projects
            </h2>

            <p className="mt-1 text-xs text-subtitle uppercase tracking-widest font-semibold">
              Continue working on your latest wedding strategies
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredWeddings.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center">
            <FolderOpen className="mx-auto h-16 w-16 text-subtitle/30 mb-4" />
            <h3 className="text-lg font-semibold text-heading font-marcellus tracking-wide">
              No matching weddings found
            </h3>
            <p className="mt-2 text-sm text-paragraphs font-light">
              Try searching with another name or theme configuration.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWeddings.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-lg border border-border-sage/40 bg-white p-5 transition-all hover:border-accent hover:bg-background/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-marcellus text-lg text-heading font-normal tracking-wide leading-tight">
                    {item.brideName} &amp; {item.groomName}
                  </h3>

                  <p className="mt-2 text-xs font-light text-paragraphs">
                    Wedding date: <span className="font-semibold text-heading">{formatDate(item.weddingDate)}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-block rounded bg-background border border-border-sage/40 px-2.5 py-0.5 text-xs font-medium text-paragraphs">
                      {item.theme || "Traditional"} Theme
                    </span>
                    <span
                      className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                        item.status === "Completed"
                          ? "bg-green-50 text-green-700 border border-green-200/50"
                          : item.status === "Ongoing"
                            ? "bg-accent/10 text-accent border border-accent/20"
                            : "bg-subtitle/10 text-subtitle border border-subtitle/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/ai-output/${item._id}`)}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-heading text-background hover:bg-accent hover:text-white px-4 text-xs font-semibold uppercase tracking-widest transition duration-300 cursor-pointer"
                  >
                    Open Project
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteWedding(item._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 text-accent hover:bg-accent hover:text-white transition duration-300 cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
