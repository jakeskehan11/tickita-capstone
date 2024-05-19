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
router.get("/ticket/", getTechnicalJobTickets);

// GET a single technical job ticket
router.get("/ticket/:id", getTechnicalJobTicket);

// POST a new technical job ticket
router.post("/ticket/", createTechnicalJobTicket);

// DELETE a technical job ticket
router.delete("/ticket/:id", deleteTechnicalJobTicket);

// UPDATE a technical job ticket
router.patch("/ticket/:id", updateTechnicalJobTicket);

module.exports = router;
