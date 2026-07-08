const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
  {
    brideName: {
      type: String,
      required: true,
      trim: true,
    },
    groomName: {
      type: String,
      required: true,
      trim: true,
    },
    weddingDate: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "Traditional",
    },
    budget: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Planning", "Ongoing", "Completed"],
      default: "Planning",
    },
    mediaFiles: [
      {
        functionName: { type: String },
        filename: { type: String },
        originalName: { type: String },
        mimetype: { type: String },
        url: { type: String },
      },
    ],
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

module.exports = mongoose.model("Wedding", weddingSchema);