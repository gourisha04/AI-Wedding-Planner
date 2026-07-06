import {
  LayoutDashboard,
  FolderHeart,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "New Project",
    icon: FolderHeart,
    path: "/create-wedding",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function SideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-border-sage/40 bg-background shadow-sm lg:flex">
      {/* Brand Header */}
      <div className="border-b border-border-sage/40 px-7 py-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-heading text-background shadow-md">
          <Heart size={24} className="fill-accent text-accent" />
        </div>

        <h1 className="font-marcellus text-xl font-normal tracking-[0.2em] text-heading uppercase leading-tight">
          AI Wedding<span className="text-accent">.</span>
        </h1>

        <p className="mt-1 text-[9px] tracking-[0.3em] font-semibold uppercase text-subtitle">
          Premium Workspace
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 rounded-lg px-4 py-3 text-[14px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-heading text-background shadow-sm"
                    : "text-paragraphs hover:bg-accent/10 hover:text-heading"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 h-6 w-1 rounded-r-full bg-accent" />
                  )}
                  <Icon size={18} className={isActive ? "text-accent" : "text-subtitle group-hover:text-heading"} />

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout button footer */}
      <div className="border-t border-border-sage/40 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-heading bg-transparent px-5 py-3 text-xs uppercase tracking-widest font-semibold text-heading transition duration-300 hover:bg-heading hover:text-background"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
