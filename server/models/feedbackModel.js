const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ticket feedback
const FeedbackSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobTicket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job-Ticket",
  },
  technicalJobTicket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technical-Job-Ticket",
  },
  name: { type: String },
  agency: { type: String },
  email: { type: String },
  purposeOfVisit: { type: String, required: true },
  attendingStaff: { type: String },
  courtesy: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  quality: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  timeliness: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  efficiency: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  cleanliness: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  comfort: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  comments: { type: String, required: true },
  ticketType: { type: String },
  feedbackDate: { type: String, default: new Date().toLocaleDateString() },
  feedbackTime: { type: String, default: new Date().toLocaleTimeString() },
});

FeedbackSchema.pre("save", async function (next) {
  try {
    const user = await mongoose.model("User").findById(this.user_id);

    if (user) {
      this.name = `${user.firstName} ${user.lastName}`;
      this.email = user.email;
    }

    const jobTicket = await mongoose
      .model("Job-Ticket")
      .findById(this.jobTicket_id);

    if (jobTicket) {
      this.ticketType = jobTicket.ticketType;
      if (this.ticketType === "Job Ticket") {
        this.attendingStaff = "PPSS";
      }
    }

    const technicalJobTicket = await mongoose
      .model("Technical-Job-Ticket")
      .findById(this.technicalJobTicket_id);

    if (technicalJobTicket) {
      this.ticketType = technicalJobTicket.ticketType;
      if (this.ticketType === "Technical Job Ticket") {
        this.attendingStaff = "Computer Technician";
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
