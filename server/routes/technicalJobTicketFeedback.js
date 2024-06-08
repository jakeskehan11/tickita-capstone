const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createTechnicalJobTicketFeedback,
  getTechnicalJobTicketFeedbacks,
  getTechnicalJobTicketFeedBack,
} = require("../controllers/feedbackTechnicalJobTicketController");

const router = express.Router();

router.use(requireAuth);

// POST a feedback for Technical Job Ticket
router.post("/:id", createTechnicalJobTicketFeedback);

// GET all Technical Job Ticket feedbacks
router.get("/all/", getTechnicalJobTicketFeedbacks);

// Get a single feedback for Technical Job Ticket
router.get("/:id", getTechnicalJobTicketFeedBack);

module.exports = router;
