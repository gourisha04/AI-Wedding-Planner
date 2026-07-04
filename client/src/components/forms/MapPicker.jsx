import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";

export default function MapPicker({ value, onChange }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Leaflet CDN dynamically to prevent bundle weight and peer-dep conflicts in React 19
  useEffect(() => {
    const cssId = "leaflet-cdn-css";
    const jsId = "leaflet-cdn-js";

    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById(jsId)) {
      const script = document.createElement("script");
      script.id = jsId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapRef.current) return;

    const L = window.L;
    // Default coordinates: India center (20.5937, 78.9629)
    const defaultCoords = [20.5937, 78.9629];
    
    const map = L.map(mapContainerRef.current).setView(defaultCoords, 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom red/rose icon to match the wedding system color theme
    const roseIcon = L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: #e11d48; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    const marker = L.marker(defaultCoords, { icon: roseIcon, draggable: true }).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    // Trigger invalidation after container mount completes to prevent grey tile loading glitch
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
      }
    }, 250);

    // Handle map click
    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng(e.latlng);
      await reverseGeocode(lat, lng);
    });

    // Handle marker drag
    marker.on("dragend", async (e) => {
      const { lat, lng } = e.target.getLatLng();
      await reverseGeocode(lat, lng);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isLoaded]);

  // Reverse geocoding (lat, lng -> address string)
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        const addr = data.address;
        const city = addr.city || addr.town || addr.village || addr.suburb || "";
        const state = addr.state || "";
        const country = addr.country || "";
        const formatted = [city, state, country].filter(Boolean).join(", ") || data.display_name;
        onChange(formatted);
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    }
  };

  // Forward geocoding (search query -> lat, lng)
  const handleSearch = async () => {
    if (!searchQuery.trim() || !mapRef.current || !markerRef.current) return;
    setSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newCoords = [parseFloat(lat), parseFloat(lon)];

        mapRef.current.setView(newCoords, 13);
        markerRef.current.setLatLng(newCoords);
        
        // Shorten search display name
        const displayName = data[0].display_name;
        onChange(displayName);
      }
    } catch (err) {
      console.error("Geocoding search error:", err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-3 rounded-lg border border-orange-100 bg-orange-50/30 p-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search address or city on map..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-75"
        >
          {searching ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <MapPin size={16} />
          )}
          Find
        </button>
      </div>

      <div
        ref={mapContainerRef}
        className="h-60 w-full rounded-lg border border-gray-200 bg-gray-100 shadow-inner z-10"
        style={{ minHeight: "240px" }}
      />
      <p className="text-xs text-gray-500 flex items-center gap-1">
        <MapPin size={12} className="text-rose-500 shrink-0" />
        Click on the map or drag the pin to select the exact venue address.
      </p>
    </div>
  );
}
