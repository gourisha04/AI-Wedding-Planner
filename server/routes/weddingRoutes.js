const express = require("express");
const router = express.Router();

const {
  createWedding,
  getAllWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
} = require("../controllers/weddingController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createWedding);

router.get("/", protect, getAllWeddings);

router
  .route("/:id")
  .get(protect, getWeddingById)
  .put(protect, updateWedding)
  .delete(protect, deleteWedding);

module.exports = router;