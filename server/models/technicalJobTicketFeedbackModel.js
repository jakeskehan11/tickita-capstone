const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const technicalJobTicketFeedbackSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  technicalJobTicket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technical-Job-Ticket",
    required: true,
  },
  name: { type: String },
  agency: {
    type: String,
  },
  email: {
    type: String,
  },
  purposeOfVisit: {
    type: String,
    required: true,
  },
  attendingStaff: { type: String, default: "Computer Technician" },
  courtesy: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  quality: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  timeliness: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  efficiency: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  cleanliness: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  comfort: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  comments: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    default: "Technical Job Ticket",
  },
  feedbackDate: { type: String, default: new Date().toLocaleDateString() },
  feedbackTime: { type: String, default: new Date().toLocaleTimeString() },
});

technicalJobTicketFeedbackSchema.pre("save", async function (next) {
  try {
    const user = await mongoose.model("User").findById(this.user_id);

    if (user) {
      this.name = `${user.firstName} ${user.lastName}`;
      this.email = user.email;
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model(
  "Technical-Job-Ticket-Feedback",
  technicalJobTicketFeedbackSchema
);
