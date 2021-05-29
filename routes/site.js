const express = require("express");
const route = express.Router();

const siteControllers = require("../controllers/site");
const fileUpload = require("../middleware/file-upload");

const { check } = require("express-validator");

route.post("/signup", fileUpload.single("image"), siteControllers.signup);

route.post("/login", siteControllers.login);

route.patch(
  "/:id",
  check("nom").not().isEmpty(),
  check("email").normalizeEmail,
  check("password").isLength({ min: 8 }),
  check("description").not().isEmpty(),
  check("adresse").not().isEmpty(),
  check("gouvernorat").not().isEmpty(),
  check("tel").not().isEmpty(),
  check("categorie").not().isEmpty(),
  check("capacite").not().isEmpty(),
  siteControllers.updateSite
);

route.get("/", siteControllers.getSite);
route.get("/:id", siteControllers.getSiteById);
route.delete("/:id", siteControllers.deleteSite);

module.exports = route;
