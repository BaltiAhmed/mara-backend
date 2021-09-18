const express = require("express");
const route = express.Router();

const siteControllers = require("../controllers/site");
const fileUpload = require("../middleware/file-upload");

const { check } = require("express-validator");

route.post("/signup", fileUpload.single("image"), siteControllers.signup);

route.post("/login", siteControllers.login);

route.patch("/:id", fileUpload.single("image"), siteControllers.updateSite);

route.get("/", siteControllers.getSite);
route.get("/:id", siteControllers.getSiteById);
route.delete("/:id", siteControllers.deleteSite);
route.patch("/rating/:id",siteControllers.rating)

module.exports = route;
