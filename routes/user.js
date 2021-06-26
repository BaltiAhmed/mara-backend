const express = require("express");
const route = express.Router();

const userControllers = require("../controllers/user");

const { check } = require("express-validator");

route.post(
  "/signup",
  check("nom").not().isEmpty(),
  check("prenom").not().isEmpty(),
  check("email").not().isEmpty(),
  check("password").isLength({ min: 8 }),
  check("tel").not().isEmpty(),
  check("adresse").not().isEmpty(),
  check("gouvernorat").not().isEmpty(),
  userControllers.signup
);

route.post(
  "/login",
  check("email").not().isEmpty(),
  check("password").isLength({ min: 8 }),
  userControllers.login
);

route.get("/", userControllers.getUser);
route.get("/:id", userControllers.getUserById);

route.patch(
  "/:id",
  check("nom").not().isEmpty(),
  check("prenom").not().isEmpty(),
  check("email").normalizeEmail,
  check("password").isLength({ min: 8 }),
  check("tel").not().isEmpty(),
  check("photo").not().isEmpty(),
  userControllers.updateUser
);

route.delete("/:id", userControllers.deleteUser);
route.patch("/bloquer/:id", userControllers.BloquerUser);

module.exports = route;
