const mongoose = require("mongoose");
const TechnicalJobTicket = require("../models/technicalJobTicketModel");
const User = require("../models/userModel");


// Get all technical job tickets
const getTechnicalJobTickets = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user_role = req.user.role; // Assuming role is stored in req.user.role

    let technicalJobTickets;

    if (user_role === "Computer Technician") {
      // If the user's role is 'Computer Technician', fetch all job tickets
      technicalJobTickets = await TechnicalJobTicket.find().sort({
        createdAt: -1,
      });
    } else {
      // Otherwise, fetch only the technical job tickets for the specific user
      technicalJobTickets = await TechnicalJobTicket.find({ user_id }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(technicalJobTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single technical job ticket
const getTechnicalJobTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No ticket found" });
  }

  const technicalJobTicket = await TechnicalJobTicket.findById(id);

  if (!technicalJobTicket) {
    return res.status(404).json({ error: "No ticket found" });
  }

  res.status(200).json(technicalJobTicket);
};

// Create a new technical job ticket
const createTechnicalJobTicket = async (req, res) => {
  const { department, typeOfService, description } = req.body;
  const emptyFields = [];

  if (!department) emptyFields.push("department");
  if (!typeOfService) emptyFields.push("building");
  if (!description) emptyFields.push("description");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user = await User.findById(req.user._id);

    const technicalJobTicket = await TechnicalJobTicket.create({
      user_id: user._id,
      ticketType: "Technical Job Ticket",
      department,
      typeOfService,
      description,
      status: "open",
      priority: "low",
    });
    res.status(200).json(technicalJobTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a technical job ticket
const deleteTechnicalJobTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No job ticket found" });
  }

  const technicalJobTicket = await TechnicalJobTicket.findOneAndDelete({
    _id: id,
  });

  if (!technicalJobTicket) {
    return res.status(400).json({ error: "No job ticket found" });
  }

  res.status(200).json(technicalJobTicket);
};

// Update a technical job ticket
const updateTechnicalJobTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid job ticket ID" });
  }
  try {
    const technicalJobTicket = await TechnicalJobTicket.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!technicalJobTicket) {
      return res.status(404).json({ error: "No job ticket found" });
    }
    res.status(200).json(technicalJobTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// FEEDBACK


module.exports = {
  getTechnicalJobTickets,
  getTechnicalJobTicket,
  createTechnicalJobTicket,
  deleteTechnicalJobTicket,
  updateTechnicalJobTicket,
};
