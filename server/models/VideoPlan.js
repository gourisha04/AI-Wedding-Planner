const mongoose = require("mongoose");

const videoSegmentSchema = new mongoose.Schema({
  functionName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: "3-5 min",
  },
  shots: [String],
  mood: {
    type: String,
    default: "Cinematic",
  },
  musicSuggestion: String,
  sampleVideoUrl: String,
});

const highlightSegmentSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: String,
});

const reelPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    default: "Instagram",
  },
  duration: {
    type: String,
    default: "30-60s",
  },
  concept: String,
  hashtags: [String],
});

const videoPlanSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
    },

    functionVideos: [videoSegmentSchema],

    highlightStructure: [highlightSegmentSchema],

    reelPlans: [reelPlanSchema],

    suggestions: [String],

    totalEstimatedDuration: {
      type: String,
      default: "15-25 min",
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

module.exports = mongoose.model("VideoPlan", videoPlanSchema);
