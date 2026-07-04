import { useState, useEffect } from "react";
import { Bell, Plus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllWeddings } from "../../services/weddingService";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const res = await getAllWeddings(token);
        const list = res.data || [];

        if (list.length === 0) {
          setNotifications([
            {
              id: "welcome",
              text: `Welcome to AI Wedding Planner, ${user?.name || "Planner"}! Create a new wedding project to generate your first AI plan.`,
              time: "System",
              unread: true,
            },
          ]);
        } else {
          const items = list.slice(0, 5).map((w, index) => {
            const formattedDate = new Date(w.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            });
            
            if (w.status === "Completed") {
              return {
                id: w._id + "-comp",
                text: `Project completed! Album layout and cinematic strategies generated for ${w.brideName} & ${w.groomName}.`,
                time: formattedDate,
                unread: index < 2,
              };
            }
            return {
              id: w._id + "-gen",
              text: `AI Plan successfully generated for ${w.brideName} & ${w.groomName}'s ${w.theme || "Traditional"} Wedding.`,
              time: formattedDate,
              unread: index < 2,
            };
          });
          setNotifications(items);
        }
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    fetchNotifications();
  }, [token, user]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const page = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Manage your AI Wedding Projects.",
    },
    "/create-wedding": {
      title: "Create Wedding Project",
      subtitle: "Enter wedding details and generate an AI planning strategy.",
    },
    "/settings": {
      title: "Settings",
      subtitle: "Manage your profile and account preferences.",
    },
  };

  // Handle dynamic routes like /ai-output/:id
  const getPageMeta = () => {
    if (location.pathname.startsWith("/ai-output")) {
      return {
        title: "AI Wedding Plan",
        subtitle: "Review the AI-generated wedding video and album plan.",
      };
    }

    return (
      page[location.pathname] || {
        title: "AI Wedding Planner",
        subtitle: "Premium Wedding Planning Workspace.",
      }
    );
  };

  const current = getPageMeta();

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
            {current.title}
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {current.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1 sm:flex-none">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search weddings..."
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 sm:w-72"
            />
          </div>

          <button
            onClick={() => navigate("/create-wedding")}
            className="flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
          >
            <Plus size={18} />

            New Wedding
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-rose-600 transition hover:bg-orange-100 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-orange-100 bg-white p-4 shadow-xl ring-1 ring-black/5 z-50 animate-fade-in">
                <div className="flex items-center justify-between border-b border-orange-50 pb-2 mb-3">
                  <h4 className="font-semibold text-gray-800">Notifications</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg text-xs leading-relaxed transition ${
                        n.unread ? "bg-orange-50/50 font-medium text-gray-800" : "text-gray-500"
                      }`}
                    >
                      <p>{n.text}</p>
                      <span className="mt-1 block text-[10px] text-gray-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-100 bg-gradient-to-br from-rose-500 to-orange-400 text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden xl:block">
              <h3 className="font-semibold text-gray-800">
                {user?.name || "User"}
              </h3>

              <p className="text-sm capitalize text-gray-500">
                {user?.role || "Client"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
