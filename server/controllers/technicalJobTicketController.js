const TechnicalJobTicket = require("../models/technicalJobTicketModel");
const mongoose = require("mongoose");

// Get all technical job tickets
const getTechnicalJobTickets = async (req, res) => {
  const user_id = req.user._id;

  const technicalJobTickets = await TechnicalJobTicket.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(technicalJobTickets);
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
  const { requesterName, department, typeOfService, description } = req.body;
  const emptyFields = [];

  if (!requesterName) emptyFields.push("requesterName");
  if (!department) emptyFields.push("department");
  if (!typeOfService) emptyFields.push("building");
  if (!description) emptyFields.push("description");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const technicalJobTicket = await TechnicalJobTicket.create({
      user_id,
      ticketType: "Technical Job Ticket",
      requesterName,
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

module.exports = {
  getTechnicalJobTickets,
  getTechnicalJobTicket,
  createTechnicalJobTicket,
  deleteTechnicalJobTicket,
  updateTechnicalJobTicket,
};
