import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-sm ring-1 ring-orange-100">
        <Heart className="mx-auto h-12 w-12 text-rose-300" />

        <h1 className="mt-4 text-7xl font-bold text-rose-600">404</h1>

        <h2 className="mt-5 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          The page you're looking for doesn't exist.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
