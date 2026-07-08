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
  // Indian wedding ritual — vibrant, colorful, families together
  haldi: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fb/Mata_Pujan_Rasam_%E2%80%93_A_Sacred_Indian_Wedding_Ritual.webm/Mata_Pujan_Rasam_%E2%80%93_A_Sacred_Indian_Wedding_Ritual.webm.480p.vp9.webm",

  // Traditional Chamorro dance at a Guamanian wedding — festive group dance
  sangeet: "https://upload.wikimedia.org/wikipedia/commons/7/73/Chamorro_traditional_dance_at_a_Guamanian_wedding%2C_2020.webm",

  // White wedding dance — Igbo tribe Nigeria — couple celebration
  wedding: "https://upload.wikimedia.org/wikipedia/commons/b/be/White_Wedding_Dance_-_Igbo_Tribe_-_Anambra_State_-_Nigeria.webm",

  // Army officer's wedding in Uganda — celebration dance
  reception: "https://upload.wikimedia.org/wikipedia/commons/6/6a/An_Army_Officer%27s_wedding_in_Uganda_02.webm",

  // Floral bloom — evocative of mehndi patterns and beauty
  mehendi: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",

  // Traditional dance Bulawayo Zimbabwe — joyful engagement celebration
  engagement: "https://upload.wikimedia.org/wikipedia/commons/3/33/Traditional_dance_Bulawayo_Zimbabwe.webm",

  // Same as reception but different context — relaxed party atmosphere
  cocktail: "https://upload.wikimedia.org/wikipedia/commons/6/6a/An_Army_Officer%27s_wedding_in_Uganda_02.webm",

  // Lightweight 240p version — for highlight reel previews
  highlight: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fb/Mata_Pujan_Rasam_%E2%80%93_A_Sacred_Indian_Wedding_Ritual.webm/Mata_Pujan_Rasam_%E2%80%93_A_Sacred_Indian_Wedding_Ritual.webm.240p.vp9.webm",

  // Default fallback
  default: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
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
