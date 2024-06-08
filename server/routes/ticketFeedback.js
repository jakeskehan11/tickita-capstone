const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createTicketFeedback,
  getTicketFeedbacks,
  getTicketFeedBack,
  deleteTicketFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

router.use(requireAuth);

// POST a feedback 
router.post("/:id", createTicketFeedback);

// GET all feedbacks
router.get("/all/", getTicketFeedbacks);

// Get a single feedback 
router.get("/:id", getTicketFeedBack);

// DELETE a feedback
router.delete("/:id", deleteTicketFeedback);

module.exports = router;
