const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventsByWedding,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

// Create Event
router.post("/", protect, createEvent);

// Get All Events
router.get("/", protect, getAllEvents);

// Get Events by Wedding ID
router.get("/wedding/:weddingId", protect, getEventsByWedding);

module.exports = router;