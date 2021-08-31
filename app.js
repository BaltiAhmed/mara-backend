const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./routes/user");
const siteRoutes = require("./routes/site");
const evenementRoutes = require("./routes/evenement");
const bonPlanRoutes = require("./routes/bonplan");
const avisRoutes = require("./routes/avis");
const transportsRoutes = require("./routes/transport");

const httperror = require("./models/error");

const mongoose = require("mongoose");

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/user", userRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/evenement", evenementRoutes);
app.use("/api/bonplan", bonPlanRoutes);
app.use("/api/avis", avisRoutes);
app.use("/api/transport", transportsRoutes);

app.use((req, res, next) => {
  const error = new httperror("could not find that page", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknown error occurred " });
});

mongoose
  .connect(
    "mongodb+srv://marwapfe2021:marwa@cluster0.8hmzn.mongodb.net/marwa?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
