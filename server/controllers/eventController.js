const Event = require("../models/Event");

// Create Event
const createEvent = async (req, res) => {
  try {
    const {
      wedding,
      eventName,
      eventDate,
      eventTime,
      venue,
      description,
    } = req.body;

    const event = await Event.create({
      wedding,
      eventName,
      eventDate,
      eventTime,
      venue,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events of Logged-in User
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({
      createdBy: req.user._id,
    }).populate("wedding", "brideName groomName weddingDate");

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Events by Wedding ID
const getEventsByWedding = async (req, res) => {
  try {
    const events = await Event.find({
      wedding: req.params.weddingId,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventsByWedding,
};