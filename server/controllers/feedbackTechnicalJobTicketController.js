const mongoose = require("mongoose");
const TechnicalJobTicket = require("../models/technicalJobTicketModel");
const User = require("../models/userModel");
const TechnicalJobTicketFeedback = require("../models/technicalJobTicketFeedbackModel");

// Create a Technical Job Ticket Feedback
const createTechnicalJobTicketFeedback = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ticket ID" });
  }

  const {
    purposeOfVisit,
    courtesy,
    quality,
    timeliness,
    efficiency,
    cleanliness,
    comfort,
    comments,
  } = req.body;

  const emptyFields = [];

  if (!purposeOfVisit) emptyFields.push("purposeOfVisit");
  if (!courtesy) emptyFields.push("courtesy");
  if (!quality) emptyFields.push("quality");
  if (!timeliness) emptyFields.push("timeliness");
  if (!efficiency) emptyFields.push("efficiency");
  if (!cleanliness) emptyFields.push("cleanliness");
  if (!comfort) emptyFields.push("comfort");
  if (!comments) emptyFields.push("comments");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user = await User.findById(req.user._id);

    const technicalJobTicket = await TechnicalJobTicket.findOne({
      _id: id,
      user_id: user._id,
    });

    if (!technicalJobTicket) {
      return res.status(404).json({ error: "No ticket found" });
    }

    const feedback = await TechnicalJobTicketFeedback.create({
      user_id: user._id,
      technicalJobTicket_id: technicalJobTicket._id,
      purposeOfVisit,
      courtesy,
      quality,
      timeliness,
      efficiency,
      cleanliness,
      comfort,
      comments,
    });

    technicalJobTicket.feedback = feedback._id;
    await technicalJobTicket.save();

    res.status(200).json({ technicalJobTicket, feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Technical Job Ticket Feedbacks
const getTechnicalJobTicketFeedbacks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user_role = req.user.role; // Assuming role is stored in req.user.role

    let technicalJobTicketFeedbacks;

    if (user_role === "HR") {
      // If the user's role is 'HR', fetch all Technical Job Ticket Feedbacks
      technicalJobTicketFeedbacks =
        await TechnicalJobTicketFeedback.find().sort({
          createdAt: -1,
        });
    } else {
      // Otherwise, fetch only the Technical Job Ticket Feedback for the specific user
      technicalJobTicketFeedbacks = await TechnicalJobTicketFeedback.find({
        user_id,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(technicalJobTicketFeedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Technical Job Ticket Feedback
const getTechnicalJobTicketFeedBack = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No feedback found" });
  }

  const technicalJobTicketFeedback = await TechnicalJobTicketFeedback.findById(
    id
  );

  if (!technicalJobTicketFeedback) {
    return res.status(404).json({ error: "No feedback found" });
  }

  res.status(200).json(technicalJobTicketFeedback);
};

module.exports = {
  createTechnicalJobTicketFeedback,
  getTechnicalJobTicketFeedbacks,
  getTechnicalJobTicketFeedBack,
};
