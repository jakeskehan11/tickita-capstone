const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new job ticket
const technicalJobTicketSchema = new Schema({
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
  typeOfService: {
    type: String,
    enum: [
      "Software Installation and Assistance",
      "Hardware Troubleshooting and Repair",
      "Internet Connection Troubleshooting",
      "Network Setup and Configuration",
      "Event Technical Assistance",
      "File Backup and Restoration",
      "Hardware Cleaning and Maintenance",
      "Other Technical Assistance",
    ],
    required: true,
  },
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

module.exports = mongoose.model(
  "Technical-Job-Ticket",
  technicalJobTicketSchema
);
