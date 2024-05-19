const express = require("express");
const {
  getJobTickets,
  getJobTicket,
  createJobTicket,
  deleteJobTicket,
  updateJobTicket,
} = require("../controllers/jobTicketController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all job tickets
router.get("/ticket/", getJobTickets);

// GET a single job ticket
router.get("/ticket/:id", getJobTicket);

// POST a new job ticket
router.post("/ticket/", createJobTicket);

// DELETE a job ticket
router.delete("/ticket/:id", deleteJobTicket);

// UPDATE a job ticket
router.patch("/ticket/:id", updateJobTicket);

module.exports = router;
