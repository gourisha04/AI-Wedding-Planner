/**
 * AI Service – Generates structured wedding plans.
 *
 * Architecture: This module builds the prompt and returns a structured response.
 * Currently uses an intelligent mock generator. To connect a real Gemini/OpenAI API,
 * replace the body of `callAI()` with an actual API call — zero other code changes needed.
 */

// ──────────────────────────────────────────────
// Prompt Builder
// ──────────────────────────────────────────────

const buildPrompt = (wedding, events) => {
  const functionList = events.map((e) => e.eventName).join(", ");

  return `You are an expert AI wedding planner. Generate a complete cinematic wedding plan for:

Bride: ${wedding.brideName}
Groom: ${wedding.groomName}
Wedding Date: ${wedding.weddingDate}
Venue: ${wedding.venue}
Theme: ${wedding.theme}
Budget: ₹${wedding.budget || "Not specified"}

Wedding Functions: ${functionList || "Wedding Ceremony"}

Generate the following in structured JSON:
1. Function-wise video plan (shots, mood, music for each function)
2. Overall highlight video structure (5-7 segments with timing)
3. Social media reel plans (Instagram reels for key moments)
4. Wedding album layout (page-by-page with layout types)
5. Album theme, color palette, and typography
6. Professional suggestions for editors and designers

Respond ONLY with valid JSON.`;
};

// ──────────────────────────────────────────────
// Mock AI Response Generator
// ──────────────────────────────────────────────

const generateMockResponse = (wedding, events) => {
  const functionNames = events.length > 0
    ? events.map((e) => e.eventName)
    : ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"];

  const shotsByFunction = {
    Engagement: ["Ring exchange close-up", "Family blessings", "Couple portrait with ring", "Guest reactions", "Celebration moments"],
    Haldi: ["Haldi paste application", "Family smearing haldi", "Emotional moments", "Flower shower shots", "Candid laughter"],
    Mehndi: ["Mehndi application close-up", "Bride's hands detail shots", "Dance performances", "Group celebrations", "Bridal expressions"],
    Mehendi: ["Mehndi application close-up", "Bride's hands detail shots", "Dance performances", "Group celebrations", "Bridal expressions"],
    Sangeet: ["Stage performances", "Family dance numbers", "Couple dance", "DJ and crowd energy", "Emotional dedications"],
    Wedding: ["Baraat arrival", "Jaimala ceremony", "Phera rituals", "Sindoor and mangalsutra", "Vidaai emotions"],
    Reception: ["Grand entry of couple", "Cake cutting", "First dance", "Toast speeches", "Guest interactions"],
    Cocktail: ["Cocktail station setup", "Guest mingling", "Live music performance", "Couple with friends", "Ambient venue shots"],
    Other: ["Key moments", "Candid interactions", "Venue details", "Group photos", "Celebration highlights"],
  };

  const moodByFunction = {
    Engagement: "Romantic & Joyful",
    Haldi: "Warm & Playful",
    Mehndi: "Colorful & Festive",
    Mehendi: "Colorful & Festive",
    Sangeet: "Energetic & Vibrant",
    Wedding: "Grand & Emotional",
    Reception: "Elegant & Celebratory",
    Cocktail: "Sophisticated & Relaxed",
    Other: "Cinematic & Natural",
  };

  const musicByFunction = {
    Engagement: "Soft romantic instrumental / Bollywood love ballad",
    Haldi: "Upbeat folk music / Punjabi celebration tracks",
    Mehndi: "Traditional mehndi songs / Modern fusion beats",
    Mehendi: "Traditional mehndi songs / Modern fusion beats",
    Sangeet: "High-energy Bollywood dance mix / DJ tracks",
    Wedding: "Classical shehnai / Emotional Bollywood score",
    Reception: "Elegant orchestral / Contemporary love songs",
    Cocktail: "Lounge jazz / Chill instrumental mix",
    Other: "Cinematic background score",
  };

  // Sample video URLs per function (Wikimedia Commons CC-BY-SA / MDN CC0)
  const sampleVideoUrlByFunction = {
    Engagement: "https://upload.wikimedia.org/wikipedia/commons/3/33/Traditional_dance_Bulawayo_Zimbabwe.webm",
    Haldi: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fb/Mata_Pujan_Rasam_%E2%80%93_A_Sacred_Indian_Wedding_Ritual.webm/Mata_Pujan_Rasam_%E2%80%93_A_Sacred_Indian_Wedding_Ritual.webm.480p.vp9.webm",
    Mehndi: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    Mehendi: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    Sangeet: "https://upload.wikimedia.org/wikipedia/commons/7/73/Chamorro_traditional_dance_at_a_Guamanian_wedding%2C_2020.webm",
    Wedding: "https://upload.wikimedia.org/wikipedia/commons/b/be/White_Wedding_Dance_-_Igbo_Tribe_-_Anambra_State_-_Nigeria.webm",
    Reception: "https://upload.wikimedia.org/wikipedia/commons/6/6a/An_Army_Officer%27s_wedding_in_Uganda_02.webm",
    Cocktail: "https://upload.wikimedia.org/wikipedia/commons/6/6a/An_Army_Officer%27s_wedding_in_Uganda_02.webm",
    Other: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
  };

  // Function-wise video plans
  const functionVideos = functionNames.map((fn) => ({
    functionName: fn,
    title: `${fn} – Cinematic Coverage`,
    duration: fn === "Wedding" ? "8-12 min" : "3-5 min",
    shots: shotsByFunction[fn] || shotsByFunction.Other,
    mood: moodByFunction[fn] || moodByFunction.Other,
    musicSuggestion: musicByFunction[fn] || musicByFunction.Other,
    sampleVideoUrl: sampleVideoUrlByFunction[fn] || sampleVideoUrlByFunction.Other,
  }));

  // Highlight structure
  const highlightStructure = [
    { order: 1, title: "Grand Opening", description: "Drone venue shots, family arrivals, decoration details", duration: "1-2 min" },
    { order: 2, title: "Bride & Groom Introduction", description: `${wedding.brideName} and ${wedding.groomName} getting ready, individual portraits`, duration: "2-3 min" },
    { order: 3, title: "Pre-Wedding Celebrations", description: "Best moments from Haldi, Mehendi, and Sangeet", duration: "3-4 min" },
    { order: 4, title: "The Wedding Ceremony", description: "Baraat, Jaimala, Pheras, vows, and rituals", duration: "4-5 min" },
    { order: 5, title: "Emotional Moments", description: "Vidaai, family blessings, candid tears of joy", duration: "2-3 min" },
    { order: 6, title: "Celebration & Reception", description: "Grand entry, dance, cake cutting, toasts", duration: "2-3 min" },
    { order: 7, title: "Closing Montage", description: "Best couple moments, guest wishes, cinematic end credits", duration: "1-2 min" },
  ];

  // Reel plans
  const reelPlans = [
    { title: `${wedding.brideName} Bridal Entry`, platform: "Instagram", duration: "30-45s", concept: "Slow-motion bridal entry with dramatic music reveal", hashtags: ["#BridalEntry", "#WeddingVibes", "#IndianBride"] },
    { title: "Haldi Fun Moments", platform: "Instagram", duration: "15-30s", concept: "Fast-paced montage of haldi ceremony with trendy audio", hashtags: ["#HaldiCeremony", "#WeddingFun", "#HaldiVibes"] },
    { title: "Couple First Look", platform: "Instagram", duration: "30-45s", concept: `${wedding.brideName} and ${wedding.groomName} first look reaction with romantic music`, hashtags: ["#FirstLook", "#CoupleGoals", "#WeddingMoments"] },
    { title: "Sangeet Performance", platform: "Instagram", duration: "30-60s", concept: "Best dance performance highlights synced to beat drops", hashtags: ["#SangeetNight", "#WeddingDance", "#BollywoodVibes"] },
    { title: "Wedding Day Recap", platform: "Instagram", duration: "45-60s", concept: "Complete wedding day in 60 seconds – getting ready to vidaai", hashtags: ["#WeddingDay", "#WeddingRecap", "#JustMarried"] },
  ];

  // Album pages
  const pages = [
    { pageNumber: 1, title: "Cover Page", layout: "Full Bleed", description: `${wedding.brideName} & ${wedding.groomName} – A Royal Celebration`, suggestedPhotos: ["Couple portrait", "Venue wide shot"] },
    { pageNumber: 2, title: "Save The Date", layout: "Text + Photo", description: "Wedding date announcement with elegant typography", suggestedPhotos: ["Pre-wedding couple shot"] },
    { pageNumber: 3, title: "Bride Portraits", layout: "Grid 2x2", description: "Getting ready shots, bridal makeup, jewelry details", suggestedPhotos: ["Bridal portrait", "Jewelry close-up", "Getting ready", "Mirror shot"] },
    { pageNumber: 4, title: "Groom Portraits", layout: "Grid 2x2", description: "Groom getting ready, sehra tying, with groomsmen", suggestedPhotos: ["Groom portrait", "Sehra moment", "With friends", "Sherwani detail"] },
    { pageNumber: 5, title: "Haldi Ceremony", layout: "Collage", description: "Colorful and playful haldi moments", suggestedPhotos: ["Haldi application", "Family fun", "Yellow theme decor", "Candid laughter"] },
    { pageNumber: 6, title: "Mehendi Celebration", layout: "Portrait Focus", description: "Intricate mehendi designs and celebrations", suggestedPhotos: ["Mehendi hands close-up", "Bride smiling", "Group photo"] },
    { pageNumber: 7, title: "Sangeet Night", layout: "Collage", description: "Dance performances and stage moments", suggestedPhotos: ["Stage performance", "Couple dance", "Family dance", "DJ booth"] },
    { pageNumber: 8, title: "Baraat Arrival", layout: "Panoramic", description: "Grand baraat procession and energy", suggestedPhotos: ["Horse/car entry", "Dancing crowd", "Groom on mare"] },
    { pageNumber: 9, title: "Wedding Rituals", layout: "Grid 2x2", description: "Sacred ceremonies and traditional rituals", suggestedPhotos: ["Jaimala", "Pheras", "Sindoor", "Mangalsutra"] },
    { pageNumber: 10, title: "Emotional Moments", layout: "Portrait Focus", description: "Tears, blessings, and heartfelt interactions", suggestedPhotos: ["Vidaai tears", "Parent blessings", "Sibling hug"] },
    { pageNumber: 11, title: "Reception Glamour", layout: "Collage", description: "Grand reception entry and celebrations", suggestedPhotos: ["Couple entry", "Cake cutting", "Ring ceremony", "Guest photos"] },
    { pageNumber: 12, title: "Family & Friends", layout: "Grid 2x2", description: "Group photos with family and friends", suggestedPhotos: ["Bride family", "Groom family", "Friend groups", "Combined family"] },
    { pageNumber: 13, title: "Candid Moments", layout: "Collage", description: "Unscripted, natural, and heartwarming moments", suggestedPhotos: ["Laughing candid", "Kids playing", "Dance floor fun", "Surprise reactions"] },
    { pageNumber: 14, title: "Couple Portraits", layout: "Full Bleed", description: "Golden hour romantic couple portraits", suggestedPhotos: ["Sunset portrait", "Close-up intimate shot"] },
    { pageNumber: 15, title: "Thank You", layout: "Text + Photo", description: "Gratitude page with couple portrait and message", suggestedPhotos: ["Final couple portrait"] },
  ];

  const themeMap = {
    Royal: "Regal Gold & Ivory",
    Traditional: "Classic Red & Gold",
    Modern: "Contemporary Monochrome",
    Minimal: "Clean White & Sage",
    Destination: "Tropical Warm Palette",
  };

  const colorMap = {
    Royal: ["#D4AF37", "#FFFFF0", "#800020", "#2C2C2C"],
    Traditional: ["#DC143C", "#FFD700", "#8B0000", "#FFFDD0"],
    Modern: ["#1A1A2E", "#E0E0E0", "#C9A96E", "#FFFFFF"],
    Minimal: ["#FFFFFF", "#9CAF88", "#D4C5A9", "#333333"],
    Destination: ["#F4A460", "#87CEEB", "#FFFFFF", "#2E8B57"],
  };

  const theme = wedding.theme || "Traditional";

  return {
    videoPlan: {
      functionVideos,
      highlightStructure,
      reelPlans,
      suggestions: [
        "Use golden-hour lighting for couple portraits to achieve a cinematic, warm look.",
        "Capture slow-motion shots during key emotional moments like vidaai and pheras.",
        "Include drone footage for venue establishing shots and baraat procession.",
        "Create short-form vertical reels for each function to maximize social media reach.",
        "Prioritize candid family reactions — these make the most emotionally impactful edits.",
        "Use color grading consistent with the wedding theme for a cohesive visual identity.",
      ],
      totalEstimatedDuration: "18-25 min",
    },
    albumDesign: {
      themeSuggestion: themeMap[theme] || "Elegant Traditional",
      coverDesign: {
        title: `${wedding.brideName} & ${wedding.groomName}`,
        subtitle: new Date(wedding.weddingDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        style: theme === "Royal" ? "Gold Foil Embossing on Ivory Leather" : theme === "Modern" ? "Matte Black with Silver Typography" : "Textured Ivory with Gold Lettering",
      },
      pages,
      colorPalette: colorMap[theme] || colorMap.Traditional,
      typography: {
        headingFont: theme === "Modern" ? "Montserrat" : "Playfair Display",
        bodyFont: theme === "Minimal" ? "Inter" : "Lato",
      },
      suggestions: [
        "Use full-bleed layouts for the most impactful couple portraits.",
        "Maintain consistent color grading across all photos before placing in album.",
        "Add subtle gold foil accents on section divider pages.",
        "Include a handwritten-style thank you note on the closing page.",
        "Use matte finish paper for emotional moments and glossy for celebration shots.",
      ],
      totalPages: 30,
    },
  };
};

// ──────────────────────────────────────────────
// Main AI Call (swap this for real Gemini API)
// ──────────────────────────────────────────────

/**
 * Generate an AI wedding plan.
 *
 * To integrate a real Gemini API:
 *   1. Install: npm install @google/generative-ai
 *   2. Set GEMINI_API_KEY in .env
 *   3. Replace the body of this function with a Gemini call using buildPrompt()
 *
 * @param {Object} wedding - The wedding document
 * @param {Array}  events  - Array of event documents for this wedding
 * @returns {Object}       - { videoPlan, albumDesign }
 */
const generateWeddingPlan = async (wedding, events) => {
  // Build the prompt (ready for real API usage)
  const prompt = buildPrompt(wedding, events);

  // Log the prompt for debugging / assignment demonstration
  console.log("\n═══ AI PROMPT ═══");
  console.log(prompt);
  console.log("═════════════════\n");

  // Return structured mock response
  // Replace this block with actual Gemini API call when ready
  const result = generateMockResponse(wedding, events);

  return result;
};

module.exports = { generateWeddingPlan, buildPrompt };
