const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// job ticket
const jobTicketSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    enum: ["Job Ticket", "Technical Job Ticket"],
  },
  requesterName: { type: String, required: true },
  department: {
    type: String,
    enum: ["ASD", "FASD", "ITD", "MD", "TED"],
    required: true,
  },
  building: {
    type: String,
    enum: ["Star", "Aqua Best", "Admin", "OSAS", "Library", "HR"],
    required: true,
  },
  room: { type: Number, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "pending", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "open",
  },
  requestDate: { type: String, default: new Date().toLocaleDateString() },
  requestTime: { type: String, default: new Date().toLocaleTimeString() },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job-Ticket", jobTicketSchema);
