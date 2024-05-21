const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// technical job ticket
const technicalJobTicketSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketType: {
    type: String,
    enum: ["Technical Job Ticket"],
  },
  requesterName: { type: String },
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
    enum: ["open", "pending", "resolved","closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "open",
  },
  requestDate: { type: String, default: new Date().toLocaleDateString() },
  requestTime: { type: String, default: new Date().toLocaleTimeString() },
  updateDate: { type: String, default: new Date().toLocaleDateString() },
  updateTime: { type: String, default: new Date().toLocaleTimeString() },
});

technicalJobTicketSchema.pre("save", async function (next) {
  try {
    const user = await mongoose.model("User").findById(this.user_id);
    if (user) {
      this.requesterName = `${user.firstName} ${user.lastName}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model(
  "Technical-Job-Ticket",
  technicalJobTicketSchema
);
