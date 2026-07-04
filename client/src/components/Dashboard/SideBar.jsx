import {
  LayoutDashboard,
  FolderHeart,
  Settings,
  LogOut,
  HeartHandshake,
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
    <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-orange-100 bg-white shadow-sm lg:flex">
      <div className="border-b border-orange-100 px-7 py-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20">
          <HeartHandshake size={30} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          AI Wedding Planner
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Premium Planning Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20"
                    : "text-gray-600 hover:bg-orange-50 hover:text-rose-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 h-8 w-1 rounded-r-full bg-white" />
                  )}
                  <Icon size={20} />

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-orange-100 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-rose-100 bg-rose-50 px-5 py-3 font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}
