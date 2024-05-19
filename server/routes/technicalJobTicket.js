const express = require("express");
const {
  getTechnicalJobTickets,
  getTechnicalJobTicket,
  createTechnicalJobTicket,
  deleteTechnicalJobTicket,
  updateTechnicalJobTicket,
} = require("../controllers/technicalJobTicketController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all technical job tickets
router.get("/", getTechnicalJobTickets);

// GET a single technical job ticket
router.get("/:id", getTechnicalJobTicket);

// POST a new technical job ticket
router.post("/", createTechnicalJobTicket);

// DELETE a technical job ticket
router.delete("/:id", deleteTechnicalJobTicket);

// UPDATE a technical job ticket
router.patch("/:id", updateTechnicalJobTicket);

module.exports = router;
