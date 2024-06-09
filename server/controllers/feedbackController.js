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
    if (ticket.feedbackCreated) {
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
    ticket.feedbackCreated = true;
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

    let feedbacks;

    // Check the ticketType field in the Feedback documents
    feedbacks = await Feedback.find({
      $or: [
        { ticketType: "Job Ticket" },
        { ticketType: "Technical Job Ticket" },
        { user_id },
      ],
    });

    // Filter the feedbacks based on the ticketType
    const jobTicketFeedbacks = feedbacks.filter(
      (feedback) => feedback.ticketType === "Job Ticket"
    );
    const technicalJobTicketFeedbacks = feedbacks.filter(
      (feedback) => feedback.ticketType === "Technical Job Ticket"
    );
    const userFeedbacks = feedbacks.filter(
      (feedback) => feedback.user_id.toString() === user_id.toString()
    );

    // Construct the response object based on the user's role
    const user_role = req.user.role;
    let response;

    switch (user_role) {
      case "HR":
        response = feedbacks;
        break;

      case "PPSS":
        response = jobTicketFeedbacks;
        break;

      case "Computer Technician":
        response = technicalJobTicketFeedbacks;
        break;

      default:
        response = userFeedbacks;
        break;
    }

    res.status(200).json(response);
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
