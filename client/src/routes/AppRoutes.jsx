import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import FeaturesPage from "../pages/FeaturesPage";
import AboutPage from "../pages/AboutPage";
import GalleryPage from "../pages/GalleryPage";
import JournalPage from "../pages/JournalPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import CreateWedding from "../pages/CreateWedding";
import AIOutput from "../pages/AIOutput";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-wedding"
          element={<CreateWedding />}
        />

        <Route
          path="/ai-output/:weddingId"
          element={<AIOutput />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      {/* Redirect */}

      <Route
        path="/home"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}