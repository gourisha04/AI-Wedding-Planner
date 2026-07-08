const Wedding = require("../models/Wedding");
const Event = require("../models/Event");
const VideoPlan = require("../models/VideoPlan");
const AlbumDesign = require("../models/AlbumDesign");

// Create Wedding
const createWedding = async (req, res) => {
  try {
    const {
      brideName,
      groomName,
      weddingDate,
      venue,
      theme,
      budget,
      mediaFiles,
    } = req.body;

    const wedding = await Wedding.create({
      brideName,
      groomName,
      weddingDate,
      venue,
      theme,
      budget,
      mediaFiles,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Wedding created successfully",
      data: wedding,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Weddings
const getAllWeddings = async (req, res) => {
  try {
    const weddings = await Wedding.find({ createdBy: req.user._id });

    res.status(200).json({
      success: true,
      count: weddings.length,
      data: weddings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Wedding
const getWeddingById = async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.id);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found",
      });
    }

    res.status(200).json({
      success: true,
      data: wedding,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Wedding
const updateWedding = async (req, res) => {
  try {
    const wedding = await Wedding.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wedding updated successfully",
      data: wedding,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Wedding
const deleteWedding = async (req, res) => {
  try {
    const wedding = await Wedding.findByIdAndDelete(req.params.id);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found",
      });
    }

    // Cascade delete related records
    await Promise.all([
      Event.deleteMany({ wedding: req.params.id }),
      VideoPlan.deleteMany({ wedding: req.params.id }),
      AlbumDesign.deleteMany({ wedding: req.params.id }),
    ]);

    res.status(200).json({
      success: true,
      message: "Wedding deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createWedding,
  getAllWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
};