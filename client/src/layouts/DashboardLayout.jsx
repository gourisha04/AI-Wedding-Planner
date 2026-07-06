import { useState } from "react";
import SideBar from "../components/Dashboard/SideBar";
import Navbar from "../components/Dashboard/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-1 overflow-y-auto bg-background px-6 py-8 sm:px-8">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}
