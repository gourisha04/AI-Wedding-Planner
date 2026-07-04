const mongoose = require("mongoose");

const albumPageSchema = new mongoose.Schema({
  pageNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    enum: ["Full Bleed", "Grid 2x2", "Collage", "Portrait Focus", "Panoramic", "Text + Photo", "Minimal"],
    default: "Full Bleed",
  },
  description: String,
  suggestedPhotos: [String],
});

const albumDesignSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
    },

    themeSuggestion: {
      type: String,
      default: "Elegant Royal",
    },

    coverDesign: {
      title: String,
      subtitle: String,
      style: {
        type: String,
        default: "Gold Foil on Ivory",
      },
    },

    pages: [albumPageSchema],

    colorPalette: [String],

    typography: {
      headingFont: {
        type: String,
        default: "Playfair Display",
      },
      bodyFont: {
        type: String,
        default: "Lato",
      },
    },

    suggestions: [String],

    totalPages: {
      type: Number,
      default: 30,
    },

    generatedBy: {
      type: String,
      default: "Gemini AI",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AlbumDesign", albumDesignSchema);
