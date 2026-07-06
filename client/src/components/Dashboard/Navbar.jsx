import { Plus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const page = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Manage your AI Wedding Projects",
    },
    "/create-wedding": {
      title: "Create Wedding",
      subtitle: "Generate an AI planning strategy",
    },
    "/settings": {
      title: "Settings",
      subtitle: "Manage profile & configurations",
    },
  };

  const getPageMeta = () => {
    if (location.pathname.startsWith("/ai-output")) {
      return {
        title: "AI Wedding Plan",
        subtitle: "Review AI cinematic structure & layouts",
      };
    }
    return (
      page[location.pathname] || {
        title: "AI Wedding Planner",
        subtitle: "Premium Wedding Planning Workspace",
      }
    );
  };

  const current = getPageMeta();

  return (
    <header className="sticky top-0 z-20 border-b border-border-sage/40 bg-background/95 px-6 py-5 backdrop-blur-md sm:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        
        {/* Page Title & Subtitle */}
        <div className="min-w-0">
          <h1 className="font-marcellus text-2xl sm:text-3xl text-heading tracking-wide font-normal truncate">
            {current.title}
          </h1>

          <p className="mt-1 text-xs text-subtitle uppercase tracking-widest font-semibold">
            {current.subtitle}
          </p>
        </div>

        {/* Action Controls & Profile info */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Search Input Box */}
          <div className="relative min-w-[220px] flex-1 sm:flex-none">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtitle"
            />

            <input
              type="text"
              placeholder="Search weddings..."
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-lg border border-border-sage bg-white/40 pl-11 pr-4 text-sm text-heading placeholder:text-subtitle outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 sm:w-64 font-medium"
            />
          </div>

          {/* New Wedding Button */}
          <button
            onClick={() => navigate("/create-wedding")}
            className="flex h-11 items-center gap-2 rounded-lg bg-accent text-white border border-accent px-5 text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300 cursor-pointer"
          >
            <Plus size={16} />
            New Project
          </button>

          {/* User Profile Avatar block */}
          <div className="flex min-w-0 items-center gap-3 border-l border-border-sage/40 pl-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-sm font-bold text-white shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden xl:block text-left">
              <h3 className="text-xs font-bold text-heading uppercase tracking-wider">
                {user?.name || "User"}
              </h3>

              <p className="text-[10px] uppercase font-semibold tracking-wider text-subtitle">
                {user?.role || "Client"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
