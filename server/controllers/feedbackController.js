const mongoose = require("mongoose");
const JobTicket = require("../models/jobTicketModel");
const TechnicalJobTicket = require("../models/technicalJobTicketModel");
const User = require("../models/userModel");
const Feedback = require("../models/feedbackModel");

// Create a Job Ticket Feedback
const createTicketFeedback = async (req, res) => {
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
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const jobTicket = await JobTicket.findOne({ _id: id, user_id: user._id });
    const technicalJobTicket = await TechnicalJobTicket.findOne({
      _id: id,
      user_id: user._id,
    });

    const ticket = jobTicket || technicalJobTicket;

    if (!ticket) {
      return res.status(404).json({ error: "No ticket found" });
    }

    // Check if feedback already exists for the ticket
    const existingFeedback = await Feedback.findOne({
      $or: [
        { jobTicket_id: jobTicket ? jobTicket._id : null },
        {
          technicalJobTicket_id: technicalJobTicket
            ? technicalJobTicket._id
            : null,
        },
      ],
    });

    if (existingFeedback) {
      return res
        .status(400)
        .json({ error: "Feedback already exists for this ticket" });
    }

    const feedback = await Feedback.create({
      user_id: user._id,
      jobTicket_id: jobTicket ? jobTicket._id : null,
      technicalJobTicket_id: technicalJobTicket ? technicalJobTicket._id : null,
      purposeOfVisit,
      courtesy,
      quality,
      timeliness,
      efficiency,
      cleanliness,
      comfort,
      comments,
    });

    ticket.feedback = feedback._id;
    await ticket.save();

    res.status(200).json({ ticket, feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Ticket Feedbacks
const getTicketFeedbacks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user_role = req.user.role; // Assuming role is stored in req.user.role

    let feedbacks;

    // If the user's role is 'HR', fetch all Job Ticket Feedbacks and Technical Job Ticket Feedbacks
    if (user_role === "HR") {
      feedbacks = await Feedback.find();
    } else {
      // Otherwise, fetch only the Job Ticket Feedback for the specific user
      feedbacks = await Feedback.find({ user_id });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Job Ticket Feedback
const getTicketFeedBack = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No feedback found" });
  }

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({ error: "No feedback found" });
  }

  res.status(200).json(feedback);
};

const deleteTicketFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No feedback found" });
  }

  const feedback = await Feedback.findOneAndDelete({ _id: id });

  if (!feedback) {
    return res.status(400).json({ error: "No feedback found" });
  }

  res.status(200).json(feedback);
};

module.exports = {
  createTicketFeedback,
  getTicketFeedbacks,
  getTicketFeedBack,
  deleteTicketFeedback,
};
