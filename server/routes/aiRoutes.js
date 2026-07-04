const express = require("express");
const router = express.Router();

const {
  generatePlan,
  getVideoPlan,
  getAlbumDesign,
  getFullPlan,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

// Generate AI Plan
router.post("/generate-plan", protect, generatePlan);

// Get Video Plan
router.get("/video-plan/:weddingId", protect, getVideoPlan);

// Get Album Design
router.get("/album-design/:weddingId", protect, getAlbumDesign);

// Get Full Plan (video + album combined)
router.get("/full-plan/:weddingId", protect, getFullPlan);

module.exports = router;
