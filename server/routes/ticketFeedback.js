const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createTicketFeedback,
  getTicketFeedbacks,
  getTicketFeedBack,
} = require("../controllers/feedbackController");

const router = express.Router();

router.use(requireAuth);

// POST a feedback for Job Ticket
router.post("/:id", createTicketFeedback);

// GET all Job Ticket feedbacks
router.get("/all/", getTicketFeedbacks);

// Get a single feedback for Job Ticket
router.get("/:id", getTicketFeedBack);

module.exports = router;
