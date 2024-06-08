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
router.get("/", getJobTickets);

// GET a single job ticket
router.get("/:id", getJobTicket);

// POST a new job ticket
router.post("/", createJobTicket);

// DELETE a job ticket
router.delete("/:id", deleteJobTicket);

// UPDATE a job ticket
router.patch("/:id", updateJobTicket);


module.exports = router;
