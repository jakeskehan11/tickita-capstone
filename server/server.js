require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const jobTicketRoutes = require("./routes/jobTicket");
const technicalJobTicketRoutes = require("./routes/technicalJobTicket");

// express app
const app = express();

app.use(cors({
  origin:["https://tickita-api.vercel.app/"],
  methods:["POST","GET","DELETE"]
});

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/auth", userRoutes);
app.use("/api/job-ticket", jobTicketRoutes);
app.use("/api/technical-job-ticket", technicalJobTicketRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
