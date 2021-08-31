const express = require("express");
const route = express.Router();

const transportControllers = require("../controllers/transport");

const { check } = require("express-validator");

route.post(
  "/ajout",
  check("type").not().isEmpty(),
  check("prix").not().isEmpty(),
  check("depart").not().isEmpty(),
  check("temps").not().isEmpty(),
  transportControllers.ajout
);

route.patch(
  "/:id",
  check("type").not().isEmpty(),
  check("prix").not().isEmpty(),
  check("depart").not().isEmpty(),
  check("temps").not().isEmpty(),
  transportControllers.updateTransport
);

route.delete("/:id", transportControllers.delateTransport);
route.get("/site/:id", transportControllers.getTransportBySiteId);

module.exports = route;
