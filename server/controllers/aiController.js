const Wedding = require("../models/Wedding");
const Event = require("../models/Event");
const VideoPlan = require("../models/VideoPlan");
const AlbumDesign = require("../models/AlbumDesign");
const { generateWeddingPlan } = require("../utils/aiService");

// Generate AI Plan for a Wedding
const generatePlan = async (req, res) => {
  try {
    const { weddingId } = req.body;

    if (!weddingId) {
      return res.status(400).json({
        success: false,
        message: "Wedding ID is required.",
      });
    }

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // Fetch events for this wedding
    const events = await Event.find({ wedding: weddingId });

    // Generate AI plan
    const aiResult = await generateWeddingPlan(wedding, events);

    // Remove any previous plans for this wedding (regenerate)
    await VideoPlan.deleteMany({ wedding: weddingId });
    await AlbumDesign.deleteMany({ wedding: weddingId });

    // Save video plan
    const videoPlan = await VideoPlan.create({
      wedding: weddingId,
      functionVideos: aiResult.videoPlan.functionVideos,
      highlightStructure: aiResult.videoPlan.highlightStructure,
      reelPlans: aiResult.videoPlan.reelPlans,
      suggestions: aiResult.videoPlan.suggestions,
      totalEstimatedDuration: aiResult.videoPlan.totalEstimatedDuration,
      createdBy: req.user._id,
    });

    // Save album design
    const albumDesign = await AlbumDesign.create({
      wedding: weddingId,
      themeSuggestion: aiResult.albumDesign.themeSuggestion,
      coverDesign: aiResult.albumDesign.coverDesign,
      pages: aiResult.albumDesign.pages,
      colorPalette: aiResult.albumDesign.colorPalette,
      typography: aiResult.albumDesign.typography,
      suggestions: aiResult.albumDesign.suggestions,
      totalPages: aiResult.albumDesign.totalPages,
      createdBy: req.user._id,
    });

    // Update wedding status to 'Ongoing' since AI plan has been generated
    wedding.status = "Ongoing";
    await wedding.save();

    res.status(201).json({
      success: true,
      message: "AI wedding plan generated successfully.",
      data: {
        videoPlan,
        albumDesign,
      },
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Video Plan by Wedding ID
const getVideoPlan = async (req, res) => {
  try {
    const videoPlan = await VideoPlan.findOne({
      wedding: req.params.weddingId,
    }).populate("wedding", "brideName groomName weddingDate venue theme");

    if (!videoPlan) {
      return res.status(404).json({
        success: false,
        message: "No video plan found for this wedding.",
      });
    }

    res.status(200).json({
      success: true,
      data: videoPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Album Design by Wedding ID
const getAlbumDesign = async (req, res) => {
  try {
    const albumDesign = await AlbumDesign.findOne({
      wedding: req.params.weddingId,
    }).populate("wedding", "brideName groomName weddingDate venue theme");

    if (!albumDesign) {
      return res.status(404).json({
        success: false,
        message: "No album design found for this wedding.",
      });
    }

    res.status(200).json({
      success: true,
      data: albumDesign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Both Plans (combined)
const getFullPlan = async (req, res) => {
  try {
    const [videoPlan, albumDesign] = await Promise.all([
      VideoPlan.findOne({ wedding: req.params.weddingId }).populate(
        "wedding",
        "brideName groomName weddingDate venue theme budget"
      ),
      AlbumDesign.findOne({ wedding: req.params.weddingId }).populate(
        "wedding",
        "brideName groomName weddingDate venue theme budget"
      ),
    ]);

    if (!videoPlan && !albumDesign) {
      return res.status(404).json({
        success: false,
        message: "No AI plan found for this wedding.",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        videoPlan,
        albumDesign,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generatePlan,
  getVideoPlan,
  getAlbumDesign,
  getFullPlan,
};
