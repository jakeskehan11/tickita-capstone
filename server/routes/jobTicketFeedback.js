const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createJobTicketFeedback,
  getJobTicketFeedbacks,
  getJobTicketFeedBack,
} = require("../controllers/feedbackJobTicketController");

const router = express.Router();

router.use(requireAuth);

// POST a feedback for Job Ticket
router.post("/:id", createJobTicketFeedback);

// GET all Job Ticket feedbacks
router.get("/all/", getJobTicketFeedbacks);

// Get a single feedback for Job Ticket
router.get("/:id", getJobTicketFeedBack);

module.exports = router;
