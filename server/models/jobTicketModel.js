const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// job ticket
const jobTicketSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketType: {
    type: String,
    enum: ["Job Ticket"],
    default: "Job Ticket",
  },
  requesterName: { type: String },
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
    enum: ["open", "pending", "resolved", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "open",
  },
  requestDate: { type: String, default: new Date().toLocaleDateString() },
  requestTime: { type: String, default: new Date().toLocaleTimeString() },
  feedbackCreated: { type: Boolean, default: false },
});

jobTicketSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("Job-Ticket", jobTicketSchema);
