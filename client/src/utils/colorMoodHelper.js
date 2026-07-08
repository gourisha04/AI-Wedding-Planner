export const moodColors = {
  Engagement: {
    mood: "Romantic & Joyful",
    colors: ["#B76E79", "#F9F6EE", "#D4AF37", "#E8C5C8"],
    names: ["Rose Gold", "Champagne", "Gold", "Dusty Rose"]
  },
  Haldi: {
    mood: "Warm & Playful",
    colors: ["#FFC30B", "#FFA500", "#FFFFF0", "#E67E22"],
    names: ["Haldi Yellow", "Marigold Orange", "Ivory White", "Warm Amber"]
  },
  Mehndi: {
    mood: "Colorful & Festive",
    colors: ["#008080", "#EC008C", "#FFD700", "#2E8B57"],
    names: ["Teal Blue", "Rani Pink", "Marigold Gold", "Sea Green"]
  },
  Mehendi: {
    mood: "Colorful & Festive",
    colors: ["#008080", "#EC008C", "#FFD700", "#2E8B57"],
    names: ["Teal Blue", "Rani Pink", "Marigold Gold", "Sea Green"]
  },
  Sangeet: {
    mood: "Energetic & Vibrant",
    colors: ["#0066FF", "#660099", "#FF007F", "#FFD700"],
    names: ["Electric Blue", "Royal Purple", "Vibrant Magenta", "Gold"]
  },
  Wedding: {
    mood: "Grand & Emotional",
    colors: ["#990000", "#D4AF37", "#FFFDD0", "#800020"],
    names: ["Crimson Red", "Royal Gold", "Antique Ivory", "Burgundy Maroon"]
  },
  Reception: {
    mood: "Elegant & Celebratory",
    colors: ["#50C878", "#E5A93B", "#FFFDD0", "#1E3F20"],
    names: ["Emerald Green", "Classic Gold", "Cream White", "Deep Forest"]
  },
  Cocktail: {
    mood: "Sophisticated & Relaxed",
    colors: ["#191970", "#C0C0C0", "#D3D3D3", "#4A607A"],
    names: ["Midnight Blue", "Silver Satin", "Cool Gray", "Slate Blue"]
  },
  Other: {
    mood: "Cinematic & Natural",
    colors: ["#8FBC8F", "#228B22", "#F5F5DC", "#D2B48C"],
    names: ["Sage Green", "Forest Green", "Warm Beige", "Tan Sand"]
  }
};

export const getMoodColors = (moodText, functionName = "") => {
  // 1. Try matching by functionName first if it matches our dictionary keys
  const cleanFn = (functionName || "").trim();
  for (const key of Object.keys(moodColors)) {
    if (cleanFn.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleanFn.toLowerCase())) {
      if (cleanFn.length > 2) {
        return moodColors[key];
      }
    }
  }

  // 2. Fallback to searching by moodText matches
  const text = (moodText || "").toLowerCase();
  for (const key of Object.keys(moodColors)) {
    const item = moodColors[key];
    if (text.includes(item.mood.toLowerCase())) {
      return item;
    }
  }

  return moodColors.Other;
};
