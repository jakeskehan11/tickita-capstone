const mongoose = require("mongoose");
const JobTicket = require("../models/jobTicketModel");
const User = require("../models/userModel");
const JobTicketFeedback = require("../models/jobTicketFeedbackModel");

// Create a Job Ticket Feedback
const createJobTicketFeedback = async (req, res) => {
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

    const jobTicket = await JobTicket.findOne({
      _id: id,
      user_id: user._id,
    });

    if (!jobTicket) {
      return res.status(404).json({ error: "No ticket found" });
    }

    const feedback = await JobTicketFeedback.create({
      user_id: user._id,
      jobTicket_id: jobTicket._id,
      purposeOfVisit,
      courtesy,
      quality,
      timeliness,
      efficiency,
      cleanliness,
      comfort,
      comments,
    });

    jobTicket.feedback = feedback._id;
    await jobTicket.save();

    res.status(200).json({ jobTicket, feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Job Ticket Feedbacks
const getJobTicketFeedbacks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user_role = req.user.role; // Assuming role is stored in req.user.role

    let jobTicketFeedbacks;

    if (user_role === "HR") {
      // If the user's role is 'HR', fetch all Job Ticket Feedbacks
      jobTicketFeedbacks = await JobTicketFeedback.find().sort({
        createdAt: -1,
      });
    } else {
      // Otherwise, fetch only the Job Ticket Feedback for the specific user
      jobTicketFeedbacks = await JobTicketFeedback.find({ user_id }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(jobTicketFeedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Job Ticket Feedback
const getJobTicketFeedBack = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No feedback found" });
  }

  const jobTicketFeedback = await JobTicketFeedback.findById(id);

  if (!jobTicketFeedback) {
    return res.status(404).json({ error: "No feedback found" });
  }

  res.status(200).json(jobTicketFeedback);
};

module.exports = {
  createJobTicketFeedback,
  getJobTicketFeedbacks,
  getJobTicketFeedBack,
};
