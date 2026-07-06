import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "../services/authService";
import { Loader2, Save, Shield, User } from "lucide-react";

export default function Settings() {
  const { user, token, login } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setLoading(true);

    try {
      const payload = { name, phone };
      if (password.trim()) payload.password = password;

      const data = await updateProfile(token, payload);

      // Update local auth context
      login({ token, user: data.user });

      toast.success("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 text-left">
      <Toaster position="top-center" />

      {/* Header block */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-heading text-background shadow-md">
            <User size={20} className="text-accent" />
          </div>
          <div>
            <h1 className="font-marcellus text-2xl sm:text-3xl text-heading tracking-wide font-normal leading-tight">Settings</h1>
            <p className="mt-1.5 text-xs text-subtitle uppercase tracking-widest font-semibold">
              Manage profile metadata and application credentials
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form Panel */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 font-marcellus text-lg text-heading font-normal tracking-wide">
          Profile Information
        </h2>

        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-subtitle">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="h-12 w-full rounded-lg border border-border-sage bg-white/40 px-4 text-sm text-heading placeholder:text-subtitle outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-subtitle">
              Email Address
            </label>
            <input
              value={user?.email || ""}
              disabled
              className="h-12 w-full rounded-lg border border-border-sage/40 bg-background px-4 text-sm text-subtitle/85 cursor-not-allowed"
            />
            <p className="mt-1.5 text-[10px] uppercase font-semibold tracking-wider text-subtitle/80">
              Primary email identity cannot be changed
            </p>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-subtitle">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="h-12 w-full rounded-lg border border-border-sage bg-white/40 px-4 text-sm text-heading placeholder:text-subtitle outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-subtitle">
              Change Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (leave blank to keep current)"
              type="password"
              className="h-12 w-full rounded-lg border border-border-border-sage bg-white/40 px-4 text-sm text-heading placeholder:text-subtitle outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-accent text-white border border-accent px-5 text-xs uppercase tracking-widest font-semibold shadow-sm transition hover:bg-heading hover:border-heading duration-300 disabled:opacity-70 sm:w-max cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Account Info Panel */}
      <div className="rounded-lg border border-border-sage/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3 border-b border-border-sage/30 pb-4 mb-6">
          <Shield size={18} className="text-accent" />
          <h2 className="font-marcellus text-lg text-heading font-normal tracking-wide">Account Details</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border-sage/30 bg-background p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">
              User Role
            </p>
            <p className="mt-1 font-semibold capitalize text-heading text-sm">
              {user?.role || "client"}
            </p>
          </div>
          <div className="rounded-lg border border-border-sage/30 bg-background p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">
              Registration Date
            </p>
            <p className="mt-1 font-semibold text-heading text-sm">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
          <div className="rounded-lg border border-border-sage/30 bg-background p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-subtitle">
              Access ID Reference
            </p>
            <p className="mt-1.5 truncate font-mono text-xs font-semibold text-heading">
              {user?.id || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
