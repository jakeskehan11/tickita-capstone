const JobTicket = require("../models/jobTicketModel");
const mongoose = require("mongoose");

// Get all job tickets
const getJobTickets = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user_role = req.user.role; // Assuming role is stored in req.user.role

    let jobTickets;

    if (user_role === "PPSS") {
      // If the user's role is 'PPSS', fetch all job tickets
      jobTickets = await JobTicket.find().sort({ createdAt: -1 });
    } else {
      // Otherwise, fetch only the job tickets for the specific user
      jobTickets = await JobTicket.find({ user_id }).sort({ createdAt: -1 });
    }

    res.status(200).json(jobTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single job ticket
const getJobTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No ticket found" });
  }

  const jobTicket = await JobTicket.findById(id);

  if (!jobTicket) {
    return res.status(404).json({ error: "No ticket found" });
  }

  res.status(200).json(jobTicket);
};

// Create a new technical job ticket
const createJobTicket = async (req, res) => {
  const { requesterName, department, building, room, description } = req.body;
  const emptyFields = [];

  if (!requesterName) emptyFields.push("requesterName");
  if (!department) emptyFields.push("department");
  if (!building) emptyFields.push("building");
  if (!room) emptyFields.push("room");
  if (!description) emptyFields.push("description");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const jobTicket = await JobTicket.create({
      user_id,
      ticketType: "Job Ticket",
      requesterName,
      department,
      building,
      room,
      description,
      status: "open",
      priority: "low",
    });
    res.status(200).json(jobTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job ticket
const deleteJobTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No job ticket found" });
  }

  const jobTicket = await JobTicket.findOneAndDelete({ _id: id });

  if (!jobTicket) {
    return res.status(400).json({ error: "No job ticket found" });
  }

  res.status(200).json(jobTicket);
};

// Update a job ticket
const updateJobTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid job ticket ID" });
  }
  try {
    const jobTicket = await JobTicket.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!jobTicket) {
      return res.status(404).json({ error: "No job ticket found" });
    }
    res.status(200).json(jobTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getJobTickets,
  getJobTicket,
  createJobTicket,
  deleteJobTicket,
  updateJobTicket,
};
