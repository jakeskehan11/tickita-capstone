import "dotenv/config";

import express, { json } from "express";
import { connect } from "mongoose";

// express app
const app = express();

// middleware
app.use(json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to database
connect(process.env.MONGO_URI)
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
