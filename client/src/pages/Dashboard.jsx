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
      color: "from-rose-600 to-orange-500",
    },
    {
      title: "AI Plans",
      value: String(weddings.filter((w) => w.status === "Ongoing" || w.status === "Completed").length).padStart(2, "0"),
      subtitle: "Generated plans",
      icon: Sparkles,
      color: "from-stone-800 to-rose-600",
    },
    {
      title: "Albums",
      value: String(weddings.filter((w) => w.status === "Completed").length).padStart(2, "0"),
      subtitle: "Designed albums",
      icon: Image,
      color: "from-orange-500 to-amber-400",
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
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Toaster position="top-center" />
      <div className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p className="mt-1 max-w-2xl text-gray-500">
            Create cinematic plans, reels, highlight structures, and album
            layouts from one workspace.
          </p>
        </div>

        <button
          onClick={() => navigate("/create-wedding")}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 sm:w-auto"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
          >
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${item.color}`}
            >
              <item.icon className="text-white" size={24} />
            </div>

            <p className="text-sm font-medium text-gray-500">{item.title}</p>

            <h2 className="mt-2 text-4xl font-bold text-gray-800">
              {loading ? "—" : item.value}
            </h2>

            <p className="mt-1 text-sm font-medium text-rose-600">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Wedding Projects
            </h2>

            <p className="mt-1 text-gray-500">
              Continue working on your latest wedding plans.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
          </div>
        ) : filteredWeddings.length === 0 ? (
          <div className="py-16 text-center">
            <FolderOpen className="mx-auto h-16 w-16 text-orange-200" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              No matching weddings found
            </h3>
            <p className="mt-2 text-gray-500">
              Try searching with another name or theme.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWeddings.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-lg border border-orange-100 bg-white p-4 transition-all hover:border-rose-200 hover:bg-orange-50 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.brideName} & {item.groomName}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Wedding date: {formatDate(item.weddingDate)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                      {item.theme || "Traditional"} Theme
                    </span>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                        item.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : item.status === "Ongoing"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/ai-output/${item._id}`)}
                    className="flex h-11 items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 sm:w-auto cursor-pointer"
                  >
                    Open Project
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteWedding(item._id)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 hover:text-red-700 cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
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
