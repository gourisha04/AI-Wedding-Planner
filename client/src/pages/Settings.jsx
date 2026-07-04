import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
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

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local auth context
      login({ token, user: res.data.user });

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
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Toaster position="top-center" />

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="mt-1 text-gray-500">
              Manage your profile and account preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Profile Information
        </h2>

        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              value={user?.email || ""}
              disabled
              className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              Email cannot be changed.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Change Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (leave blank to keep current)"
              type="password"
              className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-max"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-orange-100 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-rose-600" />
          <h2 className="text-xl font-bold text-gray-800">Account Info</h2>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-orange-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Role
            </p>
            <p className="mt-1 font-semibold capitalize text-gray-800">
              {user?.role || "client"}
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Member Since
            </p>
            <p className="mt-1 font-semibold text-gray-800">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Account ID
            </p>
            <p className="mt-1 truncate font-mono text-sm font-semibold text-gray-800">
              {user?.id || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
