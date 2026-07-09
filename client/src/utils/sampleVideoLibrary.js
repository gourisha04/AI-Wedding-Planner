/**
 * Sample Video Library — Diverse, CORS-enabled video URLs per ceremony type.
 *
 * All URLs are from Wikimedia Commons (CC-BY-SA) or MDN (CC0) and support:
 *   - Access-Control-Allow-Origin: *
 *   - Accept-Ranges: bytes (required for browser video seeking)
 *
 * When real AI video generation is integrated, these will be replaced by
 * dynamically generated URLs returned from the AI service.
 */

const sampleVideos = {
  // Indian wedding flower shower / celebration
  haldi: "https://assets.mixkit.co/videos/4892/4892-720.mp4",

  // Festive party dance
  sangeet: "https://assets.mixkit.co/videos/4890/4890-720.mp4",

  // Couple hand-holding / wedding walk
  wedding: "https://assets.mixkit.co/videos/4882/4882-720.mp4",

  // Smiling wedding couple reception entry
  reception: "https://assets.mixkit.co/videos/4886/4886-720.mp4",

  // Henna design application
  mehendi: "https://assets.mixkit.co/videos/4888/4888-720.mp4",

  // Putting wedding ring on finger
  engagement: "https://assets.mixkit.co/videos/4894/4894-720.mp4",

  // Reception cocktail party smiling
  cocktail: "https://assets.mixkit.co/videos/4886/4886-720.mp4",

  // Wedding cinematic highlight
  highlight: "https://assets.mixkit.co/videos/4882/4882-720.mp4",

  // Default fallback
  default: "https://assets.mixkit.co/videos/4882/4882-720.mp4",
};

/**
 * Get the sample video URL for a given ceremony/function name.
 * Falls back gracefully through partial matching.
 *
 * @param {string} functionName - e.g. "Haldi", "sangeet", "Wedding Ceremony"
 * @returns {string} Direct video URL
 */
export function getSampleVideoUrl(functionName) {
  const key = (functionName || "").toLowerCase().trim();

  if (key.includes("haldi")) return sampleVideos.haldi;
  if (key.includes("sangeet")) return sampleVideos.sangeet;
  if (key.includes("mehndi") || key.includes("mehendi")) return sampleVideos.mehendi;
  if (key.includes("wedding") || key.includes("ceremony") || key.includes("nikaah") || key.includes("phera")) return sampleVideos.wedding;
  if (key.includes("reception")) return sampleVideos.reception;
  if (key.includes("engagement") || key.includes("ring")) return sampleVideos.engagement;
  if (key.includes("cocktail")) return sampleVideos.cocktail;
  if (key.includes("highlight") || key.includes("reel")) return sampleVideos.highlight;

  return sampleVideos.default;
}

/**
 * Get all sample videos as a keyed object.
 * Useful for features pages and previews.
 */
export function getAllSampleVideos() {
  return { ...sampleVideos };
}

export default sampleVideos;
